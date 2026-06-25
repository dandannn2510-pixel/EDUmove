'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  FlaskConical, Lightbulb, ArrowLeft, Trophy, 
  PlayCircle, Camera, Target, Gamepad2, Users, Hand, Timer, Activity, Brain, Focus 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import SinglePlayerCamera from '@/components/SinglePlayerCamera';
import CameraDetection from '@/components/CameraDetection';
import TugOfWarCamera from '@/components/TugOfWarCamera';
import { challengeData } from '@/data/challengeData';
import { allQuestions } from '@/data/allQuestions';

// 📚 ฐานข้อมูลข้อสอบวิทยาศาสตร์
const scienceQuizData: Record<string, any> = {
  p4: {
    chapter1: { 
      easy: [
        { q: "สิ่งมีชีวิตจัดกลุ่มได้กี่กลุ่มใหญ่ๆ?", choiceA: "2 กลุ่ม", choiceB: "3 กลุ่ม", choiceC: "4 กลุ่ม", choiceD: "5 กลุ่ม", ans: "B", explanation: "จำแนกได้ 3 กลุ่ม คือ พืช สัตว์ และที่ไม่ใช่พืช/สัตว์" },
        { q: "ข้อใดเป็นลักษณะสำคัญของพืช?", choiceA: "สร้างอาหารเองได้", choiceB: "เคลื่อนที่ได้", choiceC: "หายใจด้วยเหงือก", choiceD: "ไม่มีข้อถูก", ans: "A", explanation: "พืชมีคลอโรฟิลล์ สร้างอาหารผ่านการสังเคราะห์แสง" },
        { q: "เห็ดและรา จัดอยู่ในกลุ่มใด?", choiceA: "กลุ่มพืช", choiceB: "กลุ่มสัตว์", choiceC: "กลุ่มที่ไม่ใช่พืชและสัตว์", choiceD: "สิ่งไม่มีชีวิต", ans: "C", explanation: "ไม่สามารถสร้างอาหารเองได้ และไม่สามารถเคลื่อนที่ได้" },
        { q: "ข้อใดคือสิ่งมีชีวิตกลุ่มสัตว์?", choiceA: "แบคทีเรีย", choiceB: "เฟิร์น", choiceC: "ฟองน้ำ", choiceD: "ปะการัง", ans: "D", explanation: "ปะการัง เป็นสัตว์ที่ไม่มีกระดูกสันหลัง" },
        { q: "กลุ่มใดที่ต้องกินสิ่งมีชีวิตอื่นเป็นอาหาร?", choiceA: "พืช", choiceB: "สัตว์", choiceC: "เห็ดรา", choiceD: "แบคทีเรีย", ans: "B", explanation: "สัตว์ไม่สามารถสร้างอาหารเองได้" }
      ],
      hard: [
        { q: "ปะการัง และ ดอกไม้ทะเล จัดเป็นสิ่งมีชีวิตกลุ่มใด?", choiceA: "พืช", choiceB: "สัตว์", choiceC: "แบคทีเรีย", choiceD: "เห็ดรา", ans: "B", explanation: "ปะการังและดอกไม้ทะเลคือสัตว์น้ำชนิดหนึ่ง ไม่มีกระดูกสันหลัง" },
        { q: "ยีสต์ (Yeast) จัดอยู่ในกลุ่มใด?", choiceA: "พืช", choiceB: "สัตว์", choiceC: "จุลินเทรีย์/เห็ดรา", choiceD: "ปรสิต", ans: "C", explanation: "ยีสต์จัดเป็นเชื้อราเซลล์เดียว ที่ใช้ทำขนมปัง" },
        { q: "เหตุใด 'ฟองน้ำ' จึงถูกจัดเป็นสัตว์?", choiceA: "มีระบบประสาท", choiceB: "มีตาและปาก", choiceC: "กินอาหารผ่านเซลล์", choiceD: "เดินได้", ans: "C", explanation: "ฟองน้ำไม่มีอวัยวะ แต่กรองกินแบคทีเรียเป็นอาหาร" }
      ]
    }
  }
};

export default function ScienceDynamicQuizPage() {
  const params = useParams();
  const router = useRouter();

  const [showAnswers, setShowAnswers] = useState(false);
  const [gameState, setGameState] = useState<'INSTRUCTIONS' | 'PLAYING' | 'SUMMARY'>('INSTRUCTIONS');
  
  // 🟢 State สำหรับเก็บคะแนนจริง
  const [finalScore, setFinalScore] = useState(0); // สำหรับคะแนนเดี่ยว (Challenge)
  const [leftScore, setLeftScore] = useState(0);   // สำหรับทีมซ้าย
  const [rightScore, setRightScore] = useState(0); // สำหรับทีมขวา

  const grade = (params?.grade as string) || 'p4';
  const chapterOrChallenge = (params?.chapter as string) || 'chapter1'; 
  const difficulty = (params?.difficulty as string) || 'easy'; 

  const isChallenge = chapterOrChallenge.includes('challenge');
  
  const questions: any[] = React.useMemo(() => {
    const rawQuestions = isChallenge 
      ? challengeData[grade]?.[chapterOrChallenge]?.[difficulty] || []
      : (scienceQuizData[grade]?.[chapterOrChallenge]?.[difficulty] || 
         allQuestions[grade]?.[chapterOrChallenge]?.[difficulty === 'easy' ? 'pretest' : 'posttest']?.questions || []);

    if (grade === 'p5' && chapterOrChallenge === 'chapter7' && rawQuestions.length > 0) {
      // สุ่มลำดับข้อสอบทั้งหมด
      const shuffled = [...rawQuestions].sort(() => Math.random() - 0.5);
      if (difficulty === 'easy') {
        // Pre-test: สุ่ม 10 ข้อ จากคลังข้อสอบ 20 ข้อ
        return shuffled.slice(0, 10);
      } else {
        // Post-test: สุ่มข้อสอบทั้งหมด 20 ข้อ (ระบบชักเย่อจะเล่นไปเรื่อยๆ จนกว่าแถบพลังจะสุด)
        return shuffled;
      }
    }
    return rawQuestions;
  }, [grade, chapterOrChallenge, difficulty, isChallenge]);

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] flex flex-col items-center justify-center p-6 text-center" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:32px_32px] opacity-50 pointer-events-none"></div>
        <div className="relative z-10 bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-10 rounded-[2.5rem] shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] max-w-md w-full flex flex-col items-center">
          <FlaskConical size={80} className="text-emerald-500 mb-6 animate-pulse" />
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-6">ยังไม่มีข้อสอบในระบบ 🚧</h1>
          <button onClick={() => router.back()} className="w-full py-4 bg-amber-300 hover:bg-amber-400 text-slate-900 font-black text-xl border-4 border-slate-900 rounded-2xl shadow-[4px_4px_0_0_#0F172A] active:translate-y-1 active:shadow-none transition-all">
            กลับไปหน้าบทเรียน
          </button>
        </div>
      </div>
    );
  }

  // 🟢 ฟังก์ชันจบเกม
  const finishGame = (arg1?: any, arg2?: any) => {
    if (isChallenge) {
      setFinalScore(typeof arg1 === 'number' ? arg1 : (arg1?.score || 0));
    } else {
      let lScore = 0;
      let rScore = 0;

      if (typeof arg1 === 'number' && typeof arg2 === 'number') {
        lScore = arg1;
        rScore = arg2;
      } else if (typeof arg1 === 'object' && arg1 !== null) {
        lScore = arg1.leftScore ?? arg1.left ?? 0;
        rScore = arg1.rightScore ?? arg1.right ?? 0;
      } else if (typeof arg1 === 'number') {
        lScore = arg1;
      }

      setLeftScore(lScore);
      setRightScore(rScore);
    }
    
    setGameState('SUMMARY');
  };

  if (showAnswers) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-white p-6 md:p-12 overflow-y-auto relative" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:32px_32px] opacity-50 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto pb-20 relative z-10">
          <div className="flex items-center justify-between mb-10">
            <button onClick={() => setShowAnswers(false)} className="inline-flex items-center gap-2 text-slate-700 bg-white border-4 border-slate-900 px-6 py-3 rounded-2xl font-black shadow-[4px_4px_0_0_#0F172A] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all dark:bg-slate-800 dark:text-white dark:border-slate-700">
              <ArrowLeft size={20} strokeWidth={3} /> กลับไปหน้าเกม
            </button>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <Lightbulb size={40} className="text-amber-500 animate-pulse" /> เฉลยข้อสอบพร้อมคำอธิบาย
          </h1>
          <div className="space-y-8">
            {questions.map((q: any, i: number) => (
              <div key={i} className="bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-6 md:p-8 rounded-[2.5rem] shadow-[6px_6px_0_0_#0F172A] dark:shadow-[6px_6px_0_0_#000000]">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6"><span className="text-emerald-500 dark:text-emerald-400 mr-2">ข้อที่ {i+1}:</span>{q.q}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['A', 'B', 'C', 'D'].map(choice => {
                    const isCorrect = q.ans === choice;
                    return (
                      <div key={choice} className={`p-4 rounded-2xl border-4 font-bold text-lg transition-all ${
                        isCorrect 
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' 
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400'
                      }`}>
                        <span className="font-black mr-1">{choice}.</span> {q[`choice${choice}`]}
                      </div>
                    );
                  })}
                </div>
                {q.explanation && (
                  <div className="mt-6 p-5 bg-blue-50 dark:bg-slate-900/50 border-2 border-slate-900 dark:border-slate-700 rounded-2xl flex gap-3 text-slate-700 dark:text-slate-300">
                    <Lightbulb size={24} className="text-amber-500 shrink-0" />
                    <div>
                      <h4 className="font-black text-sm text-slate-900 dark:text-white mb-1">คำอธิบายเฉลย:</h4>
                      <p className="font-medium text-base leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const gradeText = grade === 'p4' ? '4' : grade === 'p5' ? '5' : '6';
  let expName = "";
  let ruleTitle = "";
  let icon = null;
  let instructionsList = [];

  if (isChallenge) {
    expName = `ด่านท้าทายระดับ ป.${gradeText}`;
    ruleTitle = "ด่านท้าทาย (Hand Tracking)";
    icon = <Hand className="text-amber-500" size={40} />;
    instructionsList = [
      { icon: <Focus className="text-blue-500" />, title: "1. เตรียมพร้อม", desc: "ยืนตรงหน้ากล้อง ให้ระบบตรวจจับฝ่ามือของคุณ" },
      { icon: <Hand className="text-emerald-500" />, title: "2. เลือกคำตอบ", desc: "ชูมือค้างไว้หน้ากล้อง แล้วขยับมือไปทางซ้ายหรือขวาเพื่อเลือกคำตอบ" },
      { icon: <Timer className="text-rose-500" />, title: "3. ค้างมือไว้เพื่อยืนยัน", desc: "ชูมือค้างไว้ตรงฝั่งตัวเลือก 1-2 วินาที จนกระทั่งวงเกจสีน้ำเงิน/ชมพูโหลดเต็ม" },
    ];
  } else {
    const typeText = difficulty === 'easy' ? 'Pre-test' : 'Post-test';
    expName = `ป.${gradeText} : ${typeText}`;
    if (difficulty === 'easy') {
      ruleTitle = "Pre-test (โหมดชูมือตอบคำถาม)";
      icon = <Camera className="text-blue-500" size={40} />;
      instructionsList = [
        { icon: <Users className="text-indigo-500" />, title: "1. แบ่งทีมผู้เล่น", desc: "แบ่งนักเรียนออกเป็น 2 ทีม (ฝั่งซ้าย และ ฝั่งขวา)" },
        { icon: <Hand className="text-emerald-500" />, title: "2. ชี้ป้ายคำตอบ", desc: "ส่งตัวแทนยื่นมือไปทับตัวเลือกข้อสอบ (A, B, C, D) ที่คิดว่าถูกต้อง" },
        { icon: <Timer className="text-amber-500" />, title: "3. ค้างมือไว้เพื่อยืนยัน", desc: "ชูมือค้างไว้ 1-2 วินาที จนกระทั่งเกจสีเขียวโหลดเต็ม" },
        { icon: <Trophy className="text-rose-500" />, title: "4. ตัดสินคะแนน", desc: "ทีมที่ตอบได้ถูกต้องจะได้รับคะแนนในข้อนั้นๆ ไปครอง!" },
      ];
    } else {
      ruleTitle = "Post-test (มินิเกมชักเย่อวัดความไว)";
      icon = <Target className="text-emerald-500" size={40} />;
      instructionsList = [
        { icon: <Users className="text-indigo-500" />, title: "1. แบ่งทีมผู้เล่น", desc: "แบ่งนักเรียนออกเป็น 2 ทีม (ฝั่งซ้าย และ ฝั่งขวา)" },
        { icon: <Brain className="text-blue-500" />, title: "2. เตรียมคำตอบ", desc: "อ่านโจทย์คำถามบนหน้าจอ แล้วเลือกคำตอบที่ถูกต้องไว้ในใจ" },
        { icon: <Activity className="text-emerald-500" />, title: "3. ขยับร่างกายสร้างพลัง", desc: "เมื่อสัญญาณดังขึ้น ให้ขยับร่างกายหน้ากล้องให้เร็วที่สุดเพื่อเพิ่มแรงดึงชักเย่อ!" },
        { icon: <Trophy className="text-rose-500" />, title: "4. ดึงเชือกเอาชนะ", desc: "ทีมที่สร้างแรงดึงชักเย่อได้มากกว่า จะเป็นผู้ชนะในข้อนั้นไป" },
      ];
    }
  }

  return (
    <div className="w-full h-screen bg-[#F8FAFC] dark:bg-[#0F172A] overflow-hidden relative" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:32px_32px] opacity-50 pointer-events-none"></div>

      {/* 🟢 1. หน้ากติกาการเล่น */}
      <AnimatePresence>
        {gameState === 'INSTRUCTIONS' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md">
            <div className="bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 rounded-[2.5rem] max-w-3xl w-full shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] overflow-hidden flex flex-col max-h-[90vh] relative z-10">
              {/* Dotted pattern inside card */}
              <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:24px_24px] opacity-40 pointer-events-none rounded-[2.5rem]" />
              
              <div className="text-center p-6 sm:p-8 border-b-4 border-slate-900 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm relative z-10">
                <div className="w-20 h-20 bg-amber-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border-4 border-slate-900 shadow-sm relative z-10">
                  {icon}
                </div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 relative z-10">{ruleTitle}</h2>
                <div className="inline-block bg-emerald-100 dark:bg-emerald-950/50 px-4 py-1.5 rounded-full border-2 border-slate-900 relative z-10">
                  <p className="text-emerald-700 dark:text-emerald-400 font-black text-sm">📝 แบบทดสอบจำนวน {questions.length} ข้อ</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1 bg-transparent relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                  {instructionsList.map((step, idx) => (
                    <div key={idx} className="bg-slate-50/90 dark:bg-slate-700/90 backdrop-blur-sm border-4 border-slate-900 p-5 rounded-2xl flex gap-4 items-start shadow-sm relative z-10">
                      <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl shrink-0 border-2 border-slate-900 relative z-10">
                        {step.icon}
                      </div>
                      <div className="relative z-10">
                        <h4 className="text-slate-900 dark:text-white font-black text-lg mb-1">{step.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm font-bold leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-sm border-t-4 border-slate-900 flex flex-col sm:flex-row gap-4 relative z-10">
                <button onClick={() => router.back()} className="sm:w-1/3 py-4 rounded-xl font-black text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border-2 border-transparent relative z-10">
                  ย้อนกลับ
                </button>
                <button onClick={() => setGameState('PLAYING')} className="sm:w-2/3 bg-amber-300 hover:bg-amber-400 text-slate-900 border-4 border-slate-900 py-4 rounded-xl font-black text-xl shadow-[4px_4px_0_0_#0F172A] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 relative z-10">
                  <PlayCircle size={24} /> เริ่มเล่นเกมแข่งกันเลย!
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🟢 2. หน้าจอเล่นเกม */}
      {gameState === 'PLAYING' && (
        <>
          <button onClick={() => setShowAnswers(true)} className="absolute bottom-6 right-6 z-[100] bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 border-4 border-slate-900 hover:bg-amber-300 dark:hover:bg-amber-400 dark:border-slate-700 transition-all shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000000] active:translate-y-0.5 active:shadow-none">
            <Lightbulb size={20} className="text-amber-500" /> ดูเฉลย
          </button>

          {isChallenge ? (
            /* @ts-ignore */
            <SinglePlayerCamera questions={questions} onExit={finishGame} onFinish={finishGame} experimentName={expName} />
          ) : difficulty === 'hard' ? (
            /* @ts-ignore */
            <TugOfWarCamera questions={questions} onFinish={finishGame} onExit={finishGame} experimentName={expName} />
          ) : (
            /* @ts-ignore */
            <CameraDetection questions={questions} onFinish={finishGame} onExit={finishGame} onViewAnswers={() => setShowAnswers(true)} experimentName={expName} />
          )}
        </>
      )}

      {/* 🟢 3. หน้าสรุปคะแนน */}
      <AnimatePresence>
        {gameState === 'SUMMARY' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md">
            
            {isChallenge ? (
              /* 🟢 3.1 สรุปคะแนน: แบบผู้เล่นคนเดียว (Challenge) */
              <div className="bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 rounded-[2.5rem] p-8 sm:p-10 max-w-xl w-full text-center shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] relative overflow-hidden">
                {/* Dotted pattern inside card */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:24px_24px] opacity-40 pointer-events-none rounded-[2.5rem]" />

                <div className="relative z-10 w-24 h-24 bg-emerald-100 dark:bg-slate-700 border-4 border-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Trophy size={48} className="text-emerald-500" />
                </div>
                <h2 className="relative z-10 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">ทดสอบเสร็จสิ้น!</h2>
                <p className="relative z-10 text-lg font-black text-slate-500 dark:text-slate-400 mb-8">{expName}</p>
                <div className="relative z-10 bg-slate-50/90 dark:bg-slate-900/90 border-4 border-slate-900 rounded-[2rem] p-8 mb-8 shadow-[4px_4px_0_0_#0F172A] dark:shadow-[4px_4px_0_0_#000]">
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">คะแนนของคุณ</p>
                  <div className="text-6xl md:text-7xl font-black text-emerald-500 tracking-tighter">
                    {finalScore} <span className="text-3xl text-slate-400">/ {questions.length}</span>
                  </div>
                </div>
                <button onClick={() => router.back()} className="relative z-10 w-full bg-amber-300 hover:bg-amber-400 text-slate-900 border-4 border-slate-900 py-4 rounded-xl font-black text-lg shadow-[4px_4px_0_0_#0F172A] active:translate-y-1 active:shadow-none transition-all">
                  กลับไปหน้าบทเรียน
                </button>
              </div>

            ) : (
              /* 🟢 3.2 สรุปคะแนน: แบบแบ่งฝั่ง ซ้าย-ขวา (Pre/Post-test) */
              <div className="bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 rounded-[2.5rem] p-8 sm:p-10 max-w-2xl w-full text-center shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] relative overflow-hidden">
                {/* Dotted pattern inside card */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:24px_24px] opacity-40 pointer-events-none rounded-[2.5rem]" />

                <div className="relative z-10 w-20 h-20 bg-amber-100 dark:bg-slate-700 border-4 border-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Trophy size={44} className="text-amber-500" />
                </div>
                <h2 className="relative z-10 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">สรุปผลการแข่งขัน!</h2>
                <p className="relative z-10 text-slate-500 dark:text-slate-400 font-black mb-8">{expName}</p>
                
                <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-6 my-6">
                  {/* ทีมฝั่งซ้าย */}
                  <div className={`p-6 sm:p-8 rounded-3xl border-4 transition-all relative overflow-hidden border-slate-900 ${leftScore > rightScore ? 'bg-blue-300 text-slate-900 shadow-[4px_4px_0_0_#0F172A]' : 'bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500'}`}>
                    <h3 className="text-lg font-black mb-2 flex items-center justify-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div> ฝั่งซ้าย
                    </h3>
                    <div className="text-7xl font-black tracking-tighter my-4">{leftScore}</div>
                    <div className={`h-8 transition-opacity ${leftScore > rightScore ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="inline-flex items-center gap-1 text-xs font-black bg-slate-900 text-white px-4 py-1.5 rounded-full shadow-md">ชนะเลิศ 🏆</span>
                    </div>
                  </div>
                  
                  {/* ทีมฝั่งขวา */}
                  <div className={`p-6 sm:p-8 rounded-3xl border-4 transition-all relative overflow-hidden border-slate-900 ${rightScore > leftScore ? 'bg-rose-300 text-slate-900 shadow-[4px_4px_0_0_#0F172A]' : 'bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500'}`}>
                    <h3 className="text-lg font-black mb-2 flex items-center justify-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div> ฝั่งขวา
                    </h3>
                    <div className="text-7xl font-black tracking-tighter my-4">{rightScore}</div>
                    <div className={`h-8 transition-opacity ${rightScore > leftScore ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="inline-flex items-center gap-1 text-xs font-black bg-slate-900 text-white px-4 py-1.5 rounded-full shadow-md">ชนะเลิศ 🏆</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mb-8 mt-2">
                  <div className="inline-flex items-center justify-center gap-2 text-base sm:text-lg font-black text-slate-900 bg-amber-100 border-4 border-slate-900 rounded-2xl py-3 px-6 shadow-[4px_4px_0_0_#0F172A]">
                    {leftScore > rightScore ? '🎉 ยินดีด้วย! ทีมฝั่งซ้ายเป็นฝ่ายชนะ 🎉' 
                     : rightScore > leftScore ? '🎉 ยินดีด้วย! ทีมฝั่งขวาเป็นฝ่ายชนะ 🎉' 
                     : '🤝 ยอดเยี่ยมทั้งสองทีม! คะแนนเสมอกัน 🤝'}
                  </div>
                </div>
                
                <button onClick={() => router.back()} className="relative z-10 w-full bg-amber-300 hover:bg-amber-400 text-slate-900 border-4 border-slate-900 py-4 rounded-xl font-black text-lg shadow-[4px_4px_0_0_#0F172A] active:translate-y-1 active:shadow-none transition-all">
                  กลับไปหน้าบทเรียน
                </button>
              </div>
            )}
            
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}