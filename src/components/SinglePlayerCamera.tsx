'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { FaceLandmarker } from '@mediapipe/tasks-vision';
import { getFaceLandmarker } from '@/utils/mediapipe';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { CheckCircle2, XCircle, FileText, Home, RotateCcw, Trophy, Lightbulb, FastForward } from 'lucide-react';
import { gameMusic } from '@/utils/gameMusic';
import ConfettiCelebration from './ConfettiCelebration';

export interface SingleQuestionData {
  q: string;
  leftChoice: string;
  rightChoice: string;
  ans: 'LEFT' | 'RIGHT';
  explanation?: string;
}

interface Props {
  questions: SingleQuestionData[];
  onExit: (score?: number) => void;
  onViewAnswers?: () => void;
  experimentName?: string;
}

export default function SinglePlayerCamera({ questions, onExit, onViewAnswers, experimentName }: Props) {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);

  const [status, setStatus] = useState<'SHOW_TITLE' | 'READY' | 'PLAYING' | 'RESULT' | 'SUMMARY'>('SHOW_TITLE');
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [readyTime, setReadyTime] = useState(3);
  
  const [lockedChoice, setLockedChoice] = useState<'LEFT' | 'RIGHT' | 'TIMEOUT' | null>(null);
  const holdFramesRef = useRef({ LEFT: 0, RIGHT: 0 });
  const isProcessingRef = useRef(false);

  // Use ref to always have the latest qData in callbacks without stale closure
  const qDataRef = useRef(questions[currentQ] || questions[0]);
  qDataRef.current = questions[currentQ] || questions[0];
  const qData = qDataRef.current;

  const headX = useMotionValue(0);
  const headY = useMotionValue(0);
  
  const smoothX = useSpring(headX, { stiffness: 800, damping: 25, mass: 0.5 });
  const smoothY = useSpring(headY, { stiffness: 800, damping: 25, mass: 0.5 });

  // ─── Load shared FaceLandmarker ──────────────────────────────────────────
  useEffect(() => {
    getFaceLandmarker(1)
      .then(setFaceLandmarker)
      .catch((err) => console.error('Failed to load FaceLandmarker:', err));
  }, []);

  // ─── handleAnswer uses useCallback + ref to avoid stale closure ──────────
  const handleAnswer = useCallback((selected: 'LEFT' | 'RIGHT' | 'TIMEOUT') => {
    setStatus('RESULT');
    const isCorrect = selected === qDataRef.current.ans;
    if (isCorrect) {
      setScore(prev => prev + 1);
      gameMusic.playCorrectSound();
    } else if (selected !== 'TIMEOUT') {
      gameMusic.playIncorrectSound();
    }

    setTimeout(() => {
      setCurrentQ(prev => {
        const nextQ = prev + 1;
        if (nextQ < questions.length) {
          setStatus('READY');
          setReadyTime(3);
          return nextQ;
        } else {
          setStatus('SUMMARY');
          return prev;
        }
      });
    }, 2500);
  }, [questions.length]);

  useEffect(() => {
    if (status === 'PLAYING') {
      gameMusic.start();
    } else {
      gameMusic.stop();
    }

    if (status === 'SUMMARY') {
      const percentage = Math.round((score / questions.length) * 100);
      if (percentage >= 50) {
        gameMusic.playStageClearSound();
      } else {
        gameMusic.playStageFailSound();
      }
    }

    return () => {
      gameMusic.stop();
    };
  }, [status, score, questions.length]);

  const skipQuestion = useCallback(() => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;
    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(prev => prev + 1);
        setStatus('READY');
        setReadyTime(3);
      } else {
        setStatus('SUMMARY');
      }
      isProcessingRef.current = false;
      setLockedChoice(null);
    }, 100);
  }, [currentQ, questions.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'SHOW_TITLE') {
      timer = setTimeout(() => { setStatus('READY'); setReadyTime(3); }, 3000);
    } 
    else if (status === 'READY') {
      if (readyTime > 0) {
        gameMusic.playCountdownTickSound(false);
        timer = setTimeout(() => setReadyTime(prev => prev - 1), 1000);
      } else {
        gameMusic.playCountdownTickSound(true);
        setStatus('PLAYING'); setLockedChoice(null);
        isProcessingRef.current = false; holdFramesRef.current = { LEFT: 0, RIGHT: 0 };
      }
    } 
    return () => clearTimeout(timer);
  }, [status, readyTime, handleAnswer]);

  useEffect(() => {
    if (status !== 'PLAYING' || !faceLandmarker) return;
    let animationFrameId: number;
    const HOLD_THRESHOLD = 20;

    const drawProgress = (ctx: CanvasRenderingContext2D, x: number, y: number, progress: number, color: string) => {
      ctx.beginPath();
      ctx.arc(x, y, 35, -Math.PI/2, (-Math.PI/2) + (2 * Math.PI * Math.min(1, progress)));
      ctx.strokeStyle = color; ctx.lineWidth = 10;
      ctx.lineCap = 'round'; ctx.stroke();
    };

    const triggerAnswer = (zone: 'LEFT' | 'RIGHT') => {
      isProcessingRef.current = true;
      setLockedChoice(zone); handleAnswer(zone);
    };

    const detect = () => {
      if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState === 4 && !isProcessingRef.current && faceLandmarker) {
        const video = webcamRef.current.video;
        const result = faceLandmarker.detectForVideo(video, performance.now());
        const canvas = canvasRef.current;
        
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'; 
            ctx.lineWidth = 4; 
            ctx.setLineDash([10, 15]);
            ctx.beginPath(); ctx.moveTo(canvas.width * 0.35, 0); ctx.lineTo(canvas.width * 0.35, canvas.height); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(canvas.width * 0.65, 0); ctx.lineTo(canvas.width * 0.65, canvas.height); ctx.stroke();
            ctx.setLineDash([]);

            if (result.faceLandmarks && result.faceLandmarks.length > 0) {
              const nose = result.faceLandmarks[0][1]; // Nose tip landmark
              const xRatio = 1 - nose.x; const yRatio = nose.y;
              const x = xRatio * canvas.width;
              const y = yRatio * canvas.height;

              headX.set((xRatio - 0.5) * 600); 
              headY.set((yRatio - 0.5) * 400);

              let detectedZone: 'LEFT' | 'RIGHT' | null = null;
              if (xRatio < 0.42) detectedZone = 'LEFT';
              else if (xRatio > 0.58) detectedZone = 'RIGHT';

              ctx.fillStyle = detectedZone ? '#fbbf24' : '#fff';
              ctx.beginPath(); ctx.arc(x, y, 10, 0, 2 * Math.PI); ctx.fill();

              if (detectedZone === 'LEFT') {
                holdFramesRef.current.LEFT++;
                holdFramesRef.current.RIGHT = 0;
                drawProgress(ctx, x, y, holdFramesRef.current.LEFT / HOLD_THRESHOLD, '#22d3ee'); 
                if (holdFramesRef.current.LEFT >= HOLD_THRESHOLD) triggerAnswer('LEFT');
              } else if (detectedZone === 'RIGHT') {
                holdFramesRef.current.RIGHT++;
                holdFramesRef.current.LEFT = 0;
                drawProgress(ctx, x, y, holdFramesRef.current.RIGHT / HOLD_THRESHOLD, '#fb7185'); 
                if (holdFramesRef.current.RIGHT >= HOLD_THRESHOLD) triggerAnswer('RIGHT');
              } else {
                holdFramesRef.current.LEFT = 0;
                holdFramesRef.current.RIGHT = 0;
                ctx.beginPath(); ctx.arc(x, y, 35, 0, 2 * Math.PI);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'; ctx.lineWidth = 4;
                ctx.stroke();
              }
            } else {
              headX.set(0);
              headY.set(0);
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(detect);
    };

    detect();
    return () => cancelAnimationFrame(animationFrameId);
  }, [faceLandmarker, status, headX, headY, handleAnswer]);

  const restartGame = () => {
    setCurrentQ(0); setScore(0); setStatus('SHOW_TITLE');
  };

  if (status === 'SUMMARY') {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "เกณฑ์การประเมิน: ควรทบทวนเนื้อหาเพิ่มเติม";
    let color = "text-rose-600 dark:text-rose-400";
    let accentBg = "bg-rose-400";
    
    if (percentage >= 80) { 
      message = "เกณฑ์การประเมิน: ระดับดีเยี่ยม (Excellent)"; color = "text-amber-600 dark:text-amber-400"; accentBg = "bg-amber-300"; 
    }
    else if (percentage >= 50) { 
      message = "เกณฑ์การประเมิน: ผ่านเกณฑ์ (Pass)"; color = "text-cyan-600 dark:text-cyan-400"; accentBg = "bg-cyan-300"; 
    }

    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A] relative overflow-hidden" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:32px_32px] opacity-50 pointer-events-none"></div>
        {percentage >= 50 && <ConfettiCelebration />}

        <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-10 md:p-14 rounded-[2.5rem] shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] max-w-2xl w-full text-center relative z-10">
          <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 4 }}>
            <Trophy size={100} className="mx-auto text-amber-500 mb-6" />
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-wide">รายงานผลการประเมิน</h1>
          <p className={`text-xl font-black mb-8 ${color}`}>{message}</p>
          
          <div className={`${accentBg} rounded-[2rem] p-8 border-4 border-slate-900 shadow-[4px_4px_0_0_#0F172A] mb-8 transform -rotate-1`}>
            <p className="text-slate-900 text-lg mb-1 font-black uppercase tracking-widest">คะแนนที่ทำได้</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-7xl md:text-8xl font-black text-slate-900">{score}</span>
              <span className="text-3xl font-black text-slate-800">/ {questions.length}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={restartGame} className="flex-1 px-8 py-4 rounded-2xl font-black text-xl text-slate-900 bg-amber-300 hover:bg-amber-400 border-4 border-slate-900 shadow-[4px_4px_0_0_#0F172A] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2">
              <RotateCcw size={24} /> ทำแบบทดสอบอีกครั้ง
            </button>
            <button onClick={() => onExit && onExit(score)} className="flex-1 px-8 py-4 rounded-2xl font-black text-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border-4 border-slate-900 flex items-center justify-center gap-2 transition-all">
              <Home size={24} /> กลับสู่หน้าหลัก
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center overflow-hidden select-none" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
      <Webcam ref={webcamRef} mirrored={true} className="absolute inset-0 w-full h-full object-cover opacity-80" videoConstraints={{ facingMode: "user" }} />
      <canvas ref={canvasRef} width={1280} height={720} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      <AnimatePresence>
        {status === 'SHOW_TITLE' && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.2 }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-xl">
            <Trophy size={90} className="text-amber-400 mb-6 drop-shadow-lg" />
            <h2 className="text-3xl sm:text-5xl text-cyan-400 font-black mb-4 tracking-widest drop-shadow-lg text-balance text-center">คำถามท้าทาย</h2>
            <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-black text-center px-4 leading-tight drop-shadow-2xl text-balance">
              {experimentName || 'การประเมินผลรายบุคคล'}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === 'READY' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md pointer-events-none">
            <div className="bg-indigo-600 text-white px-8 py-3 rounded-full font-black text-3xl mb-6 shadow-xl border-4 border-indigo-400">
              ข้อสอบที่ {currentQ + 1}
            </div>
            <motion.div key={readyTime} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }} className="text-[10rem] font-black text-amber-400 drop-shadow-[0_10px_40px_rgba(245,158,11,0.8)]">
              {readyTime > 0 ? readyTime : 'เริ่ม'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(status === 'PLAYING' || status === 'RESULT') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 pointer-events-none flex flex-col">
            
            <div className="w-full p-4 md:p-6 flex justify-between items-start relative z-40">
              <div className="bg-indigo-600/90 backdrop-blur-xl text-white px-6 py-2.5 rounded-full font-black text-lg md:text-xl shadow-lg border-2 border-indigo-400 flex items-center gap-2">
                <FileText size={20} fill="currentColor"/> ข้อที่ {currentQ + 1} / {questions.length}
              </div>
              {status === 'PLAYING' && (
                <button 
                  onClick={skipQuestion} 
                  className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-2.5 rounded-full font-black text-lg shadow-lg border-2 border-white flex items-center gap-2 pointer-events-auto transition-colors"
                >
                  ข้ามข้อ <FastForward size={20} />
                </button>
              )}
            </div>

            <motion.div 
              style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-150%' }} 
              className="absolute top-1/2 left-1/2 bg-white/95 backdrop-blur-xl border-4 border-amber-400 shadow-[0_20px_50px_rgba(250,204,21,0.5)] px-8 py-6 md:px-12 md:py-8 rounded-[2rem] md:rounded-[3rem] w-max max-w-[95vw] md:max-w-4xl text-center z-50 flex items-center justify-center pointer-events-none"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-indigo-900 leading-snug drop-shadow-sm text-balance">
                {qData.q}
              </h2>
            </motion.div>

            <div className="absolute inset-x-0 bottom-[5%] md:bottom-[8%] flex justify-between items-stretch px-2 sm:px-6 md:px-12 w-full">
              <div className={`w-[45%] max-w-[450px] bg-gradient-to-br from-cyan-500/90 to-blue-600/90 backdrop-blur-xl border-4 rounded-[2rem] p-5 md:p-8 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] md:min-h-[220px] ${lockedChoice === 'LEFT' ? 'border-white scale-110 shadow-[0_0_60px_rgba(6,182,212,0.8)] z-10' : 'border-white/50 shadow-2xl'} ${(lockedChoice && lockedChoice !== 'LEFT') ? 'opacity-45 scale-95 grayscale' : ''}`}>
                <span className="text-cyan-100 font-bold mb-3 md:mb-4 text-xs sm:text-sm bg-black/20 px-4 py-1.5 rounded-full uppercase tracking-wider shrink-0">เอียงศีรษะไปทางซ้าย</span>
                <span className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-md text-balance">{qData.leftChoice}</span>
              </div>
              <div className={`w-[45%] max-w-[450px] bg-gradient-to-br from-pink-500/90 to-rose-600/90 backdrop-blur-xl border-4 rounded-[2rem] p-5 md:p-8 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[160px] md:min-h-[220px] ${lockedChoice === 'RIGHT' ? 'border-white scale-110 shadow-[0_0_60px_rgba(244,63,94,0.8)] z-10' : 'border-white/50 shadow-2xl'} ${(lockedChoice && lockedChoice !== 'RIGHT') ? 'opacity-45 scale-95 grayscale' : ''}`}>
                <span className="text-pink-100 font-bold mb-3 md:mb-4 text-xs sm:text-sm bg-black/20 px-4 py-1.5 rounded-full uppercase tracking-wider shrink-0">เอียงศีรษะไปทางขวา</span>
                <span className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-md text-balance">{qData.rightChoice}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === 'RESULT' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center z-50 bg-slate-950/60 backdrop-blur-md pointer-events-none">
            {lockedChoice === qData.ans ? (
              <motion.div initial={{ scale: 0, rotate: -5 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", bounce: 0.6 }} className="bg-gradient-to-br from-emerald-400 to-green-600 border-8 border-white text-white px-10 py-10 md:px-16 md:py-12 rounded-[3rem] shadow-[0_0_100px_rgba(16,185,129,0.8)] flex flex-col items-center text-center">
                <CheckCircle2 size={100} className="text-white drop-shadow-md mb-4" />
                <h1 className="text-4xl md:text-6xl font-black drop-shadow-lg text-balance">คำตอบถูกต้อง</h1>
              </motion.div>
            ) : (
              <motion.div initial={{ scale: 0, rotate: 5 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", bounce: 0.6 }} className="bg-gradient-to-br from-rose-500 to-red-600 border-8 border-white text-white px-10 py-10 md:px-16 md:py-12 rounded-[3rem] shadow-[0_0_100px_rgba(244,63,94,0.8)] flex flex-col items-center text-center">
                <XCircle size={100} className="text-white drop-shadow-md mb-4" />
                <h1 className="text-4xl md:text-6xl font-black drop-shadow-lg text-balance">คำตอบไม่ถูกต้อง</h1>
                {lockedChoice === 'TIMEOUT' && <span className="text-xl md:text-2xl mt-4 font-bold bg-black/20 px-6 py-2 rounded-full text-balance">หมดเวลาทำแบบทดสอบ</span>}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {status !== 'SHOW_TITLE' && (
        <div className="absolute bottom-6 left-6 z-[100] flex flex-wrap items-center gap-3">
          <button 
            onClick={() => onExit()}
            className="bg-white/20 backdrop-blur-md hover:bg-rose-500 text-white px-5 py-2.5 rounded-full font-bold shadow-lg transition-colors border-2 border-white/50 flex items-center gap-2"
          >
            <XCircle size={20} /> ออกจากแบบทดสอบ
          </button>
          {onViewAnswers && (
            <button 
              onClick={onViewAnswers}
              className="bg-white/20 backdrop-blur-md hover:bg-amber-500 text-white px-5 py-2.5 rounded-full font-bold shadow-lg transition-colors border-2 border-white/50 flex items-center gap-2"
            >
              <Lightbulb size={20} /> ดูเฉลย
            </button>
          )}
        </div>
      )}
    </div>
  );
}