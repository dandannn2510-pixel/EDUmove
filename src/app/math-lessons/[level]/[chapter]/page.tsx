'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MonitorPlay, Award, PlayCircle, ChevronRight, Gamepad2, X, PlaySquare,
  BookOpen, CheckCircle2, Video, FileText
} from 'lucide-react';

const chapterDetailsData: Record<string, Record<string, any>> = {
  p4: {
    chapter1: { title: "จำนวนนับและการบวก ลบ", summary: "จำแนกและทำความเข้าใจจำนวนนับที่มีค่ามากกว่า 100,000", concepts: ["การอ่านและเขียนตัวเลขฮินดูอารบิกและไทย", "หลัก ค่าประจำหลัก และค่าของเลขโดด", "การเปรียบเทียบและเรียงลำดับจำนวน", "โจทย์ปัญหาการบวกและการลบ"] },
    chapter2: { title: "การคูณและการหาร", summary: "พัฒนาทักษะการคำนวณเลขหลายหลักอย่างเป็นระบบ", concepts: ["การคูณจำนวนหลายหลัก", "การหารยาวและการหารสั้น", "การหารเหลือเศษ", "การแก้โจทย์ปัญหาและการประมาณค่า"] },
    chapter3: { title: "เวลาและการวัด", summary: "การคำนวณและประยุกต์ใช้หน่วยเวลาและการวัดในชีวิตประจำวัน", concepts: ["การบอกระยะเวลาและการอ่านตารางเวลา", "การเปรียบเทียบระยะเวลา", "การคาดคะเนความยาว น้ำหนัก", "โจทย์ปัญหาเกี่ยวกับเวลา"] },
    chapter4: { title: "เศษส่วนเบื้องต้น", summary: "เรียนรู้ความหมายและหลักการคำนวณเศษส่วนเบื้องต้น", concepts: ["ความหมายและประเภทของเศษส่วน", "การเปรียบเทียบเศษส่วน", "การบวกและการลบเศษส่วน", "โจทย์ปัญหาเศษส่วน"] },
    chapter5: { title: "ทศนิยม 1-3 ตำแหน่ง", summary: "ความสัมพันธ์ของเศษส่วนและทักษะการคำนวณทศนิยม", concepts: ["การอ่านและการเขียนทศนิยม", "หลักและค่าประจำหลัก", "การบวกและการลบทศนิยม", "โจทย์ปัญหาทศนิยมและค่าเงิน"] },
    chapter6: { title: "เรขาคณิตและสถิติ", summary: "วิเคราะห์มุม รูปทรงเรขาคณิต และการอ่านแผนภูมิแท่ง", concepts: ["ชนิดและขนาดของมุม", "สมบัติรูปสี่เหลี่ยมมุมฉาก", "การสร้างรูปสี่เหลี่ยม", "การอ่านแผนภูมิแท่ง"] }
  },
  p5: {
    chapter1: { title: "เศษส่วนแบบเจาะลึก", summary: "การคำนวณเศษส่วนระดับสูง ส่วนไม่เท่ากัน และเศษส่วนระคน", concepts: ["การบวกลบเศษส่วนที่ส่วนไม่เท่ากัน", "การคูณเศษส่วนและจำนวนคละ", "การหารเศษส่วน", "โจทย์ปัญหาเศษส่วนระคน"] },
    chapter2: { title: "ทศนิยมและการคำนวณ", summary: "การคูณ การหารทศนิยม และการประยุกต์ใช้ในโจทย์ปัญหา", concepts: ["ความสัมพันธ์ทศนิยมกับเศษส่วน", "การคูณทศนิยม", "การหารทศนิยม", "โจทย์ปัญหา 2 ขั้นตอน"] },
    chapter3: { title: "การนำเสนอข้อมูล", summary: "ทักษะการอ่านและเขียนแผนภูมิและกราฟเส้น", concepts: ["การอ่านแผนภูมิแท่งเปรียบเทียบ", "การสร้างแผนภูมิแท่ง", "การอ่านกราฟเส้น", "โจทย์ปัญหาจากสถิติ"] },
    chapter4: { title: "บัญญัติไตรยางศ์และร้อยละ", summary: "การแก้ปัญหาบัญญัติไตรยางศ์ เปอร์เซ็นต์ กำไร ขาดทุน", concepts: ["บัญญัติไตรยางศ์", "ความหมายของร้อยละ", "การหาร้อยละจากจำนวนที่กำหนด", "กำไร ขาดทุน ลดราคา"] },
    chapter5: { title: "เรขาคณิต 2 มิติ", summary: "สมบัติของเส้นขนาน มุมแย้ง และการหาพื้นที่", concepts: ["เส้นขนานและมุมแย้ง", "ชนิดของรูปสี่เหลี่ยม", "การสร้างรูปสี่เหลี่ยม", "การหาพื้นที่รูปสี่เหลี่ยม"] },
    chapter6: { title: "ปริมาตรและความจุ", summary: "การคำนวณปริมาตรรูปทรงสี่เหลี่ยมมุมฉาก", concepts: ["ลักษณะของปริซึม", "การหาปริมาตรทรงสี่เหลี่ยมมุมฉาก", "ความจุของภาชนะ", "โจทย์ปัญหาปริมาตร"] }
  },
  p6: {
    chapter1: { title: "ห.ร.ม. และ ค.ร.น.", summary: "ตัวประกอบ จำนวนเฉพาะ และเทคนิคการหา ห.ร.ม. / ค.ร.น.", concepts: ["ตัวประกอบและจำนวนเฉพาะ", "การแยกตัวประกอบ", "วิธีการหา ห.ร.ม.", "วิธีการหา ค.ร.น."] },
    chapter2: { title: "เศษส่วนและทศนิยม", summary: "การคำนวณระคนและการแก้โจทย์ปัญหาซับซ้อน", concepts: ["การเปรียบเทียบเศษส่วน", "การคำนวณระคน", "ความสัมพันธ์เศษส่วน-ทศนิยม", "โจทย์ปัญหาเศษส่วนและทศนิยม"] },
    chapter3: { title: "อัตราส่วนและร้อยละ", summary: "มาตราส่วน ดอกเบี้ย และการประยุกต์ใช้ในชีวิตประจำวัน", concepts: ["อัตราส่วนที่เท่ากัน", "มาตราส่วน", "โจทย์ปัญหาร้อยละเกี่ยวกับดอกเบี้ย", "โจทย์ปัญหากำไร-ขาดทุน"] },
    chapter4: { title: "แบบรูปและสมการ", summary: "วิเคราะห์แบบรูป ความสัมพันธ์ และการใช้ตัวแปร", concepts: ["แบบรูปจำนวน", "แบบรูปเรขาคณิต", "ตัวแปรและนิพจน์พีชคณิต", "สมการและการแก้โจทย์สมการ"] },
    chapter5: { title: "รูปเรขาคณิต 2 มิติ", summary: "การหาพื้นที่และความยาวรอบรูปของรูปทรงต่างๆ", concepts: ["ส่วนประกอบรูปสามเหลี่ยม", "พื้นที่รูปสามเหลี่ยม", "พื้นที่รูปหลายเหลี่ยม", "พื้นที่วงกลม"] },
    chapter6: { title: "รูปทรง 3 มิติและสถิติ", summary: "ปริมาตรรูปทรง แผนภูมิรูปวงกลม และความน่าจะเป็น", concepts: ["รูปคลี่ของเรขาคณิต 3 มิติ", "พื้นที่ผิวและปริมาตร", "แผนภูมิรูปวงกลม", "สถิติและความน่าจะเป็น"] }
  }
};

export default function MathChapterPage() {
  const params = useParams();
  const router = useRouter();

  // 🚀 ใส่เกราะป้องกัน (Fallback) ป้องกัน Error หากหาตัวแปรจาก URL ไม่เจอ
  const level = (params?.level as string) || 'p4';
  const chapterId = (params?.chapter as string) || 'chapter1';
  const chapterNumber = parseInt(chapterId.replace('chapter', '')) || 1;
  
  const details = chapterDetailsData[level]?.[chapterId] || {
    title: "บทเรียนคณิตศาสตร์อัจฉริยะ",
    summary: "ทบทวนเนื้อหาสำคัญและแนวคิดหลัก",
    concepts: ["สรุปนิยามและสูตรคำนวณ", "ตัวอย่างโจทย์ทีละขั้นตอน", "เทคนิคการคิดลัด"]
  };

  const videoId = "M7lc1UVf-VE"; 

  const [isMounted, setIsMounted] = useState(false);
  const [viewState, setViewState] = useState<'TIMELINE' | 'VIDEO_DETAIL'>('TIMELINE');
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] relative font-sans overflow-x-hidden pb-20 selection:bg-fuchsia-200 selection:text-fuchsia-900">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@400;600;700;800;900&display=swap');` }} />
      
      {/* ลายจุดสมุดโน้ตจางๆ */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:32px_32px] opacity-50 pointer-events-none"></div>

      <div style={{ fontFamily: "'Prompt', sans-serif" }} className="max-w-6xl mx-auto px-6 py-16 relative z-10 flex flex-col flex-grow w-full">
        
        <AnimatePresence mode="wait">
          
          {/* ======================= หน้า TIMELINE (หน้าแรก) ======================= */}
          {viewState === 'TIMELINE' ? (
            <motion.div 
              key="timeline-view"
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              className="flex flex-col flex-grow w-full"
            >
              <header className="mb-16 text-center">
                <div className="inline-block rounded-full border-2 border-slate-900 bg-fuchsia-300 px-6 py-2 text-sm font-bold uppercase tracking-wider text-slate-900 mb-6 shadow-[4px_4px_0_0_#0F172A]">
                  บทเรียนคณิตศาสตร์ที่ {chapterNumber}
                </div>
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
                  {details.title}
                </h1>
              </header>

              <div className="relative mt-auto mb-10 w-full max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-black text-center mb-16 text-slate-800 dark:text-slate-200">กระบวนการเรียนรู้ 3 ขั้นตอน</h2>
                <div className="relative">
                  <div className="hidden lg:block absolute top-[40%] left-16 right-16 h-1 bg-slate-900/10 dark:bg-slate-700 rounded-full z-0 overflow-hidden">
                    <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-1/3 h-full bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent blur-[1px]" />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 relative z-10">
                    
                    {/* Step 1 */}
                    <div className="group flex flex-col rounded-[2.5rem] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000] transition-all">
                      <div className="w-20 h-20 rounded-[1.5rem] border-4 border-slate-900 bg-amber-300 flex items-center justify-center mb-6 shadow-sm"><Gamepad2 size={40} className="text-slate-900" strokeWidth={2.5} /></div>
                      <div className="text-amber-500 dark:text-amber-400 font-bold text-xs tracking-widest uppercase mb-2">Step 1</div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">ทดสอบก่อนเรียน</h3>
                      <button onClick={() => router.push(`/math-lessons/${level}/${chapterId}/easy`)} className="w-full mt-auto bg-[#F1F5F9] dark:bg-slate-700 text-center py-4 rounded-2xl font-black text-slate-800 dark:text-white group-hover:bg-amber-400 group-hover:text-slate-900 border-4 border-transparent group-hover:border-slate-900 transition-colors active:scale-95 flex justify-center items-center gap-2">
                        เริ่ม Pre-test <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* Step 2 */}
                    <div className="group flex flex-col rounded-[2.5rem] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000] transition-all lg:-mt-8 lg:mb-8 z-20">
                      <div className="w-24 h-24 rounded-[2rem] border-4 border-slate-900 bg-fuchsia-300 flex items-center justify-center mb-6 shadow-sm"><MonitorPlay size={44} className="text-slate-900" strokeWidth={2.5} /></div>
                      <div className="text-fuchsia-500 dark:text-fuchsia-400 font-bold text-xs tracking-widest uppercase mb-2">Step 2</div>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8">คลิปวิดีโอบทเรียน</h3>
                      <button onClick={() => setViewState('VIDEO_DETAIL')} className="w-full mt-auto bg-fuchsia-500 hover:bg-fuchsia-400 text-white py-4 rounded-2xl font-black text-xl border-4 border-slate-900 transition-colors shadow-[4px_4px_0_0_#0F172A] hover:shadow-[6px_6px_0_0_#0F172A] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2">
                        <PlayCircle size={24} /> เข้าชมเนื้อหา
                      </button>
                    </div>

                    {/* Step 3 */}
                    <div className="group flex flex-col rounded-[2.5rem] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000] transition-all z-10">
                      <div className="w-20 h-20 rounded-[1.5rem] border-4 border-slate-900 bg-cyan-300 flex items-center justify-center mb-6 shadow-sm"><Award size={40} className="text-slate-900" strokeWidth={2.5} /></div>
                      <div className="text-cyan-500 dark:text-cyan-400 font-bold text-xs tracking-widest uppercase mb-2">Step 3</div>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-8">ทดสอบหลังเรียน</h3>
                      <button onClick={() => router.push(`/math-lessons/${level}/${chapterId}/hard`)} className="w-full mt-auto bg-[#F1F5F9] dark:bg-slate-700 text-center py-4 rounded-2xl font-black text-slate-800 dark:text-white group-hover:bg-cyan-400 group-hover:text-slate-900 border-4 border-transparent group-hover:border-slate-900 transition-colors active:scale-95 flex justify-center items-center gap-2">
                        เริ่ม Post-test <ChevronRight size={20} />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>

          ) : (

            /* ======================= หน้า VIDEO DETAIL (หน้าห้องเรียน) ======================= */
            <motion.div 
              key="video-detail-view"
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
              className="flex flex-col flex-grow w-full"
            >

              <header className="mb-12">
                <div className="inline-block rounded-full border-2 border-slate-900 bg-fuchsia-100 dark:bg-fuchsia-950/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-fuchsia-400 mb-4 shadow-[2px_2px_0_0_#0F172A]">
                  <BookOpen size={14} className="inline mr-1.5" /> สื่อการเรียนรู้อัจฉริยะ (Interactive Learning)
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                  {details.title}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium max-w-3xl">
                  {details.summary}
                </p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 flex-grow">
                <div 
                  onClick={() => setIsVideoOpen(true)}
                  className="lg:col-span-2 relative h-[350px] md:h-[450px] bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000000] transition-all duration-300"
                >
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-20 h-20 bg-fuchsia-500 rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(217,70,239,0.5)] group-hover:scale-110 group-hover:bg-fuchsia-400 transition-all border-4 border-slate-900">
                      <Video size={36} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                  <div className="relative z-10 mt-auto p-6 md:p-8">
                    <div className="text-fuchsia-400 font-black text-xs md:text-sm tracking-widest uppercase mb-2">Micro-Learning Video</div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">สื่อวิดีโออธิบายแนวคิดและเทคนิคการคำนวณ</h3>
                    <p className="text-slate-300 text-sm md:text-base">คลิกเพื่อรับชมสื่อการสอนเนื้อหาบทเรียน</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 pointer-events-none"></div>
                </div>

                <div className="lg:col-span-1 bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 rounded-[2.5rem] p-6 md:p-8 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000] h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-slate-700 pb-4">
                    <FileText className="text-slate-900 dark:text-white" size={24} />
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">สรุปสาระสำคัญ</h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    {details.concepts.map((concept: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-100 dark:border-slate-700/50 p-4 rounded-2xl">
                        <CheckCircle2 size={20} className="text-fuchsia-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto border-t border-slate-200 dark:border-slate-800 pt-8">
                <button onClick={() => router.push(`/math-lessons/${level}/${chapterId}/easy`)} className="bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 hover:border-amber-400 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white px-6 py-5 rounded-2xl flex items-center justify-between transition-all group shadow-[4px_4px_0_0_#0F172A] hover:shadow-[6px_6px_0_0_#0F172A] active:translate-y-[2px]">
                  <div className="flex flex-col text-left">
                    <span className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-1">Step 1</span>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">แบบทดสอบก่อนเรียน</span>
                  </div>
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors border-2 border-slate-200 dark:border-slate-600">
                    <ChevronRight size={20} />
                  </div>
                </button>
                <button onClick={() => router.push(`/math-lessons/${level}/${chapterId}/hard`)} className="bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 hover:border-fuchsia-400 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white px-6 py-5 rounded-2xl flex items-center justify-between transition-all group shadow-[4px_4px_0_0_#0F172A] hover:shadow-[6px_6px_0_0_#0F172A] active:translate-y-[2px]">
                  <div className="flex flex-col text-left">
                    <span className="text-fuchsia-500 font-bold text-xs uppercase tracking-widest mb-1">Step 3</span>
                    <span className="font-bold text-lg text-slate-900 dark:text-white">แบบทดสอบหลังเรียน</span>
                  </div>
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center group-hover:bg-fuchsia-400 group-hover:text-slate-900 transition-colors border-2 border-slate-200 dark:border-slate-600">
                    <ChevronRight size={20} />
                  </div>
                </button>
              </div>
            </motion.div>

          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsVideoOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-5xl bg-white dark:bg-[#0f172a] border-4 border-slate-900 dark:border-slate-700 rounded-[2.5rem] shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] overflow-hidden z-10 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 z-20 bg-white dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <PlaySquare className="text-fuchsia-500" size={24} />
                  <h3 className="font-black text-slate-900 dark:text-white text-lg">{details.title}</h3>
                </div>
                <button onClick={() => setIsVideoOpen(false)} className="text-slate-900 dark:text-slate-400 hover:text-white bg-white dark:bg-slate-800 hover:bg-rose-500 dark:hover:bg-rose-500 border-2 border-slate-900 dark:border-slate-700 p-2.5 rounded-full shadow-[2px_2px_0_0_#000000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  <X size={20} />
                </button>
              </div>
              <div className="aspect-video bg-black relative flex w-full overflow-hidden">
                <iframe className="absolute inset-0 w-full h-full border-0" src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title="Video Lesson" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}