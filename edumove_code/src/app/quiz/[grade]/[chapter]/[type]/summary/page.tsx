'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Trophy, Home, Lightbulb, ArrowRight } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import { allQuestions } from '@/data/allQuestions';

export default function DynamicSummary() {
  const params = useParams();
  const { leftScore, rightScore, resetGame } = useGameStore();
  const [isMounted, setIsMounted] = useState(false);

  const grade = params.grade as string;
  const chapter = params.chapter as string;
  const type = params.type as string;

  const quizBundle = allQuestions[grade]?.[chapter]?.[type];

  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return null;

  const winner = leftScore > rightScore ? 'Team A' : rightScore > leftScore ? 'Team B' : 'Draw';

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative font-sans overflow-hidden py-12 px-6">
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full mix-blend-screen filter blur-[150px] pointer-events-none z-0 ${
        winner === 'Team A' ? 'bg-purple-600/20' : winner === 'Team B' ? 'bg-emerald-600/20' : 'bg-amber-600/20'
      }`}></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center" style={{ fontFamily: "'Kanit', sans-serif" }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }} className="mb-6">
          <Trophy size={100} className="text-amber-400 drop-shadow-[0_0_50px_rgba(250,204,21,0.6)]" />
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-2 text-center">สรุปผลการแข่งขัน!</h1>
        <p className="text-xl text-slate-400 font-bold mb-12">{quizBundle?.title || 'แบบทดสอบวิทยาศาสตร์'}</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full mb-16">
          <div className={`flex flex-col items-center p-8 rounded-[3rem] border-4 w-full md:w-80 ${winner === 'Team A' ? 'bg-purple-900/40 border-purple-400 shadow-[0_0_40px_rgba(168,85,247,0.3)]' : 'bg-slate-900/60 border-slate-700'}`}>
            <h2 className="text-3xl font-black text-purple-400 mb-2">Team A</h2>
            <p className="text-slate-400 font-medium text-sm mb-4">ทีมฝั่งซ้าย</p>
            <div className="text-6xl font-black text-white">{leftScore}</div>
          </div>
          <div className="text-4xl font-black text-slate-600 italic">VS</div>
          <div className={`flex flex-col items-center p-8 rounded-[3rem] border-4 w-full md:w-80 ${winner === 'Team B' ? 'bg-emerald-900/40 border-emerald-400 shadow-[0_0_40px_rgba(16,185,129,0.3)]' : 'bg-slate-900/60 border-slate-700'}`}>
            <h2 className="text-3xl font-black text-emerald-400 mb-2">Team B</h2>
            <p className="text-slate-400 font-medium text-sm mb-4">ทีมฝั่งขวา</p>
            <div className="text-6xl font-black text-white">{rightScore}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <Link href={`/quiz/${grade}/${chapter}/${type}/answers`} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 rounded-2xl font-black text-xl shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center gap-3 hover:scale-105 transition-all">
            <Lightbulb size={28} fill="currentColor" /> วิเคราะห์คำตอบ (ดูเฉลย)
          </Link>
          <Link href={`/lessons/${grade}/${chapter}`} onClick={resetGame} className="px-8 py-4 bg-slate-800 border-2 border-slate-600 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:scale-105 transition-all">
            <Home size={24} /> กลับสู่หน้าบทเรียน <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </main>
  );
}