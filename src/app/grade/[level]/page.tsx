'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { BookOpen, FlaskConical, Calculator } from 'lucide-react';

export default function GradeSelectPage() {
  const params = useParams();
  const level = (params?.level as string) || 'p4';
  const gradeLevelStr = level === 'p4' ? '4' : level === 'p5' ? '5' : '6';

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] py-16 px-6 relative font-sans overflow-x-hidden pb-20">
      
      {/* ลายจุดสมุดโน้ตจางๆ */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:32px_32px] opacity-50 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
        

        {/* ส่วนหัว */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-slate-900 bg-indigo-300 px-6 py-2 text-sm font-bold uppercase tracking-wider text-slate-900 mb-6 shadow-[4px_4px_0_0_#0F172A]">
            <BookOpen size={18} /> ประถมศึกษาปีที่ {gradeLevelStr}
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4">เลือกรายวิชา</h1>
          <p className="text-4xl font-bold text-slate-600 dark:text-slate-400">โปรดเลือกวิชาที่ต้องการเรียนรู้</p>
        </div>

        {/* กล่องเลือกวิชา */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* บล็อกวิทยาศาสตร์ (ปรับเป็นสีฟ้า Cyan) */}
          <Link href={`/lessons/${level}`} 
            className="group flex flex-col items-center justify-center p-10 bg-cyan-400 dark:bg-cyan-500 rounded-[2.5rem] border-4 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000000] transition-all">
            <div className="w-28 h-28 bg-white border-4 border-slate-900 rounded-[2rem] flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform shadow-sm">
              <FlaskConical size={56} className="text-slate-900" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">วิทยาศาสตร์</h2>
          </Link>

          {/* บล็อกคณิตศาสตร์ (ปรับเป็นสีชมพู Pink) */}
          <Link href={`/math-lessons/${level}`} 
            className="group flex flex-col items-center justify-center p-10 bg-pink-400 dark:bg-pink-500 rounded-[2.5rem] border-4 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000000] transition-all">
            <div className="w-28 h-28 bg-white border-4 border-slate-900 rounded-[2rem] flex items-center justify-center mb-6 group-hover:-rotate-6 transition-transform shadow-sm">
              <Calculator size={56} className="text-slate-900" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">คณิตศาสตร์</h2>
          </Link>

        </div>
      </div>
    </main>
  );
}