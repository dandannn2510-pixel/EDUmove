'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, Calculator, FlaskConical, Rocket, Bot, ArrowLeft } from 'lucide-react';

export default function OnetDashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden relative flex flex-col items-center justify-center p-6" style={{ fontFamily: "'Kanit', sans-serif" }}>
      
      {/* 🌌 พื้นหลังอวกาศน่ารักๆ (Cute Space Background) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]" />
        {[...Array(20)].map((_, i) => (
          <motion.div 
            key={i} 
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
          />
        ))}
      </div>

      {/* 🔙 ปุ่มย้อนกลับ */}
      <button 
        onClick={() => router.push('/')} 
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-slate-400 hover:text-white bg-slate-800/50 px-6 py-3 rounded-full border border-slate-700 backdrop-blur-md transition-all font-bold hover:scale-105"
      >
        <ArrowLeft size={20} /> กลับหน้าหลัก
      </button>

      {/* 🤖 ส่วนหัวของหน้าจอ (Header) */}
      <div className="z-10 text-center mb-12 mt-10">
        <motion.div 
          initial={{ y: -50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ type: "spring", bounce: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <Bot size={100} className="text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.6)]" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -top-4 -right-4">
              <Sparkles size={40} className="text-amber-400" />
            </motion.div>
          </div>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">O-NET</span> SPACESHIP
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
          ภารกิจตะลุยโจทย์ระดับชาติ! <br className="md:hidden"/> เลือกวิชาที่ต้องการฝึกฝนเพื่อช่วยน้องบอทซ่อมยานอวกาศกันเถอะ
        </p>
      </div>

      {/* 🚀 การ์ดเลือกวิชา (Subject Cards) */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
        
        {/* 🧮 การ์ดวิชาคณิตศาสตร์ */}
        <motion.button 
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/onet-boss/math')} // 🚀 ชี้ไปที่ onet-boss โฟลเดอร์คณิต
          className="relative group overflow-hidden bg-gradient-to-br from-fuchsia-600 to-purple-800 p-1 rounded-[3rem] shadow-[0_20px_50px_rgba(192,38,211,0.3)] text-left"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="bg-slate-950/40 backdrop-blur-sm p-8 md:p-12 rounded-[2.8rem] h-full flex flex-col items-center text-center border border-white/10 group-hover:border-white/30 transition-all">
            <div className="bg-fuchsia-500/20 p-6 rounded-full mb-6 group-hover:animate-bounce shadow-[0_0_30px_rgba(217,70,239,0.5)]">
              <Calculator size={60} className="text-fuchsia-300" />
            </div>
            <h2 className="text-4xl font-black text-white mb-2">คณิตศาสตร์</h2>
            <p className="text-fuchsia-200 text-lg mb-6">ตะลุยโจทย์คำนวณและตัวเลข</p>
            <div className="mt-auto flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3 rounded-full font-bold group-hover:bg-fuchsia-500 transition-colors w-full">
              เริ่มภารกิจ <Rocket size={20} />
            </div>
          </div>
        </motion.button>

        {/* 🧪 การ์ดวิชาวิทยาศาสตร์ */}
        <motion.button 
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/onet-boss/science')} // 🚀 ชี้ไปที่ onet-boss โฟลเดอร์วิทย์
          className="relative group overflow-hidden bg-gradient-to-br from-cyan-600 to-blue-800 p-1 rounded-[3rem] shadow-[0_20px_50px_rgba(8,145,178,0.3)] text-left"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="bg-slate-950/40 backdrop-blur-sm p-8 md:p-12 rounded-[2.8rem] h-full flex flex-col items-center text-center border border-white/10 group-hover:border-white/30 transition-all">
            <div className="bg-cyan-500/20 p-6 rounded-full mb-6 group-hover:animate-bounce shadow-[0_0_30px_rgba(34,211,238,0.5)]">
              <FlaskConical size={60} className="text-cyan-300" />
            </div>
            <h2 className="text-4xl font-black text-white mb-2">วิทยาศาสตร์</h2>
            <p className="text-cyan-200 text-lg mb-6">ตะลุยโจทย์การทดลองและธรรมชาติ</p>
            <div className="mt-auto flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-3 rounded-full font-bold group-hover:bg-cyan-500 transition-colors w-full">
              เริ่มภารกิจ <Rocket size={20} />
            </div>
          </div>
        </motion.button>

      </div>
    </div>
  );
}