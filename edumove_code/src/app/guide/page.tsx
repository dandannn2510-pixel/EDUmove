'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Camera, Monitor, Hand, AlertCircle, 
  CheckCircle2, Gamepad2, Info, Brain, Activity, 
  Smile, Award, MonitorPlay, MousePointer2, Zap, 
  Trophy, Lightbulb, Target, LayoutGrid, BookOpen
} from 'lucide-react';

export default function GuidePage() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main 
      className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b1120] dark:text-slate-100 py-16 px-4 sm:px-6 transition-colors duration-300 relative selection:bg-indigo-200 selection:text-indigo-900 dark:selection:bg-indigo-500/30"
      style={{ fontFamily: "'Prompt', sans-serif" }}
    >
      {/* โหลดฟอนต์ Prompt เพื่อความคลีนและโมเดิร์น */}
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800;900&display=swap');` }} />

      {/* Ambient Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/15 dark:to-purple-500/15 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/3"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 mb-12 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-bold transition-all bg-white dark:bg-slate-800/80 px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5">
          <ArrowLeft size={18} /> กลับไปหน้าหลัก
        </Link>

        {/* Hero Section */}
        <header className="mb-16 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300 font-bold text-sm mb-6 border border-indigo-100 dark:border-indigo-500/20">
            <BookOpen size={16} /> คู่มือผู้ใช้งานฉบับสมบูรณ์ (Official Guide)
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight drop-shadow-sm">
            รู้จักกับ <span className="text-orange-500">EDU</span><span className="text-blue-500">move</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-4xl">
            คู่มือการเรียนรู้และควบคุมระบบ AI ตรวจจับท่าทาง (Gesture Control) พร้อมเจาะลึกกติกาและกลไกของเกมทุกประเภท เพื่อให้คุณพร้อมที่สุดก่อนลงสนามจริง!
          </p>
        </header>

        {/* สารบัญ (Table of Contents) */}
        <div className="bg-white dark:bg-slate-800/60 rounded-[2rem] p-6 mb-16 border border-slate-200 dark:border-slate-700/50 shadow-sm hidden md:block">
          <div className="flex items-center gap-3 mb-4 text-slate-800 dark:text-slate-200 font-bold px-2">
            <LayoutGrid size={20} className="text-indigo-500" /> ทางลัดไปยังหัวข้อต่างๆ
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => scrollToSection('learning-path')} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 rounded-xl text-sm font-semibold transition-colors border border-slate-100 dark:border-slate-700">1. ขั้นตอนการเรียนรู้</button>
            <button onClick={() => scrollToSection('setup')} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 rounded-xl text-sm font-semibold transition-colors border border-slate-100 dark:border-slate-700">2. การตั้งกล้อง AI</button>
            <button onClick={() => scrollToSection('pretest')} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900/50 hover:bg-blue-50 dark:hover:bg-blue-500/20 rounded-xl text-sm font-semibold transition-colors border border-slate-100 dark:border-slate-700">3. โหมด Pre-test (ใช้มือเลือก)</button>
            <button onClick={() => scrollToSection('posttest')} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-500/20 rounded-xl text-sm font-semibold transition-colors border border-slate-100 dark:border-slate-700">4. โหมด Post-test (ชักเย่อ)</button>
            <button onClick={() => scrollToSection('challenge')} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900/50 hover:bg-amber-50 dark:hover:bg-amber-500/20 rounded-xl text-sm font-semibold transition-colors border border-slate-100 dark:border-slate-700">5. โหมด Challenge (ใช้หัว)</button>
            <button onClick={() => scrollToSection('onet')} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900/50 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-500/20 rounded-xl text-sm font-semibold transition-colors border border-slate-100 dark:border-slate-700">6. โหมด O-NET</button>
            <button onClick={() => scrollToSection('faq')} className="px-5 py-2.5 bg-slate-50 dark:bg-slate-900/50 hover:bg-rose-50 dark:hover:bg-rose-500/20 rounded-xl text-sm font-semibold transition-colors border border-slate-100 dark:border-slate-700">7. การแก้ปัญหา</button>
          </div>
        </div>

        <div className="space-y-16">
          
          {/* ===================== เพิ่ม Section ใหม่: ขั้นตอนการเรียนรู้ ===================== */}
          <section id="learning-path" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-lg">
                <BookOpen size={28} />
              </div>
              <h2 className="text-3xl font-black">1. ขั้นตอนการเรียนรู้สุดล้ำ</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 mb-8 font-medium text-lg">
              ระบบถูกออกแบบมาให้สนุก เข้าใจง่าย และวัดผลได้จริง ครอบคลุมกระบวนการเรียนรู้ตั้งแต่ต้นจนจบ
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800/80 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700/80 shadow-sm backdrop-blur-md">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                  <Gamepad2 size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">1. ประเมินก่อนเรียน</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  ทำแบบทดสอบเพื่อวัดความรู้พื้นฐานผ่านเกมตอบคำถามสุดล้ำ แบ่งทีมสร้างบรรยากาศกระตือรือร้น
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800/80 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700/80 shadow-sm backdrop-blur-md">
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                  <MonitorPlay size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">2. เรียนรู้แบบ Interactive</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  ทบทวนเนื้อหาผ่านสื่อการสอนที่ออกแบบให้อ่านและทำความเข้าใจได้ง่าย มีเกมตอบคำถามแทรกระหว่างเรียน
                </p>
              </div>
              <div className="bg-white dark:bg-slate-800/80 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700/80 shadow-sm backdrop-blur-md">
                <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-6">
                  <Trophy size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white">3. ประเมินและสรุปผล</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  ทำแบบทดสอบหลังเรียน ดูพัฒนาการ และรับคำแนะนำสรุปจุดแข็งและจุดที่ต้องพัฒนาของนักเรียนเป็นรายบุคคล
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Setup (ของเดิม แต่ปรับเลขเป็น 2) */}
          <section id="setup" className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0 shadow-lg">
                <Camera size={28} />
              </div>
              <h2 className="text-3xl font-black">2. การเตรียมความพร้อมของกล้อง AI</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800/80 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700/80 shadow-sm">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-6">
                  <Lightbulb size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">แสงสว่าง (Lighting)</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-4">
                  แสงสว่างที่เพียงพอจะทำให้ AI ทำงานได้เต็มประสิทธิภาพ 100%
                </p>
                <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-emerald-500 shrink-0" size={18}/> <strong>ต้องทำ:</strong> หันหน้าเข้าหาแหล่งกำเนิดแสง (เช่น หน้าต่าง หรือ โคมไฟ)</li>
                  <li className="flex items-start gap-2"><AlertCircle className="text-rose-500 shrink-0" size={18}/> <strong>ห้ามทำ:</strong> นั่งย้อนแสง (มีแสงสว่างจ้าอยู่ด้านหลัง) เพราะจะทำให้หน้าและมือมืดจน AI มองไม่เห็น</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-slate-800/80 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700/80 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                  <Target size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">ระยะห่าง (Distance & Angle)</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-4">
                  การกะระยะให้พอดีช่วยให้เคลื่อนไไวร่างกายได้อย่างเป็นอิสระ
                </p>
                <ul className="space-y-3 text-lg text-slate-700 dark:text-slate-300">
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-emerald-500 shrink-0" size={18}/> ถอยห่างจากหน้ากล้องประมาณ <strong>1 ถึง 2 เมตร</strong></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-emerald-500 shrink-0" size={18}/> ปรับมุมกล้องให้มองเห็นตั้งแต่ <strong>หน้าอก จนถึง เหนือศีรษะ</strong></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="text-emerald-500 shrink-0" size={18}/> เคลียร์พื้นที่รอบตัวให้โล่ง ไม่มีคนเดินผ่านไปมาด้านหลัง</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Pre-test (ของเดิม แต่ปรับเลขเป็น 3) */}
          <section id="pretest" className="scroll-mt-32">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2.5rem] p-1 shadow-xl">
              <div className="bg-white dark:bg-slate-900 rounded-[2.4rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-blue-500/10 pointer-events-none"><Hand size={300} /></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 font-black px-4 py-1.5 rounded-full text-sm">GAME MODE 01</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">3. โหมด Pre-test <span className="text-blue-600 dark:text-blue-400">(ใช้ฝ่ามือควบคุม)</span></h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl">โหมดประเมินความรู้ก่อนเรียน ที่เปลี่ยนฝ่ามือของคุณให้กลายเป็นเมาส์อัจฉริยะ (Air Mouse) ขยับมือกลางอากาศเพื่อเลือกคำตอบได้อย่างอิสระ</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Zap className="text-amber-500"/> วิธีการเล่น (How to play)</h4>
                      <div className="space-y-4 text-slate-700 dark:text-slate-300">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold shrink-0">1</div>
                          <p><strong>ยกมือขึ้น:</strong> ชูฝ่ามือขึ้นมาด้านหน้ากล้อง ระบบจะสร้างจุด Cursor เล็กๆ ติดตามมือของคุณบนหน้าจอ</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold shrink-0">2</div>
                          <p><strong>เลื่อนเพื่อเลือก:</strong> ขยับมือกลางอากาศเพื่อบังคับ Cursor ไปวางทับปุ่มคำตอบ (A, B, C หรือ D) ที่ต้องการ</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-700 flex items-center justify-center font-bold shrink-0 text-blue-600 dark:text-blue-400">3</div>
                          <p><strong>ค้างไว้เพื่อยืนยัน:</strong> เมื่อนำมือไปวางทับตัวเลือก จะมี <strong>หลอดโหลดเวลา (Loading Ring)</strong> ปรากฏขึ้น ให้ทำมือค้างไว้จุดเดิมเพื่อล็อคคำตอบ!</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><MonitorPlay className="text-slate-500"/> ข้อมูลบนหน้าจอ (UI Details)</h4>
                      <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-400">
                        <li>• <strong>คำถามหลัก:</strong> แสดงอยู่ตรงกลางหน้าจอขนาดใหญ่</li>
                        <li>• <strong>กล่องคำตอบ:</strong> แยก 4 สีชัดเจน กระจายอยู่ด้านล่างหรือรอบๆ</li>
                        <li>• <strong>Camera Feed:</strong> มีหน้าต่างกล้องเล็กๆ มุมจอ เพื่อให้คุณรู้ว่าอยู่ในเฟรมหรือไม่</li>
                        <li>• <strong>Timer:</strong> แถบเวลาด้านบน หากหมดเวลา ระบบจะข้ามไปข้อต่อไปทันที</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Post-test (ของเดิม แต่ปรับเลขเป็น 4) */}
          <section id="posttest" className="scroll-mt-32">
            <div className="bg-gradient-to-br from-emerald-400 to-teal-600 rounded-[2.5rem] p-1 shadow-xl">
              <div className="bg-white dark:bg-slate-900 rounded-[2.4rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-emerald-500/10 pointer-events-none"><Activity size={300} /></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 font-black px-4 py-1.5 rounded-full text-sm">GAME MODE 02</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">4. โหมด Post-test <span className="text-emerald-600 dark:text-emerald-400">(มินิเกมชักเย่อ)</span></h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl">ลุกขึ้นขยับร่างกาย โหมดสรุปความรู้หลังเรียนที่ใช้ "ความไว" ในการเอาชนะ ขยับตัวให้ไวที่สุดเพื่อสร้างพลังดึงคู่แข่งในเกมชักเย่อ!</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Zap className="text-amber-500"/> วิธีการเล่น (How to play)</h4>
                      <div className="space-y-4 text-slate-700 dark:text-slate-300">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold shrink-0">1</div>
                          <p><strong>อ่านคำถาม:</strong> ระบบจะแสดงคำถามตรงกลางหน้าจออย่างรวดเร็ว</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold shrink-0">2</div>
                          <p><strong>ขยับร่างกาย:</strong> เมื่อเห็นสัญญาณ <em>"GO!"</em> ให้ผู้เล่น <strong>ขยับร่างกาย แกว่งแขน หรือกระโดดเบาๆ</strong> อย่างรวดเร็วหน้ากล้อง</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-700 flex items-center justify-center font-bold shrink-0 text-emerald-600 dark:text-emerald-400">3</div>
                          <p><strong>สร้างพลังดึง:</strong> ยิ่งคุณขยับร่างกายเร็วและเยอะเท่าไหร่ หลอดพลัง (Power Bar) จะยิ่งเพิ่มขึ้น ทำให้ตัวละครฝั่งคุณออกแรงดึงเชือกชักเย่อชนะคู่แข่งฝั่งตรงข้าม!</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><MonitorPlay className="text-slate-500"/> ข้อมูลบนหน้าจอ (UI Details)</h4>
                      <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-400">
                        <li>• <strong>อนิเมชันชักเย่อ:</strong> ตัวละคร 2 ฝั่งดึงเชือกอยู่กลางหน้าจอ</li>
                        <li>• <strong>Power Bar:</strong> หลอดพลังแสดงแรงดึงแบบ Real-time ของฝั่งคุณ</li>
                        <li>• <strong>Pop-up คำถาม:</strong> จะเด้งขึ้นมาขัดจังหวะเป็นระยะๆ ต้องตอบให้ถูกเพื่อรับโบนัสพลังดึง</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Challenge (ของเดิม แต่ปรับเลขเป็น 5) */}
          <section id="challenge" className="scroll-mt-32">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-[2.5rem] p-1 shadow-xl">
              <div className="bg-white dark:bg-slate-900 rounded-[2.4rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-amber-500/10 pointer-events-none"><Smile size={300} /></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 font-black px-4 py-1.5 rounded-full text-sm">GAME MODE 03</span>
                    <span className="bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 font-bold px-3 py-1 rounded-full text-xs">⭐ 3 ความยาก</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">5. โหมดด่านท้าทาย <span className="text-amber-600 dark:text-amber-400">(AI Head Tracking Control)</span></h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl">บททดสอบความรู้สุดล้ำที่เปลี่ยนการตอบคำถามให้เป็นเกมโชว์สุดมันส์ บอกลาเมาส์และคีย์บอร์ด แล้วเปลี่ยนมาใช้ &quot;ศีรษะ&quot; ของคุณเป็นเมาส์ในการควบคุมทิศทาง โยกซ้ายหรือขวาเพื่อเลือกคำตอบที่ถูกต้อง</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Zap className="text-amber-500"/> วิธีการเล่น (How to play)</h4>
                      <div className="space-y-4 text-slate-700 dark:text-slate-300">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold shrink-0">1</div>
                          <p><strong>ให้ AI ตรวจจับใบหน้า:</strong> นั่งหรือยืนให้อยู่บริเวณกึ่งกลางหน้าจอ มองตรงไปที่กล้อง ระบบ AI จะทำการล็อคตำแหน่งศีรษะของคุณแบบเรียลไทม์ (พร้อมแสดงเป้าสัญลักษณ์ที่ใบหน้า)</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold shrink-0">2</div>
                          <p><strong>ขยับศีรษะเพื่อเลือกคำตอบ:</strong> เมื่อโจทย์ปรากฏขึ้น ให้คุณขยับหรือเอียงศีรษะไปยังโซนคำตอบที่ต้องการ (โยกหัวไปฝั่งซ้ายเพื่อเลือกตัวเลือกซ้าย หรือ โยกหัวไปฝั่งขวาเพื่อเลือกตัวเลือกขวา)</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-700 flex items-center justify-center font-bold shrink-0 text-amber-600 dark:text-amber-400">3</div>
                          <p><strong>ค้างไว้เพื่อยืนยัน:</strong> เมื่อขยับศีรษะไปอยู่ในฝั่งคำตอบแล้ว ให้ค้างตำแหน่งไว้ชั่วคราว (ประมาณ 1.5 วินาที) &quot;วงกลมสะสมพลัง&quot; จะโหลดเกจจนเต็ม 100% เพื่อเป็นการกดยืนยันคำตอบนั้นทันที</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><MonitorPlay className="text-slate-500"/> ข้อมูลบนหน้าจอ (UI Details)</h4>
                      <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-400">
                        <li>• <strong>Smart Mirror Feed:</strong> ภาพจากกล้องจะถูกตั้งค่าให้แสดงผลแบบกระจกเงา (สะท้อนซ้าย-ขวา) ทำให้ผู้เล่นขยับศีรษะโต้ตอบกับหน้าจอได้อย่างเป็นธรรมชาติและไม่สับสน</li>
                        <li>• <strong>Focus Circle Loader (เกจวงกลมยืนยัน):</strong> เอฟเฟกต์วงกลมจับเวลาที่จะโหลดขึ้นเมื่อผู้เล่นเอียงศีรษะไปฝั่งใดฝั่งหนึ่ง ช่วยป้องกันการเผลอขยับไปโดนคำตอบโดยไม่ได้ตั้งใจ</li>
                        <li>• <strong>Live Score & Timer:</strong> หน้าปัดระบบจำกัดเวลาสุดเร้าใจ และแสดงคะแนนสะสมที่มุมจอแบบเรียลไทม์เพื่อเพิ่มความท้าทายในการทำสถิติ</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: O-NET (ของเดิม แต่ปรับเลขเป็น 6) */}
          <section id="onet" className="scroll-mt-32">
            <div className="bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-[2.5rem] p-1 shadow-xl">
              <div className="bg-white dark:bg-slate-900 rounded-[2.4rem] p-8 md:p-12 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-fuchsia-500/10 pointer-events-none"><Award size={300} /></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-400 font-black px-4 py-1.5 rounded-full text-sm">GAME MODE 04</span>
                    <span className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 font-bold px-3 py-1 rounded-full text-xs">เฉพาะ ป.6</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-4 text-slate-900 dark:text-white">6. สนามสอบจำลอง <span className="text-fuchsia-600 dark:text-fuchsia-400">(O-NET Simulator)</span></h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-3xl">จำลองบรรยากาศการสอบจริง! ฝึกทำข้อสอบที่ครอบคลุมเนื้อหา พร้อมจับเวลาและระบบประเมินจุดแข็ง-จุดอ่อนรายบุคคลแบบ Real-time</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="font-bold text-xl mb-4 flex items-center gap-2"><Zap className="text-amber-500"/> วิธีการเล่น (How to play)</h4>
                      <div className="space-y-4 text-slate-700 dark:text-slate-300">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold shrink-0">1</div>
                          <p><strong>ตะลุยด่านบอส 10 ระดับ (Stage Progression):</strong> เข้าสู่หน้าแผนที่ผจญภัย (Journey Map) เพื่อท้าทายบอสตั้งแต่ด่านที่ 1 ไปจนถึงด่านที่ 10 โดยระดับความยากของคำถามจะเพิ่มขึ้นเรื่อยๆ ตามด่านที่สูงขึ้น (จากแบบเลือกตอบ 4 ตัวเลือก สู่โหมดยากสุดที่ต้องพิมพ์คำตอบเอง)</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold shrink-0">2</div>
                          <p><strong>ตอบคำถามเพื่อโจมตี (Combat System):</strong> ในฉากต่อสู้ ให้ผู้เล่นใช้เมาส์หรือคีย์บอร์ดในการเลือกคำตอบ หากตอบ &quot;ถูก&quot; ผู้เล่นจะร่ายเวทมนตร์โจมตีให้ HP ของบอสลดลง แต่ระวังให้ดี หากตอบ &quot;ผิด&quot; ผู้เล่นจะโดนบอสโจมตีสวนกลับจน HP ฝั่งเราลดลงแทน</p>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/50 border border-fuchsia-200 dark:border-fuchsia-700 flex items-center justify-center font-bold shrink-0 text-fuchsia-600 dark:text-fuchsia-400">3</div>
                          <p><strong>สะสมคอมโบสุ่มไอเทม (Combo & Gacha):</strong> โชว์ความแม่นยำด้วยการตอบถูกติดต่อกัน 3 ข้อ (3 Combo) เพื่อปลดล็อกโบนัส &quot;กล่องสุ่มกาชา&quot; ซึ่งจะมีไอเทมช่วยเหลือพิเศษ เช่น น้ำยาฟื้นฟูพลังชีวิต (Heal) หรือ การโจมตีติดคริติคอลสุดแรง (Critical Hit) เพื่อล้มบอสให้ไวขึ้น</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><MonitorPlay className="text-slate-500"/> ข้อมูลบนหน้าจอ (UI Details)</h4>
                      <ul className="space-y-3 text-lg text-slate-600 dark:text-slate-400">
                        <li>• <strong>RPG Battle Layout:</strong> ดีไซน์หน้าจอต่อสู้สไตล์เกม RPG สุดคลาสสิก พร้อมแถบพลังชีวิต (HP Bar) ของทั้งผู้เล่นและบอสที่เคลื่อนไหวแบบ Real-time เพิ่มความลุ้นระทึกทุกครั้งที่ตอบคำถาม</li>
                        <li>• <strong>Journey Map (แผนที่ผจญภัย):</strong> หน้าจอเลือกด่านที่แสดงความคืบหน้าเป็นเส้นทางที่สวยงาม ด่านไหนที่เคลียร์แล้วจะเปลี่ยนเป็นสัญลักษณ์ &quot;ดาว (Star)&quot; เพื่อโชว์ความสำเร็จ</li>
                        <li>• <strong>Action Log & Combo Alert:</strong> แถบแจ้งเตือนแอ็กชันกลางหน้าจอ (เช่น &quot;✅ ถูกต้อง โจมตี -25 HP&quot;) พร้อมตัวนับคอมโบสีสันสดใส ช่วยเร้าอารมณ์ให้การทำข้อสอบสนุกเหมือนเล่นเกมจริง</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: FAQ (ของเดิม แต่ปรับเลขเป็น 7) */}
          <section id="faq" className="scroll-mt-32 border-t border-slate-200 dark:border-slate-800 pt-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <AlertCircle size={28} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">7. การแก้ปัญหาที่พบบ่อย (FAQ)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                <h4 className="font-bold text-base text-rose-800 dark:text-rose-300 mb-2">❓ ทำไมกล้องไม่ติด หรือขึ้นจอดำ?</h4>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  ดูที่มุมซ้ายบนของเบราว์เซอร์ (ติดกับช่องพิมพ์ URL) คลิกที่ไอคอน 🔒 แม่กุญแจ แล้วกดอนุญาตให้เว็บไซต์เข้าถึง <strong>"Camera"</strong> จากนั้นกดปุ่ม F5 เพื่อรีเฟรชหน้าต่าง
                </p>
              </div>
              <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                <h4 className="font-bold text-base text-rose-800 dark:text-rose-300 mb-2">❓ โหมด Challenge เอียงหัวแล้วเป้าไม่ขยับตาม?</h4>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  ตรวจสอบว่ามีใบหน้าของเพื่อน หรือรูปภาพโปสเตอร์หน้าคนอยู่ด้านหลังหรือไม่ AI อาจสับสนและไปจับใบหน้าอื่นแทน ให้อยู่ในเฟรมเพียงคนเดียว
                </p>
              </div>
              <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                <h4 className="font-bold text-base text-rose-800 dark:text-rose-300 mb-2">❓ คอมพิวเตอร์กระตุกเวลาเล่นโหมดชักเย่อ</h4>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  ระบบต้องการการประมวลผลที่ไวมาก แนะนำให้ปิดโปรแกรมอื่นๆ ที่ไม่ได้ใช้งาน (เช่น Zoom, เกมอื่นๆ) และกดปุ่ม <strong>F11</strong> เพื่อเล่นแบบเต็มจอ
                </p>
              </div>
              <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-2xl border border-rose-100 dark:border-rose-900/30">
                <h4 className="font-bold text-base text-rose-800 dark:text-rose-300 mb-2">❓ AI จับฝ่ามือ (Pre-test) สลับข้อ หรือไม่ยอมล็อคคำตอบ</h4>
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
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