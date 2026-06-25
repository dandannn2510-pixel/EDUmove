'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, Calculator, Shapes, Sigma, PlayCircle, Target, ChevronRight, Star, 
  Clock, PieChart, Percent, Box, Ruler, LineChart, DivideCircle, Hash, ShieldAlert
} from 'lucide-react';

const mathData: Record<string, any> = {
  p4: {
    title: "คณิตศาสตร์ ป.4",
    term1: [
      { id: "chapter1", title: "จำนวนนับและการบวก ลบ", desc: "จำนวนนับที่มากกว่า 100,000 ค่าประจำหลัก และการหาผลลัพธ์", icon: Hash, color: "from-fuchsia-500 to-pink-600" },
      { id: "chapter2", title: "การคูณและการหาร", desc: "การคูณจำนวนหลายหลัก การหารยาว และการแก้โจทย์ปัญหา", icon: DivideCircle, color: "from-pink-500 to-rose-600" },
      { id: "chapter3", title: "เวลาและการวัด", desc: "การบอกเวลา การวัดความยาว น้ำหนัก และปริมาตร", icon: Clock, color: "from-rose-400 to-red-500" }
    ],
    term2: [
      { id: "chapter4", title: "เศษส่วนเบื้องต้น", desc: "ความหมาย การเปรียบเทียบ และการบวก ลบ เศษส่วน", icon: PieChart, color: "from-purple-500 to-indigo-600" },
      { id: "chapter5", title: "ทศนิยม 1-3 ตำแหน่ง", desc: "การอ่าน เขียน เปรียบเทียบ และการบวก ลบ ทศนิยม", icon: Calculator, color: "from-indigo-400 to-blue-600" },
      { id: "chapter6", title: "เรขาคณิตและสถิติ", desc: "มุม รูปสี่เหลี่ยมมุมฉาก และการอ่านแผนภูมิแท่ง", icon: Shapes, color: "from-violet-500 to-purple-600" }
    ]
  },
  p5: {
    title: "คณิตศาสตร์ ป.5",
    term1: [
      { id: "chapter1", title: "เศษส่วนแบบเจาะลึก", desc: "การเปรียบเทียบ และการบวก ลบ คูณ หาร เศษส่วนระคน", icon: PieChart, color: "from-fuchsia-500 to-pink-600" },
      { id: "chapter2", title: "ทศนิยมและการคำนวณ", desc: "ความสัมพันธ์ของเศษส่วนและทศนิยม การคูณ การหารทศนิยม", icon: Calculator, color: "from-pink-500 to-rose-600" },
      { id: "chapter3", title: "การนำเสนอข้อมูล", desc: "การอ่านและเขียนแผนภูมิแท่ง แผนภูมิแท่งเปรียบเทียบ", icon: LineChart, color: "from-rose-400 to-red-500" }
    ],
    term2: [
      { id: "chapter4", title: "บัญญัติไตรยางศ์และร้อยละ", desc: "การแก้โจทย์ปัญหาด้วยบัญญัติไตรยางศ์ การหาเปอร์เซ็นต์ กำไร ขาดทุน", icon: Percent, color: "from-purple-500 to-indigo-600" },
      { id: "chapter5", title: "เรขาคณิต 2 มิติ", desc: "เส้นขนาน มุมแย้ง รูปสี่เหลี่ยม และการหาพื้นที่", icon: Ruler, color: "from-indigo-400 to-blue-600" },
      { id: "chapter6", title: "ปริมาตรและความจุ", desc: "ทรงสี่เหลี่ยมมุมฉาก และการแก้โจทย์ปัญหาปริมาตร", icon: Box, color: "from-violet-500 to-purple-600" }
    ]
  },
  p6: {
    title: "คณิตศาสตร์ ป.6",
    term1: [
      { id: "chapter1", title: "ห.ร.ม. และ ค.ร.น.", desc: "ตัวประกอบ จำนวนเฉพาะ การหา ห.ร.ม. และ ค.ร.น.", icon: Sigma, color: "from-fuchsia-500 to-pink-600" },
      { id: "chapter2", title: "เศษส่วนและทศนิยม", desc: "การบวก ลบ คูณ หารระคน และโจทย์ปัญหาซับซ้อน", icon: Calculator, color: "from-pink-500 to-rose-600" },
      { id: "chapter3", title: "อัตราส่วนและร้อยละ", desc: "อัตราส่วนที่เท่ากัน มาตราส่วน และดอกเบี้ย", icon: Percent, color: "from-rose-400 to-red-500" }
    ],
    term2: [
      { id: "chapter4", title: "แบบรูปและสมการ", desc: "การแก้ปัญหาเกี่ยวกับแบบรูป และความสัมพันธ์", icon: Hash, color: "from-purple-500 to-indigo-600" },
      { id: "chapter5", title: "รูปเรขาคณิต 2 มิติ", desc: "รูปสามเหลี่ยม รูปหลายเหลี่ยม วงกลม และความยาวรอบรูป", icon: Shapes, color: "from-indigo-400 to-blue-600" },
      { id: "chapter6", title: "รูปทรง 3 มิติและสถิติ", desc: "ปริมาตรรูปทรง การสร้างแผนภูมิรูปวงกลม", icon: Box, color: "from-violet-500 to-purple-600" }
    ]
  }
};

export default function MathLessonsPage() {
  const params = useParams();
  const level = params.level as string;
  const data = mathData[level];

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  if (!data) return <div className="text-white text-center mt-20 text-3xl font-bold">404 - ไม่พบข้อมูลชั้นเรียนนี้</div>;

  return (
    <main className="min-h-screen bg-[#020617] text-white relative font-sans overflow-x-hidden p-6 md:p-12">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;600;800;900&display=swap');` }} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div style={{ fontFamily: "'Kanit', sans-serif" }} className="max-w-7xl mx-auto relative z-10">
        
        <Link href={`/grade/${level}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 font-bold bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md shadow-lg">
          <ArrowLeft size={20} /> กลับไปหน้าเลือกวิชา
        </Link>

        <header className="mb-16 text-center md:text-left">
          <div className="inline-block bg-fuchsia-500/20 border border-fuchsia-500/50 text-fuchsia-300 font-bold px-4 py-1.5 rounded-full text-sm mb-4 shadow-sm">
            หลักสูตรแกนกลางฯ คณิตศาสตร์ (ฉบับปรับปรุง)
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500 mb-4 drop-shadow-lg text-balance">
            {data.title}
          </h1>
          <p className="text-slate-400 text-xl max-w-3xl text-balance">เลือกบทเรียนที่ต้องการเพื่อเข้าสู่ระบบประเมินผลและการฝึกทักษะการคำนวณ</p>
        </header>

        {/* ================= ภาคเรียนที่ 1 ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-fuchsia-500 text-white font-black px-5 py-2 rounded-xl text-2xl shadow-[0_0_20px_rgba(217,70,239,0.4)]">ภาคเรียนที่ 1</div>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-fuchsia-500/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {data.term1.map((chap: any, idx: number) => {
              const Icon = chap.icon;
              return (
                <div key={idx} className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,70,239,0.2)] hover:border-fuchsia-500/30 flex flex-col h-full group">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${chap.color} shadow-lg mb-6 border-2 border-white/10 group-hover:rotate-6 transition-transform shrink-0`}>
                    <Icon size={40} />
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-white leading-snug text-balance">{chap.title}</h3>
                  <p className="text-slate-400 font-medium mb-8 flex-grow leading-relaxed text-balance">{chap.desc}</p>
                  
                  <Link href={`/math-lessons/${level}/${chap.id}`} className="w-full py-3.5 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30 hover:bg-fuchsia-500 hover:text-white shadow-lg shrink-0 text-center">
                    เข้าสู่บทเรียน <PlayCircle size={20} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-fuchsia-900/20 border-2 border-fuchsia-500/30 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-10 -top-10 text-fuchsia-500/5 pointer-events-none"><Target size={250} strokeWidth={1} /></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <Star className="text-fuchsia-400 animate-pulse" fill="currentColor" size={32} />
                  <h3 className="text-3xl font-black text-white">ด่านท้าทายประจำเทอม 1</h3>
                </div>
                <p className="text-fuchsia-200/80 font-medium text-lg text-balance">ประเมินความเร็วและทักษะการคำนวณด้วยกล้อง AI เลือกระดับความยากที่ต้องการ!</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <Link href={`/math-lessons/${level}/challenge1/easy`} className="bg-emerald-500/10 border-2 border-emerald-500/30 hover:bg-emerald-500 text-emerald-400 hover:text-slate-900 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-lg min-w-[140px]">
                  <span>🟢 ง่าย</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
                <Link href={`/math-lessons/${level}/challenge1/medium`} className="bg-amber-500/10 border-2 border-amber-500/30 hover:bg-amber-500 text-amber-400 hover:text-slate-900 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-lg min-w-[140px]">
                  <span>🟡 กลาง</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
                <Link href={`/math-lessons/${level}/challenge1/hard`} className="bg-rose-500/10 border-2 border-rose-500/30 hover:bg-rose-500 text-rose-400 hover:text-slate-900 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-lg min-w-[140px]">
                  <span>🔴 ยาก</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ภาคเรียนที่ 2 ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-indigo-500 text-white font-black px-5 py-2 rounded-xl text-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">ภาคเรียนที่ 2</div>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {data.term2.map((chap: any, idx: number) => {
              const Icon = chap.icon;
              return (
                <div key={idx} className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:border-indigo-500/30 flex flex-col h-full group">
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${chap.color} shadow-lg mb-6 border-2 border-white/10 group-hover:rotate-6 transition-transform shrink-0`}>
                    <Icon size={40} />
                  </div>
                  <h3 className="text-2xl font-black mb-2 text-white leading-snug text-balance">{chap.title}</h3>
                  <p className="text-slate-400 font-medium mb-8 flex-grow leading-relaxed text-balance">{chap.desc}</p>
                  
                  <Link href={`/math-lessons/${level}/${chap.id}`} className="w-full py-3.5 rounded-xl font-black transition-all flex items-center justify-center gap-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500 hover:text-white shadow-lg shrink-0 text-center">
                    เข้าสู่บทเรียน <PlayCircle size={20} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-slate-900 to-indigo-900/20 border-2 border-indigo-500/30 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-10 -top-10 text-indigo-500/5 pointer-events-none"><ShieldAlert size={250} strokeWidth={1} /></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                  <Star className="text-indigo-400 animate-pulse" fill="currentColor" size={32} />
                  <h3 className="text-3xl font-black text-white">ด่านท้าทายประจำเทอม 2</h3>
                </div>
                <p className="text-indigo-200/80 font-medium text-lg text-balance">ทดสอบตรรกะ เรขาคณิต และการแก้สมการ พร้อมลุย!</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <Link href={`/math-lessons/${level}/challenge2/easy`} className="bg-emerald-500/10 border-2 border-emerald-500/30 hover:bg-emerald-500 text-emerald-400 hover:text-slate-900 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-lg min-w-[140px]">
                  <span>🟢 ง่าย</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
                <Link href={`/math-lessons/${level}/challenge2/medium`} className="bg-amber-500/10 border-2 border-amber-500/30 hover:bg-amber-500 text-amber-400 hover:text-slate-900 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-lg min-w-[140px]">
                  <span>🟡 กลาง</span><ChevronRight className="group-hover:translate-x-1" />
                </Link>
                <Link href={`/math-lessons/${level}/challenge2/hard`} className="bg-rose-500/10 border-2 border-rose-500/30 hover:bg-rose-500 text-rose-400 hover:text-slate-900 px-6 py-4 rounded-2xl font-black flex justify-between items-center transition-all group shadow-lg min-w-[140px]">
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