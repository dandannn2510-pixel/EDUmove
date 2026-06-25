'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Lightbulb, CheckCircle2, XCircle, Sparkles, BrainCircuit } from 'lucide-react';
import { allQuestions } from '@/data/allQuestions';

export default function DynamicAnswersPage() {
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);

  const grade = params.grade as string;
  const chapter = params.chapter as string;
  const type = params.type as string;

  const quizBundle = allQuestions[grade]?.[chapter]?.[type];

  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return null;

  if (!quizBundle) return <div className="text-center p-20 text-white">ไม่พบข้อมูลเฉลย</div>;

  return (
    <main className="min-h-screen bg-[#090e17] text-white relative font-sans py-12 px-4 md:px-8 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400;600;800;900&display=swap');` }} />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-5xl mx-auto" style={{ fontFamily: "'Kanit', sans-serif" }}>
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <Link href={`/quiz/${grade}/${chapter}/${type}/summary`} className="inline-flex items-center gap-2 text-slate-400 hover:text-yellow-400 transition-colors font-bold bg-slate-900 px-6 py-3 rounded-full border border-slate-700 shadow-lg">
            <ArrowLeft size={20} /> ย้อนกลับไปหน้าคะแนน
          </Link>
          <div className="flex items-center gap-4 bg-yellow-500/10 border border-yellow-500/30 px-6 py-3 rounded-2xl">
            <Sparkles className="text-yellow-400 animate-pulse" />
            <h1 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">
              วิเคราะห์คำตอบ ({type === 'pretest' ? 'Pre-test' : 'Post-test'})
            </h1>
          </div>
        </div>

        <div className="space-y-12">
          {quizBundle.questions.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/80 border border-slate-700 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative"
            >
              <div className="flex gap-4 items-start mb-8">
                <div className="bg-gradient-to-br from-yellow-400 to-amber-600 w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                  <span className="text-2xl font-black text-slate-900">{index + 1}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-relaxed pt-1">
                  {item.q}
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { text: `A. ${item.choiceA}`, code: 'A' },
                  { text: `B. ${item.choiceB}`, code: 'B' },
                  { text: `C. ${item.choiceC}`, code: 'C' },
                  { text: `D. ${item.choiceD}`, code: 'D' }
                ].map((choice, cIndex) => {
                  const isCorrect = choice.code === item.ans;
                  return (
                    <div 
                      key={cIndex} 
                      className={`relative overflow-hidden p-5 rounded-2xl border-2 flex items-center gap-4 font-bold text-lg md:text-xl ${
                        isCorrect ? 'bg-emerald-900/30 border-emerald-500 text-white' : 'bg-slate-800/50 border-slate-700 text-slate-400'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 size={28} className="text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle size={28} className="text-slate-600 shrink-0 opacity-50" />
                      )}
                      <span>{choice.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-indigo-900/40 to-blue-900/20 border border-indigo-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden">
                <BrainCircuit size={150} className="absolute -right-10 -bottom-10 text-indigo-500/10 pointer-events-none" />
                <div className="flex items-center gap-3 mb-3">
                  <Lightbulb size={24} className="text-yellow-400" />
                  <span className="font-black text-xl text-indigo-300 uppercase">คำอธิบายทางวิทยาศาสตร์</span>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed font-medium">
                  {item.explanation || 'สารพันธุกรรมและโครงสร้างควบคุมการแสดงออกลักษณะนี้อย่างเป็นระบบตามหลักวิจัย'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 mb-8 flex justify-center">
          <Link href={`/lessons/${grade}/${chapter}`} className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-black text-xl shadow-[0_0_40px_rgba(37,99,235,0.4)] flex items-center gap-3">
            เสร็จสิ้นการทบทวน <ArrowRight size={24} />
          </Link>
        </div>

      </div>
    </main>
  );
}