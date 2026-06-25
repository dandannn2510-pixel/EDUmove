'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

// 🚀 ดึงระบบ "เกมชูมือเลือกคำตอบ (4 ตัวเลือก)" ของเดิมที่มีอยู่แล้วมาใช้เลย!
import CameraDetection from '@/components/CameraDetection';

// 📚 ฐานข้อมูลข้อสอบคณิตศาสตร์ (ปรับให้มี 4 ตัวเลือก A, B, C, D ตามระบบกล้องเดิม)
const mathQuizData: Record<string, any> = {
  p4: {
    chapter1: {
      easy: [
        { q: "100,000 + 50,000 เท่ากับเท่าไร?", choiceA: "105,000", choiceB: "150,000", choiceC: "155,000", choiceD: "200,000", ans: "B" },
        { q: "ข้อใดมีค่ามากกว่า 500,000?", choiceA: "499,999", choiceB: "500,000", choiceC: "500,001", choiceD: "450,000", ans: "C" },
        { q: "ค่าประจำหลักของเลข 7 ใน 70,000 คือ?", choiceA: "หลักร้อย", choiceB: "หลักพัน", choiceC: "หลักหมื่น", choiceD: "หลักแสน", ans: "C" }
      ],
      hard: [
        { q: "850,000 - 320,000 เท่ากับเท่าไร?", choiceA: "520,000", choiceB: "530,000", choiceC: "540,000", choiceD: "550,000", ans: "B" },
        { q: "(10,000 x 2) + 5,000 เท่ากับ?", choiceA: "20,000", choiceB: "25,000", choiceC: "30,000", choiceD: "35,000", ans: "B" }
      ]
    }
  }
};

export default function MathQuizPage() {
  const params = useParams();
  const router = useRouter();

  const grade = params.grade as string;
  const chapter = params.chapter as string;
  const type = params.type as string; 

  // ค้นหาข้อสอบจากฐานข้อมูล
  const questions = mathQuizData[grade]?.[chapter]?.[type];

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white p-6 text-center" style={{ fontFamily: "'Kanit', sans-serif" }}>
        <AlertCircle size={80} className="text-fuchsia-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-black text-fuchsia-400 mb-4">ยังไม่มีข้อสอบในระบบ</h1>
        <p className="text-slate-400 text-lg mb-8 max-w-md">
          คุณครูยังไม่ได้เพิ่มคำถามสำหรับ ชั้น {grade} บทที่ {chapter} โหมด {type}
        </p>
        <button onClick={() => router.back()} className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 rounded-full font-bold transition-all border border-slate-700">
          กลับไปหน้าบทเรียน
        </button>
      </div>
    );
  }

  const gradeText = grade === 'p4' ? 'ป.4' : grade === 'p5' ? 'ป.5' : 'ป.6';
  const typeText = type === 'easy' ? 'Pre-test' : 'Post-test';
  const chapterNumber = chapter.replace('chapter', '');
  const expName = `คณิตศาสตร์ ${gradeText} บทที่ ${chapterNumber} : ${typeText}`;

  return (
    <div className="w-full h-screen bg-[#020617] overflow-hidden">
      {/* 🚀 ส่งข้อสอบไปให้กล้อง CameraDetection ตัวเก่งของคุณครูทำงานได้เลย! */}
      <CameraDetection 
        questions={questions}
        onFinish={() => router.back()} // เล่นเสร็จให้เด้งกลับหน้าเดิม
        experimentName={expName}
      />
    </div>
  );
}