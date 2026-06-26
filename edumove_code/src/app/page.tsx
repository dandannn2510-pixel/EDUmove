'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Atom,
  GraduationCap,
  Mail,
  MapPin,
  Maximize,
  PlayCircle,
  X,
  ArrowRight,
  Sparkles,
  Zap,
  Orbit,
  Calculator,
  BookOpen,
  Camera,
  BrainCircuit,
  BarChart3
} from 'lucide-react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkIsFullScreen = () => window.innerHeight === window.screen.height;

    let timer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    if (!checkIsFullScreen()) {
      timer = setTimeout(() => setShowToast(true), 1500);
      hideTimer = setTimeout(() => setShowToast(false), 12000);
    }

    const handleResize = () => {
      if (checkIsFullScreen()) setShowToast(false);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const grades = [
    {
      id: 'p4',
      level: 'ป.4',
      title: 'ประถมศึกษาปีที่ 4',
      desc: 'เริ่มต้นปูพื้นฐานกระบวนการคิด วิชาวิทยาศาสตร์ และคณิตศาสตร์อย่างสนุกสนาน',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'p5',
      level: 'ป.5',
      title: 'ประถมศึกษาปีที่ 5',
      desc: 'ต่อยอดทักษะการคำนวณและการทดลองทางวิทยาศาสตร์แบบลงมือทำ',
      color: 'from-indigo-500 to-purple-400'
    },
    {
      id: 'p6',
      level: 'ป.6',
      title: 'ประถมศึกษาปีที่ 6',
      desc: 'เจาะลึกเนื้อหาเข้มข้น เตรียมความพร้อมและทบทวนความรู้สู่ระดับมัธยมศึกษา',
      color: 'from-fuchsia-500 to-pink-400'
    },
  ];

  const scrollToGrades = () => {
    document.getElementById('grades-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isMounted) return null;

  return (
    <main className="relative min-h-screen overflow-x-hidden selection:bg-indigo-200 selection:text-indigo-900 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-100" style={{ fontFamily: "'Prompt', sans-serif" }}>
      
      {/* 💡 ฟอนต์ Prompt */}
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap');` }} />

      {/* พื้นหลังตาราง (Grid Background) แบบคลีนๆ */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="fixed top-24 right-6 z-40 w-full max-w-sm rounded-3xl border border-white/40 bg-white/80 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/90"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md">
                <Maximize size={22} />
              </div>
              <div className="flex-1 pt-1">
                <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">ประสบการณ์ที่ดีที่สุด!</h4>
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  กด <kbd className="mx-1 rounded-md border border-slate-200 bg-white px-2 py-0.5 font-mono text-xs font-bold text-slate-700 shadow-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200">F11</kbd> เพื่อเต็มจอ กล้องจะจับท่าทางได้เป๊ะขึ้น!
                </p>
              </div>
              <button onClick={() => setShowToast(false)} className="shrink-0 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200">
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col items-center justify-center px-4 pt-16 pb-8 text-center sm:px-6 lg:px-8">
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="absolute top-[20%] left-[10%] text-indigo-400/20 dark:text-indigo-500/30 hidden md:block"><Atom size={48} strokeWidth={1.5} /></motion.div>
          <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute top-[25%] right-[15%] text-blue-400/20 dark:text-blue-500/30 hidden md:block"><Orbit size={64} strokeWidth={1} /></motion.div>
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} className="absolute bottom-[25%] left-[15%] text-amber-400/20 dark:text-amber-500/30 hidden md:block"><Zap size={40} strokeWidth={1.5} /></motion.div>
          <motion.div animate={{ y: [0, 15, 0], rotate: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }} className="absolute bottom-[20%] right-[15%] text-pink-400/20 dark:text-pink-500/30 hidden md:block"><Calculator size={48} strokeWidth={1.5} /></motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full relative z-10 flex flex-col items-center"
        >
          {/* โลโก้ตัวละคร */}
          <motion.div 
            animate={{ y: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="relative mb-8 h-48 w-48 sm:h-56 sm:w-56 lg:h-[16rem] lg:w-[16rem]"
          >
            <img src="/logo.png" alt="EDUmove character" className="relative z-10 h-full w-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]" />
          </motion.div>

          <div className="max-w-4xl mx-auto flex flex-col items-center">
            
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/60 px-5 py-2 text-sm font-semibold tracking-wide text-indigo-700 shadow-sm backdrop-blur-md dark:border-indigo-500/30 dark:bg-slate-800/80 dark:text-indigo-300">
              <Sparkles size={16} className="text-indigo-500 dark:text-indigo-400" /> แพลตฟอร์มการเรียนรู้วิทยาศาสตร์และคณิตศาสตร์
            </span>

            <h1 className="mb-6 flex flex-col items-center justify-center tracking-tight">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                เรียนสนุก ลุกนั่งสบาย ไปกับ
              </span>
              <span className="text-6xl sm:text-7xl md:text-[6.5rem] font-black pb-2 drop-shadow-sm dark:drop-shadow-none">
                <span className="text-orange-500">EDU</span><span className="text-blue-500">move</span>
              </span>
            </h1>

            <p className="mb-10 max-w-2xl text-base sm:text-lg font-normal leading-relaxed text-slate-600 dark:text-slate-400 px-4">
              เปลี่ยนห้องเรียนธรรมดา ให้เป็นเกมโชว์สุดล้ำ! ท้าทายความรู้ด้วยระบบตอบคำถามและ <strong className="font-semibold text-slate-800 dark:text-slate-200">กล้องตรวจจับท่าทาง AI อัจฉริยะ</strong>
            </p>

            {/* ปุ่มกด */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row w-full sm:w-auto px-6 mb-12">
              <button onClick={scrollToGrades} className="group relative flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-3.5 text-base sm:text-lg font-semibold text-white shadow-xl shadow-indigo-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-600/40 dark:from-indigo-500 dark:to-blue-500">
                <span className="relative z-10 flex items-center gap-2">
                  เริ่มต้นการเรียนรู้
                  <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </button>

              <Link href="/guide" className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-full border border-slate-300 bg-white/80 backdrop-blur-md px-8 py-3.5 text-base sm:text-lg font-semibold text-slate-700 transition-all duration-300 hover:border-indigo-300 hover:bg-slate-50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:border-indigo-500/50 dark:hover:bg-slate-700 dark:hover:text-white shadow-sm">
                <BookOpen size={20} className="text-slate-400 transition-colors group-hover:text-indigo-500 dark:text-slate-500 dark:group-hover:text-indigo-400" />
                วิธีเล่นเกมทั้งหมด
              </Link>
            </div>

            {/* Feature Strip เติมความเต็มให้หน้าจอ ไม่ให้โล่ง */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl border-t border-slate-200/60 dark:border-slate-800/60 pt-8 mt-auto">
              <div className="flex items-center justify-center gap-3 text-slate-600 dark:text-slate-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"><Camera size={20} /></div>
                <span className="text-sm font-medium">AI ตรวจจับแม่นยำ</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-slate-600 dark:text-slate-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"><BrainCircuit size={20} /></div>
                <span className="text-sm font-medium">4 โหมดการเรียนรู้</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-slate-600 dark:text-slate-400">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"><BarChart3 size={20} /></div>
                <span className="text-sm font-medium">สรุปผล Real-time</span>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* ===================== GRADES SECTION ===================== */}
      <section id="grades-section" className="relative mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-center px-6 py-12 lg:px-8 border-t border-slate-100 dark:border-slate-800/50">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            เลือกระดับชั้นเรียน
          </h2>
          <p className="mt-4 text-lg font-normal text-slate-500 dark:text-slate-400">
            เข้าสู่บทเรียน แบบทดสอบ และด่านท้าทายตามระดับชั้นของคุณ
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {grades.map((grade) => (
            <motion.article
              whileHover={{ y: -8 }}
              key={grade.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/60 bg-white/60 p-8 shadow-md backdrop-blur-xl transition-all duration-300 hover:border-indigo-100 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-800/40 dark:hover:border-indigo-500/30"
            >
              {grade.id === 'p6' && (
                <div className="absolute -top-1 -right-1 rounded-bl-[1.5rem] rounded-tr-[2rem] bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                  O-NET Ready
                </div>
              )}

              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${grade.color} text-white shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <GraduationCap size={28} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {grade.level}
              </h3>
              <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                {grade.title}
              </p>
              <p className="mt-4 flex-grow text-sm font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                {grade.desc}
              </p>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href={`/grade/${grade.id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-900 hover:text-white dark:bg-slate-700 dark:text-white dark:hover:bg-white dark:hover:text-slate-900"
                >
                  เข้าสู่บทเรียน
                  <PlayCircle size={18} className="transition-transform group-hover:scale-110" />
                </Link>

                {grade.id === 'p6' && (
                  <Link
                    href="/lessons/p6/onet"
                    className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-transparent py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-900 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:border-white dark:hover:bg-slate-800"
                  >
                    ตะลุยโจทย์ O-NET
                  </Link>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-white py-16 dark:bg-[#0f172a] border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-3 lg:px-8">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Atom className="text-indigo-600 dark:text-indigo-400" size={28} />
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-orange-500">EDU</span><span className="text-blue-600 dark:text-blue-400">move</span>
              </span>
            </div>
            <p className="text-sm font-normal leading-relaxed text-slate-500 dark:text-slate-400">
              นวัตกรรมการศึกษาเพื่ออนาคต ออกแบบให้ใช้งานง่าย เรียนสนุก ได้ความรู้ สำหรับนักเรียนทุกคน
            </p>
          </div>
          <div>
            <h4 className="mb-6 text-base font-bold text-slate-900 dark:text-white">ข้อมูลโครงการ</h4>
            <ul className="space-y-4 text-sm font-normal text-slate-500 dark:text-slate-400">
              <li><Link href="/guide" className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">คู่มือการใช้งานสำหรับนักเรียนและครู</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-6 text-base font-bold text-slate-900 dark:text-white">ติดต่อเรา</h4>
            <ul className="space-y-4 text-sm font-normal text-slate-500 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-slate-400" />
                หมวดวิชาวิทยาศาสตร์และคณิตศาสตร์ ห้อง 401
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-slate-400" />
                support@EDUmove.school.ac.th
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}