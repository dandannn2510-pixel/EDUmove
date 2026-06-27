'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calculator, AlertCircle, Lightbulb, ArrowLeft, CheckCircle2, Info } from 'lucide-react';

import SinglePlayerCamera from '@/components/SinglePlayerCamera';
import CameraDetection from '@/components/CameraDetection';
import TugOfWarCamera from '@/components/TugOfWarCamera';
import { mathChallengeData } from '@/data/mathChallengeData';

// 📚 ฐานข้อมูลข้อสอบคณิตศาสตร์ (จัดเต็ม ป.4 - ป.6)
const mathQuizData: Record<string, any> = {
  p4: {
    chapter1: { 
      easy: [
        { q: "100,000 + 50,000 เท่ากับเท่าไร?", choiceA: "105,000", choiceB: "150,000", choiceC: "155,000", choiceD: "200,000", ans: "B", explanation: "นำหลักหมื่นบวกกัน (0+5=5) แล้วรวมกับหลักแสน จะได้ 150,000" },
        { q: "ข้อใดมีค่ามากกว่า 500,000?", choiceA: "499,999", choiceB: "500,000", choiceC: "500,001", choiceD: "450,000", ans: "C", explanation: "500,001 มีค่ามากกว่า 500,000 อยู่ 1 ส่วนข้ออื่นๆ มีค่าน้อยกว่าหรือเท่ากับ" },
        { q: "ค่าประจำหลักของเลข 7 ใน 70,000 คือหลักใด?", choiceA: "หลักร้อย", choiceB: "หลักพัน", choiceC: "หลักหมื่น", choiceD: "หลักแสน", ans: "C", explanation: "นับจากขวา: หน่วย สิบ ร้อย พัน หมื่น เลข 7 อยู่ในหลักหมื่น" },
        { q: "85,200 อ่านว่าอย่างไร?", choiceA: "แปดหมื่นห้าพันสองร้อย", choiceB: "แปดห้าสองศูนย์ศูนย์", choiceC: "แปดหมื่นห้าสองร้อย", choiceD: "แปดพันห้าร้อยยี่สิบ", ans: "A", explanation: "อ่านเรียงตามค่าประจำหลัก: แปดหมื่น ห้าพัน สองร้อย" },
        { q: "99,999 บวก 1 มีค่าเท่าไร?", choiceA: "99,990", choiceB: "100,000", choiceC: "100,001", choiceD: "1,000,000", ans: "B", explanation: "เมื่อ 99,999 บวกเพิ่ม 1 จะต้องทดไปเรื่อยๆ จนถึงหลักแสน ได้ 100,000" },
        { q: "30,000 + 40,000 เท่ากับข้อใด?", choiceA: "60,000", choiceB: "70,000", choiceC: "80,000", choiceD: "90,000", ans: "B", explanation: "นำ 3 + 4 = 7 จากนั้นเติม 0 อีก 4 ตัว ได้ 70,000" },
        { q: "150,000 - 50,000 เหลือเท่าไร?", choiceA: "50,000", choiceB: "100,000", choiceC: "150,000", choiceD: "200,000", ans: "B", explanation: "1 แสน 5 หมื่น หักออก 5 หมื่น จะเหลือ 1 แสนพอดี (100,000)" },
        { q: "เลข 4 ใน 345,000 มีค่าเท่าไร?", choiceA: "400", choiceB: "4,000", choiceC: "40,000", choiceD: "400,000", ans: "C", explanation: "เลข 4 อยู่ในหลักหมื่น ดังนั้นมีค่า 4 x 10,000 = 40,000" },
        { q: "10 หมื่น มีค่าเท่ากับเท่าไร?", choiceA: "10,000", choiceB: "100,000", choiceC: "1,000,000", choiceD: "1,000", ans: "B", explanation: "10 หมื่น คือการเติม 0 สี่ตัวต่อจากเลข 10 กลายเป็น 100,000 (หนึ่งแสน)" },
        { q: "500,000 + 20,000 + 300 รวมเป็นเท่าไร?", choiceA: "520,300", choiceB: "502,300", choiceC: "523,000", choiceD: "520,030", ans: "A", explanation: "นำตัวเลขแต่ละหลักมาประกอบกัน จะได้ ห้าแสน สองหมื่น สามร้อย (520,300)" }
      ],
      hard: [
        { q: "850,000 - 320,000 เท่ากับเท่าไร?", choiceA: "520,000", choiceB: "530,000", choiceC: "540,000", choiceD: "550,000", ans: "B", explanation: "นำ 85 ลบด้วย 32 จะได้ 53 จากนั้นเติมเลข 0 ตามหลัง 4 ตัว จะได้ 530,000" },
        { q: "(10,000 x 2) + 5,000 เท่ากับ?", choiceA: "20,000", choiceB: "25,000", choiceC: "30,000", choiceD: "35,000", ans: "B", explanation: "ทำในวงเล็บก่อน: 10,000 x 2 = 20,000 จากนั้นบวกอีก 5,000 เป็น 25,000" },
        { q: "จำนวนใดน้อยกว่า 1,000,000 แต่มสกกว่า 999,998?", choiceA: "999,997", choiceB: "999,999", choiceC: "1,000,001", choiceD: "1,000,000", ans: "B", explanation: "จำนวนที่อยู่ตรงกลางระหว่าง 999,998 และ 1,000,000 ก็คือ 999,999" },
        { q: "100,000 - 10,000 เหลือเท่าไร?", choiceA: "9,000", choiceB: "90,000", choiceC: "99,000", choiceD: "110,000", ans: "B", explanation: "1 แสน (100,000) ลบ 1 หมื่น (10,000) เท่ากับ 9 หมื่น หรือ 90,000" },
        { q: "254,000 + 146,000 เท่ากับเท่าไร?", choiceA: "300,000", choiceB: "350,000", choiceC: "400,000", choiceD: "450,000", ans: "C", explanation: "นำ 254 + 146 = 400 จากนั้นเติม 0 สามตัวด้านหลัง ได้ 400,000" },
        { q: "1,000,000 - 999,999 เท่ากับเท่าไร?", choiceA: "1", choiceB: "10", choiceC: "100", choiceD: "0", ans: "A", explanation: "สองจำนวนนี้มีค่าต่างกันแค่ 1 หลักหน่วยเท่านั้น ลบกันจึงได้ 1" },
        { q: "350,000 + _____ = 500,000 ควรเติมเลขใด?", choiceA: "50,000", choiceB: "100,000", choiceC: "150,000", choiceD: "200,000", ans: "C", explanation: "หาค่าที่หายไปโดยการนำ 500,000 - 350,000 จะได้ 150,000" },
        { q: "จำนวนใดน้อยกว่า 200,000 อยู่ 50,000?", choiceA: "100,000", choiceB: "150,000", choiceC: "250,000", choiceD: "300,000", ans: "B", explanation: "นำ 200,000 หักออก 50,000 จะเหลือ 150,000" },
        { q: "1 ล้าน มีศูนย์กี่ตัว?", choiceA: "4 ตัว", choiceB: "5 ตัว", choiceC: "6 ตัว", choiceD: "7 ตัว", ans: "C", explanation: "1 ล้านเขียนแทนด้วยเลข 1,000,000 ซึ่งมีเลขศูนย์ทั้งหมด 6 ตัว" },
        { q: "ถ้า A - 100,000 = 400,000 แล้ว A คือเท่าไร?", choiceA: "300,000", choiceB: "400,000", choiceC: "500,000", choiceD: "600,000", ans: "C", explanation: "ย้ายข้างสมการเป็น A = 400,000 + 100,000 ดังนั้น A = 500,000" },
        { q: "70,000 + 80,000 เท่ากับเท่าไร?", choiceA: "140,000", choiceB: "150,000", choiceC: "160,000", choiceD: "170,000", ans: "B", explanation: "นำ 7 + 8 = 15 แล้วเติม 0 อีก 4 ตัว ได้ 150,000" },
        { q: "ค่าประจำหลักของเลข 5 ใน 1,500,000 คือเท่าใด?", choiceA: "หมื่น", choiceB: "แสน", choiceC: "ล้าน", choiceD: "พัน", ans: "B", explanation: "เลข 5 อยู่ในตำแหน่งที่ 6 นับจากขวา คือหลักแสน" },
        { q: "จำนวนใดมากที่สุด?", choiceA: "909,999", choiceB: "990,999", choiceC: "999,099", choiceD: "999,909", ans: "C", explanation: "พิจารณาทีละหลักจากซ้ายไปขวา 999,099 มากที่สุด" },
        { q: "ห้าแสนสองหมื่น เขียนเป็นตัวเลขได้อย่างไร?", choiceA: "502,000", choiceB: "520,000", choiceC: "500,200", choiceD: "52,000", ans: "B", explanation: "ห้าแสน (5) และ สองหมื่น (2) เขียนติดกันเป็น 520,000" },
        { q: "1,200,000 - 200,000 เหลือเท่าไร?", choiceA: "10,000", choiceB: "100,000", choiceC: "1,000,000", choiceD: "10,000,000", ans: "C", explanation: "1 ล้าน 2 แสน ลบ 2 แสน เหลือ 1 ล้านถ้วน" },
        { q: "ถ้า 200,000 + B = 1,000,000 แล้ว B มีค่าเท่าไร?", choiceA: "700,000", choiceB: "800,000", choiceC: "900,000", choiceD: "1,200,000", ans: "B", explanation: "นำ 1,000,000 - 200,000 จะได้ 800,000" },
        { q: "เลข 0 ใน 405,000 อยู่ในหลักใดบ้าง?", choiceA: "หมื่น, ร้อย, สิบ, หน่วย", choiceB: "แสน, พัน, หน่วย", choiceC: "พัน, ร้อย, สิบ, หน่วย", choiceD: "หมื่น, พัน, ร้อย", ans: "A", explanation: "0 อยู่ในหลักหมื่น และ หลักร้อย หลักสิบ หลักหน่วย" },
        { q: "899,999 ถัดไปอีก 1 คือจำนวนใด?", choiceA: "900,000", choiceB: "899,000", choiceC: "999,999", choiceD: "1,000,000", ans: "A", explanation: "บวก 1 เพิ่มเข้าไป จะมีการทดเลขไปจนถึงหลักแสน ได้ 900,000" },
        { q: "50,000 x 2 เท่ากับเท่าไร?", choiceA: "10,000", choiceB: "100,000", choiceC: "1,000,000", choiceD: "500,000", ans: "B", explanation: "5 x 2 = 10 แล้วเติม 0 อีก 4 ตัว เป็น 100,000" },
        { q: "300,000 หาร 3 เท่ากับเท่าไร?", choiceA: "10,000", choiceB: "100,000", choiceC: "30,000", choiceD: "300", ans: "B", explanation: "นำ 3 หาร 3 ได้ 1 จากนั้นเติมศูนย์ที่เหลือ ได้ 100,000" }
      ]
    },
    chapter2: { 
      easy: [
        { q: "12 x 100 เท่ากับเท่าไร?", choiceA: "120", choiceB: "1,200", choiceC: "12,000", choiceD: "1,002", ans: "B", explanation: "การคูณด้วย 100 ให้เติม 0 สองตัวต่อท้ายเลข 12 ได้เลย กลายเป็น 1,200" },
        { q: "500 หารด้วย 5 ได้ผลลัพธ์เท่าไร?", choiceA: "50", choiceB: "100", choiceC: "150", choiceD: "200", ans: "B", explanation: "5 หาร 5 ได้ 1 จากนั้นดึง 0 อีกสองตัวมาใส่ จะได้ 100" },
        { q: "20 x 30 เท่ากับเท่าไร?", choiceA: "50", choiceB: "500", choiceC: "600", choiceD: "6,000", ans: "C", explanation: "นำ 2 x 3 = 6 แล้วเติม 0 สองตัว (จาก 20 และ 30) รวมเป็น 600" },
        { q: "1,000 หาร 10 ได้เท่าไร?", choiceA: "10", choiceB: "100", choiceC: "1,000", choiceD: "10,000", ans: "B", explanation: "ตัดเลข 0 ออก 1 ตัว (เพราะหารด้วย 10) จะเหลือ 100" },
        { q: "25 x 4 เท่ากับเท่าไร?", choiceA: "50", choiceB: "75", choiceC: "100", choiceD: "125", ans: "C", explanation: "25 บวกกัน 4 ครั้ง เท่ากับ 100 พอดี" }
      ],
      hard: [
        { q: "25 x 40 เท่ากับเท่าไร?", choiceA: "1,000", choiceB: "2,000", choiceC: "4,000", choiceD: "10,000", ans: "A", explanation: "นำ 25 x 4 = 100 จากนั้นเติม 0 อีก 1 ตัว กลายเป็น 1,000" },
        { q: "1,200 หาร 12 ได้ผลลัพธ์เท่าไร?", choiceA: "10", choiceB: "100", choiceC: "120", choiceD: "1,000", ans: "B", explanation: "นำ 12 หาร 12 ได้ 1 แล้วเติมศูนย์ 2 ตัว จะได้ 100" },
        { q: "(15 x 10) หาร 5 ได้เท่าไร?", choiceA: "20", choiceB: "30", choiceC: "40", choiceD: "50", ans: "B", explanation: "ในวงเล็บ 15x10=150 นำมาหารด้วย 5 ได้ 30" },
        { q: "125 x 8 เท่ากับเท่าไร?", choiceA: "800", choiceB: "900", choiceC: "1,000", choiceD: "1,200", ans: "C", explanation: "นำ 125 x 2 = 250 แล้วนำ 250 x 4 = 1,000" },
        { q: "2,500 หาร 50 ได้เท่าไร?", choiceA: "5", choiceB: "50", choiceC: "500", choiceD: "5,000", ans: "B", explanation: "ตัดศูนย์ออกฝั่งละ 1 ตัว เหลือ 250 หาร 5 เท่ากับ 50" }
      ]
    },
    chapter3: { 
      easy: [
        { q: "1 ชั่วโมง มีกี่นาที?", choiceA: "30", choiceB: "45", choiceC: "60", choiceD: "100", ans: "C", explanation: "หน้าปัดนาฬิกา 1 รอบของเข็มยาวมี 60 นาที" },
        { q: "1 กิโลกรัม เท่ากับกี่กรัม?", choiceA: "10", choiceB: "100", choiceC: "1,000", choiceD: "10,000", ans: "C", explanation: "หน่วยมาตรฐาน: 1 กิโลกรัม เท่ากับ 1,000 กรัม" },
        { q: "ครึ่งชั่วโมง เท่ากับกี่นาที?", choiceA: "15", choiceB: "30", choiceC: "45", choiceD: "60", ans: "B", explanation: "ครึ่งหนึ่งของ 60 คือ 30 นาที" },
        { q: "1 เมตร มีกี่เซนติเมตร?", choiceA: "10", choiceB: "50", choiceC: "100", choiceD: "1,000", ans: "C", explanation: "1 เมตร เท่ากับ 100 เซนติเมตร" },
        { q: "1 สัปดาห์ มีกี่วัน?", choiceA: "5", choiceB: "7", choiceC: "10", choiceD: "30", ans: "B", explanation: "1 สัปดาห์มี 7 วัน" }
      ],
      hard: [
        { q: "เวลา 14.30 น. คือเวลาใดในภาษาพูด?", choiceA: "บ่ายสองโมงครึ่ง", choiceB: "บ่ายสามโมงครึ่ง", choiceC: "บ่ายสี่โมง", choiceD: "สองทุ่ม", ans: "A", explanation: "14 นาฬิกา คือ บ่ายสองโมง ส่วน 30 นาที คือ ครึ่งชั่วโมง" },
        { q: "ระยะทาง 2.5 กิโลเมตร เท่ากับกี่เมตร?", choiceA: "250", choiceB: "2,500", choiceC: "25,000", choiceD: "25", ans: "B", explanation: "2.5 x 1,000 = 2,500 เมตร" },
        { q: "90 นาที เท่ากับเท่าไร?", choiceA: "1 ชม.", choiceB: "1 ชม. 30 นาที", choiceC: "2 ชม.", choiceD: "2 ชม. 30 นาที", ans: "B", explanation: "90 = 60(1 ชม.) + 30 นาที" },
        { q: "น้ำ 2 ลิตร ครึ่ง เท่ากับกี่มิลลิลิตร?", choiceA: "250", choiceB: "2,050", choiceC: "2,500", choiceD: "25,000", ans: "C", explanation: "2 ลิตร=2000, ครึ่งลิตร=500 รวมเป็น 2500 มล." },
        { q: "รถไฟออก 09.45 ถึง 12.15 ใช้เวลาเท่าไร?", choiceA: "2 ชม.", choiceB: "2 ชม. 30 นาที", choiceC: "3 ชม.", choiceD: "3 ชม. 30 นาที", ans: "B", explanation: "ใช้เวลาทั้งหมด 2 ชั่วโมง 30 นาที" }
      ]
    },
    chapter4: {
      easy: [
        { q: "เศษส่วนใดมีค่าเท่ากับ 1?", choiceA: "1/2", choiceB: "2/3", choiceC: "4/4", choiceD: "5/6", ans: "C", explanation: "เศษส่วนที่ตัวเศษและตัวส่วนเท่ากันจะมีค่าเท่ากับ 1 เสมอ" },
        { q: "3/5 อ่านว่าอย่างไร?", choiceA: "สามห้า", choiceB: "เศษสามส่วนห้า", choiceC: "ส่วนสามเศษห้า", choiceD: "สามจุดห้า", ans: "B", explanation: "อ่านตัวบนก่อนเป็น 'เศษ' และตัวล่างเป็น 'ส่วน'" },
        { q: "1/4 + 2/4 เท่ากับเท่าไร?", choiceA: "3/8", choiceB: "3/4", choiceC: "2/8", choiceD: "4/4", ans: "B", explanation: "ตัวส่วนเท่ากัน ให้นำตัวเศษบวกกันได้เลย (1+2=3)" },
        { q: "ข้อใดคือเศษส่วนแท้?", choiceA: "3/2", choiceB: "5/5", choiceC: "1/4", choiceD: "7/3", ans: "C", explanation: "เศษส่วนแท้คือเศษส่วนที่ตัวเศษน้อยกว่าตัวส่วน" },
        { q: "5/8 - 2/8 เท่ากับเท่าไร?", choiceA: "3/8", choiceB: "7/8", choiceC: "3/0", choiceD: "2/8", ans: "A", explanation: "นำตัวเศษลบกัน 5-2 = 3 ตัวส่วนคงเดิมคือ 8" }
      ],
      hard: [
        { q: "1/2 + 1/4 เท่ากับเท่าไร?", choiceA: "2/6", choiceB: "3/4", choiceC: "2/4", choiceD: "1/8", ans: "B", explanation: "ทำส่วนให้เท่ากัน 1/2 = 2/4 นำมาบวก 1/4 ได้ 3/4" },
        { q: "1 - 1/3 เท่ากับเท่าไร?", choiceA: "1/3", choiceB: "2/3", choiceC: "0", choiceD: "3/3", ans: "B", explanation: "แปลง 1 ให้เป็น 3/3 แล้วลบออก 1/3 จะเหลือ 2/3" },
        { q: "เศษส่วนใดมีค่าเท่ากับ 2/3?", choiceA: "4/6", choiceB: "3/4", choiceC: "2/6", choiceD: "6/8", ans: "A", explanation: "นำ 2 คูณทั้งเศษและส่วน (2x2=4, 3x2=6) ได้ 4/6" },
        { q: "พิซซ่า 8 ชิ้น กินไป 3 ชิ้น เหลือพิซซ่าเศษส่วนเท่าไร?", choiceA: "3/8", choiceB: "5/8", choiceC: "8/3", choiceD: "1/8", ans: "B", explanation: "เดิมมี 8/8 ลบที่กินไป 3/8 เหลือ 5/8" },
        { q: "ข้อใดเรียงจากน้อยไปมากได้ถูกต้อง?", choiceA: "1/4, 1/2, 3/4", choiceB: "3/4, 1/2, 1/4", choiceC: "1/2, 1/4, 3/4", choiceD: "1/4, 3/4, 1/2", ans: "A", explanation: "1/4 นอยที่สุด 1/2 คือครึ่งหนึ่ง และ 3/4 มากที่สุด" }
      ]
    },
    chapter5: {
      easy: [
        { q: "0.5 อ่านว่าอย่างไร?", choiceA: "ศูนย์จุดห้า", choiceB: "ห้าจุดศูนย์", choiceC: "ศูนย์ห้า", choiceD: "ห้า", ans: "A", explanation: "อ่านตัวเลขหน้าจุดตามปกติ แล้วอ่านคำว่า 'จุด' จากนั้นอ่านตัวเลขหลังจุด" },
        { q: "ทศนิยม 1 ตำแหน่ง มีส่วนเป็นเท่าไร?", choiceA: "ส่วน 10", choiceB: "ส่วน 100", choiceC: "ส่วน 1000", choiceD: "ส่วน 1", ans: "A", explanation: "ทศนิยม 1 ตำแหน่งคือการแบ่งเป็น 10 ส่วนเท่าๆ กัน" },
        { q: "1.2 + 2.3 เท่ากับเท่าไร?", choiceA: "3.2", choiceB: "3.5", choiceC: "4.5", choiceD: "3.0", ans: "B", explanation: "ตั้งจุดให้ตรงกัน บวกลำดับหลังจุด 2+3=5 บวกหน้าจุด 1+2=3 ได้ 3.5" },
        { q: "เศษ 7 ส่วน 10 เขียนเป็นทศนิยมได้อย่างไร?", choiceA: "7.10", choiceB: "0.7", choiceC: "0.07", choiceD: "7.0", ans: "B", explanation: "ส่วน 10 คือทศนิยม 1 ตำแหน่ง จึงเขียนได้เป็น 0.7" },
        { q: "4.8 - 2.5 เท่ากับเท่าไร?", choiceA: "2.3", choiceB: "2.5", choiceC: "1.3", choiceD: "3.3", ans: "A", explanation: "ลบตำแหน่งที่ตรงกัน 8-5=3 และ 4-2=2 ได้ 2.3" }
      ],
      hard: [
        { q: "10.55 - 5.25 เท่ากับเท่าไร?", choiceA: "5.30", choiceB: "5.20", choiceC: "5.10", choiceD: "4.30", ans: "A", explanation: "ลบตำแหน่งที่ตรงกัน 55-25 = 30 และ 10-5 = 5 จะได้ 5.30" },
        { q: "ข้อใดมีค่าน้อยที่สุด?", choiceA: "0.1", choiceB: "0.01", choiceC: "0.001", choiceD: "0.100", ans: "C", explanation: "ทศนิยมยิ่งตำแหน่งไกลจากจุดมาก ยิ่งมีค่าน้อย 0.001 จึงน้อยที่สุด" },
        { q: "3.5 + 2.75 เท่ากับเท่าไร?", choiceA: "6.25", choiceB: "5.25", choiceC: "6.80", choiceD: "5.80", ans: "A", explanation: "ตั้งจุดให้ตรงกัน เติม 0 หลัง 3.5 เป็น 3.50 + 2.75 = 6.25" },
        { q: "เงิน 15 บาท 50 สตางค์ เขียนเป็นทศนิยมได้อย่างไร?", choiceA: "15.05", choiceB: "15.50", choiceC: "50.15", choiceD: "1.55", ans: "B", explanation: "หน่วยบาทอยู่หน้าจุด หน่วยสตางค์อยู่หลังจุด เขียนได้ 15.50 บาท" },
        { q: "5 - 1.5 เท่ากับเท่าไร?", choiceA: "4.5", choiceB: "3.5", choiceC: "4.0", choiceD: "3.0", ans: "B", explanation: "ตั้ง 5.0 - 1.5 โดยยืมหลักหน้ามา จะได้ 3.5" }
      ]
    },
    chapter6: {
      easy: [
        { q: "มุมที่มีขนาด 90 องศา เรียกว่ามุมอะไร?", choiceA: "มุมแหลม", choiceB: "มุมฉาก", choiceC: "มุมป้าน", choiceD: "มุมตรง", ans: "B", explanation: "มุมฉาก คือมุมที่กางพอดี 90 องศาคล้ายมุมของหนังสือ" },
        { q: "รูปสี่เหลี่ยมที่มีด้านเท่ากัน 4 ด้าน มุมทุกมุมเป็นมุมฉาก คือรูปใด?", choiceA: "สี่เหลี่ยมผืนผ้า", choiceB: "สี่เหลี่ยมจัตุรัส", choiceC: "สี่เหลี่ยมคางหมู", choiceD: "สี่เหลี่ยมขนมเปียกปูน", ans: "B", explanation: "เป็นนิยามของสี่เหลี่ยมจัตุรัส" },
        { q: "สามเหลี่ยมมีมุมทั้งหมดกี่มุม?", choiceA: "2 มุม", choiceB: "3 มุม", choiceC: "4 มุม", choiceD: "ไม่มีมุม", ans: "B", explanation: "ตามชื่อเลยครับ รูปสามเหลี่ยมต้องมี 3 ด้านและ 3 มุม" },
        { q: "เครื่องมือใดใช้วัดขนาดของมุม?", choiceA: "ไม้บรรทัด", choiceB: "วงเวียน", choiceC: "โพรแทรกเตอร์", choiceD: "ตลับเมตร", ans: "C", explanation: "โพรแทรกเตอร์ใช้สำหรับวัดองศาของมุมโดยเฉพาะ" },
        { q: "สี่เหลี่ยมผืนผ้า มีด้านตรงข้ามยาวเท่ากันกี่คู่?", choiceA: "1 คู่", choiceB: "2 คู่", choiceC: "3 คู่", choiceD: "4 คู่", ans: "B", explanation: "สี่เหลี่ยมผืนผ้ามีด้านกว้าง 1 คู่ และด้านยาว 1 คู่ รวมเป็น 2 คู่ที่เท่ากัน" }
      ],
      hard: [
        { q: "มุมป้านมีขนาดเท่าใด?", choiceA: "น้อยกว่า 90", choiceB: "เท่ากับ 90", choiceC: "มากกว่า 90 แต่น้อยกว่า 180", choiceD: "เท่ากับ 180", ans: "C", explanation: "มุมป้าน จะกางกว้างกว่ามุมฉาก แต่ไม่กางจนเป็นเส้นตรง" },
        { q: "ข้อมูลใดเหมาะกับการนำเสนอด้วยแผนภูมิแท่งมากที่สุด?", choiceA: "นักเรียนที่ชอบผลไม้แต่ละชนิด", choiceB: "อุณหภูมิในแต่ละเวลา", choiceC: "สัดส่วนก๊าซในอากาศ", choiceD: "ความเร็วรถยนต์", ans: "A", explanation: "แผนภูมิแท่งเหมาะกับการเปรียบเทียบจำนวนสิ่งของที่แบ่งหมวดหมู่ชัดเจน" },
        { q: "เส้นทแยงมุมของรูปสี่เหลี่ยมจัตุรัส มีลักษณะอย่างไร?", choiceA: "ยาวไม่เท่ากัน", choiceB: "ไม่ตัดกัน", choiceC: "ตัดกันเป็นมุมฉาก", choiceD: "ขนานกัน", ans: "C", explanation: "เส้นทแยงมุมของสี่เหลี่ยมจัตุรัสจะยาวเท่ากัน แบ่งครึ่งซึ่งกันและกัน และตัดกันเป็นมุมฉากเสมอ" },
        { q: "มุมตรง มีขนาดเท่ากับมุมฉากกี่มุมรวมกัน?", choiceA: "1 มุม", choiceB: "2 มุม", choiceC: "3 มุม", choiceD: "4 มุม", ans: "B", explanation: "มุมตรง = 180 องศา ส่วนมุมฉาก = 90 องศา ดังนั้นต้องใช้ 2 มุมฉาก (90+90)" },
        { q: "แผนภูมิรูปภาพ 1 รูป แทนจำนวนรถ 10 คัน ถ้ารูปวาดมี 5 รูปครึ่ง มีรถกี่คัน?", choiceA: "50 คัน", choiceB: "55 คัน", choiceC: "60 คัน", choiceD: "15 คัน", ans: "B", explanation: "5 รูป = 50 คัน, ครึ่งรูป = 5 คัน รวมเป็น 55 คัน" }
      ]
    }
  },
  p5: {
    chapter1: {
      easy: [
        { q: "1/3 + 1/6 เท่ากับเท่าไร?", choiceA: "2/9", choiceB: "1/2", choiceC: "3/6", choiceD: "ทั้ง B และ C ถูก", ans: "D", explanation: "ทำส่วนให้เท่ากัน 1/3=2/6 นำมาบวก 1/6 จะได้ 3/6 ทอนต่ำได้ 1/2" },
        { q: "เศษส่วนใดมีค่าเท่ากับ 1/2?", choiceA: "2/4", choiceB: "3/6", choiceC: "5/10", choiceD: "ถูกทุกข้อ", ans: "D", explanation: "เมื่อนำตัวเศษไปหารตัวส่วน ถ้าได้ผลลัพธ์เป็น 2 จะมีค่า 1/2 ทั้งหมด" },
        { q: "ข้อใดคือจำนวนคละ?", choiceA: "5/3", choiceB: "1 1/2", choiceC: "4/4", choiceD: "0.5", ans: "B", explanation: "จำนวนคละคือการรวมกันของจำนวนเต็มและเศษส่วนแท้" },
        { q: "1/4 ของ 20 มีค่าเท่าไร?", choiceA: "4", choiceB: "5", choiceC: "10", choiceD: "16", ans: "B", explanation: "นำ 20 หาร 4 เท่ากับ 5" },
        { q: "1/2 x 1/2 เท่ากับเท่าไร?", choiceA: "1", choiceB: "1/4", choiceC: "2/4", choiceD: "1/2", ans: "B", explanation: "คูณเศษส่วน: เศษคูณเศษ(1x1) และ ส่วนคูณส่วน(2x2) = 1/4" }
      ],
      hard: [
        { q: "2 1/2 ทำเป็นเศษเกินได้เท่าไร?", choiceA: "3/2", choiceB: "4/2", choiceC: "5/2", choiceD: "6/2", ans: "C", explanation: "นำ (ส่วน x จำนวนเต็ม) + เศษ = (2x2)+1 = 5 ได้ 5/2" },
        { q: "2/3 ÷ 1/3 เท่ากับเท่าไร?", choiceA: "1", choiceB: "2", choiceC: "3", choiceD: "2/9", ans: "B", explanation: "เปลี่ยนหารเป็นคูณ กลับเศษเป็นส่วน: 2/3 x 3/1 = 6/3 = 2" },
        { q: "มีเชือก 10 เมตร ตัดไปใช้ 2 1/2 เมตร เหลือเท่าไร?", choiceA: "7 1/2 ม.", choiceB: "8 1/2 ม.", choiceC: "7 ม.", choiceD: "8 ม.", ans: "A", explanation: "10 - 2.5 = 7.5 หรือ 7 เศษ 1/2" },
        { q: "(1/2 + 1/4) x 8 เท่ากับเท่าไร?", choiceA: "4", choiceB: "6", choiceC: "8", choiceD: "12", ans: "B", explanation: "ในวงเล็บได้ 3/4 นำไปคูณ 8 จะได้ (3x8)/4 = 6" },
        { q: "แม่มีเงิน 500 บาท ให้ลูกไป 1/5 ของเงินที่มี แม่เหลือเงินเท่าไร?", choiceA: "100 บาท", choiceB: "200 บาท", choiceC: "300 บาท", choiceD: "400 บาท", ans: "D", explanation: "ให้ลูกไป 100 บาท (500/5) ดังนั้นแม่เหลือ 400 บาท" }
      ]
    },
    chapter2: {
      easy: [
        { q: "0.2 x 3 เท่ากับเท่าไร?", choiceA: "0.5", choiceB: "0.6", choiceC: "6.0", choiceD: "1.2", ans: "B", explanation: "นำ 2x3=6 แล้วใส่ทศนิยม 1 ตำแหน่ง ได้ 0.6" },
        { q: "1.5 + 2.5 เท่ากับเท่าไร?", choiceA: "3.0", choiceB: "4.0", choiceC: "3.10", choiceD: "4.5", ans: "B", explanation: "1.5 + 2.5 = 4.0 หรือ 4" },
        { q: "2.4 ÷ 2 เท่ากับเท่าไร?", choiceA: "1.2", choiceB: "0.12", choiceC: "12", choiceD: "4.8", ans: "A", explanation: "หารปกติ 24÷2=12 ใส่ทศนิยมคืน 1 ตำแหน่ง ได้ 1.2" },
        { q: "ทศนิยมใดมีค่ามากที่สุด?", choiceA: "0.9", choiceB: "0.99", choiceC: "0.099", choiceD: "0.909", ans: "B", explanation: "เทียบทีละหลัก 0.99 มีค่าเท่ากับ 0.990 ซึ่งมากกว่าตัวอื่น" },
        { q: "0.5 คิดเป็นร้อยละเท่าไร?", choiceA: "5%", choiceB: "50%", choiceC: "100%", choiceD: "0.5%", ans: "B", explanation: "0.5 = 50/100 จึงเท่ากับร้อยละ 50 หรือ 50%" }
      ],
      hard: [
        { q: "1.5 x 1.2 เท่ากับเท่าไร?", choiceA: "1.7", choiceB: "1.8", choiceC: "1.85", choiceD: "2.0", ans: "B", explanation: "15x12=180 ทศนิยมรวม 2 ตำแหน่ง ได้ 1.80 หรือ 1.8" },
        { q: "10 หาร 0.5 ได้เท่าไร?", choiceA: "5", choiceB: "10", choiceC: "15", choiceD: "20", ans: "D", explanation: "เลื่อนจุด 0.5 เป็น 5 เติม 0 ที่ 10 เป็น 100 จะได้ 100/5 = 20" },
        { q: "12.5 x 0.1 เท่ากับเท่าไร?", choiceA: "125", choiceB: "1.25", choiceC: "0.125", choiceD: "12.05", ans: "B", explanation: "คูณ 0.1 คือการเลื่อนจุดทศนิยมไปข้างหน้า 1 ตำแหน่ง ได้ 1.25" },
        { q: "ซื้อดินสอ 3 แท่ง ราคาแท่งละ 4.50 บาท จ่ายแบงก์ 20 จะได้รับเงินทอนเท่าไร?", choiceA: "5.50 บาท", choiceB: "6.00 บาท", choiceC: "6.50 บาท", choiceD: "7.00 บาท", ans: "C", explanation: "ซื้อของ 3 x 4.50 = 13.50 บาท จ่าย 20 ทอน 20 - 13.50 = 6.50 บาท" },
        { q: "เชือก 5.5 เมตร ตัดแบ่ง 5 เส้นเท่าๆ กัน จะได้เส้นละกี่เมตร?", choiceA: "1 เมตร", choiceB: "1.1 เมตร", choiceC: "1.5 เมตร", choiceD: "1.05 เมตร", ans: "B", explanation: "5.5 หาร 5 ได้ 1.1" }
      ]
    }
  },
  p6: {
    chapter1: {
      easy: [
        { q: "จำนวนเฉพาะตัวแรกคือเลขอะไร?", choiceA: "1", choiceB: "2", choiceC: "3", choiceD: "5", ans: "B", explanation: "2 เป็นจำนวนเฉพาะตัวแรกและเป็นจำนวนคู่เพียงตัวเดียวที่เป็นจำนวนเฉพาะ" },
        { q: "ตัวประกอบของ 10 มีกี่ตัว?", choiceA: "2", choiceB: "3", choiceC: "4", choiceD: "5", ans: "C", explanation: "ตัวประกอบของ 10 คือเลขที่หาร 10 ลงตัว ได้แก่ 1, 2, 5, 10" },
        { q: "ข้อใดคือจำนวนเฉพาะทั้งหมด?", choiceA: "2, 3, 5, 9", choiceB: "2, 3, 5, 7", choiceC: "1, 2, 3, 5", choiceD: "2, 4, 6, 8", ans: "B", explanation: "9 และ 1 ไม่ใช่จำนวนเฉพาะ" },
        { q: "ห.ร.ม. ของ 4 และ 8 คืออะไร?", choiceA: "2", choiceB: "4", choiceC: "8", choiceD: "16", ans: "B", explanation: "ตัวหารร่วมที่มากที่สุดของ 4 และ 8 คือ 4" },
        { q: "ค.ร.น. ของ 2 และ 3 คืออะไร?", choiceA: "1", choiceB: "2", choiceC: "3", choiceD: "6", ans: "D", explanation: "พหุคูณร่วมที่น้อยที่สุดของ 2 และ 3 คือ 6" }
      ],
      hard: [
        { q: "ห.ร.ม. ของ 12 และ 18 คืออะไร?", choiceA: "2", choiceB: "3", choiceC: "6", choiceD: "36", ans: "C", explanation: "ตัวหารร่วมที่มากที่สุดที่หาร 12 และ 18 ลงตัวคือ 6" },
        { q: "ค.ร.น. ของ 4 และ 6 คืออะไร?", choiceA: "2", choiceB: "10", choiceC: "12", choiceD: "24", ans: "C", explanation: "พหุคูณร่วมน้อยที่สุดที่ 4 และ 6 หารลงตัว คือ 12" },
        { q: "ส้ม 12 ผล แอปเปิ้ล 18 ผล จัดใส่ตะกร้าให้เท่ากัน จะได้ตะกร้าละกี่ผล?", choiceA: "2", choiceB: "3", choiceC: "6", choiceD: "9", ans: "C", explanation: "หา ห.ร.ม. ของ 12 และ 18 จะได้ 6 ผลต่อตะกร้า" },
        { q: "นาฬิกาปลุกทุก 10, 15, 20 นาที ถ้าปลุกพร้อมกันตอน 8.00 จะดังพร้อมกันอีกทีเวลาใด?", choiceA: "8.30", choiceB: "8.45", choiceC: "9.00", choiceD: "9.30", ans: "C", explanation: "หา ค.ร.น. ของ 10, 15, 20 ได้ 60 นาที ดังนั้นจะดังอีกทีใน 9.00" },
        { q: "ตัวประกอบเฉพาะของ 30 คือข้อใด?", choiceA: "1, 2, 3, 5", choiceB: "2, 3, 5", choiceC: "2, 5", choiceD: "2, 15", ans: "B", explanation: "ตัวประกอบของ 30 ที่เป็นจำนวนเฉพาะคือ 2,3,5" }
      ]
    },
    chapter2: {
      easy: [
        { q: "3/4 ทำเป็นทศนิยมได้เท่าไร?", choiceA: "0.25", choiceB: "0.50", choiceC: "0.75", choiceD: "3.4", ans: "C", explanation: "3 หาร 4 เท่ากับ 0.75 หรือ 75%" },
        { q: "0.125 คิดเป็นเศษส่วนเท่าไร?", choiceA: "1/2", choiceB: "1/4", choiceC: "1/8", choiceD: "1/10", ans: "C", explanation: "125/1000 ตัดทอนด้วย 125 จะได้ 1/8" },
        { q: "5% คิดเป็นเศษส่วนได้เท่าไร?", choiceA: "1/5", choiceB: "1/20", choiceC: "5/10", choiceD: "1/50", ans: "B", explanation: "5/100 ทอนต่ำด้วย 5 ได้ 1/20" },
        { q: "0.3 + 1/2 เท่ากับเท่าไร?", choiceA: "0.8", choiceB: "0.5", choiceC: "1.2", choiceD: "1.5", ans: "A", explanation: "1/2 คือ 0.5 เมื่อนำไปบวก 0.3 จะได้ 0.8" },
        { q: "25/100 เขียนเป็นทศนิยมได้ตามข้อใด?", choiceA: "2.5", choiceB: "0.25", choiceC: "0.025", choiceD: "25.0", ans: "B", explanation: "ส่วน 100 คือทศนิยม 2 ตำแหน่ง จึงเป็น 0.25" }
      ],
      hard: [
        { q: "(1/2 + 1/4) x 8 เท่ากับเท่าไร?", choiceA: "4", choiceB: "6", choiceC: "8", choiceD: "12", ans: "B", explanation: "ในวงเล็บ 1/2 + 1/4 = 3/4 นำไปคูณ 8 จะได้ 6" },
        { q: "0.2 x 0.3 มีค่าเท่ากับข้อใด?", choiceA: "0.6", choiceB: "0.06", choiceC: "0.006", choiceD: "1.5", ans: "B", explanation: "2x3=6 นับตำแหน่งทศนิยมรวมกัน 2 ตำแหน่ง คือ 0.06" },
        { q: "2.5 ÷ 1/2 เท่ากับเท่าไร?", choiceA: "1.25", choiceB: "5", choiceC: "0.5", choiceD: "20", ans: "B", explanation: "หารด้วย 1/2 คือการคูณด้วย 2 (2.5 x 2 = 5)" },
        { q: "มีน้ำ 3/4 ลิตร ดื่มไป 0.5 ลิตร จะเหลือน้ำเท่าไร?", choiceA: "0.25 ลิตร", choiceB: "1.25 ลิตร", choiceC: "0.5 ลิตร", choiceD: "0.15 ลิตร", ans: "A", explanation: "3/4 = 0.75 นำ 0.75 - 0.50 = 0.25 ลิตร" },
        { q: "สินค้าลดราคา 20% จาก 500 บาท ต้องจ่ายเงินเท่าไร?", choiceA: "100 บาท", choiceB: "300 บาท", choiceC: "400 บาท", choiceD: "480 บาท", ans: "C", explanation: "ลด 20% คือลด 100 บาท ต้องจ่าย 500 - 100 = 400 บาท" }
      ]
    }
  }
};

export default function MathDynamicQuizPage() {
  const params = useParams();
  const router = useRouter();
  const [showAnswers, setShowAnswers] = useState(false);

  const level = (params?.level as string) || 'p4';
  const chapterOrChallenge = (params?.chapter as string) || 'chapter1'; 
  const difficulty = (params?.difficulty as string) || 'easy'; 

  const isChallenge = chapterOrChallenge.includes('challenge');
  
  // 🚀 ใส่ as any[] เพื่อบอก TypeScript ไม่ต้องตกใจเรื่อง Type ซ้อนทับ
  const questions: any[] = isChallenge 
    ? mathChallengeData[level]?.[chapterOrChallenge]?.[difficulty] || []
    : mathQuizData[level]?.[chapterOrChallenge]?.[difficulty] || [];

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white p-6 text-center">
        <AlertCircle size={80} className="text-fuchsia-500 mb-6 animate-pulse" />
        <h1 className="text-4xl text-fuchsia-400 font-black mb-6">ยังไม่มีข้อสอบในระบบ 🚧</h1>
        <button onClick={() => router.back()} className="px-8 py-3.5 bg-white/10 hover:bg-white/20 rounded-full font-bold transition-all border border-white/20">
          กลับไปหน้าบทเรียน
        </button>
      </div>
    );
  }

  if (showAnswers) {
    return (
      <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 overflow-y-auto" style={{ fontFamily: "'Kanit', sans-serif" }}>
        <div className="max-w-4xl mx-auto pb-20">
          <div className="flex items-center justify-between mb-10">
            <button onClick={() => setShowAnswers(false)} className="flex items-center gap-2 text-slate-400 hover:text-white bg-white/5 px-6 py-3 rounded-full border border-white/10 transition-all font-bold">
              <ArrowLeft size={20} /> กลับไปหน้าเกม
            </button>
            <button onClick={() => router.back()} className="text-rose-400 hover:text-white font-bold hover:underline">
               ออกสู่หน้าหลัก
            </button>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-amber-400 mb-2 flex items-center gap-3">
            <Lightbulb size={40} className="animate-pulse" /> เฉลยข้อสอบพร้อมคำอธิบาย
          </h1>
          <p className="text-slate-400 text-lg mb-10">
            โหมด: {isChallenge ? 'ด่านท้าทาย (ท้ายเทอม)' : (difficulty === 'easy' ? 'Pre-test (ก่อนเรียน)' : 'Post-test (หลังเรียน)')} | จำนวน {questions.length} ข้อ
          </p>

          <div className="space-y-8">
            {questions.map((q: any, i: number) => (
              <div key={i} className="bg-slate-900/80 border border-slate-700/50 p-6 md:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-slate-800 text-slate-500 font-black text-6xl opacity-30 p-4 rounded-bl-[3rem] pointer-events-none">{i + 1}</div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed relative z-10"><span className="text-fuchsia-400 mr-2">Q:</span>{q.q}</h2>
                
                {isChallenge ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                    <div className={`p-4 md:p-6 rounded-2xl border-2 flex justify-between items-center ${q.ans === 'LEFT' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-slate-700 bg-slate-800/50 text-slate-400'}`}><span>👈 ซ้าย: {q.leftChoice}</span>{q.ans === 'LEFT' && <CheckCircle2 size={24} />}</div>
                    <div className={`p-4 md:p-6 rounded-2xl border-2 flex justify-between items-center ${q.ans === 'RIGHT' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-slate-700 bg-slate-800/50 text-slate-400'}`}><span>ขวา: {q.rightChoice} 👉</span>{q.ans === 'RIGHT' && <CheckCircle2 size={24} />}</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                    {['A', 'B', 'C', 'D'].map(choice => (
                      <div key={choice} className={`p-4 rounded-2xl border-2 flex justify-between items-center ${q.ans === choice ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-slate-700 bg-slate-800/50 text-slate-400'}`}>
                        <span>{choice}. {q[`choice${choice}`]}</span>{q.ans === choice && <CheckCircle2 size={24} />}
                      </div>
                    ))}
                  </div>
                )}

                {q.explanation && (
                  <div className="mt-6 p-5 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex gap-4 items-start relative z-10">
                    <div className="bg-indigo-500/20 p-2 rounded-full text-indigo-400 shrink-0"><Info size={24} /></div>
                    <div><h4 className="text-indigo-300 font-bold text-sm uppercase tracking-wider mb-1">คำอธิบายเฉลย</h4><p className="text-indigo-100/90 text-base md:text-lg leading-relaxed">{q.explanation}</p></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const gradeText = level === 'p4' ? 'ป.4' : level === 'p5' ? 'ป.5' : 'ป.6';
  let expName = "";

  if (isChallenge) {
    const term = chapterOrChallenge === 'challenge1' ? '1' : '2';
    const diffText = difficulty === 'easy' ? 'ง่าย' : difficulty === 'medium' ? 'ปานกลาง' : 'ยาก';
    expName = `ระดับชั้น ${gradeText} ภาคเรียนที่ ${term} ระดับ ${diffText}`;
  } else {
    const typeText = difficulty === 'easy' ? 'Pre-test' : 'Post-test';
    const chapterNumber = chapterOrChallenge.replace('chapter', '');
    expName = `คณิตศาสตร์ ${gradeText} บทที่ ${chapterNumber} : ${typeText}`;
  }

  return (
    <div className="w-full h-screen bg-[#020617] overflow-hidden relative">
      {/* 🚀 บังคับ Type ด้วย as any เพื่อให้ TypeScript เลิกงอแง */}
      {isChallenge ? (
        <SinglePlayerCamera questions={questions as any} onExit={() => router.back()} onViewAnswers={() => setShowAnswers(true)} experimentName={expName} />
      ) : difficulty === 'hard' ? (
        <TugOfWarCamera questions={questions as any} onFinish={() => router.back()} onViewAnswers={() => setShowAnswers(true)} experimentName={expName} />
      ) : (
        <CameraDetection questions={questions as any} onFinish={() => router.back()} onViewAnswers={() => setShowAnswers(true)} experimentName={expName} />
      )}
    </div>
  );
}