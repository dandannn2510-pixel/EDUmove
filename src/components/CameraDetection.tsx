'use client';
import React, { useRef, useEffect, useState, memo } from 'react';
import Webcam from 'react-webcam';
import { getHandLandmarker } from '@/utils/mediapipe';
import { HandLandmarker } from '@mediapipe/tasks-vision';
import { useGameStore } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Hand, FastForward, Lightbulb, Sparkles } from 'lucide-react';
import { gameMusic } from '@/utils/gameMusic';

export interface QuestionData {
  q: string; choiceA: string; choiceB: string; choiceC: string; choiceD: string; ans: 'A' | 'B' | 'C' | 'D';
}

// ─── ChoiceBox lifted out to prevent unmount/remount on parent re-render ──────
interface ChoiceBoxProps {
  choice: 'A' | 'B' | 'C' | 'D';
  text: string;
  lockedState: 'A' | 'B' | 'C' | 'D' | null;
  positioning: string;
  color: 'rose' | 'blue' | 'amber' | 'emerald';
}

const colorMap: Record<ChoiceBoxProps['color'], string> = {
  rose:    'bg-rose-600 border-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.4)]',
  blue:    'bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]',
  amber:   'bg-amber-500 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]',
  emerald: 'bg-emerald-600 border-emerald-400 shadow-[0_0_15px_rgba(5,150,105,0.4)]',
};

const ChoiceBox = memo(function ChoiceBox({ choice, text, lockedState, positioning, color }: ChoiceBoxProps) {
  const isLocked = lockedState === choice;
  const isFaded = lockedState !== null && lockedState !== choice;
  return (
    <div className={`absolute ${positioning} w-[23%] p-2 sm:p-4 rounded-xl sm:rounded-[2rem] border sm:border-4 text-center transition-all duration-300 z-20 overflow-hidden
      ${isLocked ? colorMap[color] + ' scale-105 z-30 ring-2 ring-white text-white font-bold' : `bg-slate-900/90 border-slate-600 text-slate-100 ${isFaded ? 'opacity-45 scale-95 text-slate-400 bg-slate-900/60 border-slate-700/50 grayscale pointer-events-none' : 'opacity-100'}`}
    `}>
      <div className="text-[8px] sm:text-xs font-black opacity-60 uppercase">ข้อ {choice}</div>
      <div className="text-[11px] sm:text-lg md:text-xl lg:text-2xl font-black leading-tight break-words line-clamp-2">{text}</div>
    </div>
  );
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function CameraDetection({ 
  questions, onFinish, onSkip, onViewAnswers, experimentName 
}: { 
  questions: QuestionData[], onFinish: (leftScore?: number, rightScore?: number) => void, onSkip?: () => void, onViewAnswers?: () => void, experimentName?: string 
}) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null);
  const { addLeftScore, addRightScore } = useGameStore();

  const [status, setStatus] = useState<'INTRO' | 'SHOW_TITLE' | 'READY' | 'PLAYING' | 'RESULT'>('INTRO');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [readyTime, setReadyTime] = useState(3);
  
  const [lockedA, setLockedA] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [lockedB, setLockedB] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  
  const holdFramesRef = useRef({ 
    teamA: { A: 0, B: 0, C: 0, D: 0 }, teamB: { A: 0, B: 0, C: 0, D: 0 } 
  });

  const currentQ = questions[currentIndex];

  // ─── Load shared HandLandmarker & Reset Score ────────────────────────────
  useEffect(() => {
    useGameStore.getState().resetGame();
    getHandLandmarker(4)
      .then(setHandLandmarker)
      .catch((err) => console.error('Failed to load HandLandmarker:', err));
  }, []);

  useEffect(() => {
    if (status === 'PLAYING') {
      gameMusic.start();
    } else {
      gameMusic.stop();
    }
    return () => {
      gameMusic.stop();
    };
  }, [status]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'SHOW_TITLE') {
      timer = setTimeout(() => {
        setStatus('READY'); setReadyTime(3);
      }, 3000);
    } 
    else if (status === 'READY') {
      if (readyTime > 0) {
        gameMusic.playCountdownTickSound(false);
        timer = setTimeout(() => setReadyTime(prev => prev - 1), 1000);
      } else {
        gameMusic.playCountdownTickSound(true);
        setStatus('PLAYING'); setTimeLeft(10);
        setLockedA(null); setLockedB(null);
        holdFramesRef.current = { teamA: { A: 0, B: 0, C: 0, D: 0 }, teamB: { A: 0, B: 0, C: 0, D: 0 } };
      }
    } 
    else if (status === 'PLAYING') {
      if (timeLeft > 0) {
        timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      } else {
        gameMusic.playTimeoutSound();
        calculateResults();
      }
    }
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, readyTime, timeLeft]);

  useEffect(() => {
    if (status !== 'PLAYING' || !handLandmarker) return;
    let animationFrameId: number;
    const HOLD_THRESHOLD = 18; 

    const detect = () => {
      if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState === 4) {
        const video = webcamRef.current.video;
        const result = handLandmarker.detectForVideo(video, performance.now());
        const canvas = canvasRef.current;
        
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; ctx.lineWidth = 4; ctx.setLineDash([10, 15]);
            ctx.beginPath(); ctx.moveTo(0, canvas.height / 2); ctx.lineTo(canvas.width, canvas.height / 2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(canvas.width * 0.25, 0); ctx.lineTo(canvas.width * 0.25, canvas.height); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(canvas.width * 0.75, 0); ctx.lineTo(canvas.width * 0.75, canvas.height); ctx.stroke();
            ctx.setLineDash([]);

            let detectedZoneA: 'A'|'B'|'C'|'D'|null = null;
            let detectedZoneB: 'A'|'B'|'C'|'D'|null = null;
            let handAx = 0, handAy = 0, handBx = 0, handBy = 0;

            if (result.landmarks && result.landmarks.length > 0) {
              result.landmarks.forEach((landmark) => {
                const targetPoint = landmark[9]; 
                const xRatio = 1 - targetPoint.x; 
                const yRatio = targetPoint.y;
                const x = xRatio * canvas.width;
                const y = yRatio * canvas.height;

                ctx.fillStyle = xRatio < 0.5 ? '#c084fc' : '#4ade80';
                ctx.beginPath(); ctx.arc(x, y, 10, 0, 2 * Math.PI); ctx.fill();

                if (xRatio < 0.5) { 
                  handAx = x; handAy = y;
                  if (yRatio < 0.5) detectedZoneA = xRatio < 0.25 ? 'A' : 'B';
                  else detectedZoneA = xRatio < 0.25 ? 'C' : 'D';
                } else { 
                  handBx = x; handBy = y;
                  if (yRatio < 0.5) detectedZoneB = xRatio < 0.75 ? 'A' : 'B';
                  else detectedZoneB = xRatio < 0.75 ? 'C' : 'D';
                }
              });
            }

            if (detectedZoneA) {
              holdFramesRef.current.teamA[detectedZoneA]++;
              const progress = Math.min(1, holdFramesRef.current.teamA[detectedZoneA] / HOLD_THRESHOLD);
              ctx.beginPath(); ctx.arc(handAx, handAy, 25, -Math.PI/2, (-Math.PI/2) + (2 * Math.PI * progress));
              ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 5; ctx.stroke();
              (['A','B','C','D'] as const).forEach(z => { if (z !== detectedZoneA) holdFramesRef.current.teamA[z] = Math.max(0, holdFramesRef.current.teamA[z] - 2); });
              if (holdFramesRef.current.teamA[detectedZoneA] >= HOLD_THRESHOLD) setLockedA(detectedZoneA);
            } else {
              (['A','B','C','D'] as const).forEach(z => { holdFramesRef.current.teamA[z] = Math.max(0, holdFramesRef.current.teamA[z] - 1); });
            }

            if (detectedZoneB) {
              holdFramesRef.current.teamB[detectedZoneB]++;
              const progress = Math.min(1, holdFramesRef.current.teamB[detectedZoneB] / HOLD_THRESHOLD);
              ctx.beginPath(); ctx.arc(handBx, handBy, 25, -Math.PI/2, (-Math.PI/2) + (2 * Math.PI * progress));
              ctx.strokeStyle = '#fbbf24'; ctx.lineWidth = 5; ctx.stroke();
              (['A','B','C','D'] as const).forEach(z => { if (z !== detectedZoneB) holdFramesRef.current.teamB[z] = Math.max(0, holdFramesRef.current.teamB[z] - 2); });
              if (holdFramesRef.current.teamB[detectedZoneB] >= HOLD_THRESHOLD) setLockedB(detectedZoneB);
            } else {
              (['A','B','C','D'] as const).forEach(z => { holdFramesRef.current.teamB[z] = Math.max(0, holdFramesRef.current.teamB[z] - 1); });
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(detect);
    };

    detect();
    return () => cancelAnimationFrame(animationFrameId);
  }, [handLandmarker, status]);

  const calculateResults = () => {
    setStatus('RESULT');
    if (lockedA === currentQ.ans) addLeftScore(1);
    if (lockedB === currentQ.ans) addRightScore(1);
    
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1); 
        setReadyTime(3); 
        setStatus('READY'); 
      } else { 
        const latestState = useGameStore.getState();
        onFinish(latestState.leftScore, latestState.rightScore); 
      }
    }, 2000);
  };

  if (status === 'INTRO') {
    return (
      <div className="w-full h-full min-h-[85vh] flex items-center justify-center relative p-4 select-none" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
        <div className="w-full max-w-3xl bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-6 sm:p-12 rounded-[2.5rem] shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mb-2">เตรียมพร้อมเข้าสู่ Pre-test</h1>
          <div className="bg-indigo-100 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-black px-4 py-1.5 rounded-full border-2 border-slate-900 mb-6 text-xs sm:text-sm">โหมด 4 ตัวเลือก (A, B, C, D)</div>
          <div className="w-full bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 text-left mb-8 border-4 border-slate-900 shadow-sm flex items-start gap-3">
            <div className="bg-emerald-100 dark:bg-emerald-950/50 p-2.5 rounded-xl text-emerald-600 dark:text-emerald-400 border-2 border-slate-900 shrink-0"><Hand size={20}/></div>
            <p className="text-xs sm:text-base text-slate-700 dark:text-slate-300 font-bold leading-relaxed">ชูมือไปยัง <strong className="text-emerald-600 dark:text-emerald-400 font-black">สีของข้อที่ต้องการ</strong> ค้างไว้ 1 วินาทีเพื่อล็อคคำตอบ หากเปลี่ยนใจสามารถย้ายมือได้ก่อนหมดเวลา</p>
          </div>
          <div className="flex flex-col items-center gap-4 w-full">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { setStatus('SHOW_TITLE'); }} className="px-8 sm:px-12 py-3.5 sm:py-4 rounded-2xl font-black text-lg sm:text-xl text-slate-900 bg-amber-300 border-4 border-slate-900 shadow-[4px_4px_0_0_#0F172A] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"><Play size={24} /> เปิดกล้องเริ่มเกม</motion.button>
            <div className="flex flex-wrap items-center justify-center gap-6 border-t-2 border-slate-200 dark:border-slate-700 pt-6 w-full">
              {onViewAnswers && <button onClick={onViewAnswers} className="text-amber-600 dark:text-amber-400 font-black text-xs sm:text-base flex items-center gap-1 hover:underline">ดูเฉลย Pre-test <Lightbulb size={16} /></button>}
              {onSkip && <button onClick={onSkip} className="text-slate-500 dark:text-slate-400 font-black text-xs sm:text-base flex items-center gap-1 hover:underline">ข้ามไปวิดีโอ <FastForward size={16} /></button>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden select-none" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
      <Webcam ref={webcamRef} mirrored={true} className="absolute inset-0 w-full h-full object-cover opacity-85" videoConstraints={{ facingMode: "user" }} />
      <canvas ref={canvasRef} width={1280} height={720} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.5)] z-20 pointer-events-none"></div>

      <AnimatePresence>
        {status === 'SHOW_TITLE' && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-md">
            <Sparkles size={60} className="text-amber-400 mb-6 animate-pulse" />
            <h2 className="text-xl sm:text-4xl text-indigo-400 font-black mb-4 uppercase tracking-widest">แบบทดสอบบทเรียนเรื่อง</h2>
            <h1 className="text-4xl sm:text-7xl text-white font-black drop-shadow-2xl text-center px-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">
              {experimentName || 'บทเรียนแสนสนุก'}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-4 left-4 z-30 bg-purple-600/90 px-4 py-1.5 rounded-xl border border-purple-400 text-white text-xs sm:text-lg font-black shadow-md">ทีม A (ซ้าย)</div>
      <div className="absolute top-4 right-4 z-30 bg-green-600/90 px-4 py-1.5 rounded-xl border border-green-400 text-white text-xs sm:text-lg font-black shadow-md">ทีม B (ขวา)</div>

      <AnimatePresence>
        {status === 'READY' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }} 
            className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-sm px-6 text-center pointer-events-none"
          >
            <motion.div initial={{ y: -50 }} animate={{ y: 0 }} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-black text-xl sm:text-3xl mb-6 shadow-[0_0_20px_rgba(79,70,229,0.6)]">
               โจทย์ข้อที่ {currentIndex + 1}
            </motion.div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-black leading-tight drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] max-w-4xl mb-12">
              {currentQ.q}
            </h1>
            <motion.div 
              key={readyTime} 
              initial={{ scale: 0.5, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 1.5, opacity: 0 }} 
              className="text-7xl sm:text-[10rem] font-black text-amber-400 drop-shadow-[0_0_40px_rgba(245,158,11,0.8)]"
            >
              {readyTime > 0 ? readyTime : 'GO'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(status === 'PLAYING' || status === 'RESULT') && (
          <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -100, opacity: 0 }} className="absolute inset-x-0 top-16 sm:top-6 flex flex-col items-center z-30 px-4 pointer-events-none">
            <div className="bg-slate-900/95 border border-indigo-500/50 w-full max-w-2xl rounded-2xl py-2 px-4 text-center shadow-2xl">
              <h2 className="text-sm sm:text-xl md:text-2xl font-black text-white leading-tight">ข้อ {currentIndex + 1}: {currentQ.q}</h2>
            </div>
            {status === 'PLAYING' && (
              <div className={`mt-2 px-4 py-0.5 rounded-full font-black text-xs sm:text-lg border ${timeLeft <= 3 ? 'bg-red-600 border-red-400 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]' : 'bg-slate-800 border-slate-500 text-white'}`}>⏱️ {timeLeft} วิ</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {(status === 'READY' || status === 'PLAYING') && (
        <>
          <ChoiceBox choice="A" text={currentQ.choiceA} lockedState={lockedA} color="rose" positioning="top-[25%] left-[2%]" />
          <ChoiceBox choice="B" text={currentQ.choiceB} lockedState={lockedA} color="blue" positioning="top-[25%] left-[26%]" />
          <ChoiceBox choice="C" text={currentQ.choiceC} lockedState={lockedA} color="amber" positioning="bottom-[10%] left-[2%]" />
          <ChoiceBox choice="D" text={currentQ.choiceD} lockedState={lockedA} color="emerald" positioning="bottom-[10%] left-[26%]" />

          <ChoiceBox choice="A" text={currentQ.choiceA} lockedState={lockedB} color="rose" positioning="top-[25%] right-[26%]" />
          <ChoiceBox choice="B" text={currentQ.choiceB} lockedState={lockedB} color="blue" positioning="top-[25%] right-[2%]" />
          <ChoiceBox choice="C" text={currentQ.choiceC} lockedState={lockedB} color="amber" positioning="bottom-[10%] right-[26%]" />
          <ChoiceBox choice="D" text={currentQ.choiceD} lockedState={lockedB} color="emerald" positioning="bottom-[10%] right-[2%]" />
        </>
      )}

      <AnimatePresence>
        {status === 'RESULT' && (
          <div className="absolute inset-0 z-40 flex pointer-events-none">
            <div className={`w-1/2 h-full flex flex-col items-center justify-center ${lockedA === currentQ.ans ? 'bg-emerald-500/50' : 'bg-red-600/50'} backdrop-blur-sm`}>
              <h2 className="text-xl sm:text-4xl font-black text-white drop-shadow-md">{lockedA === currentQ.ans ? 'ถูกต้อง 🎉' : 'ผิดพลาด ❌'}</h2>
            </div>
            <div className={`w-1/2 h-full flex flex-col items-center justify-center ${lockedB === currentQ.ans ? 'bg-emerald-500/50' : 'bg-red-600/50'} backdrop-blur-sm`}>
              <h2 className="text-xl sm:text-4xl font-black text-white drop-shadow-md">{lockedB === currentQ.ans ? 'ถูกต้อง 🎉' : 'ผิดพลาด ❌'}</h2>
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-6 py-4 rounded-2xl font-black text-xs sm:text-xl shadow-2xl text-center w-[85%] max-w-2xl border-4 border-slate-200">
              <div className="text-[10px] text-slate-500 uppercase">เฉลยข้อที่ถูกต้องคือ</div>
              <span className="text-indigo-600 font-black">{currentQ.ans}: {currentQ[`choice${currentQ.ans}`]}</span>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}