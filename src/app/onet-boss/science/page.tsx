'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Home, Star, Lock, ArrowRight } from 'lucide-react';

// 🟢 คลังโจทย์ 30 ข้อ แบ่ง 3 ระดับความยาก
const scienceQuestions = [
  // --- LEVEL 1 (ด่าน 1-3) พื้นฐาน ---
  { level: 1, type: 'choice', q: 'ดาวเคราะห์ดวงใดอยู่ใกล้ดวงอาทิตย์ที่สุด?', choices: ['A. โลก', 'B. พุธ', 'C. ศุกร์', 'D. อังคาร'], ans: 'B' },
  { level: 1, type: 'choice', q: 'ศูนย์กลางของระบบสุริยะคืออะไร?', choices: ['A. โลก', 'B. ดวงจันทร์', 'C. ดวงอาทิตย์', 'D. ดาวพฤหัสบดี'], ans: 'C' },
  { level: 1, type: 'choice', q: 'สัตว์ชนิดใดเป็นสัตว์เลี้ยงลูกด้วยนม?', choices: ['A. วาฬ', 'B. ฉลาม', 'C. เพนกวิน', 'D. เต่าทะเล'], ans: 'A' },
  { level: 1, type: 'choice', q: 'ข้อใดจัดเป็นสัตว์ไม่มีกระดูกสันหลัง?', choices: ['A. งู', 'B. หมึกทะเล', 'C. กบ', 'D. ปลาทู'], ans: 'B' },
  { level: 1, type: 'choice', q: 'สัตว์ใดหายใจด้วยเหงือก?', choices: ['A. โลมา', 'B. วาฬ', 'C. ปลาทู', 'D. เต่า'], ans: 'C' },
  { level: 1, type: 'choice', q: 'ข้อใดคือส่วนที่พืชใช้ในการดูดน้ำและแร่ธาตุ?', choices: ['A. ใบ', 'B. ราก', 'C. ลำต้น', 'D. ดอก'], ans: 'B' },
  { level: 1, type: 'choice', q: 'กบจัดอยู่ในสัตว์ประเภทใด?', choices: ['A. สัตว์เลื้อยคลาน', 'B. สัตว์ปีก', 'C. สัตว์สะเทินน้ำสะเทินบก', 'D. สัตว์เลี้ยงลูกด้วยนม'], ans: 'C' },
  { level: 1, type: 'choice', q: 'ในวัฏจักรน้ำ แสงอาทิตย์ทำให้น้ำเกิดการใด?', choices: ['A. ควบแน่น', 'B. ระเหย', 'C. หลอมเหลว', 'D. แข็งตัว'], ans: 'B' },
  { level: 1, type: 'choice', q: 'ดาวเคราะห์ดวงใดสว่างที่สุดเมื่อมองจากโลก?', choices: ['A. ดาวพุธ', 'B. ดาวอังคาร', 'C. ดาวศุกร์', 'D. ดาวเสาร์'], ans: 'C' },
  { level: 1, type: 'choice', q: 'ดาวเคราะห์ที่มีวงแหวนโดดเด่นคือดวงใด?', choices: ['A. ดาวพุธ', 'B. ดาวศุกร์', 'C. ดาวเสาร์', 'D. ดาวอังคาร'], ans: 'C' },

  // --- LEVEL 2 (ด่าน 4-7) ปานกลาง-วิเคราะห์ ---
  { level: 2, type: 'choice', q: 'อวัยวะใดทำหน้าที่สูบฉีดเลือดไปทั่วร่างกาย?', choices: ['A. ปอด', 'B. ตับ', 'C. กระเพาะ', 'D. หัวใจ'], ans: 'D' },
  { level: 2, type: 'choice', q: 'ส่วนประกอบใดของเลือดทำหน้าที่ลำเลียงออกซิเจน?', choices: ['A. เกล็ดเลือด', 'B. พลาสมา', 'C. เม็ดเลือดแดง', 'D. เม็ดเลือดขาว'], ans: 'C' },
  { level: 2, type: 'choice', q: 'ในห่วงโซ่อาหาร: หญ้า -> หนอน -> นก หาก "นก" ลดลง สัตว์ชนิดใดจะเพิ่มขึ้น?', choices: ['A. หญ้า', 'B. หนอน', 'C. งู', 'D. เหยี่ยว'], ans: 'B' },
  { level: 2, type: 'choice', q: 'วงจรไฟฟ้า "อนุกรม" หากหลอดไฟหลอดที่ 1 ขาด หลอดที่ 2 จะเป็นอย่างไร?', choices: ['A. สว่างขึ้น', 'B. สว่างเท่าเดิม', 'C. หรี่ลง', 'D. ดับ'], ans: 'D' },
  { level: 2, type: 'choice', q: 'ข้อใดเป็นแหล่งพลังงานหมุนเวียน?', choices: ['A. ถ่านหิน', 'B. น้ำมัน', 'C. พลังงานแสงอาทิตย์', 'D. ก๊าซธรรมชาติ'], ans: 'C' },
  { level: 2, type: 'choice', q: 'การเปลี่ยนจากของแข็งเป็นแก๊สโดยไม่ผ่านของเหลวเรียกว่าอะไร?', choices: ['A. ระเหย', 'B. ควบแน่น', 'C. หลอมเหลว', 'D. ระเหิด'], ans: 'D' },
  { level: 2, type: 'choice', q: 'วิตามินใดช่วยป้องกันโรคเลือดออกตามไรฟัน?', choices: ['A. วิตามินเอ', 'B. วิตามินบี', 'C. วิตามินซี', 'D. วิตามินดี'], ans: 'C' },
  { level: 2, type: 'choice', q: 'อวัยวะใดทำหน้าที่ย่อยโปรตีนเป็นที่แรก?', choices: ['A. ปาก', 'B. กระเพาะอาหาร', 'C. ลำไส้เล็ก', 'D. ลำไส้ใหญ่'], ans: 'B' },
  { level: 2, type: 'choice', q: 'แรงใดทำให้สิ่งของตกลงสู่พื้นโลก?', choices: ['A. แรงเสียดทาน', 'B. แรงแม่เหล็ก', 'C. แรงโน้มถ่วง', 'D. แรงลอยตัว'], ans: 'C' },
  { level: 2, type: 'choice', q: 'โลหะชนิดใดเป็นตัวนำไฟฟ้าที่ดีที่สุด?', choices: ['A. ทองแดง', 'B. เงิน', 'C. ทองคำ', 'D. เหล็ก'], ans: 'B' },

  // --- LEVEL 3 (ด่าน 8-10) ยาก (ไม่มีตัวเลือก พิมพ์ตอบ) ---
  { level: 3, type: 'text', q: 'น้ำบริสุทธิ์ที่ระดับน้ำทะเล จะมีจุดเดือดที่กี่องศาเซลเซียส?', ans: '100' },
  { level: 3, type: 'text', q: 'สัตว์มีกระดูกสันหลังแบ่งออกเป็นกี่กลุ่มใหญ่ๆ?', ans: '5' },
  { level: 3, type: 'text', q: 'แก๊สชนิดใดที่พืชใช้ในการสังเคราะห์ด้วยแสง?', ans: 'คาร์บอนไดออกไซด์' },
  { level: 3, type: 'text', q: 'โลกหมุนรอบตัวเอง 1 รอบใช้เวลากี่ชั่วโมง?', ans: '24' },
  { level: 3, type: 'text', q: 'มนุษย์มีกระดูกซี่โครงทั้งหมดกี่คู่?', ans: '12' },
  { level: 3, type: 'text', q: 'ดาวเคราะห์ดวงใดใหญ่ที่สุดในระบบสุริยะ?', ans: 'พฤหัสบดี' },
  { level: 3, type: 'text', q: 'แมลงมีขากี่คู่?', ans: '3' },
  { level: 3, type: 'text', q: 'แมงมุมมีขากี่คู่?', ans: '4' },
  { level: 3, type: 'text', q: 'น้ำแข็งหลอมเหลวที่อุณหภูมิกี่องศาเซลเซียส?', ans: '0' },
  { level: 3, type: 'text', q: 'ธาตุออกซิเจน มีสัญลักษณ์ทางเคมีคือตัวอักษรใด?', ans: 'O' }
];

export default function ScienceOnetBoss() {
  const [gameState, setGameState] = useState<'START' | 'MAP' | 'PLAYING'>('START');
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [stage, setStage] = useState(1);
  const maxStages = 10; 
  const [playerHp, setPlayerHp] = useState(100);
  const [bossMaxHp, setBossMaxHp] = useState(100);
  const [bossHp, setBossHp] = useState(100);
  const [currentQ, setCurrentQ] = useState(0);
  const [combo, setCombo] = useState(0);
  const [actionLog, setActionLog] = useState('พร้อมรับคำท้าทาย!');
  const [logColor, setLogColor] = useState('text-slate-500 dark:text-slate-400');
  const [message, setMessage] = useState('');
  const [textAnswer, setTextAnswer] = useState('');
  
  const [isGachaActive, setIsGachaActive] = useState(false);
  const [gachaResult, setGachaResult] = useState<any>(null);
  const [showStageClear, setShowStageClear] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [bossHit, setBossHit] = useState(false);
  const [playerHit, setPlayerHit] = useState(false);

  // 🟢 คำนวณระดับความยากตาม Stage
  const currentPool = useMemo(() => {
    let diff = 1;
    if (stage >= 4 && stage <= 7) diff = 2; // ด่าน 4-7 ระดับปานกลาง
    if (stage >= 8) diff = 3; // ด่าน 8-10 ระดับยาก (พิมพ์ตอบ)
    
    // ดึงโจทย์เฉพาะ Level นั้นๆ แล้วนำมาสุ่มสลับข้อ
    const filtered = scienceQuestions.filter(q => q.level === diff);
    return [...filtered].sort(() => Math.random() - 0.5);
  }, [stage]);

  const currentData = currentPool[currentQ];

  const initStage = (selectedStage: number) => {
    setStage(selectedStage); setPlayerHp(100);
    const newBossHp = 100 + (selectedStage * 50);
    setBossMaxHp(newBossHp); setBossHp(newBossHp);
    setCombo(0); setCurrentQ(0); setTextAnswer('');
    setShowStageClear(false); setShowGameOver(false);
    setActionLog(`🚀 ลุยด่านที่ ${selectedStage}!`); setLogColor('text-blue-600 dark:text-blue-400');
    setGameState('PLAYING');
  };

  const processTurn = (bDmg: number, pHeal: number, logMsg: string, color: string) => {
    const newP = Math.min(100, Math.max(0, playerHp + pHeal));
    const newB = Math.max(0, bossHp - bDmg);
    setPlayerHp(newP); setBossHp(newB);
    setActionLog(logMsg); setLogColor(color); setMessage(logMsg);
    
    if (bDmg > 0) { setBossHit(true); setTimeout(() => setBossHit(false), 400); }
    if (newP < playerHp) { setPlayerHit(true); setTimeout(() => setPlayerHit(false), 400); }
    
    setTimeout(() => {
      setMessage(''); setTextAnswer('');
      if (newP <= 0) { setShowGameOver(true); return; }
      if (newB <= 0) { 
        if (!completedStages.includes(stage)) setCompletedStages([...completedStages, stage]);
        setShowStageClear(true); return; 
      }
      setCurrentQ((prev) => (prev + 1) % currentPool.length);
    }, 1200);
  };

  const handleAnswerSubmit = (choiceOrText: string) => {
    if (message !== '' || isGachaActive || showStageClear || showGameOver) return;
    const isCorrect = currentData.type === 'choice' ? choiceOrText.startsWith(currentData.ans) : choiceOrText.trim() === currentData.ans;
    if (isCorrect) {
      const newCombo = combo + 1;
      const baseDmg = Math.ceil(bossMaxHp / 4);
      if (newCombo === 3) { setCombo(0); setIsGachaActive(true); } 
      else { setCombo(newCombo); processTurn(baseDmg, 0, `✅ ถูกต้อง! โจมตี -${baseDmg} HP`, 'text-emerald-600 dark:text-emerald-400'); }
    } else { setCombo(0); processTurn(0, -25, '❌ ผิดพลาด! โดนโจมตี -25 HP', 'text-rose-600 dark:text-rose-400'); }
  };

  const handleGachaSelect = (index: number) => {
    if (gachaResult) return;
    const baseDmg = Math.ceil(bossMaxHp / 4);
    const rewards = [
      { type: 'HEAL', val: 50, icon: '💊', name: 'เพิ่มพลัง', text: '+50 HP', color: 'text-emerald-600' },
      { type: 'CRIT', val: baseDmg * 3, icon: '⚡', name: 'ไฟฟ้าช็อต', text: `CRIT ${baseDmg * 3}`, color: 'text-blue-600' }
    ];
    const result = { index, ...rewards[Math.floor(Math.random() * rewards.length)] };
    setGachaResult(result);
    setTimeout(() => {
      setIsGachaActive(false); setGachaResult(null);
      if (result.type === 'HEAL') processTurn(baseDmg, result.val, `🎁 ได้รับ ${result.name} ${result.text}`, 'text-emerald-600 dark:text-emerald-400');
      else processTurn(result.val, 0, `💥 ${result.name} -${result.val}!`, 'text-blue-600 dark:text-blue-400');
    }, 2500);
  };

  const progressPercent = Math.min(Math.max(completedStages.length, 0) / (maxStages - 1) * 100, 100);

  return (
    <main className="min-h-screen relative font-sans overflow-hidden bg-[#F8FAFC] dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 select-none" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        
        .bg-dotted {
          background-image: radial-gradient(#cbd5e1 2px, transparent 2px);
          background-size: 32px 32px;
        }
        .dark .bg-dotted {
          background-image: radial-gradient(#334155 2px, transparent 2px);
        }

        .neo-card {
          background-color: #ffffff;
          border: 4px solid #0f172a;
          border-radius: 2.5rem;
          box-shadow: 8px 8px 0px #0f172a;
          transition: all 0.2s ease;
        }
        .dark .neo-card {
          background-color: #1e293b;
          border-color: #475569;
          box-shadow: 8px 8px 0px #000000;
        }
        .neo-btn-blue {
          background-color: #3b82f6;
          color: #ffffff;
          border: 4px solid #0f172a;
          border-radius: 1.5rem;
          box-shadow: 4px 4px 0px #0f172a;
          transition: all 0.1s ease;
        }
        .dark .neo-btn-blue {
          border-color: #475569;
          box-shadow: 4px 4px 0px #000000;
        }
        .neo-btn-blue:active {
          transform: translate(4px, 4px);
          box-shadow: 0px 0px 0px #0f172a;
        }
        .dark .neo-btn-blue:active {
          box-shadow: 0px 0px 0px #000000;
        }
        .neo-btn-white {
          background-color: #ffffff;
          color: #0f172a;
          border: 4px solid #0f172a;
          border-radius: 1.5rem;
          box-shadow: 4px 4px 0px #0f172a;
          transition: all 0.1s ease;
        }
        .dark .neo-btn-white {
          background-color: #1e293b;
          color: #ffffff;
          border-color: #475569;
          box-shadow: 4px 4px 0px #000000;
        }
        .neo-btn-white:hover {
          background-color: #f1f5f9;
        }
        .dark .neo-btn-white:hover {
          background-color: #334155;
        }
        .neo-btn-white:active {
          transform: translate(4px, 4px);
          box-shadow: 0px 0px 0px #0f172a;
        }
        .dark .neo-btn-white:active {
          box-shadow: 0px 0px 0px #000000;
        }
        .neo-badge {
          background-color: #facc15;
          color: #0f172a;
          border: 2px solid #0f172a;
          border-radius: 9999px;
          font-weight: 800;
        }
        .dark .neo-badge {
          border-color: #475569;
        }
        
        .neo-bar-container {
          border: 4px solid #0f172a;
          background: #ffffff;
          border-radius: 999px;
          overflow: hidden;
        }
        .dark .neo-bar-container {
          border-color: #475569;
          background: #1e293b;
        }
      `}} />
      
      <div className="absolute inset-0 z-0 bg-dotted opacity-60"></div>

      {/* ================= START SCREEN ================= */}
      {gameState === 'START' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative z-10 flex flex-col items-center justify-center h-screen px-4">
          
          <div className="neo-card p-10 md:p-14 max-w-lg w-full text-center flex flex-col items-center">
            
            <div className="mb-6">
              <span className="neo-badge px-4 py-1.5 text-sm uppercase tracking-wider">วิทยาศาสตร์ขั้นสูง</span>
            </div>
            
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-28 h-28 bg-blue-100 rounded-full border-4 border-slate-900 flex items-center justify-center text-6xl shadow-[4px_4px_0_#0f172a] mb-6">
              🧬
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 flex flex-col md:flex-row items-center gap-3">
              <span>ไปกับ</span> <span className="text-blue-500 text-5xl md:text-6xl">edumove</span>
            </h1>
            
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-10 font-medium leading-relaxed">
              เปลี่ยนห้องเรียนให้เป็นเกมโชว์! ท้าทายความรู้ด้วย<br/>ด่านวิทยาศาสตร์สุดโหด ไต่ระดับ 10 ด่าน
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <button onClick={() => setGameState('MAP')} className="flex-1 neo-btn-blue py-4 font-black text-lg flex items-center justify-center gap-2">
                เริ่มการผจญภัย <ArrowRight size={20} />
              </button>
              <Link href="/grade/p6" className="flex-1 neo-btn-white py-4 font-black text-lg flex items-center justify-center text-center">
                กลับหน้าหลัก
              </Link>
            </div>

          </div>
        </motion.div>
      )}

      {/* ================= MAP SCREEN ================= */}
      {gameState === 'MAP' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-screen h-screen flex flex-col">
          
          <div className="w-full bg-white dark:bg-[#1e293b] border-b-4 border-slate-900 dark:border-slate-700 p-4 md:p-5 flex justify-between items-center z-50 shrink-0">
            <Link href="/grade/p6" className="neo-btn-white p-2.5 rounded-full"><Home size={20} /></Link>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">แผนที่วิทยาศาสตร์ 🗺️</h2>
            <div className="w-10"></div>
          </div>
          
          <div className="flex-1 w-full overflow-x-auto hide-scroll flex items-center px-10 md:px-32">
            <div className="relative min-w-[1200px] h-[300px] flex items-center shrink-0">
              
              {/* Track Line */}
              <div className="absolute left-[4%] right-[4%] h-3 bg-slate-200 border-y-2 border-slate-900 z-0">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-blue-500 border-r-2 border-slate-900"></motion.div>
              </div>

              {/* Nodes */}
              {Array.from({ length: maxStages }).map((_, i) => {
                const currentStage = i + 1;
                const isComp = completedStages.includes(currentStage);
                const isNext = !isComp && (currentStage === 1 || completedStages.includes(currentStage - 1));
                const xPos = 4 + (i * (92 / (maxStages - 1)));

                return (
                  <div key={currentStage} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10" style={{ left: `${xPos}%` }}>
                    <motion.button 
                      animate={isNext ? { y: [-4, 4, -4] } : { y: 0 }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                      onClick={() => (isComp || isNext) && initStage(currentStage)}
                      className={`w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-slate-900 flex items-center justify-center text-xl font-black transition-transform
                        ${isComp ? 'bg-yellow-400 text-slate-900 scale-110 shadow-[4px_4px_0_#0f172a]' 
                        : isNext ? 'bg-blue-500 text-white shadow-[4px_4px_0_#0f172a] hover:bg-blue-400' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                      `}
                    >
                      {isComp ? <Star fill="currentColor" size={24} className="text-white drop-shadow-sm" /> : (!isComp && !isNext) ? <Lock size={18} /> : currentStage}
                    </motion.button>
                    
                    <div className={`mt-3 whitespace-nowrap text-[11px] font-bold px-3 py-1 rounded-full border-2 border-slate-900 dark:border-slate-700
                      ${isComp ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200' : isNext ? 'bg-white text-slate-900 dark:bg-[#1e293b] dark:text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500'}
                    `}>
                      ด่าน {currentStage}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* ================= PLAYING SCREEN ================= */}
      {gameState === 'PLAYING' && (
        <div className="relative z-10 pt-6 pb-8 px-4 md:px-6 max-w-5xl mx-auto flex flex-col h-screen">
          
          <div className="flex justify-between items-center mb-6 shrink-0 mt-2">
            <button onClick={() => setGameState('MAP')} className="neo-btn-white px-4 py-2 text-sm md:text-base flex items-center gap-2"><Map size={18} /> กลับแผนที่</button>
            <div className="neo-badge px-5 py-2 text-sm md:text-base flex items-center gap-2 shadow-[2px_2px_0_#0f172a]">⚡ พลัง: {combo}/3</div>
          </div>

          <div className="flex justify-between items-center neo-card p-5 md:p-6 mb-6 shrink-0">
             
             <motion.div animate={playerHit ? { x: [-5, 5, -5, 5, 0] } : {}} className="w-[45%] flex flex-col items-start">
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-12 h-12 bg-emerald-100 border-2 border-slate-900 rounded-full flex items-center justify-center text-2xl shadow-[2px_2px_0_#0f172a]">🧑‍🎓</div>
                 <div><div className="font-bold text-slate-500 dark:text-slate-400 text-[10px]">ผู้เล่น</div><div className="text-lg font-black text-slate-900 dark:text-white leading-none">{playerHp} HP</div></div>
               </div>
               <div className="h-4 w-full neo-bar-container"><div className="h-full bg-emerald-500 border-r-2 border-slate-900" style={{ width: `${playerHp}%`, transition: 'width 0.3s ease-out' }}></div></div>
             </motion.div>

             <div className="text-2xl font-black text-slate-300 italic mx-2">VS</div>

             <motion.div animate={bossHit ? { x: [-5, 5, -5, 5, 0] } : {}} className="w-[45%] flex flex-col items-end text-right">
               <div className="flex items-center gap-3 mb-2 flex-row-reverse">
                 <div className="w-12 h-12 bg-rose-100 border-2 border-slate-900 rounded-full flex items-center justify-center text-2xl shadow-[2px_2px_0_#0f172a]">👾</div>
                 <div><div className="font-bold text-slate-500 dark:text-slate-400 text-[10px]">บอส {stage}</div><div className="text-lg font-black text-slate-900 dark:text-white leading-none">{bossHp} HP</div></div>
               </div>
               <div className="h-4 w-full neo-bar-container flex justify-end"><div className="h-full bg-rose-500 border-l-2 border-slate-900" style={{ width: `${(bossHp / bossMaxHp) * 100}%`, transition: 'width 0.3s ease-out' }}></div></div>
             </motion.div>
          </div>

          <motion.div key={actionLog} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-[#1e293b] border-3 border-slate-900 dark:border-slate-700 rounded-xl p-3 text-center mb-6 h-12 flex items-center justify-center shrink-0 shadow-[4px_4px_0_#0f172a] dark:shadow-[4px_4px_0_#000000]"><p className={`font-black text-lg ${logColor}`}>{actionLog}</p></motion.div>

          <div className="flex-1 min-h-0 neo-card p-6 md:p-10 flex flex-col justify-center relative overflow-y-auto hide-scroll">
             <AnimatePresence mode="wait">
               <motion.div key={currentQ} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex flex-col h-full justify-center w-full max-w-4xl mx-auto">
                 
                 <div className="mb-10 text-center">
                   <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold px-4 py-1 rounded-full text-sm border-2 border-slate-900 dark:border-slate-700">
                     คำถามที่ {currentQ + 1} {stage >= 8 && <span className="text-rose-500">(โหมดยาก)</span>}
                   </span>
                   <h3 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mt-6 leading-snug">{currentData.q}</h3>
                 </div>
                 
                 {currentData.type === 'text' ? (
                   <div className="w-full flex flex-col sm:flex-row gap-4">
                     <input type="text" placeholder="พิมพ์คำตอบที่นี่..." value={textAnswer} onChange={(e) => setTextAnswer(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAnswerSubmit(textAnswer)} className="flex-1 bg-slate-50 dark:bg-[#0f172a] border-3 border-slate-900 dark:border-slate-700 rounded-xl px-6 py-4 text-2xl font-black text-blue-600 dark:text-blue-400 focus:outline-none focus:bg-white dark:focus:bg-[#1e293b] text-center sm:text-left shadow-inner placeholder-slate-400 dark:placeholder-slate-500" />
                     <button onClick={() => handleAnswerSubmit(textAnswer)} className="neo-btn-blue px-10 py-4 text-2xl shrink-0">ส่งคำตอบ</button>
                   </div>
                 ) : (
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                      {currentData.choices?.map((c: string) => (
                        <button key={c} onClick={() => handleAnswerSubmit(c)} className="neo-btn-white p-5 md:p-6 text-xl font-bold text-left flex items-center gap-4 group">
                          <span className="w-10 h-10 rounded-full border-2 border-slate-900 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-black text-sm group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">{c.charAt(0)}</span>
                          <span className="flex-1">{c.substring(3)}</span>
                        </button>
                      ))}
                   </div>
                 )}
               </motion.div>
             </AnimatePresence>
          </div>
        </div>
      )}

      {/* ================= MODALS ================= */}
      <AnimatePresence>
        {isGachaActive && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm">
            <motion.h2 animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-5xl md:text-6xl font-black text-yellow-400 mb-2 drop-shadow-md">COMBO BONUS!</motion.h2>
            <p className="text-white font-bold mb-10 text-xl">สุ่มเลือกกล่องของขวัญ 1 ใบ</p>
            <div className="flex gap-4 md:gap-6 justify-center px-4">
              {[0, 1, 2].map((box) => (
                <motion.div key={box} whileHover={{ scale: 1.05, y: -5 }} onClick={() => handleGachaSelect(box)} className={`w-28 h-40 md:w-36 md:h-52 cursor-pointer rounded-2xl flex items-center justify-center transition-all duration-300 neo-card ${gachaResult ? (gachaResult.index === box ? 'bg-yellow-100 dark:bg-yellow-950 border-yellow-500 dark:border-yellow-650 scale-105 shadow-[8px_8px_0_#eab308]' : 'bg-slate-200 dark:bg-slate-800 opacity-50 scale-90') : 'hover:bg-blue-50 dark:hover:bg-slate-800'}`}>
                  {!gachaResult || gachaResult.index !== box ? (<div className="text-5xl md:text-6xl">🎁</div>) : (<div className="text-center"><div className="text-5xl mb-2">{gachaResult.icon}</div><div className={`text-base md:text-lg font-black ${gachaResult.color}`}>{gachaResult.text}</div></div>)}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
      {(showStageClear || showGameOver) && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm px-4 text-center">
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="neo-card p-10 max-w-sm w-full">
            <div className="text-6xl mb-4">{showStageClear ? '🏆' : '💀'}</div>
            <h2 className={`text-3xl font-black mb-2 uppercase ${showStageClear ? 'text-emerald-500' : 'text-rose-500'}`}>{showStageClear ? `ด่าน ${stage} เคลียร์!` : 'พ่ายแพ้!'}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 font-bold">{showStageClear ? 'เก่งมาก ไปลุยกันต่อเลย' : `คุณพลาดในด่านที่ ${stage}`}</p>
            <div className="flex flex-col gap-3">
              {showStageClear && stage < maxStages && <button onClick={() => initStage(stage + 1)} className="w-full neo-btn-blue py-4 font-black text-lg">ด่านต่อไป ➡️</button>}
              <button onClick={() => setGameState('MAP')} className="w-full neo-btn-white py-4 font-black text-lg">🗺️ กลับหน้าแผนที่</button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </main>
  );
}