import React from 'react';
import Link from 'next/link';
import { Calculator, FlaskConical, Rocket, Bot } from 'lucide-react';

export default function OnetDashboardPage() {

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] py-16 px-6 relative font-sans overflow-x-hidden pb-20">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;700;800;900&display=swap');` }} />

      {/* ลายจุดสมุดโน้ตจางๆ */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:32px_32px] opacity-50 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10" style={{ fontFamily: "'Prompt', sans-serif" }}>


        {/* ส่วนหัว O-NET */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6 w-24 h-24 bg-cyan-300 border-4 border-slate-900 rounded-[2rem] shadow-[6px_6px_0_0_#0F172A]">
            <Bot size={56} className="text-slate-900" strokeWidth={2.5} />
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">
            O-NET SPACESHIP
          </h1>
          <p className="text-xl font-bold text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            ภารกิจตะลุยโจทย์ระดับชาติ! เลือกวิชาที่ต้องการฝึกฝนเพื่อช่วยน้องบอทซ่อมยานอวกาศกันเถอะ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">

          {/* การ์ดวิชาคณิตศาสตร์ (สีชมพู/แดง) */}
          <Link href="/onet-boss/math"
            className="group flex flex-col items-center justify-center p-10 bg-rose-400 dark:bg-rose-500 rounded-[3rem] border-4 border-slate-900 dark:border-slate-800 border-b-[12px] active:border-b-4 active:translate-y-[8px] transition-all hover:bg-rose-300 dark:hover:bg-rose-400">
            <div className="w-28 h-28 bg-white border-4 border-slate-900 rounded-[2rem] flex items-center justify-center mb-6 group-hover:-rotate-6 transition-transform shadow-sm">
              <Calculator size={56} className="text-slate-900" strokeWidth={2.5} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">คณิตศาสตร์</h2>
            <p className="text-slate-900 font-bold text-lg text-center opacity-80 mt-2 bg-white/40 px-6 py-2 rounded-full">ตะลุยโจทย์คำนวณและตัวเลข</p>

            <div className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 group-hover:scale-105 transition-transform border-2 border-slate-900 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000]">
              เริ่มภารกิจ <Rocket size={20} />
            </div>
          </Link>

          {/* การ์ดวิชาวิทยาศาสตร์ (สีฟ้า/เขียว) */}
          <Link href="/onet-boss/science"
            className="group flex flex-col items-center justify-center p-10 bg-cyan-400 dark:bg-cyan-500 rounded-[3rem] border-4 border-slate-900 dark:border-slate-800 border-b-[12px] active:border-b-4 active:translate-y-[8px] transition-all hover:bg-cyan-300 dark:hover:bg-cyan-400">
            <div className="w-28 h-28 bg-white border-4 border-slate-900 rounded-[2rem] flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform shadow-sm">
              <FlaskConical size={56} className="text-slate-900" strokeWidth={2.5} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">วิทยาศาสตร์</h2>
            <p className="text-slate-900 font-bold text-lg text-center opacity-80 mt-2 bg-white/40 px-6 py-2 rounded-full">ตะลุยโจทย์การทดลองและธรรมชาติ</p>

            <div className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 group-hover:scale-105 transition-transform border-2 border-slate-900 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000]">
              เริ่มภารกิจ <Rocket size={20} />
            </div>
          </Link>

        </div>
      </div>
    </main>
  );
}