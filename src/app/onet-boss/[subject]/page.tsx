'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Trophy, AlertTriangle, Lightbulb, Target, Brain, Sparkles, Gift, Crosshair, Heart, Swords, Flame } from 'lucide-react';

export interface OnetQuestion {
  q: string;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  ans: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  category: string;
}

const playSignalSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine'; osc.frequency.setValueAtTime(587.33, ctx.currentTime); 
    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.4);
  } catch { console.log("Audio not supported"); }
};

export default function OnetFinalBossRaidPage() {
  const params = useParams();
  const router = useRouter();
  const subject = (params?.subject as string) || 'math';

  type GameStatus = 'INTRO' | 'PLAYING' | 'HIT_ANIMATION' | 'COUNTER_ANIMATION' | 'BONUS_CHEST' | 'STAGE_CLEAR' | 'SUMMARY';
  const [status, setStatus] = useState<GameStatus>('INTRO');
  
  const [currentPart, setCurrentPart] = useState<1 | 2 | 3 | 4>(1);
  const [currentQ, setCurrentQ] = useState(0);
  const [bossHp, setBossHp] = useState(100);
  const [playerShield, setPlayerShield] = useState(100);
  
  // ⏱️ เปลี่ยนเป็นตัวจับเวลาโบนัส (ไม่มีหมดเวลาแล้ว)
  const [timeLeft, setTimeLeft] = useState(30);
  const [lastBonusDmg, setLastBonusDmg] = useState(0); // เก็บค่าโบนัสเพื่อโชว์ตอนตอบถูก

  const [lockedChoice, setLockedChoice] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [raidResult, setRaidResult] = useState<'WIN' | 'LOSE' | null>(null);

  const [correctStreak, setCorrectStreak] = useState(0);
  const [chestRewards, setChestRewards] = useState<any[]>([]);
  const [openedChestIndex, setOpenedChestIndex] = useState<number | null>(null);

  const [analytics, setAnalytics] = useState({
    speed: 0, accuracy: 0, analytical: 0, stamina: 0, knowledge: 0, totalAnswered: 0, correctCount: 0
  });

  const isProcessingRef = useRef(false);

  // ===================================================
  // 📚 คลังข้อสอบ O-NET
  // ===================================================
  const onetDatabases: Record<string, Record<string, OnetQuestion[]>> = {
    math: {
      part1: [
        { q: "ข้อ 1: ต้องการจัดตลับยาสมุนไพร 48 ตลับ และตลับขิงผง 72 ตลับ ใส่กล่องให้ได้กล่องละเท่าๆ กัน จะจัดได้มากที่สุดกล่องละกี่ตลับ?", choiceA: "12 ตลับ", choiceB: "24 ตลับ", choiceC: "16 ตลับ", choiceD: "36 ตลับ", ans: "B", explanation: "หา ห.ร.ม. ของ 48 และ 72 จะได้ 24", category: "จำนวนและการดำเนินงาน" },
        { q: "ข้อ 2: รถสาย A ออกทุก 15 นาที สาย B ออกทุก 20 นาที สาย C ออกทุก 30 นาที ถ้าเริ่มออกพร้อมกันเวลา 06.00 น. จะออกพร้อมกันอีกครั้งเวลาใด?", choiceA: "06.45 น.", choiceB: "07.00 น.", choiceC: "07.30 น.", choiceD: "08.00 น.", ans: "B", explanation: "หา ค.ร.น. ของ 15, 20 และ 30 คือ 60 นาที (1 ชั่วโมง)", category: "จำนวนและการดำเนินงาน" },
        { q: "ข้อ 3: เสาไฟฟ้าสูง 12 เมตร หักโค่นลงมาปลายเสาห่างจากโคน 5 เมตร ส่วนที่ตั้งตรงอยู่สูงกี่เมตร?", choiceA: "6 เมตร", choiceB: "7 เมตร", choiceC: "4 เมตร", choiceD: "3.5 เมตร", ans: "B", explanation: "ใช้ทฤษฎีพีทาโกรัส x² + 5² = (12-x)² จะได้ x = 7", category: "การวัดและเรขาคณิต" },
        { q: "ข้อ 4: สวนวงกลมเส้นผ่านศูนย์กลาง 14 เมตร เทปูนขยายออก 1 เมตร พื้นที่ขยายเพิ่มขึ้นกี่ตารางเมตร? (pi=22/7)", choiceA: "44 ตร.ม.", choiceB: "50 ตร.ม.", choiceC: "22 ตร.ม.", choiceD: "64 ตร.ม.", ans: "A", explanation: "พื้นที่วงแหวน = pi*(8² - 7²) = 44 ตร.ม.", category: "การวัดและเรขาคณิต" },
        { q: "ข้อ 5: ซื้อของ 2,500 บาท ติดป้ายกำไร 30% ลดให้ลูกค้า 10% ร้านค้าได้กำไรกี่บาท?", choiceA: "500 บาท", choiceB: "425 บาท", choiceC: "650 บาท", choiceD: "375 บาท", ans: "B", explanation: "ขายจริง 2,925 บาท กำไร 425 บาท", category: "พีชคณิตและสมการ" }
      ],
      part2: [
        { q: "ข้อ 6: ถังน้ำกว้าง 2 ม. ยาว 3 ม. มีน้ำสูง 1 ม. หย่อนเหล็ก 1 ลบ.ม. น้ำจะสูงขึ้นกี่เซนติเมตร?", choiceA: "10.5 ซม.", choiceB: "16.6 ซม.", choiceC: "20 ซม.", choiceD: "25 ซม.", ans: "B", explanation: "ปริมาตร 1 / พื้นที่ 6 = 0.166 ม. หรือ 16.6 ซม.", category: "การวัดและเรขาคณิต" },
        { q: "ข้อ 7: ทอดลูกเต๋า 2 ลูก ความน่าจะเป็นที่ผลรวมหน้าลูกเต๋าเท่ากับ 7 คือข้อใด?", choiceA: "1/6", choiceB: "1/12", choiceC: "5/36", choiceD: "7/36", ans: "A", explanation: "มี 6 วิธีจาก 36 วิธี = 1/6", category: "สถิติและความน่าจะเป็น" },
        { q: "ข้อ 8: 3X - 7 = 5X - 19 ค่าของ X² + 5 คือข้อใด?", choiceA: "30", choiceB: "41", choiceC: "14", choiceD: "54", ans: "B", explanation: "X = 6 แทนค่า 6² + 5 = 41", category: "พีชคณิตและสมการ" },
        { q: "ข้อ 9: ค่าเฉลี่ยนักเรียน 4 คนคือ 18 เพิ่มอีก 1 คน ค่าเฉลี่ยกลายเป็น 20 คนใหม่สอบได้กี่คะแนน?", choiceA: "22", choiceB: "24", choiceC: "26", choiceD: "28", ans: "C", explanation: "100 - 72 = 26 คะแนน", category: "สถิติและความน่าจะเป็น" },
        { q: "ข้อ 10: ที่ดินกว้าง 15 วา ยาว 20 วา ปักเสาห่างเท่าๆ กัน ใช้เสาน้อยสุดกี่ต้น?", choiceA: "14 ต้น", choiceB: "16 ต้น", choiceC: "20 ต้น", choiceD: "28 ต้น", ans: "A", explanation: "ห.ร.ม. คือ 5 ความยาวรอบรูป 70/5 = 14 ต้น", category: "จำนวนและการดำเนินงาน" }
      ],
      part3: [
        { q: "ข้อ 11: (3.5 × 2.4) + (4.8 ÷ 0.6) มีค่าเท่ากับข้อใด?", choiceA: "14.4", choiceB: "16.4", choiceC: "12.8", choiceD: "18.2", ans: "B", explanation: "8.4 + 8 = 16.4", category: "จำนวนและการดำเนินงาน" },
        { q: "ข้อ 12: ลูกบาศก์มีปริมาตร 64 ลบ.ซม. มีพื้นที่ผิวรวมกี่ตารางเซนติเมตร?", choiceA: "16", choiceB: "64", choiceC: "96", choiceD: "120", ans: "C", explanation: "ด้านละ 4 พื้นที่ 1 ด้าน = 16 รวม 6 ด้าน = 96", category: "การวัดและเรขาคณิต" },
        { q: "ข้อ 13: ข้อมูล: 3, 5, X, 12, 15 มัธยฐานคือ 8 ค่า X คือ?", choiceA: "6", choiceB: "7", choiceC: "8", choiceD: "9", ans: "C", explanation: "X อยู่ตรงกลางพอดี จึงเท่ากับ 8", category: "สถิติและความน่าจะเป็น" },
        { q: "ข้อ 14: สมชายอายุมากกว่าสมหญิง 5 ปี อีก 3 ปีข้างหน้าอายุรวม 35 ปี ปัจจุบันสมหญิงอายุเท่าไร?", choiceA: "12 ปี", choiceB: "15 ปี", choiceC: "17 ปี", choiceD: "10 ปี", ans: "A", explanation: "(Y+3)+(Y+8) = 35 -> 2Y = 24 -> Y=12", category: "พีชคณิตและสมการ" },
        { q: "ข้อ 15: โทรศัพท์ 8,000 บาท ลดราคา 15% ต้องจ่ายกี่บาท?", choiceA: "6,500 บาท", choiceB: "6,800 บาท", choiceC: "7,000 บาท", choiceD: "7,200 บาท", ans: "B", explanation: "จ่าย 85% คือ 6,800 บาท", category: "พีชคณิตและสมการ" }
      ],
      part4: [
        { q: "ข้อ 16: สามเหลี่ยมมุมฉากด้านประกอบมุมฉาก 6 และ 8 ซม. ความยาวรอบรูปคือ?", choiceA: "20 ซม.", choiceB: "24 ซม.", choiceC: "26 ซม.", choiceD: "30 ซม.", ans: "B", explanation: "ด้านตรงข้ามยาว 10 ซม. รวม 6+8+10 = 24", category: "การวัดและเรขาคณิต" },
        { q: "ข้อ 17: แผนที่ 1:200,000 วัดได้ 4.5 ซม. ระยะจริงกี่กิโลเมตร?", choiceA: "9 กม.", choiceB: "90 กม.", choiceC: "45 กม.", choiceD: "4.5 กม.", ans: "A", explanation: "900,000 ซม. = 9 กม.", category: "การวัดและเรขาคณิต" },
        { q: "ข้อ 18: สี่เหลี่ยมผืนผ้ามีแกนสมมาตรกี่เส้น?", choiceA: "1", choiceB: "2", choiceC: "4", choiceD: "0", ans: "B", explanation: "แนวตั้งและแนวนอนกึ่งกลาง", category: "การวัดและเรขาคณิต" },
        { q: "ข้อ 19: ผลรวมเลข 1 ถึง 50 มีค่าเท่าไร?", choiceA: "1,250", choiceB: "1,275", choiceC: "1,300", choiceD: "2,550", ans: "B", explanation: "50(51)/2 = 1,275", category: "จำนวนและการดำเนินงาน" },
        { q: "ข้อ 20: 50% ของ 200 ต่างจาก 20% ของ 400 อยู่เท่าไร?", choiceA: "10", choiceB: "20", choiceC: "30", choiceD: "40", ans: "B", explanation: "100 - 80 = 20", category: "จำนวนและการดำเนินงาน" }
      ]
    },
    science: {
      part1: [
        { q: "ข้อ 1: โซ่อาหาร: แพลงก์ตอน -> ไรน้ำ -> ปลาซิว -> นกยาง หากมีสารพิษ สัตว์ใดมีสารพิษสะสมสูงสุด?", choiceA: "แพลงก์ตอนพืช", choiceB: "ไรน้ำ", choiceC: "ปลาซิว", choiceD: "นกยาง", ans: "D", explanation: "ผู้บริโภคลำดับสุดท้ายสะสมพิษมากสุด", category: "สิ่งมีชีวิตและสิ่งแวดล้อม" },
        { q: "ข้อ 2: น้ำทะเล + น้ำมันเครื่อง + ทราย ควรแยกสารตามลำดับใด?", choiceA: "รินออก -> กรอง -> ระเหย", choiceB: "ตกตะกอน -> แม่เหล็ก -> กลั่น", choiceC: "กรอง -> กรวยแยก -> ระเหยแห้ง", choiceD: "กลั่น -> ตกผลึก -> ร่อน", ans: "C", explanation: "กรองทราย -> แยกน้ำมัน -> ระเหยเกลือ", category: "สารและสมบัติของสาร" },
        { q: "ข้อ 3: หินใดมีผลึกแร่ใหญ่ แข็งแรง นิยมทำครกหิน?", choiceA: "หินปูน", choiceB: "หินแกรนิต", choiceC: "หินชนวน", choiceD: "หินบะซอลต์", ans: "B", explanation: "เป็นหินอัคนีที่เย็นตัวช้าๆ ใต้โลก", category: "โลก ดาราศาสตร์ และอวกาศ" },
        { q: "ข้อ 4: สุริยุปราคาเต็มดวงเกิดขึ้นเมื่อใด?", choiceA: "ดวงอาทิตย์อยู่กลาง คืน", choiceB: "โลกอยู่กลาง คืน", choiceC: "ดวงจันทร์อยู่กลาง กลางวัน", choiceD: "ดวงจันทร์อยู่กลาง คืน", ans: "C", explanation: "ดวงจันทร์บังแสงอาทิตย์ในเวลากลางวัน", category: "โลก ดาราศาสตร์ และอวกาศ" },
        { q: "ข้อ 5: วงจรอนุกรมมีหลอดไฟ 3 หลอด ถ้าหลอดที่ 2 ขาด จะเป็นอย่างไร?", choiceA: "สว่างปกติ", choiceB: "ดับทั้งหมด", choiceC: "สว่างขึ้น", choiceD: "ระเบิด", ans: "B", explanation: "วงจรเปิด กระแสไฟไหลผ่านไม่ได้", category: "แรงและพลังงาน" }
      ],
      part2: [
        { q: "ข้อ 6: กลางคืนลมพัดอย่างไร?", choiceA: "ทะเลเข้าฝั่ง", choiceB: "ฝั่งออกทะเล", choiceC: "พัดขนานฝั่ง", choiceD: "ไม่มีลม", ans: "B", explanation: "พื้นดินคายความร้อนเร็วกว่า เกิดลมบก", category: "โลก ดาราศาสตร์ และอวกาศ" },
        { q: "ข้อ 7: โปรตีนเริ่มถูกย่อยทางเคมีที่ใด?", choiceA: "ปาก", choiceB: "หลอดอาหาร", choiceC: "กระเพาะอาหาร", choiceD: "ลำไส้ใหญ่", ans: "C", explanation: "กระเพาะมีกรดและเอนไซม์เปปซิน", category: "สิ่งมีชีวิตและสิ่งแวดล้อม" },
        { q: "ข้อ 8: ข้อใดเป็นการเปลี่ยนแปลงทางเคมี?", choiceA: "ลูกเหม็นระเหิด", choiceB: "ช็อกโกแลตละลาย", choiceC: "ตะปูเป็นสนิม", choiceD: "ละลายด่างทับทิม", ans: "C", explanation: "เกิดสารใหม่คือสนิมเหล็ก", category: "สารและสมบัติของสาร" },
        { q: "ข้อ 9: วัตถุใดโปร่งแสง (ยอมให้แสงผ่านบางส่วน)?", choiceA: "กระจกเงา", choiceB: "แผ่นไม้", choiceC: "กระดาษไข", choiceD: "พลาสติกใส", ans: "C", explanation: "เห็นด้านหลังไม่ชัดเจน", category: "แรงและพลังงาน" },
        { q: "ข้อ 10: ปะการังฟอกขาว เกิดจากสาเหตุหลักใด?", choiceA: "ปลากิน", choiceB: "อุณหภูมิน้ำทะเลสูงขึ้น", choiceC: "ไม่มีแสงแดด", choiceD: "ทรายทับถม", ans: "B", explanation: "น้ำร้อนทำให้ปะการังเครียดและคายสาหร่ายสีออก", category: "สิ่งมีชีวิตและสิ่งแวดล้อม" }
      ],
      part3: [
        { q: "ข้อ 11: การปฏิบัติใดช่วยลดก๊าซเรือนกระจกได้ดีที่สุด?", choiceA: "เผาขยะ", choiceB: "ใช้รถสาธารณะ", choiceC: "เปิดแอร์ทั้งวัน", choiceD: "ใช้โฟม", ans: "B", explanation: "ลดการใช้เชื้อเพลิงฟอสซิล", category: "สิ่งมีชีวิตและสิ่งแวดล้อม" },
        { q: "ข้อ 12: สารใดปริมาตรคงที่ แต่รูปร่างเปลี่ยนตามภาชนะ?", choiceA: "ดินสอ", choiceB: "น้ำนมสด", choiceC: "ออกซิเจน", choiceD: "ลูกโป่ง", ans: "B", explanation: "คือคุณสมบัติของของเหลว", category: "สารและสมบัติของสาร" },
        { q: "ข้อ 13: pH เท่ากับ 3 ทดสอบกระดาษลิตมัสอย่างไร?", choiceA: "น้ำเงินเป็นแดง (กรด)", choiceB: "แดงเป็นน้ำเงิน (เบส)", choiceC: "ไม่เปลี่ยนสี", choiceD: "กัดกระดาษขาด", ans: "A", explanation: "ค่า pH ต่ำกว่า 7 คือกรด", category: "สารและสมบัติของสาร" },
        { q: "ข้อ 14: ดาวเคราะห์ใดเป็นดาวแก๊สขนาดใหญ่ที่สุด?", choiceA: "อังคาร", choiceB: "ศุกร์", choiceC: "พฤหัสบดี", choiceD: "เนปจูน", ans: "C", explanation: "ดาวพฤหัสบดีใหญ่ที่สุด", category: "โลก ดาราศาสตร์ และอวกาศ" },
        { q: "ข้อ 15: โทรศัพท์กระป๋อง เสียงเดินทางผ่านตัวกลางใดเป็นหลัก?", choiceA: "อากาศ", choiceB: "ของแข็ง (เส้นเชือก)", choiceC: "ของเหลว", choiceD: "สุญญากาศ", ans: "B", explanation: "เสียงเดินทางผ่านของแข็งได้ดีที่สุด", category: "แรงและพลังงาน" }
      ],
      part4: [
        { q: "ข้อ 16: สัตว์ใดคือสัตว์สะเทินน้ำสะเทินบก?", choiceA: "จระเข้", choiceB: "เต่า", choiceC: "กบ", choiceD: "ปลาช่อน", ans: "C", explanation: "กบ คางคก เขียด", category: "สิ่งมีชีวิตและสิ่งแวดล้อม" },
        { q: "ข้อ 17: อุปกรณ์ใดเปลี่ยนพลังงานไฟฟ้าเป็นพลังงานกล?", choiceA: "หม้อหุงข้าว", choiceB: "พัดลม", choiceC: "เตารีด", choiceD: "หลอดไฟ", ans: "B", explanation: "มอเตอร์ทำให้ใบพัดหมุน", category: "แรงและพลังงาน" },
        { q: "ข้อ 18: วัตถุฝุ่นและน้ำแข็ง เมื่อใกล้ดวงอาทิตย์ระเหิดมีหาง คืออะไร?", choiceA: "ดาวเคราะห์น้อย", choiceB: "อุกกาบาต", choiceC: "ดาวหาง", choiceD: "ดาวตก", ans: "C", explanation: "ดาวหางมีหัวเป็นน้ำแข็งและหางเป็นแก๊ส", category: "โลก ดาราศาสตร์ และอวกาศ" },
        { q: "ข้อ 19: กระบวนการใดของพืชปล่อยไอน้ำสู่อากาศ?", choiceA: "หายใจ", choiceB: "คายน้ำ", choiceC: "ลำเลียงสาร", choiceD: "สังเคราะห์แสง", ans: "B", explanation: "ผ่านทางปากใบ", category: "สิ่งมีชีวิตและสิ่งแวดล้อม" },
        { q: "ข้อ 20: เครื่องมือใดใช้วัดแผ่นดินไหว?", choiceA: "บารอมิเตอร์", choiceB: "อนีโมมิเตอร์", choiceC: "ไซสโมกราฟ", choiceD: "ไฮโกรมิเตอร์", ans: "C", explanation: "ใช้วัดแรงสั่นสะเทือน", category: "โลก ดาราศาสตร์ และอวกาศ" }
      ]
    }
  };

  const currentQuestions = onetDatabases[subject]?.[`part${currentPart}`] || onetDatabases['math']['part1'];
  
  // 🛡️ [จุดแก้บัค]: ใส่เครื่องหมาย % (Modulo) เพื่อให้มันวนลูปข้อแรกใหม่ถ้าถามหมดแล้วบอสยังไม่ตาย
  const qData = currentQuestions[currentQ % currentQuestions.length];
  
  // ⚡ ระบบคำนวณดาเมจพื้นฐาน
  const damagePerHit = Math.ceil(100 / currentQuestions.length);

  // ⏱️ ระบบจับเวลาโบนัส (ไม่มีการบังคับหมดเวลาแล้ว ปล่อยให้ลดไปเรื่อยๆ จนถึง 0)
  useEffect(() => {
    if (status !== 'PLAYING') return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [status, timeLeft]);

  const handleChoiceClick = (choice: 'A' | 'B' | 'C' | 'D') => {
    if (isProcessingRef.current || status !== 'PLAYING') return;
    isProcessingRef.current = true;
    setLockedChoice(choice);
    
    const isCorrect = choice === qData.ans;
    const newStreak = isCorrect ? correctStreak + 1 : 0;
    setCorrectStreak(newStreak);
    
    // ⚡ คำนวณโบนัสความไว (Speed Bonus Damage)
    let speedBonus = 0;
    if (isCorrect) {
      if (timeLeft >= 20) speedBonus = 5; // ตอบภายใน 10 วินาทีแรก ได้ +5%
      else if (timeLeft >= 10) speedBonus = 2; // ตอบภายใน 20 วินาทีแรก ได้ +2%
    }
    setLastBonusDmg(speedBonus);

    setAnalytics(prev => ({
      ...prev,
      totalAnswered: prev.totalAnswered + 1,
      correctCount: prev.correctCount + (isCorrect ? 1 : 0),
      stamina: prev.stamina + 5,
      accuracy: Math.round(((prev.correctCount + (isCorrect ? 1 : 0)) / (prev.totalAnswered + 1)) * 100),
      speed: prev.speed + speedBonus
    }));

    if (isCorrect) {
      setStatus('HIT_ANIMATION');
      playSignalSound();
      setTimeout(() => {
        // หักดาเมจพื้นฐาน + ดาเมจโบนัส
        const nextHp = Math.max(0, bossHp - (damagePerHit + speedBonus));
        setBossHp(nextHp);
        
        if (nextHp <= 0) {
          handleBossDefeated();
        } else if (newStreak > 0 && newStreak % 3 === 0) {
          setupBonusChests();
          setStatus('BONUS_CHEST');
        } else {
          goToNextQuestion();
        }
      }, 1800);
    } else {
      setStatus('COUNTER_ANIMATION');
      setTimeout(() => {
        const nextShield = Math.max(0, playerShield - 20); // โดนสวนกลับ 20% เท่าเดิม
        setPlayerShield(nextShield);
        
        if (nextShield <= 0) {
          setRaidResult('LOSE');
          setStatus('SUMMARY');
        } else {
          goToNextQuestion();
        }
      }, 1800);
    }
  };

  const handleBossDefeated = () => {
    if (currentPart < 4) {
      setStatus('STAGE_CLEAR');
      setTimeout(() => {
        setCurrentPart((prev) => (prev + 1) as 1|2|3|4);
        setCurrentQ(0);
        setBossHp(100);
        setTimeLeft(30);
        setLockedChoice(null);
        setCorrectStreak(0);
        setStatus('PLAYING');
        isProcessingRef.current = false;
      }, 4000);
    } else {
      setRaidResult('WIN');
      setStatus('SUMMARY');
    }
  };

  const goToNextQuestion = () => {
    // ขยับไปข้อถัดไป ถ้าหมดข้อก็วนกลับมาข้อแรกใหม่
    setCurrentQ(prev => prev + 1); 
    setTimeLeft(30);
    setLockedChoice(null);
    setStatus('PLAYING');
    isProcessingRef.current = false;
  };

  const setupBonusChests = () => {
    const rewards = [
      { type: 'HEAL', value: 30, text: 'ฟื้นฟูโล่ 30 หน่วย', icon: <Heart className="text-pink-500" size={40}/>, color: 'text-pink-400' },
      { type: 'DAMAGE', value: damagePerHit * 2, text: `ดาเมจคูณสอง -${damagePerHit * 2}%`, icon: <Crosshair className="text-amber-500" size={40}/>, color: 'text-amber-400' },
      { type: 'HEAL_MAX', value: 50, text: 'ซูเปอร์ชิลด์ +50 หน่วย', icon: <Shield className="text-cyan-500" size={40}/>, color: 'text-cyan-400' },
    ];
    setChestRewards(rewards.sort(() => Math.random() - 0.5));
    setOpenedChestIndex(null);
  };

  const handleChestOpen = (index: number) => {
    if (openedChestIndex !== null) return;
    setOpenedChestIndex(index);
    playSignalSound();

    const reward = chestRewards[index];
    
    setTimeout(() => {
      if (reward.type.includes('HEAL')) {
        setPlayerShield(prev => Math.min(100, prev + reward.value));
        setTimeout(() => goToNextQuestion(), 2000);
      } else if (reward.type === 'DAMAGE') {
        const nextHp = Math.max(0, bossHp - reward.value);
        setBossHp(nextHp);
        if (nextHp <= 0) {
          handleBossDefeated();
        } else {
          setTimeout(() => goToNextQuestion(), 2000);
        }
      }
    }, 1000);
  };

  if (!qData) return null; // Safety render

  return (
    <div className="fixed inset-0 bg-[#020617] text-white overflow-hidden select-none flex flex-col items-center justify-center" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
      
      {/* 🌌 อัปเกรดฉากหลังให้เป็นอวกาศที่สวยงาม */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50rem] h-[50rem] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50rem] h-[50rem] bg-cyan-600/20 rounded-full blur-[120px]" />
        {[...Array(40)].map((_, i) => (
          <motion.div key={i} className="absolute bg-white rounded-full"
            style={{ width: Math.random() * 3 + 1 + 'px', height: Math.random() * 3 + 1 + 'px', left: Math.random() * 100 + '%', top: Math.random() * 100 + '%' }}
            animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <AnimatePresence>
        {status === 'INTRO' && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/80 z-50 flex flex-col items-center justify-center p-6 backdrop-blur-xl">
            <Target size={100} className="text-amber-500 mb-6 drop-shadow-[0_0_30px_rgba(245,158,11,0.5)] animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-black text-center mb-2 bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">O-NET STAGE {currentPart}</h1>
            <p className="text-xl text-cyan-400 font-bold tracking-widest uppercase mb-8">สมรภูมิข้อสอบประเมินผลระดับชาติ</p>
            
            <div className="bg-slate-900/60 border border-slate-700/60 p-8 rounded-[2.5rem] max-w-3xl text-center leading-relaxed text-slate-300 mb-10 shadow-2xl backdrop-blur-md">
              <p className="text-lg md:text-xl mb-4">ยินดีต้อนรับผู้เรียนเข้าสู่การจำลองข้อสอบ O-NET รูปแบบตะลุยด่าน</p>
              <p className="text-base md:text-lg text-slate-400">
                โหมดนี้มีบอสทั้งหมด 4 Stage (Part 1 - 4)<br/>
                โจมตีบอสให้เลือดหมดเพื่อผ่านด่าน!<br/>
                พิเศษ: ไม่มีหมดเวลา แต่ <span className="text-amber-400 font-bold">ยิ่งตอบไว ยิ่งได้โบนัสดาเมจ!</span> ⚡
              </p>
            </div>

            <div className="flex gap-6">
              <button onClick={() => setStatus('PLAYING')} className="px-14 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-2xl rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105 transition-all">
                ลุยด่านแรก
              </button>
              <button onClick={() => router.back()} className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-full font-bold text-xl transition-all">
                ย้อนกลับ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 หน้าจอ STAGE CLEAR ระหว่างด่าน */}
      <AnimatePresence>
        {status === 'STAGE_CLEAR' && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }} className="absolute inset-0 bg-emerald-950/90 z-50 flex flex-col items-center justify-center backdrop-blur-md">
            <Swords size={120} className="text-emerald-400 mb-6 drop-shadow-[0_0_30px_rgba(52,211,153,0.8)] animate-bounce" />
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">STAGE {currentPart} CLEAR!</h1>
            <p className="text-2xl text-emerald-300 font-bold">กำจัดบอสสำเร็จ... เตรียมตัวรับมือบอสตัวต่อไป!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {status !== 'INTRO' && status !== 'SUMMARY' && status !== 'STAGE_CLEAR' && (
        <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-8 z-20">
          
          <div className="w-full flex flex-col items-center gap-3">
            <div className="flex items-center gap-4 w-full max-w-5xl justify-between">
              <div className="bg-slate-900/80 px-6 py-3 rounded-2xl border border-slate-700/50 backdrop-blur-md flex items-center gap-3 shadow-lg">
                <Brain size={28} className="text-rose-500 animate-pulse" />
                <span className="font-black text-xl tracking-wider text-slate-200">BOSS PART: {currentPart}/4</span>
              </div>
              <div className="flex-1 bg-slate-950/80 rounded-2xl h-10 p-1 border-2 border-slate-700 flex overflow-hidden shadow-xl relative ml-4">
                <motion.div animate={{ width: `${bossHp}%` }} transition={{ type: 'spring', stiffness: 60 }} className="h-full bg-gradient-to-r from-rose-600 to-red-500 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.7)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center font-black text-lg text-white drop-shadow-md tracking-widest">{bossHp}%</div>
              </div>
            </div>
          </div>

          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-5xl mx-auto bg-slate-900/60 border border-slate-600/50 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col justify-center items-center text-center relative min-h-[250px]">
            <div className="absolute top-0 left-8 -translate-y-1/2 bg-cyan-500 text-slate-950 px-6 py-1.5 rounded-full font-black text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              หมวดหมู่: {qData?.category}
            </div>
            
            <div className="absolute top-0 right-8 -translate-y-1/2 flex gap-3">
              {correctStreak > 0 && (
                <div className="bg-gradient-to-r from-fuchsia-500 to-purple-500 text-white px-5 py-1.5 rounded-full font-bold text-sm shadow-[0_0_15px_rgba(217,70,239,0.5)] flex items-center gap-2">
                  <Sparkles size={16} /> Combo x{correctStreak}
                </div>
              )}
              {/* ⏱️ ตัวโชว์เวลา เปลี่ยนเป็นดีไซน์ใหม่ ไม่กดดัน */}
              <div className="bg-slate-800 text-amber-400 px-5 py-1.5 rounded-full font-black flex items-center gap-2 border border-amber-500/30">
                <Flame size={16} className={timeLeft >= 10 ? 'animate-pulse text-rose-500' : 'text-slate-500'} /> 
                โบนัสความไว: {timeLeft > 0 ? timeLeft : 0}s
              </div>
            </div>

            <p className="text-2xl md:text-4xl font-bold text-white leading-normal text-balance">
              {qData?.q}
            </p>
          </motion.div>

          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 h-auto">
            {['A', 'B', 'C', 'D'].map((choice) => {
              const text = (qData as any)[`choice${choice}`];
              const isChoiceLocked = lockedChoice === choice;
              const isCorrectAns = qData?.ans === choice;
              
              let themeClass = "bg-slate-800/80 border-slate-600 text-slate-300 hover:bg-cyan-600/20 hover:border-cyan-400 hover:text-white cursor-pointer";
              
              if (lockedChoice) {
                themeClass = "bg-slate-900/50 border-slate-800 text-slate-500 cursor-not-allowed";
                if (isChoiceLocked) themeClass = "bg-amber-500 border-white text-slate-950 scale-[1.02] shadow-[0_0_30px_rgba(251,191,36,0.6)]";
                if (status === 'HIT_ANIMATION' && isCorrectAns) themeClass = "bg-emerald-500 border-white text-white scale-[1.05] shadow-[0_0_30px_rgba(16,185,129,0.7)] z-10";
                if (status === 'COUNTER_ANIMATION' && isChoiceLocked && !isCorrectAns) themeClass = "bg-rose-500 border-white text-white scale-[1.02] shadow-[0_0_30px_rgba(244,63,94,0.7)]";
              }

              return (
                <button key={choice} onClick={() => handleChoiceClick(choice as 'A'|'B'|'C'|'D')} disabled={lockedChoice !== null}
                  className={`border-2 rounded-[1.5rem] p-5 flex items-center justify-start gap-4 transition-all duration-300 transform active:scale-95 ${themeClass}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shrink-0 ${isChoiceLocked ? 'bg-black/20' : 'bg-slate-700'}`}>{choice}</div>
                  <div className="font-bold text-lg md:text-xl text-left leading-snug">{text}</div>
                </button>
              );
            })}
          </div>

          <div className="w-full flex items-center justify-center mt-6">
            <div className="flex items-center gap-4 bg-slate-900/80 px-8 py-3 rounded-full border border-slate-700/50 backdrop-blur-md shadow-lg">
              <Shield size={32} className="text-cyan-400 animate-pulse" />
              <div className="flex flex-col items-start w-48 md:w-64">
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-1">PLAYER SHIELD</span>
                <div className="w-full bg-slate-950 p-1 rounded-full border border-slate-700 flex overflow-hidden h-4">
                  <motion.div animate={{ width: `${playerShield}%` }} className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
                </div>
              </div>
              <span className="font-black text-xl text-white ml-2">{playerShield}%</span>
            </div>
          </div>

        </div>
      )}

      {/* ===================================================
          INTERFACE 3: โหมดสุ่มกล่องสมบัติ (BONUS CHEST)
          =================================================== */}
      <AnimatePresence>
        {status === 'BONUS_CHEST' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-950/90 z-50 flex flex-col items-center justify-center p-6 backdrop-blur-xl">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-black text-amber-400 mb-4 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">✨ BONUS TIME ✨</h2>
              <p className="text-2xl text-slate-300">คุณตอบถูกต่อเนื่อง 3 ข้อ! เลือกเปิดกล่องสมบัติ 1 ใบเพื่อรับพลังพิเศษ!</p>
            </div>

            <div className="flex gap-8 justify-center items-center">
              {chestRewards.map((reward, index) => (
                <motion.button
                  key={index}
                  whileHover={openedChestIndex === null ? { scale: 1.1, y: -10 } : {}}
                  whileTap={openedChestIndex === null ? { scale: 0.9 } : {}}
                  onClick={() => handleChestOpen(index)}
                  disabled={openedChestIndex !== null}
                  className={`relative w-40 h-48 md:w-56 md:h-64 rounded-3xl border-4 transition-all duration-500 flex flex-col items-center justify-center ${
                    openedChestIndex === index 
                      ? 'bg-slate-800 border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.6)] scale-110' 
                      : openedChestIndex !== null 
                        ? 'bg-slate-900 border-slate-800 opacity-30 grayscale' 
                        : 'bg-gradient-to-b from-indigo-900 to-slate-900 border-indigo-500 hover:border-amber-400 shadow-xl cursor-pointer'
                  }`}
                >
                  {openedChestIndex === index ? (
                    <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center p-4 text-center">
                      <div className="bg-black/30 p-4 rounded-full mb-4 animate-bounce">
                        {reward.icon}
                      </div>
                      <span className={`font-black text-xl md:text-2xl ${reward.color}`}>{reward.text}</span>
                    </motion.div>
                  ) : (
                    <Gift size={80} className={`text-indigo-400 ${openedChestIndex === null ? 'animate-pulse' : ''}`} />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🚀 อัปเดตแอนิเมชันให้โชว์ดาเมจโบนัสที่ทำได้ด้วย */}
      {status === 'HIT_ANIMATION' && (
        <div className="absolute inset-0 bg-emerald-500/20 z-40 flex flex-col items-center justify-center backdrop-blur-sm pointer-events-none">
          <motion.div initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: [1, 1.2, 1], opacity: 1 }} className="bg-slate-950/90 border-4 border-emerald-400 p-8 rounded-[3rem] text-center shadow-2xl">
            <Zap size={80} className="text-emerald-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-4xl font-black text-emerald-400">คำตอบถูกต้อง!</h2>
            <p className="text-xl text-white mt-4">
              ดาเมจพื้นฐาน -{damagePerHit}%
              {lastBonusDmg > 0 && <span className="text-amber-400 ml-2 font-bold">(โบนัสความไว +{lastBonusDmg}%)</span>}
            </p>
            <div className="text-3xl font-black text-rose-400 mt-2">รวมดาเมจทะลวงบอส -{damagePerHit + lastBonusDmg}%</div>
          </motion.div>
        </div>
      )}

      {status === 'COUNTER_ANIMATION' && (
        <div className="absolute inset-0 bg-rose-600/20 z-40 flex flex-col items-center justify-center backdrop-blur-sm pointer-events-none">
          <motion.div initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: [1, 1.1, 1], opacity: 1 }} className="bg-slate-950/90 border-4 border-rose-500 p-8 rounded-[3rem] text-center shadow-2xl">
            <AlertTriangle size={80} className="text-rose-500 mx-auto mb-4 animate-ping" />
            <h2 className="text-4xl font-black text-rose-500">ตอบผิดพลาด!</h2>
            <p className="text-xl text-slate-300 mt-2">บอสยิงสายฟ้าสวนกลับ โล่ลด -20%</p>
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {status === 'SUMMARY' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-slate-950/98 z-50 flex flex-col items-center justify-center p-6 overflow-y-auto">
            <Trophy size={80} className="text-amber-400 mb-4 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
            <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-400 mb-2">
              {raidResult === 'WIN' ? 'สุดยอด! เคลียร์บอสครบทั้ง 4 ด่าน! 🎉' : 'โล่พลังงานหมดสภาพลงก่อนสำเร็จ 🚧'}
            </h1>
            <p className="text-slate-400 text-lg mb-8">สมุดพกประเมินผลสมรรถนะอัจฉริยะ (O-NET Performance Profile)</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full bg-slate-900/50 p-8 rounded-[3rem] border border-slate-800 shadow-2xl items-center">
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2"><Sparkles size={18}/> แผนภูมิวิเคราะห์สมรรถนะ 5 มิติ</h3>
                <svg width="300" height="300" viewBox="0 0 200 200" className="overflow-visible">
                  {[0.25, 0.5, 0.75, 1].map((scale, step) => {
                    const r = 80 * scale;
                    const points = [];
                    for (let a = 0; a < 5; a++) {
                      const angle = (a * 2 * Math.PI) / 5 - Math.PI / 2;
                      points.push(`${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`);
                    }
                    return <polygon key={step} points={points.join(' ')} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />;
                  })}
                  {[0, 1, 2, 3, 4].map((a) => {
                    const angle = (a * 2 * Math.PI) / 5 - Math.PI / 2;
                    return <line key={a} x1="100" y1="100" x2={100 + 80 * Math.cos(angle)} y2={100 + 80 * Math.sin(angle)} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />;
                  })}
                  {(() => {
                    const stats = [
                      Math.min(100, analytics.speed + 40),
                      Math.min(100, analytics.accuracy),
                      Math.min(100, analytics.correctCount * 12 + 30),
                      Math.min(100, analytics.stamina + 20),
                      raidResult === 'WIN' ? 95 : 45
                    ];
                    const points = stats.map((val, a) => {
                      const r = 80 * (val / 100);
                      const angle = (a * 2 * Math.PI) / 5 - Math.PI / 2;
                      return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
                    });
                    return <polygon points={points.join(' ')} fill="rgba(6,182,212,0.25)" stroke="#22d3ee" strokeWidth="3" />;
                  })()}
                  {(() => {
                    const labels = ["ความเร็ว", "ความแม่นยำ", "การวิเคราะห์", "ความอึด", "ความรู้รวบยอด"];
                    return labels.map((lbl, a) => {
                      const angle = (a * 2 * Math.PI) / 5 - Math.PI / 2;
                      const x = 100 + 98 * Math.cos(angle);
                      const y = 100 + 98 * Math.sin(angle);
                      return <text key={a} x={x} y={y} fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle" alignmentBaseline="middle">{lbl}</text>;
                    });
                  })()}
                </svg>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                  <div className="text-sm text-slate-400">เปอร์เซ็นต์ความแม่นยำ (Accuracy Rate)</div>
                  <div className="text-3xl font-black text-amber-400">{analytics.accuracy}%</div>
                </div>
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                  <div className="text-sm text-slate-400">จำนวนข้อที่ทำเสร็จสิ้น (Total Attempted)</div>
                  <div className="text-3xl font-black text-cyan-400">{analytics.totalAnswered} ข้อ</div>
                </div>
                <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                  <div className="text-sm text-slate-400">จำนวนข้อที่วิเคราะห์ถูก (Correct Answers)</div>
                  <div className="text-3xl font-black text-emerald-400">{analytics.correctCount} ข้อ</div>
                </div>
                <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex gap-3">
                  <Lightbulb size={24} className="text-indigo-400 shrink-0"/>
                  <p className="text-sm text-indigo-200">
                    <b>คำแนะนำจาก AI:</b> {analytics.accuracy >= 70 ? 'เกณฑ์ดีเยี่ยม! พร้อมสำหรับการทำข้อสอบจริงในสนามสอบระดับชาติ!' : 'ยังคงมีจุดผิดพลาด แนะนำให้กลับไปทบทวนเนื้อหาและลองใหม่อีกครั้ง!'}
                  </p>
                </div>
              </div>
            </div>

            <button onClick={() => router.push('/onet')} className="mt-10 px-12 py-4 bg-emerald-500 text-slate-950 font-black text-xl rounded-full hover:scale-105 transition-all shadow-lg">
              กลับสู่หน้าเลือกระดับ
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}