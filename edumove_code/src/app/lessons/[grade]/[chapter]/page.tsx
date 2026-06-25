'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MonitorPlay, Award, PlayCircle, ChevronRight, Sparkles, Gamepad2, X, PlaySquare,
  BookOpen, CheckCircle2, Video, FileText
} from 'lucide-react';

// 📚 ฐานข้อมูลเนื้อหาวิชาวิทยาศาสตร์
const chapterDetailsData: Record<string, Record<string, any>> = {
  p4: {
    chapter1: { title: "สิ่งมีชีวิตรอบตัว", summary: "จำแนกสิ่งมีชีวิตออกเป็นกลุ่มพืช สัตว์ และที่ไม่ใช่พืชสัตว์", concepts: ["การจัดกลุ่มสิ่งมีชีวิต", "ความแตกต่างของพืชและสัตว์", "สิ่งมีชีวิตกลุ่มเห็ดรา"] },
    chapter2: { title: "แรงและพลังงาน", summary: "ความหมายของแรงโน้มถ่วงและการเคลื่อนที่ของวัตถุ", concepts: ["แรงโน้มถ่วงของโลก", "มวลและน้ำหนัก", "แรงต้านการเคลื่อนที่"] },
    chapter3: { title: "แสงและการมองเห็น", summary: "ตัวกลางของแสงและการมองเห็นวัตถุ", concepts: ["ตัวกลางโปร่งใส", "ตัวกลางโปร่งแสง", "วัตถุทึบแสง"] },
    // เพิ่มบทอื่นๆ ของ ป.4 ได้เลยครับ
  },
  p5: {
    chapter1: { title: "แรงลัพธ์และแรงเสียดทาน", summary: "การหาแรงลัพธ์และผลของแรงเสียดทานในชีวิตประจำวัน", concepts: ["การรวมแรง", "ประโยชน์ของแรงเสียดทาน", "การลดแรงเสียดทาน"] },
  },
  p6: {
    chapter1: { title: "อาหารและระบบย่อยอาหาร", summary: "สารอาหารที่จำเป็นต่อร่างกายและการทำงานของระบบย่อย", concepts: ["สารอาหาร 5 หมู่", "หน้าที่ของอวัยวะย่อยอาหาร", "การดูแลระบบย่อยอาหาร"] },
  }
};

export default function ScienceChapterPage() {
  const params = useParams();
  const router = useRouter();

  const grade = (params?.grade as string) || 'p4';
  const chapterId = (params?.chapter as string) || 'chapter1';
  const chapterNumber = parseInt(chapterId.replace('chapter', '')) || 1;
  
  const details = chapterDetailsData[grade]?.[chapterId] || {
    title: "บทเรียนวิทยาศาสตร์อัจฉริยะ",
    summary: "ทบทวนเนื้อหาสำคัญและแนวคิดหลักจากการทดลอง",
    concepts: ["สรุปนิยามและหลักการ", "ผลการทดลอง", "การประยุกต์ใช้"]
  };

  const videoId = "M7lc1UVf-VE"; // ใส่รหัสคลิปวิชาวิทย์ที่นี่

  const [isMounted, setIsMounted] = useState(false);
  const [viewState, setViewState] = useState<'TIMELINE' | 'VIDEO_DETAIL'>('TIMELINE');
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-sans relative overflow-x-hidden flex flex-col selection:bg-emerald-500 selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;600;800;900&display=swap');` }} />
      
      {/* 🔮 เอฟเฟกต์แสงออโรร่า โทนสีวิชาวิทยาศาสตร์ (เขียว/ฟ้า) */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-[30%] left-[40%] w-[30vw] h-[30vw] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

      <div style={{ fontFamily: "'Kanit', sans-serif" }} className="max-w-7xl mx-auto relative z-10 flex flex-col flex-grow w-full">
        
        <AnimatePresence mode="wait">
          
          {/* ======================= หน้า TIMELINE ======================= */}
          {viewState === 'TIMELINE' ? (
            <motion.div key="timeline-view" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="flex flex-col flex-grow w-full">
              <Link href={`/lessons/${grade}`} className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-12 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-xl transition-all hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] w-max group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> กลับสู่หน้ารายการบทเรียน
              </Link>

              <header className="mb-20 text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-300 font-bold px-6 py-2 rounded-full text-sm mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                  <Sparkles size={16} className="animate-pulse text-teal-400" /> บทเรียนวิทยาศาสตร์ที่ {chapterNumber}
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-emerald-300 drop-shadow-[0_0_40px_rgba(16,185,129,0.3)] tracking-tight text-balance leading-tight py-2">
                  {details.title}
                </h1>
              </header>

              <div className="relative mt-auto mb-10 w-full max-w-6xl mx-auto">
                <h2 className="text-sm md:text-base font-black text-center mb-16 text-slate-500 tracking-[0.3em] uppercase">กระบวนการเรียนรู้ 3 ขั้นตอน</h2>
                <div className="relative">
                  <div className="hidden lg:block absolute top-[40%] left-16 right-16 h-1 bg-slate-800/50 rounded-full z-0 overflow-hidden">
                    <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-[1px]" />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 relative z-10">
                    
                    {/* Step 1 */}
                    <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 hover:border-amber-500/50 p-8 rounded-[3rem] flex flex-col items-center text-center relative overflow-hidden group transition-all duration-500 shadow-2xl hover:shadow-[0_20px_60px_rgba(245,158,11,0.15)] hover:-translate-y-2">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform border border-white/20 z-10">
                        <Gamepad2 size={36} className="text-white drop-shadow-md" />
                      </div>
                      <div className="text-amber-400 font-black text-xs tracking-widest uppercase mb-2">Step 1</div>
                      <h3 className="text-2xl font-black text-white mb-8">ทดสอบก่อนเรียน</h3>
                      <button onClick={() => router.push(`/lessons/${grade}/${chapterId}/easy`)} className="w-full mt-auto bg-white/5 hover:bg-amber-500 text-amber-400 hover:text-slate-900 border border-white/10 hover:border-amber-400 py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2">
                        เริ่ม Pre-test <ChevronRight size={20} />
                      </button>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-gradient-to-b from-emerald-900/30 to-slate-900/60 backdrop-blur-3xl border border-emerald-500/50 p-8 rounded-[3rem] flex flex-col items-center text-center relative overflow-hidden group shadow-[0_20px_80px_rgba(16,185,129,0.25)] lg:-mt-8 lg:mb-8 z-20">
                      <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-all border border-white/30 z-10">
                        <MonitorPlay size={44} className="text-white drop-shadow-md" />
                      </div>
                      <div className="text-emerald-400 font-black text-xs tracking-widest uppercase mb-2">Step 2</div>
                      <h3 className="text-3xl font-black text-white mb-8 drop-shadow-lg">คลิปวิดีโอบทเรียน</h3>
                      <button onClick={() => setViewState('VIDEO_DETAIL')} className="w-full mt-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white py-4 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:scale-105 border border-white/20">
                        <PlayCircle size={24} className="animate-pulse" /> เข้าชมเนื้อหา
                      </button>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 hover:border-cyan-400/50 p-8 rounded-[3rem] flex flex-col items-center text-center relative overflow-hidden group transition-all duration-500 shadow-2xl hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)] hover:-translate-y-2 z-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mb-6 shadow-[0_10px_20px_rgba(34,211,238,0.3)] group-hover:scale-110 transition-transform border border-white/20 z-10">
                        <Award size={36} className="text-white drop-shadow-md" />
                      </div>
                      <div className="text-cyan-400 font-black text-xs tracking-widest uppercase mb-2">Step 3</div>
                      <h3 className="text-2xl font-black text-white mb-8">ทดสอบหลังเรียน</h3>
                      <button onClick={() => router.push(`/lessons/${grade}/${chapterId}/hard`)} className="w-full mt-auto bg-white/5 hover:bg-cyan-500 text-cyan-400 hover:text-slate-900 border border-white/10 hover:border-cyan-400 py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2">
                        เริ่ม Post-test <ChevronRight size={20} />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>

          ) : (

            /* ======================= หน้า VIDEO DETAIL ======================= */
            <motion.div key="video-detail-view" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="flex flex-col flex-grow w-full">
              <button onClick={() => setViewState('TIMELINE')} className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-10 bg-slate-800/50 px-5 py-2 rounded-full border border-slate-700/50 backdrop-blur-md transition-all w-max group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> กลับสู่หน้าเส้นทางเรียนรู้
              </button>

              <header className="mb-12">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold px-4 py-1.5 rounded-full text-xs mb-4">
                  <BookOpen size={14} /> สื่อการเรียนรู้อัจฉริยะ (Interactive Learning)
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">{details.title}</h1>
                <p className="text-slate-400 text-lg md:text-xl font-medium max-w-3xl">{details.summary}</p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 flex-grow">
                <div onClick={() => setIsVideoOpen(true)} className="lg:col-span-2 relative h-[350px] md:h-[450px] bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden group cursor-pointer shadow-xl flex flex-col justify-end p-6 md:p-8 hover:border-emerald-500/50 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-[0_0_40px_rgba(16,185,129,0.5)] group-hover:scale-110 group-hover:bg-emerald-400 transition-all">
                      <Video size={36} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                  <div className="relative z-10 mt-auto">
                    <div className="text-emerald-400 font-black text-xs md:text-sm tracking-widest uppercase mb-2">Micro-Learning Video</div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1">สื่อวิดีโออธิบายปรากฏการณ์และการทดลอง</h3>
                    <p className="text-slate-500 text-sm md:text-base">คลิกเพื่อรับชมสื่อการสอนเนื้อหาบทเรียน</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent opacity-80 pointer-events-none"></div>
                </div>

                <div className="lg:col-span-1 bg-[#0f172a] border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
                    <FileText className="text-white" size={24} />
                    <h3 className="text-xl font-bold text-white">สรุปสาระสำคัญ</h3>
                  </div>
                  <div className="flex flex-col gap-4">
                    {details.concepts.map((concept: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-3 bg-slate-900/50 border border-slate-800/50 p-4 rounded-2xl">
                        <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-300 font-medium text-sm leading-relaxed">{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-auto border-t border-slate-800 pt-8">
                <button onClick={() => router.push(`/lessons/${grade}/${chapterId}/easy`)} className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 text-slate-300 hover:text-white px-6 py-5 rounded-2xl flex items-center justify-between transition-all group">
                  <div className="flex flex-col text-left">
                    <span className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-1">Step 1</span>
                    <span className="font-bold text-lg">แบบทดสอบก่อนเรียน</span>
                  </div>
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-900 transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </button>
                <button onClick={() => router.push(`/lessons/${grade}/${chapterId}/hard`)} className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white px-6 py-5 rounded-2xl flex items-center justify-between transition-all group">
                  <div className="flex flex-col text-left">
                    <span className="text-cyan-500 font-bold text-xs uppercase tracking-widest mb-1">Step 3</span>
                    <span className="font-bold text-lg">แบบทดสอบหลังเรียน</span>
                  </div>
                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-slate-900 transition-colors">
                    <ChevronRight size={20} />
                  </div>
                </button>
              </div>
            </motion.div>

          )}
        </AnimatePresence>
      </div>

      {/* 🎬 MODAL เปิดวิดีโอ */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsVideoOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"></motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-5xl bg-[#0f172a] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-slate-800 z-20">
                <div className="flex items-center gap-3">
                  <PlaySquare className="text-emerald-500" size={24} />
                  <h3 className="font-bold text-white text-lg">{details.title}</h3>
                </div>
                <button onClick={() => setIsVideoOpen(false)} className="text-slate-400 hover:text-white bg-slate-800 hover:bg-rose-500 p-2 rounded-full transition-all">
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