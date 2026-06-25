'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, FlaskConical, Calculator } from 'lucide-react';

export default function GradeSelectPage({ params }: { params: { level: string } }) {
  const gradeLevelStr = params.level === 'p4' ? '4' : params.level === 'p5' ? '5' : '6';

  return (
    <main 
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0b1120] dark:text-white py-16 px-6"
      style={{ fontFamily: "'Prompt', sans-serif" }}
    >
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap');` }} />

      {/* Ambient Background Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none dark:bg-indigo-500/15"></div>

      <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-16 mt-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-indigo-200/60 bg-white/60 text-indigo-700 shadow-sm backdrop-blur-md font-bold text-sm mb-6 dark:border-indigo-500/30 dark:bg-slate-800/80 dark:text-indigo-300">
            <BookOpen size={16} className="text-indigo-500" />
            ระดับชั้นประถมศึกษาปีที่ {gradeLevelStr}
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight drop-shadow-sm dark:drop-shadow-none">
            เลือกวิชาที่ต้องการเรียน
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 font-medium">
            เตรียมพร้อมเข้าสู่บทเรียนและด่านท้าทายสุดมันส์
          </p>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          
          {/* Science Card */}
          <Link href={`/lessons/${params.level}`} className="group relative flex flex-col items-center justify-center p-12 rounded-[3rem] bg-white/70 dark:bg-slate-800/60 border border-white dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-500/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-colors duration-500"></div>
            
            <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30 mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              <FlaskConical size={50} strokeWidth={1.5} />
            </div>
            <h2 className="relative text-3xl font-black text-slate-900 dark:text-white mb-3 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
              วิทยาศาสตร์
            </h2>
            <p className="relative text-slate-500 dark:text-slate-400 font-medium text-center">
              ห้องปฏิบัติการ AI, การทดลอง, และด่านท้าทาย
            </p>
          </Link>

          {/* Math Card - เปลี่ยนจากปุ่ม Coming Soon กลับมาเป็น Link เชื่อมโยงหน้าคณิตศาสตร์จริง */}
          <Link href={`/lessons/${params.level}/math`} className="group relative flex flex-col items-center justify-center p-12 rounded-[3rem] bg-white/70 dark:bg-slate-800/60 border border-white dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-pink-300 dark:hover:border-pink-500/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/0 to-pink-500/0 group-hover:from-fuchsia-500/5 group-hover:to-pink-500/5 transition-colors duration-500"></div>

            <div className="relative w-28 h-28 rounded-3xl flex items-center justify-center bg-gradient-to-br from-fuchsia-400 to-pink-400 text-white shadow-lg shadow-pink-500/30 mb-8 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
              <Calculator size={50} strokeWidth={1.5} />
            </div>
            <h2 className="relative text-3xl font-black text-slate-900 dark:text-white mb-3 transition-colors group-hover:text-pink-600 dark:group-hover:text-pink-400">
              คณิตศาสตร์
            </h2>
            <p className="relative text-slate-500 dark:text-slate-400 font-medium text-center">
              แบบฝึกทักษะการคำนวณ, ตรรกะ, และสมการ
            </p>
          </Link>

        </div>
      </div>
    </main>
  );
}