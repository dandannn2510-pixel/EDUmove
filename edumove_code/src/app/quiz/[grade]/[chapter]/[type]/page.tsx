'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import CameraDetection from '@/components/CameraDetection';
import { allQuestions } from '@/data/allQuestions';
import Link from 'next/link';

export default function DynamicQuizPage() {
  const params = useParams();
  const router = useRouter();

  const grade = params.grade as string;
  const chapter = params.chapter as string;
  const type = params.type as string; // pretest หรือ posttest

  // ดึงชุดคำถามแบบ Dynamic
  const quizBundle = allQuestions[grade]?.[chapter]?.[type];

  // กรณีหาชุดคำถามไม่เจอ (เช่น พิมพ์ URL มั่ว) จะไม่ crash แต่จะขึ้นหน้าเตือนสวยๆ
  if (!quizBundle) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center font-sans">
        <h2 className="text-3xl font-black text-rose-400 mb-4">⚠️ ไม่พบชุดบทเรียนนี้</h2>
        <p className="text-slate-400 mb-8">คุณครูอาจยังไม่ได้ระบุโจทย์คำถามในไฟล์ allQuestions.ts ครับ</p>
        <Link href="/" className="px-6 py-3 bg-slate-800 rounded-xl font-bold hover:bg-slate-700">กลับหน้าหลัก</Link>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-slate-950 overflow-hidden">
      <CameraDetection 
        questions={quizBundle.questions}
        experimentName={quizBundle.title}
        onFinish={() => router.push(`/quiz/${grade}/${chapter}/${type}/summary`)} 
        onSkip={() => router.push(`/lessons/${grade}/${chapter}`)}
        onViewAnswers={() => router.push(`/quiz/${grade}/${chapter}/${type}/answers`)}
      />
    </div>
  );
}