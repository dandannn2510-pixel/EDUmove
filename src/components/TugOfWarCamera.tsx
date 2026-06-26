'use client';
import React, { useRef, useEffect, useState, useMemo, memo } from 'react';
import Webcam from 'react-webcam';
import { FaceLandmarker, HandLandmarker } from '@mediapipe/tasks-vision';
import { getHandLandmarker, getFaceLandmarker } from '@/utils/mediapipe';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, AlertTriangle, Swords, HelpCircle } from 'lucide-react';

export interface QuizData {
  q: string; choiceA: string; choiceB: string; choiceC: string; choiceD: string; ans: 'A' | 'B' | 'C' | 'D';
}

// ─── Audio ────────────────────────────────────────────────────────────────────
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
  } catch {
    console.log("Audio not supported");
  }
};

// ─── ChoiceBox lifted to top-level to avoid remounting ───────────────────────
interface ChoiceBoxProps {
  choice: string;
  text: string;
  colorClass: string;
  borderClass: string;
  isLocked: boolean;
  isResult: boolean;
  isAns: boolean;
}

const ChoiceBox = memo(function ChoiceBox({ choice, text, colorClass, borderClass, isLocked, isResult, isAns }: ChoiceBoxProps) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center p-4 rounded-3xl border-4 text-center transition-all duration-300 ${isLocked ? `scale-110 shadow-[0_0_40px_rgba(255,255,255,0.8)] z-50 ${colorClass} border-white` : (isResult && !isAns ? 'opacity-30 grayscale bg-slate-900 border-slate-700' : `bg-slate-900/80 ${borderClass} text-white backdrop-blur-md`)}`}>
      <div className="text-sm md:text-base font-black opacity-70 uppercase mb-2 bg-black/30 px-4 py-1 rounded-full">ข้อ {choice}</div>
      <div className="text-lg md:text-3xl font-black leading-tight text-balance">{text}</div>
    </div>
  );
});

// ─── Component ────────────────────────────────────────────────────────────────
type GameStatus = 'INTRO' | 'WAIT_TURN_BACK' | 'COUNTDOWN' | 'RANDOM_DELAY' | 'GO_SIGNAL' | 'ANSWERING' | 'RESULT' | 'SUMMARY';

export default function TugOfWarCamera({ questions, onFinish }: { questions: QuizData[], onFinish: (leftScore?: number, rightScore?: number) => void, experimentName?: string }) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [faceAI, setFaceAI] = useState<FaceLandmarker | null>(null);
  const [handAI, setHandAI] = useState<HandLandmarker | null>(null);

  const [status, setStatus] = useState<GameStatus>('INTRO');
  const [currentQ, setCurrentQ] = useState(0);
  const [hp, setHp] = useState(50);
  const [readyTime, setReadyTime] = useState(3);
  const [timeLeft, setTimeLeft] = useState(10);
  const [fastestPlayer, setFastestPlayer] = useState<'LEFT' | 'RIGHT' | null>(null);
  const [lockedChoice, setLockedChoice] = useState<'A' | 'B' | 'C' | 'D' | 'TIMEOUT' | null>(null);

  const holdFramesRef = useRef({ A: 0, B: 0, C: 0, D: 0 });
  const isProcessingRef = useRef(false);

  const qData = questions[currentQ];

  // ─── Stable random values for background particles (useMemo prevents re-randomising) ─
  const particles = useMemo(() =>
    Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      dx: Math.random() * 200 - 100,
      duration: Math.random() * 10 + 10,
    })), []
  );

  // ─── Load shared AI models ───────────────────────────────────────────────
  useEffect(() => {
    getFaceLandmarker(2)
      .then(setFaceAI)
      .catch((err) => console.error('Failed to load FaceLandmarker:', err));
    getHandLandmarker(2, true)
      .then(setHandAI)
      .catch((err) => console.error('Failed to load HandLandmarker:', err));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            ctx.beginPath(); ctx.moveTo(0, canvas.height / 2); ctx.lineTo(canvas.width, canvas.height / 2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(canvas.width / 2, 0); ctx.lineTo(canvas.width / 2, canvas.height); ctx.stroke();
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

                  let zone: 'A' | 'B' | 'C' | 'D' | null = null;
                  const localX = fastestPlayer === 'LEFT' ? xRatio * 2 : (xRatio - 0.5) * 2;

                  if (yRatio < 0.5) { zone = localX < 0.5 ? 'A' : 'B'; }
                  else { zone = localX < 0.5 ? 'C' : 'D'; }

                  if (zone) {
                    holdFramesRef.current[zone]++;
                    const progress = Math.min(1, holdFramesRef.current[zone] / HOLD_THRESHOLD);
                    ctx.beginPath(); ctx.arc(x, y, 35, -Math.PI / 2, (-Math.PI / 2) + (2 * Math.PI * progress));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, faceAI, handAI, fastestPlayer]);

  const handleAnswer = (selected: 'A' | 'B' | 'C' | 'D' | 'TIMEOUT') => {
    setStatus('RESULT');
    const isCorrect = selected !== 'TIMEOUT' && selected === qData.ans;

    setTimeout(() => {
      let newHp = hp;
      if (isCorrect) {
        if (fastestPlayer === 'LEFT') newHp = Math.max(0, hp - 20);
        if (fastestPlayer === 'RIGHT') newHp = Math.min(100, hp + 20);
      }
      setHp(newHp);

      setTimeout(() => {
        if (newHp <= 0 || newHp >= 100) {
          setStatus('SUMMARY');
        } else {
          setCurrentQ(prev => (prev + 1) % questions.length);
          setStatus('WAIT_TURN_BACK');
          setFastestPlayer(null);
          setLockedChoice(null);
          isProcessingRef.current = false;
        }
      }, 1500);
    }, isCorrect ? 1200 : 1000);
  };

  // ─── Inner sub-views (safe: these don't cause remounting since they're not components) ─

  const QuestionBoxContent = () => (
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

  const ChoiceGridContent = () => (
    <div className="absolute inset-8 grid grid-cols-2 grid-rows-2 gap-6">
      {(['A', 'B', 'C', 'D'] as const).map((choice) => (
        <ChoiceBox
          key={choice}
          choice={choice}
          text={qData[`choice${choice}`]}
          colorClass={choice === 'A' ? 'bg-rose-500' : choice === 'B' ? 'bg-blue-500' : choice === 'C' ? 'bg-amber-500' : 'bg-emerald-500'}
          borderClass={choice === 'A' ? 'border-rose-400/50' : choice === 'B' ? 'border-blue-400/50' : choice === 'C' ? 'border-amber-400/50' : 'border-emerald-400/50'}
          isLocked={lockedChoice === choice}
          isResult={status === 'RESULT'}
          isAns={qData.ans === choice}
        />
      ))}
    </div>
  );

  if (status === 'SUMMARY') {
    const winnerTeam = hp <= 0 ? 'ทีมซ้าย (LEFT)' : 'ทีมขวา (RIGHT)';
    const winnerColor = hp <= 0 ? 'text-cyan-400' : 'text-rose-400';
    return (
      <div className="w-full h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex flex-col items-center justify-center text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
        <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 3 }}>
          <Trophy size={140} className="text-amber-400 drop-shadow-[0_0_40px_rgba(245,158,11,0.6)] mb-8" />
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black mb-4">
          ผู้ชนะคือ <span className={winnerColor}>{winnerTeam}</span> 🎉
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 font-bold"> ขอแสดงความยินดีด้วย!</p>
        <button onClick={() => onFinish && onFinish(hp <= 0 ? 1 : 0, hp >= 100 ? 1 : 0)} className="px-12 py-4 bg-amber-300 hover:bg-amber-400 text-slate-900 border-4 border-slate-900 rounded-2xl font-black text-2xl transition-all shadow-[4px_4px_0_0_#0F172A] hover:scale-105 active:translate-y-1 active:shadow-none">
          กลับสู่หน้าหลัก
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center overflow-hidden select-none" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
      <Webcam ref={webcamRef} mirrored={true} className="absolute inset-0 w-full h-full object-cover opacity-60" videoConstraints={{ facingMode: "user" }} />
      <canvas ref={canvasRef} width={1280} height={720} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* 🌌 Background particles — stable random values via useMemo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        {particles.map((p, i) => (
          <motion.div key={i} className="absolute w-2 h-2 bg-white rounded-full blur-[1px]"
            initial={{ left: p.left, bottom: '-10%' }}
            animate={{ bottom: '110%', x: p.dx }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* ⚔️ HP Bar */}
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md">
            <div className="bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-6 sm:p-10 rounded-[2.5rem] shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] max-w-3xl w-full text-center flex flex-col items-center">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                <Swords size={80} className="text-amber-500 mb-6" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-2">ศึกชิงความไว (มินิเกมชักเย่อ)</h1>
              <p className="text-lg text-indigo-600 dark:text-indigo-400 font-black tracking-wider uppercase mb-8">เกมทดสอบความเร็วและความรู้ทางวิชาการ</p>

              <div className="bg-slate-50 dark:bg-slate-900 border-4 border-slate-900 p-6 sm:p-8 rounded-[2rem] mb-8 text-left w-full shadow-sm">
                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                  ผู้เล่นทั้ง 2 ฝ่ายยืนหันหลังให้หน้าจอ เมื่อได้ยินเสียงสัญญาณ <b className="text-rose-500">&quot;บี๊บ!&quot;</b> ให้รีบหันกลับมาอย่างรวดเร็ว <br />
                  ฝั่งที่หันมาได้เร็วกว่าจะมีสิทธิ์ตอบคำถาม หากตอบถูกจะดึงเชือกขยับหลอดพลังเข้าหาฝั่งตัวเอง <br />
                  <span className="text-amber-500 font-black">ฝ่ายใดที่สามารถดึงเชือกดันหลอดพลังไปจนสุดฝั่งตรงข้ามได้สำเร็จ จะเป็นผู้ชนะในเกมนี้!</span>
                </p>
              </div>

              <button onClick={() => {
                setStatus('WAIT_TURN_BACK');
                try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); ctx.resume(); } catch { }
              }} className="px-12 py-4 bg-amber-300 hover:bg-amber-400 text-slate-900 border-4 border-slate-900 rounded-2xl font-black text-2xl shadow-[4px_4px_0_0_#0F172A] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2">
                เข้าสู่สมรภูมิ
              </button>
            </div>
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
            {fastestPlayer === 'LEFT' ? <ChoiceGridContent /> : <QuestionBoxContent />}
            {status === 'ANSWERING' && fastestPlayer === 'LEFT' && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-cyan-500 text-white px-8 py-2 rounded-full font-black text-2xl shadow-[0_0_30px_rgba(6,182,212,0.8)] animate-pulse z-50 w-max">
                ซ้ายได้สิทธิ์ตอบ! ({timeLeft} วิ)
              </div>
            )}
          </div>

          <div className="w-1/2 h-full relative">
            {fastestPlayer === 'RIGHT' ? <ChoiceGridContent /> : <QuestionBoxContent />}
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
            {lockedChoice === qData.ans ? <CheckCircle2 size={80} className="text-white mb-2" /> : <XCircle size={80} className="text-white mb-2" />}
            <h1 className="text-5xl font-black text-white drop-shadow-md">
              {lockedChoice === qData.ans ? 'ตอบถูก!' : 'ตอบผิดพลาด!'}
            </h1>
          </div>
        </motion.div>
      )}

      {/* ✨ Fireball animation on correct answer */}
      {status === 'RESULT' && lockedChoice === qData.ans && fastestPlayer && (
        <div className="absolute inset-0 pointer-events-none z-[60] overflow-hidden">
          {Array.from({ length: 30 }, (_, i) => {
            const isLeft = fastestPlayer === 'LEFT';
            const startX = isLeft ? '25%' : '75%';
            const targetX = isLeft ? '75%' : '25%';
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

      <button onClick={() => onFinish()} className="absolute bottom-6 left-6 z-[100] bg-white/20 backdrop-blur-md hover:bg-rose-500 text-white px-6 py-3 rounded-full font-bold shadow-xl border-2 border-white/50 flex items-center gap-2 transition-all hover:scale-105">
        <XCircle size={20} /> ออกจากการทดสอบ
      </button>
    </div>
  );
}