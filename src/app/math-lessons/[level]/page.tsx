'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Calculator, Shapes, Sigma, PlayCircle, ChevronRight, Star, 
  Clock, PieChart, Percent, Box, Ruler, LineChart, DivideCircle, Hash
} from 'lucide-react';

interface ChapterItem {
  id: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  color: string;
}

interface GradeData {
  title: string;
  term1: ChapterItem[];
  term2: ChapterItem[];
}

const mathData: Record<string, GradeData> = {
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
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] relative font-sans overflow-x-hidden pb-20 selection:bg-fuchsia-200 selection:text-fuchsia-900" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:32px_32px] opacity-50 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        
        <header className="mb-16 text-center md:text-left">
          <div className="inline-block rounded-full border-2 border-slate-900 bg-fuchsia-300 px-6 py-2 text-sm font-bold uppercase tracking-wider text-slate-900 mb-6 shadow-[4px_4px_0_0_#0F172A]">
            หลักสูตรคณิตศาสตร์
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6">
            {data.title}
          </h1>
        </header>

        {/* ================= ภาคเรียนที่ 1 ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-6 mb-10">
            <div className="bg-fuchsia-600 text-white font-black px-6 py-3 rounded-2xl text-2xl border-4 border-slate-900 shadow-[6px_6px_0_0_#0F172A]">ภาคเรียนที่ 1</div>
            <div className="h-2 flex-1 bg-slate-900 dark:bg-slate-700 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {data.term1.map((chap: ChapterItem, idx: number) => {
              const Icon = chap.icon;
              return (
                <div key={idx} className="group flex flex-col rounded-[2.5rem] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000] transition-all">
                  <div className={`w-20 h-20 rounded-[1.5rem] border-4 border-slate-900 bg-gradient-to-br ${chap.color} flex items-center justify-center mb-6`}>
                    <Icon size={40} className="text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">{chap.title}</h3>
                  <p className="font-bold text-slate-600 dark:text-slate-400 mb-8 flex-grow leading-relaxed">{chap.desc}</p>
                  
                  <Link href={`/math-lessons/${level}/${chap.id}`} className="w-full bg-slate-100 dark:bg-slate-700 text-center py-4 rounded-2xl font-black text-slate-800 dark:text-white group-hover:bg-fuchsia-500 group-hover:text-white border-4 border-transparent group-hover:border-slate-900 transition-colors active:scale-95 flex justify-center items-center gap-2">
                    เข้าสู่เนื้อหา <PlayCircle size={20} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="bg-fuchsia-400 rounded-[2.5rem] p-8 md:p-12 border-4 border-slate-900 shadow-[8px_8px_0_0_#0F172A]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <Star size={48} className="text-slate-900 fill-slate-900" />
                  <h3 className="text-4xl font-black text-slate-900">ด่านท้าทายเทอม 1</h3>
                </div>
                <p className="text-xl font-bold text-slate-900 opacity-80">ประเมินความเร็วและทักษะการคำนวณด้วยกล้อง AI</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <Link href={`/math-lessons/${level}/challenge1/easy`} className="bg-white text-emerald-600 px-6 py-4 rounded-2xl font-black text-xl border-4 border-slate-900 border-b-[8px] active:border-b-4 active:translate-y-[4px] hover:bg-slate-50 transition-all flex justify-between items-center gap-4 min-w-[150px]"><span>🟢 ง่าย</span><ChevronRight strokeWidth={3} /></Link>
                <Link href={`/math-lessons/${level}/challenge1/medium`} className="bg-white text-amber-500 px-6 py-4 rounded-2xl font-black text-xl border-4 border-slate-900 border-b-[8px] active:border-b-4 active:translate-y-[4px] hover:bg-slate-50 transition-all flex justify-between items-center gap-4 min-w-[150px]"><span>🟡 กลาง</span><ChevronRight strokeWidth={3} /></Link>
                <Link href={`/math-lessons/${level}/challenge1/hard`} className="bg-white text-rose-500 px-6 py-4 rounded-2xl font-black text-xl border-4 border-slate-900 border-b-[8px] active:border-b-4 active:translate-y-[4px] hover:bg-slate-50 transition-all flex justify-between items-center gap-4 min-w-[150px]"><span>🔴 ยาก</span><ChevronRight strokeWidth={3} /></Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ภาคเรียนที่ 2 ================= */}
        <section className="mb-20">
          <div className="flex items-center gap-6 mb-10">
            <div className="bg-indigo-500 text-white font-black px-6 py-3 rounded-2xl text-2xl border-4 border-slate-900 shadow-[6px_6px_0_0_#0F172A]">ภาคเรียนที่ 2</div>
            <div className="h-2 flex-1 bg-slate-900 dark:bg-slate-700 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {data.term2.map((chap: ChapterItem, idx: number) => {
              const Icon = chap.icon;
              return (
                <div key={idx} className="group flex flex-col rounded-[2.5rem] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#0F172A] dark:hover:shadow-[12px_12px_0_0_#000] transition-all">
                  <div className={`w-20 h-20 rounded-[1.5rem] border-4 border-slate-900 bg-gradient-to-br ${chap.color} flex items-center justify-center mb-6`}>
                    <Icon size={40} className="text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">{chap.title}</h3>
                  <p className="font-bold text-slate-600 dark:text-slate-400 mb-8 flex-grow leading-relaxed">{chap.desc}</p>
                  
                  <Link href={`/math-lessons/${level}/${chap.id}`} className="w-full bg-slate-100 dark:bg-slate-700 text-center py-4 rounded-2xl font-black text-slate-800 dark:text-white group-hover:bg-indigo-500 group-hover:text-white border-4 border-transparent group-hover:border-slate-900 transition-colors active:scale-95 flex justify-center items-center gap-2">
                    เข้าสู่เนื้อหา <PlayCircle size={20} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="bg-indigo-400 rounded-[2.5rem] p-8 md:p-12 border-4 border-slate-900 shadow-[8px_8px_0_0_#0F172A]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <Star size={48} className="text-slate-900 fill-slate-900" />
                  <h3 className="text-4xl font-black text-slate-900">ด่านท้าทายเทอม 2</h3>
                </div>
                <p className="text-xl font-bold text-slate-900 opacity-80">ทดสอบตรรกะ เรขาคณิต และการแก้สมการ</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <Link href={`/math-lessons/${level}/challenge2/easy`} className="bg-white text-emerald-600 px-6 py-4 rounded-2xl font-black text-xl border-4 border-slate-900 border-b-[8px] active:border-b-4 active:translate-y-[4px] hover:bg-slate-50 transition-all flex justify-between items-center gap-4 min-w-[150px]"><span>🟢 ง่าย</span><ChevronRight strokeWidth={3} /></Link>
                <Link href={`/math-lessons/${level}/challenge2/medium`} className="bg-white text-amber-500 px-6 py-4 rounded-2xl font-black text-xl border-4 border-slate-900 border-b-[8px] active:border-b-4 active:translate-y-[4px] hover:bg-slate-50 transition-all flex justify-between items-center gap-4 min-w-[150px]"><span>🟡 กลาง</span><ChevronRight strokeWidth={3} /></Link>
                <Link href={`/math-lessons/${level}/challenge2/hard`} className="bg-white text-rose-500 px-6 py-4 rounded-2xl font-black text-xl border-4 border-slate-900 border-b-[8px] active:border-b-4 active:translate-y-[4px] hover:bg-slate-50 transition-all flex justify-between items-center gap-4 min-w-[150px]"><span>🔴 ยาก</span><ChevronRight strokeWidth={3} /></Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}