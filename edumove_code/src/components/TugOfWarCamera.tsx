'use client';
import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { FilesetResolver, FaceLandmarker, HandLandmarker } from '@mediapipe/tasks-vision';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, Trophy, AlertTriangle, Swords, HelpCircle, Activity } from 'lucide-react';

export interface QuizData {
  q: string; choiceA: string; choiceB: string; choiceC: string; choiceD: string; ans: 'A' | 'B' | 'C' | 'D';
}

const playSignalSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square'; 
    osc.frequency.setValueAtTime(600, ctx.currentTime); 
    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.log("Audio not supported");
  }
};

export default function TugOfWarCamera({ questions, onFinish, experimentName }: { questions: QuizData[], onFinish: () => void, experimentName?: string }) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [faceAI, setFaceAI] = useState<FaceLandmarker | null>(null);
  const [handAI, setHandAI] = useState<HandLandmarker | null>(null);

  type GameStatus = 'INTRO' | 'WAIT_TURN_BACK' | 'COUNTDOWN' | 'RANDOM_DELAY' | 'GO_SIGNAL' | 'ANSWERING' | 'RESULT' | 'SUMMARY';
  const [status, setStatus] = useState<GameStatus>('INTRO');
  
  const [currentQ, setCurrentQ] = useState(0);
  const [hp, setHp] = useState(50); // พลัง 50 คืออยู่ตรงกลาง
  
  const [readyTime, setReadyTime] = useState(3);
  const [timeLeft, setTimeLeft] = useState(10);
  
  const [fastestPlayer, setFastestPlayer] = useState<'LEFT' | 'RIGHT' | null>(null);
  const [lockedChoice, setLockedChoice] = useState<'A' | 'B' | 'C' | 'D' | 'TIMEOUT' | null>(null);
  
  const holdFramesRef = useRef({ A: 0, B: 0, C: 0, D: 0 });
  const isProcessingRef = useRef(false);

  const qData = questions[currentQ];

  useEffect(() => {
    async function initAI() {
      const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
      const face = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task", delegate: "GPU" },
        runningMode: "VIDEO", numFaces: 2
      });
      const hand = await HandLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task", delegate: "GPU" },
        runningMode: "VIDEO", numHands: 2
      });
      setFaceAI(face);
      setHandAI(hand);
    }
    initAI();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'WAIT_TURN_BACK') {
      timer = setTimeout(() => { setStatus('COUNTDOWN'); setReadyTime(3); }, 4000);
    } 
    else if (status === 'COUNTDOWN') {
      if (readyTime > 0) {
        timer = setTimeout(() => setReadyTime(prev => prev - 1), 1000);
      } else {
        setStatus('RANDOM_DELAY');
        const delay = Math.floor(Math.random() * 2000) + 1000; 
        setTimeout(() => {
          setStatus('GO_SIGNAL');
          playSignalSound();
        }, delay);
      }
    } 
    else if (status === 'ANSWERING') {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      } else {
        handleAnswer('TIMEOUT');
      }
    }
    return () => clearTimeout(timer);
  }, [status, readyTime, timeLeft]);

  useEffect(() => {
    if ((status !== 'GO_SIGNAL' && status !== 'ANSWERING') || !faceAI || !handAI) return;
    let animationId: number;
    const HOLD_THRESHOLD = 20;

    const detect = () => {
      if (webcamRef.current?.video?.readyState === 4 && !isProcessingRef.current) {
        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        
        if (canvas && ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (status === 'GO_SIGNAL') {
            const faceResult = faceAI.detectForVideo(video, performance.now());
            if (faceResult.faceLandmarks && faceResult.faceLandmarks.length > 0) {
              const noseX = 1 - faceResult.faceLandmarks[0][1].x; 
              if (noseX < 0.5) setFastestPlayer('LEFT');
              else setFastestPlayer('RIGHT');
              setStatus('ANSWERING'); setTimeLeft(10); holdFramesRef.current = { A: 0, B: 0, C: 0, D: 0 };
            }
          }

          else if (status === 'ANSWERING' && fastestPlayer) {
            const handResult = handAI.detectForVideo(video, performance.now());
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'; ctx.lineWidth = 2; ctx.setLineDash([10, 10]);
            ctx.beginPath(); ctx.moveTo(0, canvas.height/2); ctx.lineTo(canvas.width, canvas.height/2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(canvas.width/2, 0); ctx.lineTo(canvas.width/2, canvas.height); ctx.stroke();
            ctx.setLineDash([]);

            if (handResult.landmarks && handResult.landmarks.length > 0) {
              handResult.landmarks.forEach(hand => {
                const target = hand[9]; 
                const xRatio = 1 - target.x; 
                const yRatio = target.y;

                const isHandInWinnerZone = (fastestPlayer === 'LEFT' && xRatio < 0.5) || (fastestPlayer === 'RIGHT' && xRatio > 0.5);

                if (isHandInWinnerZone) {
                  const x = xRatio * canvas.width;
                  const y = yRatio * canvas.height;
                  
                  ctx.shadowBlur = 15;
                  ctx.shadowColor = fastestPlayer === 'LEFT' ? '#38bdf8' : '#fb7185';
                  ctx.fillStyle = fastestPlayer === 'LEFT' ? '#38bdf8' : '#fb7185';
                  ctx.beginPath(); ctx.arc(x, y, 12, 0, 2 * Math.PI); ctx.fill();
                  ctx.shadowBlur = 0; 

                  let zone: 'A'|'B'|'C'|'D' | null = null;
                  const localX = fastestPlayer === 'LEFT' ? xRatio * 2 : (xRatio - 0.5) * 2;
                  
                  if (yRatio < 0.5) { zone = localX < 0.5 ? 'A' : 'B'; } 
                  else { zone = localX < 0.5 ? 'C' : 'D'; }

                  if (zone) {
                    holdFramesRef.current[zone]++;
                    const progress = Math.min(1, holdFramesRef.current[zone] / HOLD_THRESHOLD);
                    ctx.beginPath(); ctx.arc(x, y, 35, -Math.PI/2, (-Math.PI/2) + (2 * Math.PI * progress));
                    ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 8; ctx.stroke();

                    if (holdFramesRef.current[zone] >= HOLD_THRESHOLD) {
                      isProcessingRef.current = true;
                      setLockedChoice(zone);
                      handleAnswer(zone);
                    }
                  }
                }
              });
            }
          }
        }
      }
      animationId = requestAnimationFrame(detect);
    };
    detect();
    return () => cancelAnimationFrame(animationId);
  }, [status, faceAI, handAI, fastestPlayer]);

  // ==========================================
  // 🚀 ระบบฟิสิกส์หลอดพลังแบบสมจริง
  // ==========================================
  const handleAnswer = (selected: 'A' | 'B' | 'C' | 'D' | 'TIMEOUT') => {
    setStatus('RESULT');
    const isCorrect = selected !== 'TIMEOUT' && selected === qData.ans;

    // 1. รอให้เอฟเฟกต์ลูกไฟวิญญาณบินไปชนหลอด (1.2 วินาที)
    setTimeout(() => {
      let newHp = hp;
      if (isCorrect) {
        // ให้ดาเมจครั้งละ 20%
        if (fastestPlayer === 'LEFT') newHp = Math.max(0, hp - 20); 
        if (fastestPlayer === 'RIGHT') newHp = Math.min(100, hp + 20); 
      }
      setHp(newHp); // 2. อัปเดตหลอดพลังให้ดันไปอีกฝั่ง

      // 3. รอหลอดพลังขยับเสร็จ (1.5 วินาที) แล้วค่อยรีเซ็ตรอบใหม่
      setTimeout(() => {
        if (newHp <= 0 || newHp >= 100) {
          setStatus('SUMMARY');
        } else {
          // 🔁 ระบบ Infinite Loop: วนคำถามไปเรื่อยๆ จนกว่าหลอดจะสุด
          setCurrentQ(prev => (prev + 1) % questions.length);
          setStatus('WAIT_TURN_BACK'); 
          setFastestPlayer(null);
          setLockedChoice(null);
          isProcessingRef.current = false;
        }
      }, 1500); 
    }, isCorrect ? 1200 : 1000); 
  };

  const QuestionBox = () => (
    <div className="absolute inset-8 bg-slate-900/90 border-4 border-indigo-500 rounded-[3rem] shadow-[0_0_50px_rgba(99,102,241,0.4)] flex flex-col items-center justify-center p-10 backdrop-blur-md">
      <HelpCircle size={60} className="text-indigo-400 mb-6 drop-shadow-md" />
      <div className="text-indigo-300 font-black text-xl mb-4 tracking-widest uppercase">คำถามประลองปัญญา</div>
      <h2 className="text-3xl md:text-5xl font-black text-white leading-relaxed text-balance text-center">
        {qData.q}
      </h2>
      {status === 'RESULT' && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-10 bg-slate-800 px-8 py-3 rounded-full text-2xl font-bold text-amber-400 border-2 border-slate-600">
          เฉลยคือ: ข้อ {qData.ans}
        </motion.div>
      )}
    </div>
  );

  const ChoiceBox = ({ choice, text, colorClass, borderClass }: any) => {
    const isLocked = lockedChoice === choice;
    const isAns = status === 'RESULT' && qData.ans === choice;
    return (
      <div className={`w-full h-full flex flex-col items-center justify-center p-4 rounded-3xl border-4 text-center transition-all duration-300 ${isLocked ? `scale-110 shadow-[0_0_40px_rgba(255,255,255,0.8)] z-50 ${colorClass} border-white` : (status === 'RESULT' && !isAns ? 'opacity-30 grayscale bg-slate-900 border-slate-700' : `bg-slate-900/80 ${borderClass} text-white backdrop-blur-md`)}`}>
        <div className="text-sm md:text-base font-black opacity-70 uppercase mb-2 bg-black/30 px-4 py-1 rounded-full">ข้อ {choice}</div>
        <div className="text-lg md:text-3xl font-black leading-tight text-balance">{text}</div>
      </div>
    );
  };

  const ChoiceGrid = () => (
    <div className="absolute inset-8 grid grid-cols-2 grid-rows-2 gap-6">
      <ChoiceBox choice="A" text={qData.choiceA} colorClass="bg-rose-500" borderClass="border-rose-400/50" />
      <ChoiceBox choice="B" text={qData.choiceB} colorClass="bg-blue-500" borderClass="border-blue-400/50" />
      <ChoiceBox choice="C" text={qData.choiceC} colorClass="bg-amber-500" borderClass="border-amber-400/50" />
      <ChoiceBox choice="D" text={qData.choiceD} colorClass="bg-emerald-500" borderClass="border-emerald-400/50" />
    </div>
  );

  if (status === 'SUMMARY') {
    const winnerTeam = hp <= 0 ? 'ทีมซ้าย (LEFT)' : 'ทีมขวา (RIGHT)';
    const winnerColor = hp <= 0 ? 'text-cyan-400' : 'text-rose-400';
    return (
      <div className="w-full h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white" style={{ fontFamily: "'Kanit', sans-serif" }}>
        <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 3 }}>
          <Trophy size={140} className="text-amber-400 drop-shadow-[0_0_40px_rgba(245,158,11,0.6)] mb-8" />
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black mb-4">
          ผู้ชนะเด็ดขาดคือ <span className={winnerColor}>{winnerTeam}</span> 🎉
        </h1>
        <p className="text-2xl text-slate-400 mb-12">ดันแถบพลังสำเร็จ! ขอแสดงความยินดีด้วย!</p>
        <button onClick={onFinish} className="px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-full font-black text-2xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:scale-105">
          กลับสู่หน้าหลัก
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center overflow-hidden select-none" style={{ fontFamily: "'Kanit', sans-serif" }}>
      <Webcam ref={webcamRef} mirrored={true} className="absolute inset-0 w-full h-full object-cover opacity-60" videoConstraints={{ facingMode: "user" }} />
      <canvas ref={canvasRef} width={1280} height={720} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* 🌌 บรรยากาศอนุภาคลอยไปมาตลอดเกม */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        {[...Array(20)].map((_, i) => (
          <motion.div key={i} className="absolute w-2 h-2 bg-white rounded-full blur-[1px]"
            initial={{ left: `${Math.random() * 100}%`, bottom: '-10%' }}
            animate={{ bottom: '110%', x: Math.random() * 200 - 100 }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* ⚔️ หลอดพลังชักเย่อ เคลื่อนไหวสมูทด้วย Spring */}
      <div className="absolute top-6 inset-x-12 z-50 bg-slate-900/90 border-4 border-slate-700/50 rounded-full h-12 overflow-hidden flex shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
        <motion.div animate={{ width: `${100 - hp}%` }} transition={{ type: "spring", bounce: 0.2, duration: 1.5 }} className="h-full bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)] relative flex items-center justify-start px-6">
          <span className="font-black text-white text-lg drop-shadow-md">ทีมซ้าย</span>
        </motion.div>
        <motion.div animate={{ width: `${hp}%` }} transition={{ type: "spring", bounce: 0.2, duration: 1.5 }} className="h-full bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.8)] relative flex items-center justify-end px-6">
          <span className="font-black text-white text-lg drop-shadow-md">ทีมขวา</span>
        </motion.div>
      </div>

      <AnimatePresence>
        {status === 'INTRO' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/95 backdrop-blur-xl">
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Swords size={100} className="text-amber-400 mb-8 drop-shadow-[0_0_30px_rgba(245,158,11,0.6)]" />
            </motion.div>
            <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 tracking-tight">ศึกชิงความไว (Tug of War)</h1>
            <p className="text-2xl text-cyan-400 font-bold tracking-widest uppercase mb-10">การทดสอบปฏิกิริยาตอบสนองและวิชาการ</p>
            <div className="bg-slate-800/50 border border-slate-600 p-8 rounded-3xl max-w-3xl mb-12 shadow-xl">
              <p className="text-xl text-slate-300 text-center leading-relaxed">
                ผู้เล่นทั้ง 2 ฝ่ายหันหลังให้หน้าจอ เมื่อได้ยินเสียงสัญญาณ <b>"บี๊บ!"</b> ให้รีบหันกลับมา <br/>
                ฝ่ายที่หันมาเร็วที่สุดจะได้สิทธิ์ทำข้อสอบ ตอบถูก 1 ข้อ ดันหลอดพลังไปอีกฝั่ง <br/>
                <span className="text-amber-400 font-bold">เกมจะจบเมื่อมีผู้ดันหลอดพลังไปจนสุดขอบหน้าจอเท่านั้น!</span>
              </p>
            </div>
            <button onClick={() => {
              setStatus('WAIT_TURN_BACK');
              try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); ctx.resume(); } catch(e){}
            }} className="px-14 py-5 bg-amber-500 text-slate-900 rounded-full font-black text-3xl shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:scale-105 transition-transform">
              เข้าสู่สมรภูมิ
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === 'WAIT_TURN_BACK' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
            <AlertTriangle size={90} className="text-amber-500 mb-8 animate-pulse" />
            <h1 className="text-6xl font-black text-white drop-shadow-lg">กรุณาหันหลัง และรอฟังสัญญาณ...</h1>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === 'COUNTDOWN' && (
          <motion.div key={readyTime} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }} className="absolute z-40 flex flex-col items-center justify-center">
            <span className="text-[15rem] font-black text-rose-500 drop-shadow-[0_0_60px_rgba(244,63,94,0.8)]">{readyTime}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === 'RANDOM_DELAY' && (
          <motion.div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black/80">
            <h1 className="text-5xl font-black text-slate-400 animate-pulse tracking-widest">รอฟังสัญญาณ...</h1>
          </motion.div>
        )}
      </AnimatePresence>

      {status === 'GO_SIGNAL' && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-white/20 backdrop-blur-sm">
          <motion.h1 initial={{ scale: 0.5 }} animate={{ scale: 1.2 }} className="text-[9rem] font-black text-emerald-400 drop-shadow-[0_0_80px_rgba(16,185,129,1)]">หันได้!!!</motion.h1>
        </div>
      )}

      {(status === 'ANSWERING' || status === 'RESULT') && fastestPlayer && (
        <div className="absolute inset-0 top-24 z-30 pointer-events-none flex">
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white/20 border-x border-white/5 z-40 shadow-[0_0_30px_rgba(255,255,255,0.2)]"></div>

          <div className="w-1/2 h-full relative">
             {fastestPlayer === 'LEFT' ? <ChoiceGrid /> : <QuestionBox />}
             {status === 'ANSWERING' && fastestPlayer === 'LEFT' && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-8 py-2 rounded-full font-black text-2xl shadow-[0_0_30px_rgba(6,182,212,0.8)] animate-pulse z-50 w-max">
                  ซ้ายได้สิทธิ์ตอบ! ({timeLeft} วิ)
                </div>
             )}
          </div>

          <div className="w-1/2 h-full relative">
             {fastestPlayer === 'RIGHT' ? <ChoiceGrid /> : <QuestionBox />}
             {status === 'ANSWERING' && fastestPlayer === 'RIGHT' && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-8 py-2 rounded-full font-black text-2xl shadow-[0_0_30px_rgba(244,63,94,0.8)] animate-pulse z-50 w-max">
                  ขวาได้สิทธิ์ตอบ! ({timeLeft} วิ)
                </div>
             )}
          </div>
        </div>
      )}

      {status === 'RESULT' && (
        <motion.div initial={{ scale: 0.5, y: -50 }} animate={{ scale: 1, y: 0 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center">
          <div className={`px-12 py-6 rounded-[3rem] border-8 backdrop-blur-xl shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col items-center text-center ${lockedChoice === qData.ans ? 'bg-emerald-500/90 border-white' : 'bg-rose-600/90 border-white'}`}>
             {lockedChoice === qData.ans ? <CheckCircle2 size={80} className="text-white mb-2"/> : <XCircle size={80} className="text-white mb-2"/>}
             <h1 className="text-5xl font-black text-white drop-shadow-md">
               {lockedChoice === qData.ans ? 'ตอบถูก!' : 'ตอบผิดพลาด!'}
             </h1>
          </div>
        </motion.div>
      )}

      {/* ✨ อนิเมชั่นลูกไฟดูดพลังไหลไปเติมแถบ (แสดงเฉพาะตอนรอหลอดขยับ) ✨ */}
      {status === 'RESULT' && lockedChoice === qData.ans && fastestPlayer && (
        <div className="absolute inset-0 pointer-events-none z-[60] overflow-hidden">
          {[...Array(30)].map((_, i) => {
            const isLeft = fastestPlayer === 'LEFT';
            const startX = isLeft ? '25%' : '75%'; 
            const targetX = isLeft ? '75%' : '25%'; // วิ่งไปกระแทกฝั่งตรงข้าม
            return (
              <motion.div
                key={i}
                initial={{ left: startX, top: '50%', scale: 0, opacity: 0 }}
                animate={{
                  left: targetX,
                  top: '50px', 
                  scale: [0, Math.random() * 2 + 1, 0.5],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.0, delay: i * 0.04, ease: "easeIn" }}
                className={`absolute w-8 h-8 rounded-full blur-[2px] ${isLeft ? 'bg-cyan-300' : 'bg-rose-300'}`}
                style={{ boxShadow: `0 0 50px ${isLeft ? '#22d3ee' : '#fb7185'}` }}
              />
            );
          })}
        </div>
      )}
      
      <button onClick={onFinish} className="absolute bottom-6 left-6 z-[100] bg-white/20 backdrop-blur-md hover:bg-rose-500 text-white px-6 py-3 rounded-full font-bold shadow-xl border-2 border-white/50 flex items-center gap-2 transition-all hover:scale-105">
        <XCircle size={20} /> ออกจากการทดสอบ
      </button>
    </div>
  );
}