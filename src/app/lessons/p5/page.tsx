'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Globe, Volume2, Beaker, Orbit, Mountain, Wind, Star, ChevronRight, PlayCircle, Zap } from 'lucide-react';

export default function Grade5Science() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] relative font-sans overflow-x-hidden pb-20">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;700;800;900&display=swap');` }} />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:32px_32px] opacity-50 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16" style={{ fontFamily: "'Prompt', sans-serif" }}>
        

        <header className="mb-16 text-center md:text-left">
          <div className="inline-block rounded-full border-2 border-slate-900 bg-emerald-300 px-6 py-2 text-sm font-bold uppercase tracking-wider text-slate-900 mb-6 shadow-[4px_4px_0_0_#0F172A]">หลักสูตรวิทยาศาสตร์</div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">วิทยาศาสตร์ ป.5</h1>
        </header>

        {/* ================= ภาคเรียนที่ 1 ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-6 mb-10">
            <div className="bg-blue-600 text-white font-black px-6 py-3 rounded-2xl text-2xl border-4 border-slate-900 shadow-[6px_6px_0_0_#0F172A]">ภาคเรียนที่ 1</div>
            <div className="h-2 flex-1 bg-slate-900 dark:bg-slate-700 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="group flex flex-col rounded-[2.5rem] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000] transition-all">
              <div className="w-20 h-20 rounded-[1.5rem] border-4 border-slate-900 bg-green-500 flex items-center justify-center mb-6"><Globe size={40} className="text-slate-900" strokeWidth={2.5} /></div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">สิ่งแวดล้อม</h3>
              <p className="font-bold text-slate-600 dark:text-slate-400 mb-8 flex-grow">โซ่อาหารและการปรับตัวของสิ่งมีชีวิต</p>
              <Link href="/lessons/p5/chapter1" className="w-full bg-slate-100 dark:bg-slate-700 text-center py-4 rounded-2xl font-black text-slate-800 dark:text-white group-hover:bg-green-500 group-hover:text-white border-4 border-transparent group-hover:border-slate-900 transition-colors active:scale-95 flex justify-center items-center gap-2">เข้าสู่เนื้อหา <PlayCircle size={20}/></Link>
            </div>
            <div className="group flex flex-col rounded-[2.5rem] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000] transition-all">
              <div className="w-20 h-20 rounded-[1.5rem] border-4 border-slate-900 bg-red-500 flex items-center justify-center mb-6"><Volume2 size={40} className="text-slate-900" strokeWidth={2.5} /></div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">แรงและเสียง</h3>
              <p className="font-bold text-slate-600 dark:text-slate-400 mb-8 flex-grow">แรงเสียดทานและการเกิดเสียง</p>
              <Link href="/lessons/p5/chapter2" className="w-full bg-slate-100 dark:bg-slate-700 text-center py-4 rounded-2xl font-black text-slate-800 dark:text-white group-hover:bg-red-500 group-hover:text-white border-4 border-transparent group-hover:border-slate-900 transition-colors active:scale-95 flex justify-center items-center gap-2">เข้าสู่เนื้อหา <PlayCircle size={20}/></Link>
            </div>
            <div className="group flex flex-col rounded-[2.5rem] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000] transition-all">
              <div className="w-20 h-20 rounded-[1.5rem] border-4 border-slate-900 bg-pink-400 flex items-center justify-center mb-6"><Beaker size={40} className="text-slate-900" strokeWidth={2.5} /></div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">สสาร</h3>
              <p className="font-bold text-slate-600 dark:text-slate-400 mb-8 flex-grow">การเปลี่ยนแปลงสถานะและการละลาย</p>
              <Link href="/lessons/p5/chapter3" className="w-full bg-slate-100 dark:bg-slate-700 text-center py-4 rounded-2xl font-black text-slate-800 dark:text-white group-hover:bg-pink-400 group-hover:text-white border-4 border-transparent group-hover:border-slate-900 transition-colors active:scale-95 flex justify-center items-center gap-2">เข้าสู่เนื้อหา <PlayCircle size={20}/></Link>
            </div>
          </div>

          <div className="bg-blue-400 rounded-[2.5rem] p-8 md:p-12 border-4 border-slate-900 shadow-[8px_8px_0_0_#0F172A]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <Star size={48} className="text-slate-900 fill-slate-900" />
                  <h3 className="text-4xl font-black text-slate-900">ด่านท้าทายเทอม 1</h3>
                </div>
                <p className="text-xl font-bold text-slate-900 opacity-80">ทดสอบความรู้และตอบคำถามวิทยาศาสตร์</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <Link href="/lessons/p5/challenge1/easy" className="bg-white text-emerald-600 px-6 py-4 rounded-2xl font-black text-xl border-4 border-slate-900 border-b-[8px] active:border-b-4 active:translate-y-[4px] hover:bg-slate-50 transition-all flex justify-between items-center gap-4 min-w-[150px]"><span>🟢 ง่าย</span><ChevronRight strokeWidth={3} /></Link>
                <Link href="/lessons/p5/challenge1/medium" className="bg-white text-amber-500 px-6 py-4 rounded-2xl font-black text-xl border-4 border-slate-900 border-b-[8px] active:border-b-4 active:translate-y-[4px] hover:bg-slate-50 transition-all flex justify-between items-center gap-4 min-w-[150px]"><span>🟡 กลาง</span><ChevronRight strokeWidth={3} /></Link>
                <Link href="/lessons/p5/challenge1/hard" className="bg-white text-rose-500 px-6 py-4 rounded-2xl font-black text-xl border-4 border-slate-900 border-b-[8px] active:border-b-4 active:translate-y-[4px] hover:bg-slate-50 transition-all flex justify-between items-center gap-4 min-w-[150px]"><span>🔴 ยาก</span><ChevronRight strokeWidth={3} /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ภาคเรียนที่ 2 ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-6 mb-10">
            <div className="bg-orange-500 text-white font-black px-6 py-3 rounded-2xl text-2xl border-4 border-slate-900 shadow-[6px_6px_0_0_#0F172A]">ภาคเรียนที่ 2</div>
            <div className="h-2 flex-1 bg-slate-900 dark:bg-slate-700 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="group flex flex-col rounded-[2.5rem] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000] transition-all">
              <div className="w-20 h-20 rounded-[1.5rem] border-4 border-slate-900 bg-purple-400 flex items-center justify-center mb-6"><Orbit size={40} className="text-slate-900" strokeWidth={2.5} /></div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">ดาราศาสตร์</h3>
              <p className="font-bold text-slate-600 dark:text-slate-400 mb-8 flex-grow">ดาวฤกษ์ ดาวเคราะห์ และปรากฏการณ์บนท้องฟ้า</p>
              <Link href="/lessons/p5/chapter4" className="w-full bg-slate-100 dark:bg-slate-700 text-center py-4 rounded-2xl font-black text-slate-800 dark:text-white group-hover:bg-purple-400 group-hover:text-white border-4 border-transparent group-hover:border-slate-900 transition-colors active:scale-95 flex justify-center items-center gap-2">เข้าสู่เนื้อหา <PlayCircle size={20}/></Link>
            </div>
            <div className="group flex flex-col rounded-[2.5rem] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000] transition-all">
              <div className="w-20 h-20 rounded-[1.5rem] border-4 border-slate-900 bg-purple-400 flex items-center justify-center mb-6"><Mountain size={40} className="text-slate-900" strokeWidth={2.5} /></div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">โลกของเรา</h3>
              <p className="font-bold text-slate-600 dark:text-slate-400 mb-8 flex-grow">วัฏจักรน้ำ และปรากฏการณ์ลมฟ้าอากาศ</p>
              <Link href="/lessons/p5/chapter5" className="w-full bg-slate-100 dark:bg-slate-700 text-center py-4 rounded-2xl font-black text-slate-800 dark:text-white group-hover:bg-purple-400 group-hover:text-white border-4 border-transparent group-hover:border-slate-900 transition-colors active:scale-95 flex justify-center items-center gap-2">เข้าสู่เนื้อหา <PlayCircle size={20}/></Link>
            </div>
            <div className="group flex flex-col rounded-[2.5rem] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000] transition-all">
              <div className="w-20 h-20 rounded-[1.5rem] border-4 border-slate-900 bg-green-500 flex items-center justify-center mb-6"><Wind size={40} className="text-slate-900" strokeWidth={2.5} /></div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">สิ่งแวดล้อม</h3>
              <p className="font-bold text-slate-600 dark:text-slate-400 mb-8 flex-grow">มลพิษ PM2.5 และก๊าซเรือนกระจก</p>
              <Link href="/lessons/p5/chapter6" className="w-full bg-slate-100 dark:bg-slate-700 text-center py-4 rounded-2xl font-black text-slate-800 dark:text-white group-hover:bg-green-500 group-hover:text-white border-4 border-transparent group-hover:border-slate-900 transition-colors active:scale-95 flex justify-center items-center gap-2">เข้าสู่เนื้อหา <PlayCircle size={20}/></Link>
            </div>
          </div>

          <div className="bg-orange-400 rounded-[2.5rem] p-8 md:p-12 border-4 border-slate-900 shadow-[8px_8px_0_0_#0F172A]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <Star size={48} className="text-slate-900 fill-slate-900" />
                  <h3 className="text-4xl font-black text-slate-900">ด่านท้าทายเทอม 2</h3>
                </div>
                <p className="text-xl font-bold text-slate-900 opacity-80">ทดสอบความรู้และตอบคำถามวิทยาศาสตร์</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <Link href="/lessons/p5/challenge2/easy" className="bg-white text-emerald-600 px-6 py-4 rounded-2xl font-black text-xl border-4 border-slate-900 border-b-[8px] active:border-b-4 active:translate-y-[4px] hover:bg-slate-50 transition-all flex justify-between items-center gap-4 min-w-[150px]"><span>🟢 ง่าย</span><ChevronRight strokeWidth={3} /></Link>
                <Link href="/lessons/p5/challenge2/medium" className="bg-white text-amber-500 px-6 py-4 rounded-2xl font-black text-xl border-4 border-slate-900 border-b-[8px] active:border-b-4 active:translate-y-[4px] hover:bg-slate-50 transition-all flex justify-between items-center gap-4 min-w-[150px]"><span>🟡 กลาง</span><ChevronRight strokeWidth={3} /></Link>
                <Link href="/lessons/p5/challenge2/hard" className="bg-white text-rose-500 px-6 py-4 rounded-2xl font-black text-xl border-4 border-slate-900 border-b-[8px] active:border-b-4 active:translate-y-[4px] hover:bg-slate-50 transition-all flex justify-between items-center gap-4 min-w-[150px]"><span>🔴 ยาก</span><ChevronRight strokeWidth={3} /></Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}