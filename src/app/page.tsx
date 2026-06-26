'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Maximize, X, ArrowRight, Atom, MapPin, Mail, Phone,
  FlaskConical, Calculator
} from 'lucide-react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkIsFullScreen = () => window.innerHeight === window.screen.height;
    const timer = setTimeout(() => {
      if (!checkIsFullScreen()) setShowToast(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const grades = [
    {
      id: 'p4',
      level: 'ประถมศึกษาปีที่ 4',
      title: '',
      scienceTopics: ['สิ่งมีชีวิตรอบตัว', 'แรงและพลังงาน', 'วัสดุและสสาร', 'ระบบสุริยะ', 'ดวงจันทร์'],
      mathTopics: ['จำนวนนับ', 'บวก/ลบ', 'เรขาคณิต', 'แผนภูมิ/ตาราง', 'เศษส่วน'],
      color: 'bg-blue-400',
      text: 'text-blue-600'
    },
    {
      id: 'p5',
      level: 'ประถมศึกษาปีที่ 5',
      title: '',
      scienceTopics: ['สิ่งแวดล้อม', 'แรงและเสียง', 'สสาร', 'ดาราศาสตร์', 'โลกของเรา'],
      mathTopics: ['เศษส่วน', 'ทศนิยม', 'การนำเสนอข้อมูล', 'บัญญัติไตรยางศ์', 'เรขาคณิต', 'ปริมาตร/ความจุ'],
      color: 'bg-emerald-400',
      text: 'text-emerald-600'
    },
    {
      id: 'p6',
      level: 'ประถมศึกษาปีที่ 6',
      title: '',
      scienceTopics: ['ร่างกายของเรา', 'การแยกสารผสม', 'ไฟฟ้า', 'ดาราศาสตร์', 'โลก', 'ภัยธรรมชาติ'],
      mathTopics: ['ห.ร.ม. และ ค.ร.น.', 'เศษส่วนและทศนิยม', 'อัตราส่วนและร้อยละ'],
      color: 'bg-rose-400',
      text: 'text-rose-600'
    },
  ];

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] selection:bg-amber-200 selection:text-amber-900" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>

      {/* ลายจุดสมุดโน้ตจางๆ */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:32px_32px] opacity-50 pointer-events-none"></div>

      {/* Toast แนะนำ F11 */}
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-24 right-6 z-40 w-full max-w-sm">
            <div className="rounded-[1.5rem] border-4 border-slate-900 bg-white p-5 shadow-[6px_6px_0_0_#0F172A] dark:border-slate-600 dark:bg-slate-800 dark:shadow-[6px_6px_0_0_#000000]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 border-2 border-amber-200">
                  <Maximize size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">กด F11 เพื่อเต็มจอ!</h4>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
                    เพื่อประสบการณ์การเรียนรู้ที่ดีที่สุด
                  </p>
                </div>
                <button onClick={() => setShowToast(false)} className="text-slate-400 hover:text-slate-900">
                  <X size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 Hero Section */}
      <section className="relative z-10 mx-auto flex min-h-[85vh] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center">

        {/* โลโก้ */}
        <div className="mb-6">
          <Image
            src="/logo.png"
            alt="EDUmove โลโก้"
            width={160}
            height={160}
            priority
            className="object-contain drop-shadow-xl dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* ชื่อแบรนด์ใหญ่ */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-black mb-6 tracking-tight drop-shadow-sm">
          <span className="text-[#FF6B00] dark:text-[#FF8A33]">EDU</span>
          <span className="text-[#2563EB] dark:text-[#3B82F6]">move</span>
        </h1>

        {/* ป้าย วิทยาศาสตร์ & คณิตศาสตร์ */}
        <div className="inline-block rounded-full border-2 border-slate-900 bg-amber-300 px-8 py-2.5 text-lg font-black uppercase tracking-wider text-slate-900 mb-8 shadow-[4px_4px_0_0_#0F172A] transform -rotate-1 hover:rotate-0 transition-transform cursor-default">
          วิทยาศาสตร์ & คณิตศาสตร์
        </div>

        {/* คำบรรยาย */}
        <p className="max-w-2xl text-lg sm:text-xl font-medium text-slate-600 dark:text-slate-300 mb-10 leading-relaxed">
          เปลี่ยนบรรยากาศในห้องเรียน <br className="hidden sm:block" />
          ไปกับแหล่งการเรียนรู้ วิทยาศาสตร์ & คณิตศาสตร์{' '}
          <span className="font-black whitespace-nowrap">
            <span className="text-[#FF6B00] dark:text-[#FF8A33]">EDU</span>
            <span className="text-[#2563EB] dark:text-[#3B82F6]">move</span>
          </span>
        </p>

        {/* ปุ่ม */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4">
          <button
            onClick={() => document.getElementById('grades')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center justify-center gap-2 rounded-2xl bg-blue-500 px-8 py-4 text-xl font-black text-white border-b-[6px] border-blue-700 active:border-b-0 active:translate-y-[6px] transition-all hover:bg-blue-400"
          >
            เลือกระดับชั้น <ArrowRight strokeWidth={3} />
          </button>
          <Link
            href="/guide"
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-xl font-black text-slate-800 border-2 border-slate-900 border-b-[6px] active:border-b-2 active:translate-y-[4px] transition-all hover:bg-slate-50 dark:bg-slate-800 dark:text-white dark:border-slate-600 dark:hover:bg-slate-700"
          >
            คู่มือการเรียนรู้
          </Link>
        </div>
      </section>

      {/* 📚 เลือกชั้นเรียน */}
      <section id="grades" className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center text-slate-900 dark:text-white mb-16">ระดับชั้น</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {grades.map((grade) => (
              <div key={grade.id} className="group relative flex flex-col rounded-[2.5rem] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000000] transition-all">

                {/* O-NET Badge สำหรับ ป.6 */}
                {grade.id === 'p6' && (
                  <div className="absolute -top-4 -right-4 rounded-full bg-rose-500 px-5 py-2 text-xl font-black tracking-widest text-white border-2 border-slate-900 shadow-[4px_4px_0_0_#0F172A] rotate-12 z-10">
                    O-NET
                  </div>
                )}

                <div className={`w-20 h-20 rounded-[1.5rem] border-4 border-slate-900 dark:border-slate-700 ${grade.color} flex items-center justify-center mb-6`}>
                  <GraduationCap size={40} className="text-slate-900" strokeWidth={2.5} />
                </div>

                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{grade.level}</h3>
                <p className={`font-bold ${grade.text} mb-4`}>{grade.title}</p>

                {/* 🟢 ส่วนที่เกิด Error (เติมโค้ดปิด Tag ให้สมบูรณ์แล้ว) */}
                <div className="space-y-4 mb-8 flex-grow">
                  {/* วิทยาศาสตร์ */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                      <FlaskConical size={16} className="stroke-[2.5]" />
                      <span>วิทยาศาสตร์</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-start">
                      {grade.scienceTopics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/50"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* คณิตศาสตร์ */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                      <Calculator size={16} className="stroke-[2.5]" />
                      <span>คณิตศาสตร์</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 justify-start">
                      {grade.mathTopics.map((topic) => (
                        <span
                          key={topic}
                          className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* 🟢 จบส่วนที่เติมโค้ด */}

                <div className="flex flex-col gap-3 mt-auto">
                  <Link href={`/grade/${grade.id}`} className="w-full bg-slate-100 dark:bg-slate-700 text-center py-4 rounded-2xl font-black text-slate-800 dark:text-white group-hover:bg-slate-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-slate-900 transition-colors active:scale-95 border-2 border-transparent group-hover:border-slate-900 dark:group-hover:border-white">
                    เข้าสู่ห้องเรียน
                  </Link>

                  {grade.id === 'p6' && (
                    <Link href="/lessons/p6/onet" className="w-full bg-white dark:bg-slate-800 text-center py-4 rounded-2xl font-black text-slate-900 dark:text-white transition-all active:scale-95 border-2 border-slate-900 dark:border-slate-600 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000] hover:bg-rose-400 hover:text-slate-900">
                      ตะลุยโจทย์ O-NET
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🦶 Footer */}
      <footer className="relative z-10 bg-slate-900 text-white border-t-4 border-slate-950 py-16 px-6 mt-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

          {/* ส่วนที่ 1: แบรนด์ */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <Atom className="text-blue-400" size={32} />
              <span className="text-3xl font-black tracking-tight text-white">
                <span className="text-orange-500">EDU</span>
                <span className="text-blue-500">move</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              สื่อการเรียนการสอนและนวัตกรรมการศึกษาเพื่ออนาคต เรียนสนุก ได้ความรู้ สำหรับนักเรียนทุกคน
            </p>
          </div>

          {/* ส่วนที่ 2: ผู้จัดทำ */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-slate-200 uppercase tracking-wider pb-2 border-b border-slate-800">ผู้จัดทำ</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-300">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                <span>นางสาวพิชชาภา เจริญสุขรุ่งเรือง</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                <span>นายวิทย์ศรุต จันทร์บ้านโต้น</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                <span>นายอภิสิทธิ์ จันทะเเจ่ม</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                <span>นางสาวอาภาภัทร ชะนะโชติ</span>
              </li>
            </ul>
          </div>

          {/* ส่วนที่ 3: อาจารย์ที่ปรึกษา */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-slate-200 uppercase tracking-wider pb-2 border-b border-slate-800">อาจารย์ที่ปรึกษา</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-300">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>นายพิสิษฐ์ สายตา</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>นางสาวอมรพรรณ ดาทอง</span>
              </li>
            </ul>
          </div>

          {/* ส่วนที่ 4: ติดต่อเรา */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-slate-200 uppercase tracking-wider pb-2 border-b border-slate-800">ติดต่อเรา</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-300">
              <li className="text-amber-400 font-bold text-base leading-snug whitespace-nowrap">
                โรงเรียนวิทยาศาสตร์จุฬาภรณราชวิทยาลัย พิษณุโลก
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-400 shrink-0 mt-1" />
                <span className="leading-relaxed">
                  86 หมู่ 4 ตำบลมะขามสูง อำเภอเมือง<br />
                  จังหวัดพิษณุโลก 65000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400 shrink-0" />
                <a href="mailto:pccpl@pccpl.ac.th" className="hover:text-amber-400 transition-colors">pccpl@pccpl.ac.th</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-400 shrink-0" />
                <a href="tel:055245115" className="hover:text-amber-400 transition-colors">055-245115</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mx-auto mt-12 max-w-7xl border-t border-slate-800 pt-8 text-center text-sm font-semibold text-slate-400">
          &copy; {new Date().getFullYear()} EDUmove Project. All rights reserved.
        </div>
      </footer>
    </main>
  );
}