'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, FlaskConical, Zap, Orbit, Wind, 
  Target, Flame, Star, Mountain, Activity, ChevronRight, PlayCircle, ShieldAlert 
} from 'lucide-react';

export default function Grade6Science() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e1b4b] text-white relative font-sans selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;600;800;900&display=swap');` }} />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12" style={{ fontFamily: "'Kanit', sans-serif" }}>
        
        {/* 🚀 แก้ลิงก์ตรงนี้ให้กลับไปหน้าเลือกวิชาของ ป.6 */}
        <Link href="/grade/p6" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors mb-10 font-bold bg-slate-800/50 px-6 py-3 rounded-full border border-slate-700 backdrop-blur-md shadow-lg hover:scale-105">
          <ArrowLeft size={20} /> กลับไปหน้าเลือกวิชา
        </Link>

        <header className="mb-16 text-center md:text-left">
          <div className="inline-block bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-black px-4 py-1.5 rounded-full text-sm mb-4">
            หลักสูตรแกนกลางฯ วิทยาศาสตร์และเทคโนโลยี
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-4 drop-shadow-lg">
            วิทยาศาสตร์ ป.6
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl">
            เลือกบทเรียนตามตัวชี้วัดเพื่อเข้าสู่ห้องปฏิบัติการเสมือนจริง และทดสอบฝีมือในด่านท้าทายประจำเทอม!
          </p>
        </header>

        {/* ================= ภาคเรียนที่ 1 ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-cyan-500 text-slate-950 font-black px-5 py-2 rounded-xl text-2xl shadow-[0_0_20px_rgba(6,182,212,0.4)]">ภาคเรียนที่ 1</div>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] group flex flex-col h-full">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg mb-6 border-2 border-slate-600">
                <Activity size={40} />
              </div>
              <h3 className="text-2xl font-black mb-2 text-white">บทที่ 1: ร่างกายของเรา</h3>
              <p className="text-slate-400 font-medium mb-6 flex-grow">สารอาหาร ระบบย่อยอาหาร และการเจริญเติบโต</p>
              <Link href="/lessons/p6/chapter1" className="w-full py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-blue-500/20 text-blue-400 border border-blue-500/50 hover:bg-blue-500 hover:text-white shadow-lg">
                เข้าสู่เนื้อหา <PlayCircle size={20} />
              </Link>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] group flex flex-col h-full">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg mb-6 border-2 border-slate-600">
                <FlaskConical size={40} />
              </div>
              <h3 className="text-2xl font-black mb-2 text-white">บทที่ 2: การแยกสารผสม</h3>
              <p className="text-slate-400 font-medium mb-6 flex-grow">การกรอง การตกตะกอน และการแยกสารในชีวิตประจำวัน</p>
              <Link href="/lessons/p6/chapter2" className="w-full py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500 hover:text-slate-950 shadow-lg">
                เข้าสู่เนื้อหา <PlayCircle size={20} />
              </Link>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] group flex flex-col h-full">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-slate-900 bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg mb-6 border-2 border-slate-600">
                <Zap size={40} />
              </div>
              <h3 className="text-2xl font-black mb-2 text-white">บทที่ 3: ไฟฟ้า</h3>
              <p className="text-slate-400 font-medium mb-6 flex-grow">วงจรไฟฟ้าอย่างง่าย การต่ออนุกรมและขนาน</p>
              <Link href="/lessons/p6/chapter3" className="w-full py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-amber-500/20 text-amber-400 border border-amber-500/50 hover:bg-amber-500 hover:text-slate-950 shadow-lg">
                เข้าสู่เนื้อหา <PlayCircle size={20} />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-cyan-900/40 border-2 border-cyan-500/50 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-xl">
            <div className="absolute -right-10 -top-10 text-cyan-500/10 pointer-events-none"><Target size={250} strokeWidth={1} /></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <Star className="text-cyan-400 animate-pulse" fill="currentColor" size={32} />
                  <h3 className="text-3xl font-black text-white">ด่านท้าทายประจำเทอม 1</h3>
                </div>
                <p className="text-cyan-200/80 font-medium text-lg">ทดสอบความรวบยอดทั้งหมดของเทอม 1 เลือกระดับความยากที่คุณต้องการ!</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <Link href="/lessons/p6/challenge1/easy" className="bg-emerald-500/20 border-2 border-emerald-500/50 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-lg min-w-[140px]">
                  <span>🟢 ง่าย</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
                <Link href="/lessons/p6/challenge1/medium" className="bg-amber-500/20 border-2 border-amber-500/50 hover:bg-amber-500 hover:text-slate-950 text-amber-400 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-lg min-w-[140px]">
                  <span>🟡 กลาง</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
                <Link href="/lessons/p6/challenge1/hard" className="bg-rose-500/20 border-2 border-rose-500/50 hover:bg-rose-500 hover:text-slate-950 text-rose-400 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-lg min-w-[140px]">
                  <span>🔴 ยาก</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ภาคเรียนที่ 2 ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-orange-500 text-white font-black px-5 py-2 rounded-xl text-2xl shadow-[0_0_20px_rgba(249,115,22,0.4)]">ภาคเรียนที่ 2</div>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-orange-500/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] group flex flex-col h-full">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg mb-6 border-2 border-slate-600">
                <Orbit size={40} />
              </div>
              <h3 className="text-2xl font-black mb-2 text-white">บทที่ 4: ดาราศาสตร์</h3>
              <p className="text-slate-400 font-medium mb-6 flex-grow">อุปราคา และเทคโนโลยีอวกาศ</p>
              <Link href="/lessons/p6/chapter4" className="w-full py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-purple-500/20 text-purple-400 border border-purple-500/50 hover:bg-purple-500 hover:text-white shadow-lg">
                เข้าสู่เนื้อหา <PlayCircle size={20} />
              </Link>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] group flex flex-col h-full">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg mb-6 border-2 border-slate-600">
                <Mountain size={40} />
              </div>
              <h3 className="text-2xl font-black mb-2 text-white">บทที่ 5: โลกของเรา</h3>
              <p className="text-slate-400 font-medium mb-6 flex-grow">วัฏจักรหิน และการเกิดซากดึกดำบรรพ์</p>
              <Link href="/lessons/p6/chapter5" className="w-full py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/50 hover:bg-orange-500 hover:text-white shadow-lg">
                เข้าสู่เนื้อหา <PlayCircle size={20} />
              </Link>
            </div>

            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)] group flex flex-col h-full">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br from-rose-400 to-pink-600 shadow-lg mb-6 border-2 border-slate-600">
                <Wind size={40} />
              </div>
              <h3 className="text-2xl font-black mb-2 text-white">บทที่ 6: ภัยธรรมชาติ</h3>
              <p className="text-slate-400 font-medium mb-6 flex-grow">ลมมรสุม ปรากฏการณ์เรือนกระจก และภัยพิบัติ</p>
              <Link href="/lessons/p6/chapter6" className="w-full py-3 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-rose-500/20 text-rose-400 border border-rose-500/50 hover:bg-rose-500 hover:text-white shadow-lg">
                เข้าสู่เนื้อหา <PlayCircle size={20} />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-orange-900/40 border-2 border-orange-500/50 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-xl">
            <div className="absolute -right-10 -top-10 text-orange-500/10 pointer-events-none"><ShieldAlert size={250} strokeWidth={1} /></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <Flame className="text-orange-400 animate-pulse" fill="currentColor" size={32} />
                  <h3 className="text-3xl font-black text-white">ด่านท้าทายประจำเทอม 2</h3>
                </div>
                <p className="text-orange-200/80 font-medium text-lg">เอาตัวรอดจากสถานการณ์ภัยพิบัติและอวกาศ พิสูจน์ความรู้ด้วยตัวคุณเอง!</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <Link href="/lessons/p6/challenge2/easy" className="bg-emerald-500/20 border-2 border-emerald-500/50 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-lg min-w-[140px]">
                  <span>🟢 ง่าย</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
                <Link href="/lessons/p6/challenge2/medium" className="bg-amber-500/20 border-2 border-amber-500/50 hover:bg-amber-500 hover:text-slate-950 text-amber-400 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-lg min-w-[140px]">
                  <span>🟡 กลาง</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
                <Link href="/lessons/p6/challenge2/hard" className="bg-rose-500/20 border-2 border-rose-500/50 hover:bg-rose-500 hover:text-slate-950 text-rose-400 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-lg min-w-[140px]">
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