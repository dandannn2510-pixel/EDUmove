'use client';
import React from 'react';
import Link from 'next/link';
import { 
  Calculator, PieChart, BarChart3, 
  Shapes, Activity, Star, Target, ChevronRight, PlayCircle, ShieldAlert 
} from 'lucide-react';

export default function Grade4Math() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b1120] dark:text-white relative font-sans selection:bg-fuchsia-200 selection:text-fuchsia-900 dark:selection:bg-fuchsia-500/30 dark:selection:text-white overflow-hidden transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;600;700;800;900&display=swap');` }} />
      
      {/* 💡 Ambient Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-fuchsia-500/5 dark:bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none z-0 transition-colors duration-300"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16" style={{ fontFamily: "'Prompt', sans-serif" }}>
        

        <header className="mb-16 text-center md:text-left">
          <div className="inline-block bg-fuchsia-100 border border-fuchsia-200 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:border-fuchsia-500/30 dark:text-fuchsia-300 font-bold px-4 py-1.5 rounded-full text-sm mb-4 transition-colors duration-300">
            หลักสูตรแกนกลางฯ คณิตศาสตร์
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight drop-shadow-sm dark:drop-shadow-none">
            คณิตศาสตร์ ป.4
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-3xl transition-colors duration-300 font-medium">
            ปูพื้นฐานตัวเลข การคำนวณ เรขาคณิต และทักษะการแก้ปัญหาอย่างเป็นระบบ!
          </p>
        </header>

        {/* ================= ภาคเรียนที่ 1 ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-fuchsia-500 text-white font-bold px-5 py-2 rounded-xl text-lg md:text-xl shadow-sm">ภาคเรียนที่ 1</div>
            <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-fuchsia-500/10 flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-pink-600 bg-pink-50 dark:bg-pink-500/20 dark:text-pink-400 mb-6"><Calculator size={32} /></div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">บทที่ 1: จำนวนนับที่มากกว่า 100,000</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-sm mb-6 flex-grow">การอ่าน การเขียน และการเปรียบเทียบจำนวน</p>
              <Link href="/lessons/p4/math-chapter1" className="w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-fuchsia-500 hover:text-white dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-fuchsia-500 dark:hover:text-white">เข้าสู่เนื้อหา <PlayCircle size={18} /></Link>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-fuchsia-500/10 flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-purple-600 bg-purple-50 dark:bg-purple-500/20 dark:text-purple-400 mb-6"><Activity size={32} /></div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">บทที่ 2: การบวกและการลบ</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-sm mb-6 flex-grow">เทคนิคการคำนวณและการแก้โจทย์ปัญหา</p>
              <Link href="/lessons/p4/math-chapter2" className="w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-purple-600 hover:text-white dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-purple-600 dark:hover:text-white">เข้าสู่เนื้อหา <PlayCircle size={18} /></Link>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-fuchsia-500/10 flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-600 bg-indigo-50 dark:bg-indigo-500/20 dark:text-indigo-400 mb-6"><Shapes size={32} /></div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">บทที่ 3: เรขาคณิต</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-sm mb-6 flex-grow">จุด เส้นตรง รังสี และส่วนของเส้นตรง</p>
              <Link href="/lessons/p4/math-chapter3" className="w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-indigo-600 dark:hover:text-white">เข้าสู่เนื้อหา <PlayCircle size={18} /></Link>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-sm backdrop-blur-md">
            <div className="absolute -right-10 -top-10 text-fuchsia-500/5 pointer-events-none"><Target size={250} strokeWidth={1.5} /></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <Star className="text-fuchsia-500 dark:text-fuchsia-400" fill="currentColor" size={28} />
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">ด่านท้าทายประจำเทอม 1</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium text-base md:text-lg">ทดสอบความแม่นยำด้านการคำนวณและเรขาคณิต!</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
                <Link href="/lessons/p4/math-challenge1/easy" className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-500/20 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-500/30 px-6 py-4 rounded-2xl font-bold flex justify-between items-center transition-all group min-w-[140px]">
                  <span>🟢 ง่าย</span><ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-500" />
                </Link>
                <Link href="/lessons/p4/math-challenge1/medium" className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-500/20 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-200 dark:hover:border-amber-500/30 px-6 py-4 rounded-2xl font-bold flex justify-between items-center transition-all group min-w-[140px]">
                  <span>🟡 กลาง</span><ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 group-hover:text-amber-500" />
                </Link>
                <Link href="/lessons/p4/math-challenge1/hard" className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-500/20 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-500/30 px-6 py-4 rounded-2xl font-bold flex justify-between items-center transition-all group min-w-[140px]">
                  <span>🔴 ยาก</span><ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 group-hover:text-rose-500" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ภาคเรียนที่ 2 ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-purple-600 text-white font-bold px-5 py-2 rounded-xl text-lg md:text-xl shadow-sm">ภาคเรียนที่ 2</div>
            <div className="h-[1px] flex-1 bg-slate-200 dark:bg-slate-800"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-purple-500/10 flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-cyan-600 bg-cyan-50 dark:bg-cyan-500/20 dark:text-cyan-400 mb-6"><BarChart3 size={32} /></div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">บทที่ 4: แผนภูมิแท่งและตาราง</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-sm mb-6 flex-grow">การรวบรวมและการนำเสนอข้อมูล</p>
              <Link href="/lessons/p4/math-chapter4" className="w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-cyan-600 hover:text-white dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-cyan-600 dark:hover:text-white">เข้าสู่เนื้อหา <PlayCircle size={18} /></Link>
            </div>
            
            <div className="bg-white/80 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-purple-500/10 flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-rose-600 bg-rose-50 dark:bg-rose-500/20 dark:text-rose-400 mb-6"><PieChart size={32} /></div>
              <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">บทที่ 5: เศษส่วน</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium text-sm mb-6 flex-grow">ความหมาย การเปรียบเทียบ และบวกลบเศษส่วน</p>
              <Link href="/lessons/p4/math-chapter5" className="w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-slate-100 text-slate-700 hover:bg-rose-600 hover:text-white dark:bg-slate-700/50 dark:text-slate-300 dark:hover:bg-rose-600 dark:hover:text-white">เข้าสู่เนื้อหา <PlayCircle size={18} /></Link>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-sm backdrop-blur-md">
            <div className="absolute -right-10 -top-10 text-purple-500/5 pointer-events-none"><ShieldAlert size={250} strokeWidth={1.5} /></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <Star className="text-purple-600 dark:text-purple-400" fill="currentColor" size={28} />
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">ด่านท้าทายประจำเทอม 2</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium text-base md:text-lg">ทดสอบความรู้เศษส่วนและแผนภูมิข้อมูล!</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
                <Link href="/lessons/p4/math-challenge2/easy" className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-500/20 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-500/30 px-6 py-4 rounded-2xl font-bold flex justify-between items-center transition-all group min-w-[140px]">
                  <span>🟢 ง่าย</span><ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 group-hover:text-emerald-500" />
                </Link>
                <Link href="/lessons/p4/math-challenge2/medium" className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-500/20 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-200 dark:hover:border-amber-500/30 px-6 py-4 rounded-2xl font-bold flex justify-between items-center transition-all group min-w-[140px]">
                  <span>🟡 กลาง</span><ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 group-hover:text-amber-500" />
                </Link>
                <Link href="/lessons/p4/math-challenge2/hard" className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 hover:bg-rose-50 dark:hover:bg-rose-500/20 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-500/30 px-6 py-4 rounded-2xl font-bold flex justify-between items-center transition-all group min-w-[140px]">
                  <span>🔴 ยาก</span><ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 group-hover:text-rose-500" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}