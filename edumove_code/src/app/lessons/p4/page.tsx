'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Leaf, Sun, Layers, Globe, Moon, Star, 
  Target, ChevronRight, PlayCircle, ShieldAlert 
} from 'lucide-react';

export default function Grade4Science() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0f172a] dark:text-white relative font-sans selection:bg-pink-200 selection:text-pink-900 dark:selection:bg-pink-500 dark:selection:text-white overflow-x-hidden transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;600;800;900&display=swap');` }} />
      {/* Background Glow */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-pink-400/20 dark:bg-pink-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] pointer-events-none z-0 transition-colors duration-300"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12" style={{ fontFamily: "'Kanit', sans-serif" }}>
        
        {/* ปุ่มกลับ */}
        <Link href="/grade/p4" className="inline-flex items-center gap-2 text-slate-600 hover:text-pink-600 dark:text-slate-400 dark:hover:text-pink-400 transition-colors mb-10 font-bold bg-white dark:bg-slate-800/50 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 backdrop-blur-md shadow-sm hover:shadow-md hover:scale-105">
          <ArrowLeft size={20} /> กลับไปหน้าเลือกวิชา
        </Link>

        <header className="mb-16 text-center md:text-left">
          <div className="inline-block bg-pink-100 border border-pink-200 text-pink-700 dark:bg-pink-500/20 dark:border-pink-500/50 dark:text-pink-400 font-black px-4 py-1.5 rounded-full text-sm mb-4 transition-colors duration-300">
            หลักสูตรแกนกลางฯ วิทยาศาสตร์และเทคโนโลยี
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-600 dark:from-pink-400 dark:to-rose-500 mb-4 drop-shadow-sm dark:drop-shadow-lg">
            วิทยาศาสตร์ ป.4
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-xl max-w-3xl transition-colors duration-300">
            เริ่มต้นการผจญภัยในโลกวิทยาศาสตร์ สำรวจสิ่งมีชีวิต ระบบสุริยะ และแรงโน้มถ่วงไปพร้อมๆ กัน!
          </p>
        </header>

        {/* ================= ภาคเรียนที่ 1 ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-pink-500 text-white font-black px-5 py-2 rounded-xl text-2xl shadow-[0_0_20px_rgba(236,72,153,0.3)]">ภาคเรียนที่ 1</div>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-pink-500/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* บทที่ 1 */}
            <div className="bg-white dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)] dark:hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] group flex flex-col h-full">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg mb-6 border-2 border-white dark:border-slate-700">
                <Leaf size={40} />
              </div>
              <h3 className="text-2xl font-black mb-2 text-slate-900 dark:text-white transition-colors">บทที่ 1: สิ่งมีชีวิตรอบตัว</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-6 flex-grow transition-colors">จำแนกสิ่งมีชีวิตออกเป็นกลุ่มพืช สัตว์ และที่ไม่ใช่พืชสัตว์</p>
              <Link href="/lessons/p4/chapter1" className="w-full py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-500 hover:text-white dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/50 dark:hover:bg-emerald-500 dark:hover:text-slate-900 shadow-sm">
                เข้าสู่เนื้อหา <PlayCircle size={20} />
              </Link>
            </div>

            {/* บทที่ 2 */}
            <div className="bg-white dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)] dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] group flex flex-col h-full">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white dark:text-slate-900 bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg mb-6 border-2 border-white dark:border-slate-700">
                <Sun size={40} />
              </div>
              <h3 className="text-2xl font-black mb-2 text-slate-900 dark:text-white transition-colors">บทที่ 2: แรงโน้มถ่วงและแสง</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-6 flex-grow transition-colors">เรียนรู้เรื่องแรงดึงดูดของโลก น้ำหนัก และการเดินทางของแสง</p>
              <Link href="/lessons/p4/chapter2" className="w-full py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-500 hover:text-white dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/50 dark:hover:bg-amber-500 dark:hover:text-slate-900 shadow-sm">
                เข้าสู่เนื้อหา <PlayCircle size={20} />
              </Link>
            </div>

            {/* บทที่ 3 */}
            <div className="bg-white dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-[0_10px_30px_rgba(249,115,22,0.15)] dark:hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] group flex flex-col h-full">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-orange-400 to-red-500 shadow-lg mb-6 border-2 border-white dark:border-slate-700">
                <Layers size={40} />
              </div>
              <h3 className="text-2xl font-black mb-2 text-slate-900 dark:text-white transition-colors">บทที่ 3: วัสดุและสสาร</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-6 flex-grow transition-colors">ศึกษาความแข็ง สภาพยืดหยุ่น และสถานะของสสาร</p>
              <Link href="/lessons/p4/chapter3" className="w-full py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-500 hover:text-white dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/50 dark:hover:bg-orange-500 dark:hover:text-white shadow-sm">
                เข้าสู่เนื้อหา <PlayCircle size={20} />
              </Link>
            </div>
          </div>

          {/* ด่านท้าทาย 1 */}
          <div className="bg-gradient-to-r from-white to-pink-50 dark:from-slate-900 dark:to-pink-900/40 border border-slate-200 dark:border-pink-500/50 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-md dark:shadow-xl transition-colors duration-300">
            <div className="absolute -right-10 -top-10 text-pink-500/10 pointer-events-none"><Target size={250} strokeWidth={1} /></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <Star className="text-pink-500 dark:text-white animate-pulse" fill="currentColor" size={32} />
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">ด่านท้าทายประจำเทอม 1</h3>
                </div>
                <p className="text-slate-600 dark:text-pink-200/80 font-medium text-lg">รวบรวมพลังสมอง แก้โจทย์ปัญหาสิ่งมีชีวิตและแรงโน้มถ่วง!</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <Link href="/lessons/p4/challenge1/easy" className="bg-white dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-slate-950 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-sm min-w-[140px]">
                  <span>🟢 ง่าย</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
                <Link href="/lessons/p4/challenge1/medium" className="bg-white dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/50 hover:bg-amber-50 dark:hover:bg-amber-500 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-slate-950 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-sm min-w-[140px]">
                  <span>🟡 กลาง</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
                <Link href="/lessons/p4/challenge1/hard" className="bg-white dark:bg-rose-500/20 border border-rose-200 dark:border-rose-500/50 hover:bg-rose-50 dark:hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-slate-950 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-sm min-w-[140px]">
                  <span>🔴 ยาก</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ภาคเรียนที่ 2 ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-600 dark:bg-blue-500 text-white font-black px-5 py-2 rounded-xl text-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)]">ภาคเรียนที่ 2</div>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* บทที่ 4 */}
            <div className="bg-white dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] group flex flex-col h-full">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg mb-6 border-2 border-white dark:border-slate-700">
                <Globe size={40} />
              </div>
              <h3 className="text-2xl font-black mb-2 text-slate-900 dark:text-white transition-colors">บทที่ 4: ระบบสุริยะ</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-6 flex-grow transition-colors">องค์ประกอบของระบบสุริยะ และดาวเคราะห์ทั้ง 8 ดวง</p>
              <Link href="/lessons/p4/chapter4" className="w-full py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-600 hover:text-white dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/50 dark:hover:bg-blue-500 dark:hover:text-white shadow-sm">
                เข้าสู่เนื้อหา <PlayCircle size={20} />
              </Link>
            </div>

            {/* บทที่ 5 */}
            <div className="bg-white dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] group flex flex-col h-full">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-purple-400 to-fuchsia-500 shadow-lg mb-6 border-2 border-white dark:border-slate-700">
                <Moon size={40} />
              </div>
              <h3 className="text-2xl font-black mb-2 text-slate-900 dark:text-white transition-colors">บทที่ 5: ดวงจันทร์ของเรา</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium mb-6 flex-grow transition-colors">สำรวจการโคจรของดวงจันทร์ และการเกิดข้างขึ้นข้างแรม</p>
              <Link href="/lessons/p4/chapter5" className="w-full py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-purple-50 text-purple-600 border border-purple-200 hover:bg-purple-600 hover:text-white dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/50 dark:hover:bg-purple-500 dark:hover:text-white shadow-sm">
                เข้าสู่เนื้อหา <PlayCircle size={20} />
              </Link>
            </div>
          </div>

          {/* ด่านท้าทาย 2 */}
          <div className="bg-gradient-to-r from-white to-blue-50 dark:from-slate-900 dark:to-blue-900/40 border border-slate-200 dark:border-blue-500/50 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-md dark:shadow-xl transition-colors duration-300">
            <div className="absolute -right-10 -top-10 text-blue-500/10 pointer-events-none"><ShieldAlert size={250} strokeWidth={1} /></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <Star className="text-blue-600 dark:text-blue-400 animate-pulse" fill="currentColor" size={32} />
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white">ด่านท้าทายประจำเทอม 2</h3>
                </div>
                <p className="text-slate-600 dark:text-blue-200/80 font-medium text-lg">ทดสอบความรู้อวกาศ ท้าทายความสามารถระดับสูง!</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <Link href="/lessons/p4/challenge2/easy" className="bg-white dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/50 hover:bg-emerald-50 dark:hover:bg-emerald-500 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-slate-950 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-sm min-w-[140px]">
                  <span>🟢 ง่าย</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
                <Link href="/lessons/p4/challenge2/medium" className="bg-white dark:bg-amber-500/20 border border-amber-200 dark:border-amber-500/50 hover:bg-amber-50 dark:hover:bg-amber-500 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-slate-950 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-sm min-w-[140px]">
                  <span>🟡 กลาง</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
                <Link href="/lessons/p4/challenge2/hard" className="bg-white dark:bg-rose-500/20 border border-rose-200 dark:border-rose-500/50 hover:bg-rose-50 dark:hover:bg-rose-500 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-slate-950 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-sm min-w-[140px]">
                  <span>🔴 ยาก</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}