'use client';

import React from 'react';
import {
  Camera, Hand, AlertCircle,
  CheckCircle2, Gamepad2, Activity,
  Smile, Award, MonitorPlay, Zap,
  Trophy, Lightbulb, Target, LayoutGrid, BookOpen
} from 'lucide-react';

export default function GuidePage() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main
      className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 relative overflow-x-hidden pb-20 selection:bg-amber-200 selection:text-amber-900"
      style={{ fontFamily: "var(--font-prompt), sans-serif" }}
    >
      {/* โหลดฟอนต์ Prompt เพื่อความคลีนและโมเดิร์น */}

      {/* ลายจุดสมุดโน้ตจางๆ */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:32px_32px] opacity-50 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Hero Section */}
        <header className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-300 border-2 border-slate-900 text-slate-900 font-black text-sm mb-6 shadow-[4px_4px_0_0_#0F172A]">
            <BookOpen size={16} /> คู่มือผู้ใช้งานฉบับสมบูรณ์ (Official Guide)
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            รู้จักกับ <span className="text-orange-500">EDU</span><span className="text-blue-500">move</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-4xl">
            คู่มือการเรียนรู้และควบคุมระบบ AI ตรวจจับท่าทาง (Gesture Control) พร้อมเจาะลึกกติกาและกลไกของเกมทุกประเภท เพื่อให้(นักเรียนทุกๆคน)พร้อมไปกับ EDUmove
          </p>
        </header>

        {/* สารบัญ (Table of Contents) */}
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 mb-16 border-4 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] hidden md:block">
          <div className="flex items-center gap-3 mb-6 text-slate-900 dark:text-white font-black text-lg">
            <LayoutGrid size={22} className="text-indigo-500" /> ทางลัดไปยังหัวข้อต่างๆ
          </div>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => scrollToSection('learning-path')} className="px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-xl text-sm font-bold border-2 border-slate-900 dark:border-slate-600 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000000] active:translate-y-1 active:shadow-none transition-all">1. ขั้นตอนการเรียนรู้</button>
            <button onClick={() => scrollToSection('setup')} className="px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-xl text-sm font-bold border-2 border-slate-900 dark:border-slate-600 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000000] active:translate-y-1 active:shadow-none transition-all">2. การตั้งกล้อง AI</button>
            <button onClick={() => scrollToSection('pretest')} className="px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-xl text-sm font-bold border-2 border-slate-900 dark:border-slate-600 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000000] active:translate-y-1 active:shadow-none transition-all">3. โหมด Pre-test (ใช้มือเลือก)</button>
            <button onClick={() => scrollToSection('posttest')} className="px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 rounded-xl text-sm font-bold border-2 border-slate-900 dark:border-slate-600 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000000] active:translate-y-1 active:shadow-none transition-all">4. โหมด Post-test (ชักเย่อ)</button>
            <button onClick={() => scrollToSection('challenge')} className="px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 rounded-xl text-sm font-bold border-2 border-slate-900 dark:border-slate-600 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000000] active:translate-y-1 active:shadow-none transition-all">5. โหมด Challenge (ใช้มือ)</button>
            <button onClick={() => scrollToSection('onet')} className="px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-fuchsia-50 dark:hover:bg-slate-700 rounded-xl text-sm font-bold border-2 border-slate-900 dark:border-slate-600 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000000] active:translate-y-1 active:shadow-none transition-all">6. โหมด O-NET</button>
            <button onClick={() => scrollToSection('faq')} className="px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-slate-700 rounded-xl text-sm font-bold border-2 border-slate-900 dark:border-slate-600 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000000] active:translate-y-1 active:shadow-none transition-all">7. การแก้ปัญหา</button>
          </div>
        </div>

        <div className="space-y-16">

          {/* ===================== ขั้นตอนการเรียนรู้ ===================== */}
          <section id="learning-path" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-300 border-4 border-slate-900 flex items-center justify-center shrink-0 shadow-[4px_4px_0_0_#0F172A]">
                <BookOpen size={28} className="text-slate-900" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">1. ขั้นตอนการเรียนรู้สุดล้ำ</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium text-lg">
              ระบบถูกออกแบบมาเพื่อสร้างสรรค์ความรู้ ความสนุก เข้าใจง่าย และวัดผลได้จริง ครอบคลุมกระบวนการเรียนรู้ตั้งแต่ต้นจนจบ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-4 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000]">
                <div className="w-12 h-12 bg-blue-400 border-2 border-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-[2px_2px_0_0_#0F172A]">
                  <Gamepad2 size={24} className="text-slate-900" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">1. ประเมินก่อนเรียน</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  ทำแบบทดสอบเพื่อวัดความรู้พื้นฐานผ่านเกมตอบคำถามสุดล้ำ และการสร้างเกมแบบทีมเพื่อกระตุ้นความสนใจ
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-4 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000]">
                <div className="w-12 h-12 bg-emerald-400 border-2 border-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-[2px_2px_0_0_#0F172A]">
                  <MonitorPlay size={24} className="text-slate-900" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">2. เรียนรู้แบบ Interactive</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  ทบทวนเนื้อหาผ่านสื่อการสอนที่ออกแบบให้อ่านและทำความเข้าใจได้ง่าย มีเกมตอบคำถามแทรกระหว่างเรียน
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-4 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000]">
                <div className="w-12 h-12 bg-amber-400 border-2 border-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-[2px_2px_0_0_#0F172A]">
                  <Trophy size={24} className="text-slate-900" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">3. ประเมินและสรุปผล</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  ทำแบบทดสอบหลังเรียน ดูพัฒนาการ และรับคำแนะนำสรุปจุดแข็งและจุดที่ต้องพัฒนาของนักเรียนเป็นรายบุคคล
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Setup */}
          <section id="setup" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-amber-300 border-4 border-slate-900 flex items-center justify-center shrink-0 shadow-[4px_4px_0_0_#0F172A]">
                <Camera size={28} className="text-slate-900" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">2. การเตรียมความพร้อมของกล้อง AI</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-4 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000]">
                <div className="w-12 h-12 bg-amber-400 border-2 border-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-[2px_2px_0_0_#0F172A]">
                  <Lightbulb size={24} className="text-slate-900" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">แสงสว่าง (Lighting)</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-4">
                  แสงสว่างที่เพียงพอจะทำให้ AI ทำงานได้เต็มประสิทธิภาพ 100%
                </p>
                <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-300 font-medium">
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-emerald-500 shrink-0" size={18} /> <span><strong>ต้องทำ:</strong> หันหน้าเข้าหาแหล่งกำเนิดแสง (เช่น หน้าต่าง หรือ โคมไฟ)</span></li>
                  <li className="flex items-start gap-2"><AlertCircle className="text-rose-500 shrink-0" size={18} /> <span><strong>ห้ามทำ:</strong> </span></li>
                </ul>นั่งย้อนแสง (มีแสงสว่างจ้าอยู่ด้านหลัง) เพราะจะทำให้หน้าและมือได้รับแสงสว่างไม่เพียงพอและทำให้ AI มองไม่สามารถตวจจับได้
              </div>

              <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border-4 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000]">
                <div className="w-12 h-12 bg-blue-400 border-2 border-slate-900 rounded-xl flex items-center justify-center mb-6 shadow-[2px_2px_0_0_#0F172A]">
                  <Target size={24} className="text-slate-900" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">ระยะห่าง (Distance & Angle)</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-4">
                  การกำหนดระยะให้พอดีช่วยให้เคลื่อนไหวร่างกายได้อย่างเป็นอิสระ
                </p>
                <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-300 font-medium">
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-emerald-500 shrink-0" size={18} /> <span>ถอยห่างจากหน้ากล้องประมาณ <strong>1 ถึง 2 เมตร</strong></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-emerald-500 shrink-0" size={18} /> <span>ปรับมุมกล้องให้มองเห็นตั้งแต่ <strong>หน้าอก จนถึง เหนือศีรษะ</strong></span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-emerald-500 shrink-0" size={18} /> <span>เคลียร์พื้นที่รอบตัวให้โล่ง ไม่มีคนเดินผ่านไปมาด้านหลัง</span></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Pre-test */}
          <section id="pretest" className="scroll-mt-32">
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border-4 border-slate-900 dark:border-slate-700 p-8 md:p-12 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] relative overflow-hidden">
              <div className="absolute -right-10 -top-10 text-blue-500/10 pointer-events-none"><Hand size={300} /></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-blue-400 border-2 border-slate-900 text-slate-900 font-black px-4 py-1.5 rounded-full text-sm shadow-[2px_2px_0_0_#0F172A]">GAME MODE 01</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">3. โหมด Pre-test <span className="text-blue-500">(ใช้ฝ่ามือควบคุม)</span></h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl font-medium">โหมดประเมินความรู้ก่อนเรียน ที่เปลี่ยนฝ่ามือของคุณให้กลายเป็นเมาส์อัจฉริยะ (Air Mouse) ขยับมือกลางอากาศเพื่อเลือกคำตอบได้อย่างอิสระ</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="font-black text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Zap className="text-amber-500" /> วิธีการเล่น (How to play)</h4>
                    <div className="space-y-4 text-slate-700 dark:text-slate-300 font-medium">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center font-bold shrink-0 shadow-[2px_2px_0_0_#0F172A] dark:shadow-none text-slate-900 dark:text-white">1</div>
                        <p><strong>ยกมือขึ้น:</strong> ชูฝ่ามือขึ้นมาด้านหน้ากล้อง ระบบจะสร้างจุด Cursor เล็กๆ ติดตามมือของคุณบนหน้าจอ</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center font-bold shrink-0 shadow-[2px_2px_0_0_#0F172A] dark:shadow-none text-slate-900 dark:text-white">2</div>
                        <p><strong>เลื่อนเพื่อเลือก:</strong> ขยับมือกลางอากาศเพื่อบังคับ Cursor ไปวางทับปุ่มคำตอบ (A, B, C หรือ D) ที่ต้องการ</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center font-bold shrink-0 shadow-[2px_2px_0_0_#0F172A] dark:shadow-none text-slate-900 dark:text-white">3</div>
                        <p><strong>ค้างไว้เพื่อยืนยัน:</strong> เมื่อนำมือไปวางทับตัวเลือก จะมี <strong>หลอดโหลดเวลา (Loading Ring)</strong> ปรากฏขึ้น ให้ทำมือค้างไว้จุดเดิมเพื่อล็อคคำตอบ!</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border-4 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000000]">
                    <h4 className="font-black text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2"><MonitorPlay className="text-slate-500" /> ข้อมูลบนหน้าจอ (UI Details)</h4>
                    <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-400 font-medium">
                      <li>• <strong>คำถามหลัก:</strong> แสดงอยู่ตรงกลางหน้าจอขนาดใหญ่</li>
                      <li>• <strong>กล่องคำตอบ:</strong> แยก 4 สี กระจายอยู่ 4 มุมในหน้าจอ</li>
                      <li>• <strong>Camera Feed:</strong> มีหน้าต่างกล้องขนาดใหญ่ เพื่อให้คุณรู้ตำแหน่งของคุณเพื่อสดวกในการตอบคำถาม</li>
                      <li>• <strong>Timer:</strong> แถบเวลาด้านบน หากหมดเวลา ระบบจะข้ามไปข้อต่อไปทันที</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Post-test */}
          <section id="posttest" className="scroll-mt-32">
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border-4 border-slate-900 dark:border-slate-700 p-8 md:p-12 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] relative overflow-hidden">
              <div className="absolute -right-10 -top-10 text-emerald-500/10 pointer-events-none"><Activity size={300} /></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-emerald-400 border-2 border-slate-900 text-slate-900 font-black px-4 py-1.5 rounded-full text-sm shadow-[2px_2px_0_0_#0F172A]">GAME MODE 02</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">4. โหมด Post-test <span className="text-emerald-500">(มินิเกมชักเย่อ)</span></h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl font-medium">ลุกขึ้นขยับร่างกาย โหมดสรุปความรู้หลังเรียนที่ใช้ &quot;ความไว&quot; ในการเอาชนะ ขยับตัวให้ไวที่สุดเพื่อชิงโอกาสในการตอบคำถาม</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="font-black text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Zap className="text-amber-500" /> วิธีการเล่น (How to play)</h4>
                    <div className="space-y-4 text-slate-700 dark:text-slate-300 font-medium">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center font-bold shrink-0 shadow-[2px_2px_0_0_#0F172A] dark:shadow-none text-slate-900 dark:text-white">1</div>
                        <p><strong>วิธีการเตรียมพร้อม:</strong> หันหลังให้กลับหน้าจอทุกครั้งก่อนเริ่มเกมและก่อนไปข้อถัดไป </p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center font-bold shrink-0 shadow-[2px_2px_0_0_#0F172A] dark:shadow-none text-slate-900 dark:text-white">2</div>
                        <p><strong>ขยับร่างกาย:</strong> เมื่อได้ยินสัญญาณ <em>&quot;เสียง&quot;</em> ให้ผู้เล่น <strong>หันหน้าเข้าหากล้อง</strong> อย่างรวดเร็ว ฝ่ายไหนที่ใมสามารถหันได้ก่อนจะได้สิทธิ์ในการตอบคำถาม</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center font-bold shrink-0 shadow-[2px_2px_0_0_#0F172A] dark:shadow-none text-slate-900 dark:text-white">3</div>
                        <p><strong>สร้างพลังดึง:</strong> ยิ่งตอบถูกเยอะเท่าไหร่ หลอดพลัง (Power Bar) จะยิ่งเพิ่มขึ้น ทำให้ตัวละครฝั่งคุณออกแรงดึงเชือกชักเย่อชนะคู่แข่งฝั่งตรงข้าม</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border-4 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000000]">
                    <h4 className="font-black text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2"><MonitorPlay className="text-slate-500" /> ข้อมูลบนหน้าจอ (UI Details)</h4>
                    <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-400 font-medium">
                      <li>• <strong>Power Bar:</strong> หลอดพลังแสดงแรงดึงแบบ Real-time ของฝั่งคุณ</li>
                      <li>• <strong>Pop-up คำถาม:</strong> จะแสดงขึ้นมาขัดจังหวะเป็นระยะๆ ต้องตอบให้ถูกเพื่อรับพลังดึงที่เพิ่มขึ้น</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Challenge */}
          <section id="challenge" className="scroll-mt-32">
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border-4 border-slate-900 dark:border-slate-700 p-8 md:p-12 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] relative overflow-hidden">
              <div className="absolute -right-10 -top-10 text-amber-500/10 pointer-events-none"><Smile size={300} /></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-amber-400 border-2 border-slate-900 text-slate-900 font-black px-4 py-1.5 rounded-full text-sm shadow-[2px_2px_0_0_#0F172A]">GAME MODE 03</span>
                  <span className="bg-rose-400 border-2 border-slate-900 text-slate-900 font-black px-3 py-1 rounded-full text-xs shadow-[2px_2px_0_0_#0F172A]">⭐ 3 ความยาก</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">5. โหมดด่านท้าทาย <span className="text-amber-500">(AI Head Tracking Control)</span></h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl font-medium">บททดสอบความรู้ที่เปลี่ยนการตอบคำถามให้เป็นเกม เปลี่ยน&quot;ศีรษะ&quot; ของคุณเป็นเมาส์ในการควบคุมทิศทาง โยกซ้ายหรือขวาเพื่อเลือกคำตอบที่ถูกต้อง</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="font-black text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Zap className="text-amber-500" /> วิธีการเล่น (How to play)</h4>
                    <div className="space-y-4 text-slate-700 dark:text-slate-300 font-medium">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center font-bold shrink-0 shadow-[2px_2px_0_0_#0F172A] dark:shadow-none text-slate-900 dark:text-white">1</div>
                        <p><strong>ให้ AI ตรวจจับใบหน้า:</strong> นั่งหรือยืนให้อยู่บริเวณกึ่งกลางหน้าจอ มองตรงไปที่กล้อง ระบบ AI จะทำการล็อคตำแหน่งศีรษะของคุณแบบเรียลไทม์ (พร้อมแสดงเป้าสัญลักษณ์ที่ใบหน้า)</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center font-bold shrink-0 shadow-[2px_2px_0_0_#0F172A] dark:shadow-none text-slate-900 dark:text-white">2</div>
                        <p><strong>ขยับศีรษะเพื่อเลือกคำตอบ:</strong> เมื่อโจทย์ปรากฏขึ้น ให้คุณขยับหรือเอียงศีรษะไปยังโซนคำตอบที่ต้องการ (โยกหัวไปฝั่งซ้ายเพื่อเลือกตัวเลือกซ้าย หรือ โยกหัวไปฝั่งขวาเพื่อเลือกตัวเลือกขวา)</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center font-bold shrink-0 shadow-[2px_2px_0_0_#0F172A] dark:shadow-none text-slate-900 dark:text-white">3</div>
                        <p><strong>ค้างไว้เพื่อยืนยัน:</strong> เมื่อขยับศีรษะไปอยู่ในฝั่งคำตอบแล้ว ให้ค้างตำแหน่งไว้ชั่วคราว (ประมาณ 1.5 วินาที) &quot;วงกลมเวลา&quot; จะโหลดจนเต็ม 100% เพื่อเป็นการกดยืนยันคำตอบนั้นทันที</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border-4 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000000]">
                    <h4 className="font-black text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2"><MonitorPlay className="text-slate-500" /> ข้อมูลบนหน้าจอ (UI Details)</h4>
                    <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-400 font-medium">
                      <li>• <strong>Smart Mirror Feed:</strong> ภาพจากกล้องจะถูกตั้งค่าให้แสดงผลแบบกระจกเงา (สะท้อนซ้าย-ขวา) ทำให้ผู้เล่นขยับศีรษะโต้ตอบกับหน้าจอได้อย่างเป็นธรรมชาติและไม่สับสน</li>
                      <li>• <strong>Focus Circle Loader (เกจวงกลมยืนยัน):</strong> เอฟเฟกต์วงกลมจับเวลาที่จะโหลดขึ้นเมื่อผู้เล่นเอียงศีรษะไปฝั่งใดฝั่งหนึ่ง ช่วยป้องกันการเผลอขยับไปโดนคำตอบโดยไม่ได้ตั้งใจ</li>
                      <li>• <strong>Live Score & Timer:</strong> หน้าปัดระบบจำกัดเวลา และแสดงคะแนนสะสมที่มุมจอแบบเรียลไทม์เพื่อเพิ่มความท้าทาย</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: O-NET */}
          <section id="onet" className="scroll-mt-32">
            <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] border-4 border-slate-900 dark:border-slate-700 p-8 md:p-12 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] relative overflow-hidden">
              <div className="absolute -right-10 -top-10 text-fuchsia-500/10 pointer-events-none"><Award size={300} /></div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-fuchsia-400 border-2 border-slate-900 text-slate-900 font-black px-4 py-1.5 rounded-full text-sm shadow-[2px_2px_0_0_#0F172A]">GAME MODE 04</span>
                  <span className="bg-slate-100 dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 text-slate-900 dark:text-white font-black px-3 py-1 rounded-full text-xs shadow-[2px_2px_0_0_#0F172A] dark:shadow-none">เฉพาะ ป.6</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">6. สนามสอบจำลอง <span className="text-fuchsia-500">(O-NET Simulator)</span></h2>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl font-medium">จำลองบรรยากาศการสอบจริง ฝึกทำข้อสอบที่ครอบคลุมเนื้อหา พร้อมจับเวลาแบบ Real-time</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h4 className="font-black text-xl text-slate-900 dark:text-white mb-6 flex items-center gap-2"><Zap className="text-amber-500" /> วิธีการเล่น (How to play)</h4>
                    <div className="space-y-4 text-slate-700 dark:text-slate-300 font-medium">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center font-bold shrink-0 shadow-[2px_2px_0_0_#0F172A] dark:shadow-none text-slate-900 dark:text-white">1</div>
                        <p><strong>ตะลุยด่านบอส 10 ระดับ (Stage Progression):</strong> เข้าสู่หน้าแผนที่ผจญภัย (Journey Map) เพื่อท้าทายบอสตั้งแต่ด่านที่ 1 ไปจนถึงด่านที่ 10 โดยระดับความยากของคำถามจะเพิ่มขึ้นเรื่อยๆ ตามด่านที่สูงขึ้น (จากแบบเลือกตอบ 4 ตัวเลือก สู่โหมดยากสุดที่ต้องพิมพ์คำตอบเอง!)</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center font-bold shrink-0 shadow-[2px_2px_0_0_#0F172A] dark:shadow-none text-slate-900 dark:text-white">2</div>
                        <p><strong>ตอบคำถามเพื่อโจมตี (Combat System):</strong> ในฉากต่อสู้ ให้ผู้เล่นใช้เมาส์หรือคีย์บอร์ดในการเลือกคำตอบ หากตอบ &quot;ถูก&quot; ผู้เล่นจะร่ายเวทมนตร์โจมตีให้ HP ของบอสลดลง แต่ระวังให้ดี! หากตอบ &quot;ผิด&quot; ผู้เล่นจะโดนบอสโจมตีสวนกลับจน HP ฝั่งเราลดลงแทน</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-900 dark:border-slate-700 flex items-center justify-center font-bold shrink-0 shadow-[2px_2px_0_0_#0F172A] dark:shadow-none text-slate-900 dark:text-white">3</div>
                        <p><strong>สะสมคอมโบสุ่มไอเทม (Combo & Gacha):</strong> โชว์ความแม่นยำด้วยการตอบถูกติดต่อกัน 3 ข้อ (3 Combo) เพื่อปลดล็อกโบนัส &quot;กล่องสุ่มกาชา&quot; ซึ่งจะมีไอเทมช่วยเหลือพิเศษ เช่น น้ำยาฟื้นฟูพลังชีวิต (Heal) หรือ การโจมตีติดคริติคอลสุดแรง (Critical Hit) เพื่อล้มบอสให้ไวขึ้น!</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border-4 border-slate-900 dark:border-slate-700 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000000]">
                    <h4 className="font-black text-lg text-slate-900 dark:text-white mb-4 flex items-center gap-2"><MonitorPlay className="text-slate-500" /> ข้อมูลบนหน้าจอ (UI Details)</h4>
                    <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-400 font-medium">
                      <li>• <strong>RPG Battle Layout:</strong> ดีไซน์หน้าจอต่อสู้สไตล์เกม RPG สุดคลาสสิก พร้อมแถบพลังชีวิต (HP Bar) ของทั้งผู้เล่นและบอสที่เคลื่อนไหวแบบ Real-time เพิ่มความลุ้นระทึกทุกครั้งที่ตอบคำถาม</li>
                      <li>• <strong>Journey Map (แผนที่ผจญภัย):</strong> หน้าจอเลือกด่านที่แสดงความคืบหน้าเป็นเส้นทางที่สวยงาม ด่านไหนที่เคลียร์แล้วจะเปลี่ยนเป็นสัญลักษณ์ &quot;ดาว (Star)&quot; เพื่อโชว์ความสำเร็จ</li>
                      <li>• <strong>Action Log & Combo Alert:</strong> แถบแจ้งเตือนแอ็กชันกลางหน้าจอ (เช่น &quot;✅ ถูกต้อง! โจมตี -25 HP&quot;) พร้อมตัวนับคอมโบสีสันสดใส ช่วยเร้าอารมณ์ให้การทำข้อสอบสนุกเหมือนเล่นเกมจริง</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: FAQ */}
          <section id="faq" className="scroll-mt-32 border-t-4 border-slate-900 dark:border-slate-700 pt-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-rose-400 border-4 border-slate-900 flex items-center justify-center shrink-0 shadow-[4px_4px_0_0_#0F172A]">
                <AlertCircle size={28} className="text-slate-900" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">7. การแก้ปัญหาที่พบบ่อย (FAQ)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border-4 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000]">
                <h4 className="font-bold text-base text-rose-600 dark:text-rose-400 mb-2">❓ ทำไมกล้องไม่ติด หรือขึ้นจอดำ?</h4>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  ดูที่มุมซ้ายบนของเบราว์เซอร์ (ติดกับช่องพิมพ์ URL) คลิกที่ไอคอน 🔒 แม่กุญแจ แล้วกดอนุญาตให้เว็บไซต์เข้าถึง <strong>&quot;Camera&quot;</strong> จากนั้นกดปุ่ม F5 เพื่อรีเฟรชหน้าต่าง
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border-4 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000]">
                <h4 className="font-bold text-base text-rose-600 dark:text-rose-400 mb-2">❓ โหมด Challenge เอียงหัวหรือโบกมือแล้วเป้าไม่ขยับตาม?</h4>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  ตรวจสอบระยะห่างจากหน้ากล้อง และดูว่ามีใบหน้าของเพื่อน หรือรูปภาพโปสเตอร์หน้าคนอยู่ด้านหลังหรือไม่ AI อาจสับสนได้ ให้อยู่ในเฟรมเพียงคนเดียว
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border-4 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000]">
                <h4 className="font-bold text-base text-rose-600 dark:text-rose-400 mb-2">❓ คอมพิวเตอร์กระตุกเวลาเล่นมินิเกม</h4>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  ระบบต้องการการประมวลผลที่ไวมาก แนะนำให้ปิดโปรแกรมอื่นๆ ที่ไม่ได้ใช้งาน (เช่น Zoom, เกมอื่นๆ) และกดปุ่ม <strong>F11</strong> เพื่อเล่นแบบเต็มจอ
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border-4 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000]">
                <h4 className="font-bold text-base text-rose-600 dark:text-rose-400 mb-2">❓ AI จับฝ่ามือ (Pre-test) สลับข้อ หรือไม่ยอมล็อคคำตอบ</h4>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  อาจเกิดจากการขยับมือเร็วเกินไป หรือแสงสว่างในห้องไม่เพียงพอ ให้กางฝ่ามือให้กว้าง และถือค้างนิ่งๆ บริเวณตัวเลือกประมาณ 2 วินาที
                </p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}