'use client';
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Home, Star, Lock, ArrowRight, AlertTriangle , XCircle, Lightbulb, ArrowLeft } from 'lucide-react';
import { gameMusic } from '@/utils/gameMusic';
import ConfettiCelebration from '@/components/ConfettiCelebration';

// 🟢 คลังโจทย์ 30 ข้อ แบ่ง 3 ระดับความยาก
const mathQuestions = [
  {
    "level": 1,
    "type": "choice",
    "q": "12,500 + 7,450 = ?",
    "choices": [
      "A. 19,850",
      "B. 19,950",
      "C. 20,050",
      "D. 20,950"
    ],
    "ans": "B"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "50,000 - 15,200 = ?",
    "choices": [
      "A. 34,800",
      "B. 35,800",
      "C. 34,200",
      "D. 35,200"
    ],
    "ans": "A"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "450 × 12 = ?",
    "choices": [
      "A. 5,200",
      "B. 5,400",
      "C. 5,600",
      "D. 5,800"
    ],
    "ans": "B"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "1,440 ÷ 12 = ?",
    "choices": [
      "A. 100",
      "B. 110",
      "C. 120",
      "D. 130"
    ],
    "ans": "C"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "(250 × 4) + 1,000 = ?",
    "choices": [
      "A. 1,500",
      "B. 2,000",
      "C. 2,500",
      "D. 3,000"
    ],
    "ans": ") + 1,000 = ? ก. 1,500 ข. 2,000 ค. 2,500 ง. 3,000 (เฉลย:"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "10,000 - (1,500 + 2,500) = ?",
    "choices": [
      "A. 5,000",
      "B. 6,000",
      "C. 7,000",
      "D. 8,000"
    ],
    "ans": ") = ? ก. 5,000 ข. 6,000 ค. 7,000 ง. 8,000 (เฉลย:"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "ค่าประจำหลักของเลข 7 ใน 1,750,000 คือเท่าใด?",
    "choices": [
      "A. แสน",
      "B. หมื่น",
      "C. พัน",
      "D. ล้าน"
    ],
    "ans": "A"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "89,999 + 1 = ?",
    "choices": [
      "A. 89,100",
      "B. 90,000",
      "C. 99,000",
      "D. 100,000"
    ],
    "ans": "B"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "555 × 10 = ?",
    "choices": [
      "A. 55",
      "B. 555",
      "C. 5,550",
      "D. 55,500"
    ],
    "ans": "C"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "จำนวนใดมีค่ามากที่สุด?",
    "choices": [
      "A. 10,101",
      "B. 11,010",
      "C. 10,110",
      "D. 11,100"
    ],
    "ans": "D"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "2,400 ÷ 80 = ?",
    "choices": [
      "A. 30",
      "B. 40",
      "C. 50",
      "D. 60"
    ],
    "ans": "A"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "99 × 99 = ?",
    "choices": [
      "A. 9,801",
      "B. 9,901",
      "C. 9,991",
      "D. 9,999"
    ],
    "ans": "A"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "(100 ÷ 5) × 3 = ?",
    "choices": [
      "A. 40",
      "B. 50",
      "C. 60",
      "D. 70"
    ],
    "ans": ") × 3 = ? ก. 40 ข. 50 ค. 60 ง. 70 (เฉลย:"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "4,500 ÷ 9 = ?",
    "choices": [
      "A. 400",
      "B. 500",
      "C. 600",
      "D. 700"
    ],
    "ans": "B"
  },
  {
    "level": 1,
    "type": "choice",
    "q": "ซื้อสมุด 5 เล่ม เล่มละ 15 บาท จ่ายแบงก์ 100 จะได้รับเงินทอนกี่บาท?",
    "choices": [
      "A. 15",
      "B. 20",
      "C. 25",
      "D. 30"
    ],
    "ans": "C"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "ข้อใดคือจำนวนเฉพาะ?",
    "choices": [
      "A. 9",
      "B. 15",
      "C. 17",
      "D. 21"
    ],
    "ans": "C"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "จำนวนเฉพาะที่อยู่ระหว่าง 1 ถึง 10 มีกี่ตัว?",
    "choices": [
      "A. 3",
      "B. 4",
      "C. 5",
      "D. 6"
    ],
    "ans": "B"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "ตัวประกอบทั้งหมดของ 12 มีกี่ตัว?",
    "choices": [
      "A. 4",
      "B. 5",
      "C. 6",
      "D. 7"
    ],
    "ans": "C"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "ข้อใดแยกตัวประกอบของ 20 ได้ถูกต้อง?",
    "choices": [
      "A. 2 × 10",
      "B. 4 × 5",
      "C. 2 × 2 × 5",
      "D. 2 × 5 × 5"
    ],
    "ans": "C"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "ตัวประกอบร่วมที่มากที่สุด (ห.ร.ม.) ของ 8 และ 12 คือข้อใด?",
    "choices": [
      "A. 2",
      "B. 4",
      "C. 6",
      "D. 8"
    ],
    "ans": ") ของ 8 และ 12 คือข้อใด? ก. 2 ข. 4 ค. 6 ง. 8 (เฉลย:"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "ผลคูณร่วมน้อย (ค.ร.น.) ของ 4 และ 6 คือข้อใด?",
    "choices": [
      "A. 12",
      "B. ค.ร.น.) ของ 4 และ 6 คือข้อใด? ก. 12 ข.",
      "C. ร.น.) ของ 4 และ 6 คือข้อใด? ก. 12 ข. 18 ค. 24",
      "D. 36"
    ],
    "ans": ") ของ 4 และ 6 คือข้อใด? ก. 12 ข. 18 ค. 24 ง. 36 (เฉลย:"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "จำนวนใดไม่ใช่ตัวประกอบของ 24?",
    "choices": [
      "A. 6",
      "B. 8",
      "C. 12",
      "D. 16"
    ],
    "ans": "D"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "ห.ร.ม. ของ 15, 30 และ 45 คือข้อใด?",
    "choices": [
      "A. 5",
      "B. 10",
      "C. 15",
      "D. 30"
    ],
    "ans": "C"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "ค.ร.น. ของ 5, 10 และ 15 คือข้อใด?",
    "choices": [
      "A. 15",
      "B. ค.ร.น. ของ 5, 10 และ 15 คือข้อใด? ก. 15 ข.",
      "C. ร.น. ของ 5, 10 และ 15 คือข้อใด? ก. 15 ข. 30 ค. 45",
      "D. 60"
    ],
    "ans": "B"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "ตัวประกอบเฉพาะของ 30 มีอะไรบ้าง?",
    "choices": [
      "A. 2, 3, 5",
      "B. 2, 5, 6",
      "C. 3, 5, 10",
      "D. 1, 2, 15"
    ],
    "ans": "A"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "2 × 3 × 3 × 5 เป็นการแยกตัวประกอบของจำนวนใด?",
    "choices": [
      "A. 60",
      "B. 75",
      "C. 90",
      "D. 120"
    ],
    "ans": "C"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "จำนวนเฉพาะที่มากที่สุดที่น้อยกว่า 20 คือจำนวนใด?",
    "choices": [
      "A. 17",
      "B. 18",
      "C. 19",
      "D. 21"
    ],
    "ans": "C"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "ห.ร.ม. ของ 18 และ 27 คือจำนวนใด?",
    "choices": [
      "A. 3",
      "B. 6",
      "C. 9",
      "D. 18"
    ],
    "ans": "C"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "ค.ร.น. ของ 8 และ 10 คือจำนวนใด?",
    "choices": [
      "A. 20",
      "B. ค.ร.น. ของ 8 และ 10 คือจำนวนใด? ก. 20 ข.",
      "C. ร.น. ของ 8 และ 10 คือจำนวนใด? ก. 20 ข. 40 ค. 80",
      "D. 120"
    ],
    "ans": "B"
  },
  {
    "level": 2,
    "type": "choice",
    "q": "ข้อใดไม่ใช่จำนวนเฉพาะทั้งหมด?",
    "choices": [
      "A. 2, 3, 5",
      "B. 7, 11, 13",
      "C. 17, 19, 23",
      "D. 21, 25, 27"
    ],
    "ans": "D"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "1/4 + 2/4 = ?",
    "choices": [
      "A. 2/4",
      "B. 3/4",
      "C. 4/4",
      "D. 3/8"
    ],
    "ans": "B"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "5/8 - 3/8 = ?",
    "choices": [
      "A. 1/8",
      "B. 2/8",
      "C. 3/8",
      "D. 4/8"
    ],
    "ans": "B"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "เศษส่วนใดมีค่าเท่ากับ 1/2?",
    "choices": [
      "A. 2/3",
      "B. 3/4",
      "C. 4/8",
      "D. 5/12"
    ],
    "ans": "C"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "1/2 + 1/3 = ?",
    "choices": [
      "A. 2/5",
      "B. 5/6",
      "C. 1/6",
      "D. 1/5"
    ],
    "ans": "B"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "3/4 - 1/2 = ?",
    "choices": [
      "A. 1/4",
      "B. 2/4",
      "C. 3/4",
      "D. 1/2"
    ],
    "ans": "A"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "2/3 × 3/4 = ?",
    "choices": [
      "A. 1/2",
      "B. 5/7",
      "C. 6/12",
      "D. ถูกทั้ง ก และ ค"
    ],
    "ans": "D"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "4/5 ÷ 2/5 = ?",
    "choices": [
      "A. 1/2",
      "B. 1",
      "C. 2",
      "D. 4"
    ],
    "ans": "C"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "ทำ 12/16 เป็นเศษส่วนอย่างต่ำได้เท่าใด?",
    "choices": [
      "A. 2/3",
      "B. 3/4",
      "C. 4/5",
      "D. 6/8"
    ],
    "ans": "B"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "เศษส่วนใดมีค่ามากที่สุด?",
    "choices": [
      "A. 1/2",
      "B. 2/3",
      "C. 3/4",
      "D. 4/5"
    ],
    "ans": "D"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "ข้อใดคือเศษเกิน?",
    "choices": [
      "A. 1/2",
      "B. 3/4",
      "C. 5/3",
      "D. 7/8"
    ],
    "ans": "C"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "แปลง 7/3 เป็นจำนวนคละได้เท่าใด?",
    "choices": [
      "A. 2 เศษ 1/3",
      "B. 1 เศษ 4/3",
      "C. 3 เศษ 1/3",
      "D. 2 เศษ 2/3"
    ],
    "ans": "A"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "1 เศษ 1/2 + 2 เศษ 1/2 = ?",
    "choices": [
      "A. 3",
      "B. 4",
      "C. 5",
      "D. 6"
    ],
    "ans": "B"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "5 × 2/5 = ?",
    "choices": [
      "A. 1",
      "B. 2",
      "C. 5",
      "D. 10"
    ],
    "ans": "B"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "1/2 ของ 40 คือเท่าใด?",
    "choices": [
      "A. 10",
      "B. 15",
      "C. 20",
      "D. 25"
    ],
    "ans": "C"
  },
  {
    "level": 3,
    "type": "choice",
    "q": "3/4 ของ 120 คือเท่าใด?",
    "choices": [
      "A. 60",
      "B. 80",
      "C. 90",
      "D. 100"
    ],
    "ans": "C"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "0.5 + 0.3 = ?",
    "choices": [
      "A. 0.7",
      "B. 0.8",
      "C. 0.9",
      "D. 1.0"
    ],
    "ans": "B"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "1.25 + 2.50 = ?",
    "choices": [
      "A. 3.50",
      "B. 3.75",
      "C. 4.00",
      "D. 4.25"
    ],
    "ans": "B"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "5.0 - 2.3 = ?",
    "choices": [
      "A. 2.7",
      "B. 3.3",
      "C. 3.7",
      "D. 4.3"
    ],
    "ans": "A"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "0.2 × 4 = ?",
    "choices": [
      "A. 0.4",
      "B. 0.6",
      "C. 0.8",
      "D. 1.0"
    ],
    "ans": "C"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "0.5 × 0.5 = ?",
    "choices": [
      "A. 0.25",
      "B. 0.5",
      "C. 2.5",
      "D. 25"
    ],
    "ans": "A"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "1.5 ÷ 3 = ?",
    "choices": [
      "A. 0.3",
      "B. 0.4",
      "C. 0.5",
      "D. 0.6"
    ],
    "ans": "C"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "ทศนิยมใดมีค่าเท่ากับ 1/4?",
    "choices": [
      "A. 0.14",
      "B. 0.25",
      "C. 0.40",
      "D. 0.50"
    ],
    "ans": "B"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "เลข 5 ใน 12.356 อยู่ในหลักใด?",
    "choices": [
      "A. หลักส่วนสิบ",
      "B. หลักส่วนร้อย",
      "C. หลักส่วนพัน",
      "D. หลักสิบ"
    ],
    "ans": "B"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "3.141 ปัดเศษเป็นทศนิยม 2 ตำแหน่งได้เท่าใด?",
    "choices": [
      "A. 3.10",
      "B. 3.14",
      "C. 3.15",
      "D. 3.20"
    ],
    "ans": "B"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "ข้อใดเรียงลำดับจากน้อยไปมากได้ถูกต้อง?",
    "choices": [
      "A. 0.1, 0.05, 0.2",
      "B. 0.05, 0.1, 0.2",
      "C. 0.2, 0.1, 0.05",
      "D. 0.1, 0.2, 0.05"
    ],
    "ans": "B"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "10.5 × 10 = ?",
    "choices": [
      "A. 1.05",
      "B. 10.5",
      "C. 105",
      "D. 1,050"
    ],
    "ans": "C"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "25.4 ÷ 10 = ?",
    "choices": [
      "A. 0.254",
      "B. 2.54",
      "C. 25.4",
      "D. 254"
    ],
    "ans": "B"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "2.5 + 3.75 - 1.25 = ?",
    "choices": [
      "A. 4.0",
      "B. 4.5",
      "C. 5.0",
      "D. 5.5"
    ],
    "ans": "C"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "ทศนิยม 0.75 ทำเป็นเศษส่วนอย่างต่ำได้เท่าใด?",
    "choices": [
      "A. 1/2",
      "B. 3/4",
      "C. 4/5",
      "D. 7/10"
    ],
    "ans": "B"
  },
  {
    "level": 4,
    "type": "choice",
    "q": "ซื้อขนม 15.50 บาท ให้แบงก์ 50 จะได้เงินทอนเท่าใด?",
    "choices": [
      "A. 34.50",
      "B. 35.50",
      "C. 36.50",
      "D. 44.50"
    ],
    "ans": "A"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "20% เขียนเป็นเศษส่วนอย่างต่ำได้เท่าใด?",
    "choices": [
      "A. 1/4",
      "B. 1/5",
      "C. 1/10",
      "D. 2/5"
    ],
    "ans": "B"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "50% ของ 200 คือเท่าใด?",
    "choices": [
      "A. 50",
      "B. 100",
      "C. 150",
      "D. 200"
    ],
    "ans": "B"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "25% ของ 400 คือเท่าใด?",
    "choices": [
      "A. 25",
      "B. 50",
      "C. 75",
      "D. 100"
    ],
    "ans": "D"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "อัตราส่วน 2:3 เท่ากับอัตราส่วนใด?",
    "choices": [
      "A. 4:5",
      "B. 4:6",
      "C. 6:8",
      "D. 8:10"
    ],
    "ans": "B"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "เสื้อราคา 500 บาท ลดราคา 10% ลดไปกี่บาท?",
    "choices": [
      "A. 10",
      "B. 50",
      "C. 100",
      "D. 450"
    ],
    "ans": "B"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "จากข้อ 5 ต้องจ่ายเงินค่าเสื้อกี่บาท?",
    "choices": [
      "A. 400",
      "B. 450",
      "C. 490",
      "D. 500"
    ],
    "ans": "B"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "นักเรียน 40 คน เป็นผู้หญิง 24 คน คิดเป็นร้อยละเท่าใดของผู้หญิง?",
    "choices": [
      "A. 40%",
      "B. 50%",
      "C. 60%",
      "D. 70%"
    ],
    "ans": "C"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "อัตราส่วน แป้ง : น้ำตาล คือ 3 : 1 ถ้าใช้แป้ง 15 ถ้วย ต้องใช้น้ำตาลกี่ถ้วย?",
    "choices": [
      "A. 3",
      "B. 4",
      "C. 5",
      "D. 6"
    ],
    "ans": "C"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "30 เป็นกี่เปอร์เซ็นต์ของ 150?",
    "choices": [
      "A. 10%",
      "B. 15%",
      "C. 20%",
      "D. 25%"
    ],
    "ans": "C"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "ฝากเงิน 1,000 บาท ได้ดอกเบี้ย 3% ต่อปี เมื่อครบปีจะได้เงินรวมเท่าใด?",
    "choices": [
      "A. 1,003",
      "B. 1,030",
      "C. 1,300",
      "D. 3,000"
    ],
    "ans": "B"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "15/20 ทำเป็นร้อยละได้เท่าใด?",
    "choices": [
      "A. 15%",
      "B. 20%",
      "C. 75%",
      "D. 85%"
    ],
    "ans": "C"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "อัตราส่วน ก : ข = 1 : 2 และ ข : ค = 2 : 3 แล้ว ก : ค คือเท่าใด?",
    "choices": [
      "A. 1:2",
      "B. 1:3",
      "C. 2:3",
      "D. 3:1"
    ],
    "ans": "B"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "สินค้าติดราคา 1,200 บาท ลด 25% ต้องจ่ายเงินเท่าใด?",
    "choices": [
      "A. 800",
      "B. 900",
      "C. 1,000",
      "D. 1,100"
    ],
    "ans": "B"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "ซื้อมา 100 บาท ขายไป 120 บาท ได้กำไรกี่เปอร์เซ็นต์?",
    "choices": [
      "A. 10%",
      "B. 15%",
      "C. 20%",
      "D. 25%"
    ],
    "ans": "C"
  },
  {
    "level": 5,
    "type": "choice",
    "q": "40% ของ 50 กับ 50% ของ 40 ต่างกันเท่าใด?",
    "choices": [
      "A. 0",
      "B. 10",
      "C. 20",
      "D. 40"
    ],
    "ans": "A"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "มุมฉากมีขนาดกี่องศา?",
    "choices": [
      "A. 45",
      "B. 90",
      "C. 180",
      "D. 360"
    ],
    "ans": "B"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "มุมแหลมมีขนาดเท่าใด?",
    "choices": [
      "A. น้อยกว่า 90",
      "B. 90 พอดี",
      "C. 90 ถึง 180",
      "D. 180 พอดี"
    ],
    "ans": "A"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "มุมตรงมีขนาดกี่องศา?",
    "choices": [
      "A. 90",
      "B. 180",
      "C. 270",
      "D. 360"
    ],
    "ans": "B"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "มุมภายในของรูปสามเหลี่ยมรวมกันได้กี่องศา?",
    "choices": [
      "A. 90",
      "B. 180",
      "C. 270",
      "D. 360"
    ],
    "ans": "B"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "มุมภายในของรูปสี่เหลี่ยมรวมกันได้กี่องศา?",
    "choices": [
      "A. 180",
      "B. 270",
      "C. 360",
      "D. 540"
    ],
    "ans": "C"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "เส้นตรงสองเส้นที่ไม่มีวันตัดกันเรียกว่าอะไร?",
    "choices": [
      "A. เส้นตัด",
      "B. เส้นตั้งฉาก",
      "C. เส้นขนาน",
      "D. เส้นทแยงมุม"
    ],
    "ans": "C"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "ถ้าเส้นตรงสองเส้นตัดกัน มุมตรงข้ามจะมีลักษณะอย่างไร?",
    "choices": [
      "A. รวมกันได้ 180",
      "B. รวมกันได้ 90",
      "C. มีขนาดเท่ากัน",
      "D. ไม่เท่ากัน"
    ],
    "ans": "C"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "รูปสามเหลี่ยมด้านเท่า มีมุมภายในมุมละกี่องศา?",
    "choices": [
      "A. 45",
      "B. 60",
      "C. 90",
      "D. 120"
    ],
    "ans": "B"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "รูปสามเหลี่ยมหน้าจั่ว มีลักษณะเด่นอย่างไร?",
    "choices": [
      "A. ด้านเท่ากัน 3 ด้าน",
      "B. มุมเท่ากัน 3 มุม",
      "C. ด้านยาวเท่ากัน 2 ด้าน",
      "D. มุมเป็นมุมฉากเสมอ"
    ],
    "ans": "C"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "ถ้ามุมหนึ่งของสามเหลี่ยมมุมฉากคือ 40 องศา มุมที่เหลืออีกมุมคือเท่าใด?",
    "choices": [
      "A. 40",
      "B. 50",
      "C. 60",
      "D. 90"
    ],
    "ans": "B"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "มุมป้านคือมุมที่มีขนาดเท่าใด?",
    "choices": [
      "A. น้อยกว่า 90",
      "B. มากกว่า 90 แต่น้อยกว่า 180",
      "C. มากกว่า 180",
      "D. 360 พอดี"
    ],
    "ans": "B"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "เส้นทแยงมุมของรูปสี่เหลี่ยมจัตุรัสตัดกันเป็นมุมอะไร?",
    "choices": [
      "A. มุมแหลม",
      "B. มุมฉาก",
      "C. มุมป้าน",
      "D. มุมตรง"
    ],
    "ans": "B"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "มุมกลับมีขนาดเท่าใด?",
    "choices": [
      "A. มากกว่า 90",
      "B. มากกว่า 180 แต่น้อยกว่า 360",
      "C. 360 พอดี",
      "D. น้อยกว่า 180"
    ],
    "ans": "B"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "เส้นตรงตัดเส้นขนานคู่หนึ่ง มุมแย้งจะมีลักษณะอย่างไร?",
    "choices": [
      "A. รวมกันได้ 180",
      "B. มีขนาดเท่ากัน",
      "C. รวมกันได้ 90",
      "D. มีขนาดไม่เท่ากัน"
    ],
    "ans": "B"
  },
  {
    "level": 6,
    "type": "choice",
    "q": "สามเหลี่ยมที่มีมุม 30, 60 และ 90 องศา เรียกว่าสามเหลี่ยมอะไร?",
    "choices": [
      "A. หน้าจั่ว",
      "B. ด้านเท่า",
      "C. มุมฉาก",
      "D. มุมป้าน"
    ],
    "ans": "C"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "สูตรพื้นที่สี่เหลี่ยมผืนผ้าคือข้อใด?",
    "choices": [
      "A. ด้าน × ด้าน",
      "B. กว้าง × ยาว",
      "C. 1/2 × ฐาน × สูง",
      "D. 2 × (กว้าง + ยาว)"
    ],
    "ans": ") (เฉลย:"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "สี่เหลี่ยมจัตุรัสมีด้านยาว 5 ซม. มีพื้นที่เท่าใด?",
    "choices": [
      "A. 10",
      "B. 20",
      "C. 25",
      "D. 30"
    ],
    "ans": "C"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "สี่เหลี่ยมผืนผ้ากว้าง 4 ซม. ยาว 6 ซม. มีความยาวรอบรูปเท่าใด?",
    "choices": [
      "A. 10",
      "B. 20",
      "C. 24",
      "D. 30"
    ],
    "ans": "B"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "สูตรพื้นที่รูปสามเหลี่ยมคือข้อใด?",
    "choices": [
      "A. กว้าง × ยาว",
      "B. 1/2 × ฐาน × สูง",
      "C. ด้าน × ด้าน",
      "D. ฐาน × สูง"
    ],
    "ans": "B"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "สามเหลี่ยมมีฐานยาว 8 ซม. สูง 5 ซม. มีพื้นที่เท่าใด?",
    "choices": [
      "A. 13",
      "B. 20",
      "C. 40",
      "D. 80"
    ],
    "ans": "B"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "ค่าพาย (π) มีค่าประมาณเท่าใด?",
    "choices": [
      "A. 3.14 หรือ 22/7",
      "B. 3.41",
      "C. 2.14",
      "D. 7/22"
    ],
    "ans": ") มีค่าประมาณเท่าใด? ก. 3.14 หรือ 22/7 ข. 3.41 ค. 2.14 ง. 7/22 (เฉลย:"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "สูตรความยาวรอบรูปวงกลมคือข้อใด?",
    "choices": [
      "A. πr²",
      "B. 2πr",
      "C. 1/2 × πr",
      "D. πd²"
    ],
    "ans": "B"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "วงกลมรัศมี 7 ซม. มีความยาวรอบรูปเท่าใด? (ใช้ π=22/7)",
    "choices": [
      "A. 22",
      "B. 44",
      "C. 88",
      "D. 154"
    ],
    "ans": ") ก. 22 ข. 44 ค. 88 ง. 154 (เฉลย:"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "พื้นที่วงกลมรัศมี 7 ซม. คือเท่าใด?",
    "choices": [
      "A. 44",
      "B. 88",
      "C. 154",
      "D. 308"
    ],
    "ans": "C"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "สี่เหลี่ยมด้านขนานมีฐานยาว 10 ซม. สูง 6 ซม. มีพื้นที่เท่าใด?",
    "choices": [
      "A. 16",
      "B. 30",
      "C. 60",
      "D. 120"
    ],
    "ans": "C"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "พื้นที่สี่เหลี่ยมคางหมู คือข้อใด?",
    "choices": [
      "A. 1/2 × ผลบวกด้านคู่ขนาน × สูง",
      "B. กว้าง × ยาว",
      "C. ฐาน × สูง",
      "D. 1/2 × ผลคูณเส้นทแยงมุม"
    ],
    "ans": "A"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "สี่เหลี่ยมขนมเปียกปูน มีเส้นทแยงมุมยาว 6 และ 8 ซม. มีพื้นที่เท่าใด?",
    "choices": [
      "A. 14",
      "B. 24",
      "C. 48",
      "D. 96"
    ],
    "ans": "B"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "สามเหลี่ยมหน้าจั่วมีฐานยาว 10 ซม. ด้านประกอบมุมยอดกว้างด้านละ 13 ซม. ความยาวรอบรูปคือ?",
    "choices": [
      "A. 23",
      "B. 26",
      "C. 36",
      "D. 130"
    ],
    "ans": "C"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "สี่เหลี่ยมจัตุรัสมีพื้นที่ 64 ตร.ม. จะมีด้านยาวด้านละเท่าใด?",
    "choices": [
      "A. 6",
      "B. 8",
      "C. 16",
      "D. 32"
    ],
    "ans": "B"
  },
  {
    "level": 7,
    "type": "choice",
    "q": "ครึ่งวงกลมรัศมี 14 ซม. มีความยาวรอบรูปโค้งเท่าใด? (ไม่รวมฐาน)",
    "choices": [
      "A. 44",
      "B. 88",
      "C. 154",
      "D. 308"
    ],
    "ans": ") ก. 44 ข. 88 ค. 154 ง. 308 (เฉลย:"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "กล่องสี่เหลี่ยมมุมฉาก มีกี่หน้า?",
    "choices": [
      "A. 4",
      "B. 6",
      "C. 8",
      "D. 12"
    ],
    "ans": "B"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "สูตรปริมาตรทรงสี่เหลี่ยมมุมฉากคือข้อใด?",
    "choices": [
      "A. กว้าง × ยาว",
      "B. ฐาน × สูง",
      "C. กว้าง × ยาว × สูง",
      "D. ด้าน × ด้าน"
    ],
    "ans": "C"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "ลูกบาศก์มีด้านยาวด้านละ 3 ซม. มีปริมาตรเท่าใด?",
    "choices": [
      "A. 9",
      "B. 18",
      "C. 27",
      "D. 36"
    ],
    "ans": "C"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "กล่องกว้าง 4 ซม. ยาว 5 ซม. สูง 10 ซม. มีปริมาตรเท่าใด?",
    "choices": [
      "A. 19",
      "B. 100",
      "C. 150",
      "D. 200"
    ],
    "ans": "D"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "1 ลิตร มีค่าเท่ากับกี่ลูกบาศก์เซนติเมตร?",
    "choices": [
      "A. 100",
      "B. 1,000",
      "C. 10,000",
      "D. 100,000"
    ],
    "ans": "B"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "ถังน้ำทรงสี่เหลี่ยมกว้าง 10 ซม. ยาว 20 ซม. สูง 50 ซม. จุน้ำได้กี่ลิตร?",
    "choices": [
      "A. 1",
      "B. 5",
      "C. 10",
      "D. 10,000"
    ],
    "ans": "C"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "รูปทรงใดมีฐาน 2 ฐานเป็นวงกลมที่เท่ากันทุกประการ?",
    "choices": [
      "A. พีระมิด",
      "B. กรวย",
      "C. ทรงกระบอก",
      "D. ทรงกลม"
    ],
    "ans": "C"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "รูปทรงใดมีฐานเป็นรูปเหลี่ยม และมียอดแหลม?",
    "choices": [
      "A. ลูกบาศก์",
      "B. ปริซึม",
      "C. ทรงกระบอก",
      "D. พีระมิด"
    ],
    "ans": "D"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "ลูกบาศก์มีจุดยอดกี่จุด?",
    "choices": [
      "A. 4",
      "B. 6",
      "C. 8",
      "D. 12"
    ],
    "ans": "C"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "ปริซึมสามเหลี่ยมมีหน้ากี่หน้า?",
    "choices": [
      "A. 3",
      "B. 4",
      "C. 5",
      "D. 6"
    ],
    "ans": "C"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "กล่องที่มีปริมาตร 120 ลบ.ซม. หากกว้าง 4 ซม. ยาว 5 ซม. จะสูงเท่าใด?",
    "choices": [
      "A. 4",
      "B. 5",
      "C. 6",
      "D. 7"
    ],
    "ans": "C"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "กรวยมีหน้าตัด (ฐาน) เป็นรูปอะไร?",
    "choices": [
      "A. สามเหลี่ยม",
      "B. สี่เหลี่ยม",
      "C. วงกลม",
      "D. วงรี"
    ],
    "ans": ") เป็นรูปอะไร? ก. สามเหลี่ยม ข. สี่เหลี่ยม ค. วงกลม ง. วงรี (เฉลย:"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "พื้นที่ผิวของลูกบาศก์ที่ยาวด้านละ 2 ซม. คือเท่าใด?",
    "choices": [
      "A. 8",
      "B. 12",
      "C. 24",
      "D. 36"
    ],
    "ans": "C"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "ถังน้ำมีน้ำอยู่ครึ่งถัง ปริมาตรน้ำคือ 500 ลบ.ซม. ถังใบนี้มีความจุเต็มที่เท่าใด?",
    "choices": [
      "A. 250",
      "B. 500",
      "C. 750",
      "D. 1,000"
    ],
    "ans": "D"
  },
  {
    "level": 8,
    "type": "choice",
    "q": "ข้อใดคือความแตกต่างระหว่างปริซึมกับพีระมิด?",
    "choices": [
      "A. ปริซึมมียอดแหลม",
      "B. พีระมิดมีฐาน 2 ฐาน",
      "C. พีระมิดมียอดแหลม",
      "D. ปริซึมฐานเป็นวงกลม"
    ],
    "ans": "C"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "ข้อมูล 5, 8, 12, 15 แผนภูมิแท่งควรใช้สเกลเพิ่มขึ้นทีละเท่าใดจึงจะเหมาะสม?",
    "choices": [
      "A. ทีละ 1",
      "B. ทีละ 5",
      "C. ทีละ 20",
      "D. ทีละ 50"
    ],
    "ans": "B"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "แผนภูมิรูปวงกลม 1 วง คิดเป็นร้อยละเท่าใด?",
    "choices": [
      "A. 100%",
      "B. 180%",
      "C. 360%",
      "D. 400%"
    ],
    "ans": "A"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "ถ้าวงกลมถูกแบ่งครึ่ง จะคิดเป็นกี่องศาในแผนภูมิ?",
    "choices": [
      "A. 90",
      "B. 180",
      "C. 270",
      "D. 360"
    ],
    "ans": "B"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "การโยนเหรียญ 1 เหรียญ โอกาสออกหัวเป็นเท่าใด?",
    "choices": [
      "A. 1/2",
      "B. 1/3",
      "C. 1/4",
      "D. ไม่มีโอกาส"
    ],
    "ans": "A"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "ทอยลูกเต๋า 1 ลูก โอกาสได้แต้ม 6 เป็นเท่าใด?",
    "choices": [
      "A. 1/2",
      "B. 1/4",
      "C. 1/6",
      "D. 6"
    ],
    "ans": "C"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "ในกล่องมีลูกบอลสีแดง 3 ลูก สีฟ้า 2 ลูก โอกาสหยิบได้สีแดงคือข้อใด?",
    "choices": [
      "A. 2/5",
      "B. 3/5",
      "C. 1/2",
      "D. 3/2"
    ],
    "ans": "B"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "ค่าเฉลี่ยของ 4, 6, 8, 10 คือเท่าใด?",
    "choices": [
      "A. 6",
      "B. 7",
      "C. 8",
      "D. 9"
    ],
    "ans": "B"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "จากกราฟเส้น ถ้าอุณหภูมิจันทร์ 30°C อังคาร 32°C พุธ 28°C วันใดร้อนที่สุด?",
    "choices": [
      "A. จันทร์",
      "B. อังคาร",
      "C. พุธ",
      "D. เท่ากัน"
    ],
    "ans": "B"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "กราฟวงกลมแสดงผลไม้ที่ชอบ: ส้ม 40% กล้วย 30% เงาะ 20% มังคุดเท่าใด?",
    "choices": [
      "A. 5%",
      "B. 10%",
      "C. 15%",
      "D. 20%"
    ],
    "ans": "B"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "ถ้ามีนักเรียน 200 คน ชอบส้ม 40% มีคนชอบส้มกี่คน?",
    "choices": [
      "A. 40",
      "B. 60",
      "C. 80",
      "D. 100"
    ],
    "ans": "C"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "ทอยลูกเต๋า 1 ลูก โอกาสได้แต้มคู่คือเท่าใด?",
    "choices": [
      "A. 1/6",
      "B. 2/6",
      "C. 3/6",
      "D. 4/6"
    ],
    "ans": "C"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "โยนเหรียญ 2 เหรียญ โอกาสออกหัวทั้งคู่คือเท่าใด?",
    "choices": [
      "A. 1/2",
      "B. 1/3",
      "C. 1/4",
      "D. 2/4"
    ],
    "ans": "C"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "ข้อมูล 10, 10, 15, 20, 25 ฐานนิยม (ข้อมูลที่ซ้ำมากสุด) คือเท่าใด?",
    "choices": [
      "A. 10",
      "B. 15",
      "C. 20",
      "D. 25"
    ],
    "ans": ") คือเท่าใด? ก. 10 ข. 15 ค. 20 ง. 25 (เฉลย:"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "นำเงินเดือน 10,000 บาท ไปวาดแผนภูมิวงกลม ค่าอาหาร 5,000 บาท จะมีมุมกี่องศา?",
    "choices": [
      "A. 90",
      "B. 180",
      "C. 270",
      "D. 360"
    ],
    "ans": "B"
  },
  {
    "level": 9,
    "type": "choice",
    "q": "โอกาสที่พระอาทิตย์จะขึ้นทางทิศตะวันตกเป็นเท่าใด?",
    "choices": [
      "A. 100%",
      "B. 50%",
      "C. 25%",
      "D. 0%"
    ],
    "ans": "D"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "รถไฟออกจากกรุงเทพ 08:30 น. ถึงเชียงใหม่ 19:45 น. ใช้เวลาเดินทางนานเท่าใด?",
    "choices": [
      "A. 10 ชม. 15 นาที",
      "B. 11 ชม. 15 นาที",
      "C. 11 ชม. 45 นาที",
      "D. 12 ชม. 15 นาที"
    ],
    "ans": "B"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "ถังใบหนึ่งจุน้ำ 200 ลิตร มีน้ำอยู่ 3/4 ของถัง ถ้าใช้น้ำไป 50 ลิตร จะเหลือน้ำกี่ลิตร?",
    "choices": [
      "A. 50",
      "B. 100",
      "C. 150",
      "D. 200"
    ],
    "ans": "B"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "พ่อค้าซื้อผลไม้มา 1,500 บาท ขายได้กำไร 20% พ่อค้าขายผลไม้ไปในราคาเท่าใด?",
    "choices": [
      "A. 1,600",
      "B. 1,700",
      "C. 1,800",
      "D. 1,900"
    ],
    "ans": "C"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "สวนรูปสี่เหลี่ยมผืนผ้ากว้าง 20 ม. ยาว 30 ม. ถ้าทำทางเดินรอบสวนด้านในกว้าง 1 ม. พื้นที่ทางเดินคือเท่าใด?",
    "choices": [
      "A. 96 ตร.ม.",
      "B. 100 ตร.ม.",
      "C. 104 ตร.ม.",
      "D. 600 ตร.ม."
    ],
    "ans": "A"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "แดงวิ่งรอบสนามวงกลมรัศมี 14 เมตร จำนวน 5 รอบ แดงวิ่งได้ระยะทางรวมเท่าใด?",
    "choices": [
      "A. 88 ม.",
      "B. 220 ม.",
      "C. 440 ม.",
      "D. 880 ม."
    ],
    "ans": "C"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "อัตราส่วนอายุ พี่ : น้อง คือ 4 : 3 ถ้าพี่อายุ 16 ปี น้องอายุเท่าใด?",
    "choices": [
      "A. 9",
      "B. 10",
      "C. 12",
      "D. 15"
    ],
    "ans": "C"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "สินค้าชิ้นหนึ่งลดราคา 10% แล้วยังเหลือราคา 450 บาท ราคาเดิมก่อนลดคือเท่าใด?",
    "choices": [
      "A. 480",
      "B. 500",
      "C. 550",
      "D. 600"
    ],
    "ans": "B"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "ห.ร.ม. และ ค.ร.น. ของจำนวนสองจำนวนคือ 5 และ 60 ถ้าจำนวนหนึ่งคือ 15 อีกจำนวนคืออะไร? (ทฤษฎี: ห.ร.ม. × ค.ร.น. = ผลคูณสองจำนวน)",
    "choices": [
      "A. 10",
      "B. ค.ร.น. ของจำนวนสองจำนวนคือ 5 และ 60 ถ้าจำนวนหนึ่งคือ 15 อีกจำนวนคืออะไร? (ทฤษฎี: ห.ร.ม. × ค.ร.น. = ผลคูณสองจำนวน) ก. 10 ข.",
      "C. ร.น. ของจำนวนสองจำนวนคือ 5 และ 60 ถ้าจำนวนหนึ่งคือ 15 อีกจำนวนคืออะไร? (ทฤษฎี: ห.ร.ม. × ค.ร.น. = ผลคูณสองจำนวน) ก. 10 ข. 20 ค. 30",
      "D. 40"
    ],
    "ans": ") ก. 10 ข. 20 ค. 30 ง. 40 (เฉลย:"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "บ่อปลาขนาด 2 × 3 × 1.5 เมตร เติมน้ำไป 80% ของบ่อ ปริมาตรน้ำคือกี่ลูกบาศก์เมตร?",
    "choices": [
      "A. 7.2",
      "B. 8.0",
      "C. 8.4",
      "D. 9.0"
    ],
    "ans": "A"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "ลวดเส้นหนึ่งดัดเป็นรูปสี่เหลี่ยมจัตุรัสพื้นที่ 144 ตร.ซม. ถ้านำลวดเส้นเดิมมาดัดเป็นรูปสามเหลี่ยมด้านเท่า จะมีด้านยาวด้านละเท่าใด?",
    "choices": [
      "A. 12",
      "B. 16",
      "C. 24",
      "D. 48"
    ],
    "ans": "B"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "น้ำผลไม้รวมมีอัตราส่วน ส้ม : แอปเปิล : แครอท = 3 : 2 : 1 ถ้าทำน้ำผลไม้ 300 ml จะต้องใช้น้ำส้มกี่ ml?",
    "choices": [
      "A. 50",
      "B. 100",
      "C. 150",
      "D. 200"
    ],
    "ans": "C"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "1 - (1/2 + 1/3) = ?",
    "choices": [
      "A. 1/6",
      "B. 5/6",
      "C. 1/5",
      "D. 2/5"
    ],
    "ans": ") = ? ก. 1/6 ข. 5/6 ค. 1/5 ง. 2/5 (เฉลย:"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "ถ้า x + 15 = 42 แล้ว 2x - 10 มีค่าเท่าใด?",
    "choices": [
      "A. 27",
      "B. 44",
      "C. 54",
      "D. 64"
    ],
    "ans": "B"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "นาฬิกาบอกเวลา 15:00 น. เข็มสั้นและเข็มยาวทำมุมกันกี่องศา?",
    "choices": [
      "A. 45",
      "B. 90",
      "C. 180",
      "D. 360"
    ],
    "ans": "B"
  },
  {
    "level": 10,
    "type": "choice",
    "q": "ซื้อสมุด 3 เล่ม ปากกา 2 ด้าม รวม 65 บาท ถ้าสมุดเล่มละ 15 บาท ปากกาด้ามละกี่บาท?",
    "choices": [
      "A. 5",
      "B. 10",
      "C. 15",
      "D. 20"
    ],
    "ans": "B"
  }
];

export default function MathOnetBoss() {
  const [gameState, setGameState] = useState<'START' | 'MAP' | 'PLAYING'>('START');
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [stage, setStage] = useState(1);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('edumove_onet_completed_stages_math');
    if (saved) {
      try {
        setCompletedStages(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);
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
  type GachaResult = { index: number; type: string; val: number; icon: string; name: string; text: string; color: string } | null;
  const [gachaResult, setGachaResult] = useState<GachaResult>(null);
  const [showStageClear, setShowStageClear] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [bossHit, setBossHit] = useState(false);
  const [playerHit, setPlayerHit] = useState(false);

  useEffect(() => {
    if (gameState === 'PLAYING') {
      gameMusic.start();
    } else {
      gameMusic.stop();
    }
    try {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
    } catch {}
    return () => {
      gameMusic.stop();
    };
  }, [gameState]);

  // 🟢 คำนวณระดับความยากตาม Stage
    const currentPool = useMemo(() => {
    const filtered = mathQuestions.filter(q => q.level === stage);
    return [...filtered].sort(() => Math.random() - 0.5);
  }, [stage]);

  const currentData = currentPool[currentQ];

  const initStage = (selectedStage: number) => {
    setStage(selectedStage); setPlayerHp(100);
    const newBossHp = 100 + (selectedStage * 50);
    setBossMaxHp(newBossHp); setBossHp(newBossHp);
    setCombo(0); setCurrentQ(0); setTextAnswer('');
    setShowStageClear(false); setShowGameOver(false);
    setActionLog(`🔥 ลุยด่านที่ ${selectedStage}`); setLogColor('text-blue-600 dark:text-blue-400');
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
      if (newP <= 0) {
        setShowGameOver(true);
        gameMusic.playStageFailSound();
        return;
      }
      if (newB <= 0) { 
        if (!completedStages.includes(stage)) {
          const updated = [...completedStages, stage];
          setCompletedStages(updated);
          localStorage.setItem('edumove_onet_completed_stages_math', JSON.stringify(updated));
        }
        setShowStageClear(true);
        gameMusic.playStageClearSound();
        return; 
      }
      setCurrentQ((prev) => (prev + 1) % currentPool.length);
    }, 1200);
  };

  const handleResetProgress = () => {
    setCompletedStages([]);
    localStorage.removeItem('edumove_onet_completed_stages_math');
    setStage(1);
    setShowResetConfirm(false);
  };

    const skipQuestion = () => {
    setCombo(0);
    setCurrentQ((prev) => (prev + 1) % currentPool.length);
    setActionLog('ข้ามคำถามแล้ว!');
    setLogColor('text-amber-500');
  };

  const handleAnswerSubmit = (choiceOrText: string) => {
    if (message !== '' || isGachaActive || showStageClear || showGameOver) return;
    const isCorrect = currentData.type === 'choice' ? choiceOrText.startsWith(currentData.ans) : choiceOrText.trim() === currentData.ans;
    if (isCorrect) {
      gameMusic.playCorrectSound();
      const newCombo = combo + 1;
      const baseDmg = Math.ceil(bossMaxHp / 4);
      if (newCombo === 3) { setCombo(0); setIsGachaActive(true); } 
      else { setCombo(newCombo); processTurn(baseDmg, 0, `✅ ถูกต้อง โจมตี -${baseDmg} HP`, 'text-emerald-600 dark:text-emerald-400'); }
    } else { 
      gameMusic.playIncorrectSound();
      setCombo(0); 
      processTurn(0, -25, '❌ ผิดพลาด โดนโจมตี -25 HP', 'text-rose-600 dark:text-rose-400'); 
    }
  };

  const handleGachaSelect = (index: number) => {
    if (gachaResult) return;
    const baseDmg = Math.ceil(bossMaxHp / 4);
    const rewards = [
      { type: 'HEAL', val: 50, icon: '💊', name: 'เพิ่มพลัง', text: '+50 HP', color: 'text-emerald-600' },
      { type: 'CRIT', val: baseDmg * 3, icon: '💥', name: 'คริติคอล', text: `CRIT ${baseDmg * 3}`, color: 'text-rose-600' }
    ];
    const result = { index, ...rewards[Math.floor(Math.random() * rewards.length)] };
    setGachaResult(result);
    setTimeout(() => {
      setIsGachaActive(false); setGachaResult(null);
      if (result.type === 'HEAL') processTurn(baseDmg, result.val, `🎁 ได้รับ ${result.name} ${result.text}`, 'text-emerald-600 dark:text-emerald-400');
      else processTurn(result.val, 0, `💥 ${result.name} -${result.val}`, 'text-rose-600 dark:text-rose-400');
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
              <span className="neo-badge px-4 py-1.5 text-sm uppercase tracking-wider">คณิตศาสตร์ขั้นสูง</span>
            </div>
            
            <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="w-28 h-28 bg-blue-100 rounded-full border-4 border-slate-900 flex items-center justify-center text-6xl shadow-[4px_4px_0_#0f172a] mb-6">
              🧮
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 flex flex-col md:flex-row items-center gap-3 justify-center">
              <span className="whitespace-nowrap shrink-0" style={{ whiteSpace: 'nowrap' }}>ไปกับ</span> <span className="text-blue-500 text-5xl md:text-6xl whitespace-nowrap shrink-0" style={{ whiteSpace: 'nowrap' }}>edumove</span>
            </h1>
            
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-10 font-medium leading-relaxed">
              เปลี่ยนห้องเรียนให้เป็นเกมโชว์! ท้าทายความรู้ด้วย<br/>ด่านคณิตศาสตร์สุดโหด ไต่ระดับ 10 ด่าน
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
          
          {/* Header */}
          <div className="w-full bg-white dark:bg-[#1e293b] border-b-4 border-slate-900 dark:border-slate-700 p-4 md:p-5 flex justify-between items-center z-50 shrink-0">
            <Link href="/grade/p6" className="neo-btn-white p-2.5 rounded-full"><Home size={20} /></Link>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">แผนที่คณิตศาสตร์ 🗺️</h2>
            <button 
              onClick={() => setShowResetConfirm(true)} 
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-xl border-3 border-slate-900 shadow-[2px_2px_0_#0f172a] text-xs md:text-sm transition-transform active:translate-y-0.5"
            >
              🔄 รีเซ็ตด่าน
            </button>
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
            <div className="flex items-center gap-4">
              <button 
                onClick={skipQuestion} 
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-black rounded-xl border-3 border-slate-900 shadow-[2px_2px_0_#0f172a] text-xs md:text-sm transition-transform active:translate-y-0.5"
              >
                ข้ามข้อ ➡️
              </button>
              <div className="neo-badge px-5 py-2 text-sm md:text-base flex items-center gap-2 shadow-[2px_2px_0_#0f172a]">🔥 COMBO: {combo}/3</div>
            </div>
          </div>

          {/* VS Panel */}
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

          {/* Question Box */}
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

      {/* Bottom Left Exit & View Answers Buttons */}
      {gameState === 'PLAYING' && (
        <div className="absolute bottom-6 left-6 z-[100] flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setGameState('MAP')}
            className="bg-white/20 backdrop-blur-md hover:bg-rose-500 text-white px-5 py-2.5 rounded-full font-bold shadow-lg transition-colors border-2 border-white/50 flex items-center gap-2 pointer-events-auto"
          >
            <XCircle size={20} /> ออกจากการทดสอบ
          </button>
          <button 
            onClick={() => setShowAnswers(true)}
            className="bg-white/20 backdrop-blur-md hover:bg-amber-500 text-white px-5 py-2.5 rounded-full font-bold shadow-lg transition-colors border-2 border-white/50 flex items-center gap-2 pointer-events-auto"
          >
            <Lightbulb size={20} /> ดูเฉลย
          </button>
        </div>
      )}

      {/* Answers Overlay Modal */}
      {showAnswers && (
        <div className="fixed inset-0 z-[500] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-start p-6 md:p-12 overflow-y-auto text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
          <div className="max-w-4xl w-full mx-auto pb-20">
            <div className="flex items-center justify-between mb-10">
              <button 
                onClick={() => setShowAnswers(false)} 
                className="inline-flex items-center gap-2 text-slate-700 bg-white border-4 border-slate-900 px-6 py-3 rounded-2xl font-black shadow-[4px_4px_0_0_#0F172A] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all dark:bg-slate-800 dark:text-white dark:border-slate-700"
              >
                <ArrowLeft size={20} strokeWidth={3} /> กลับไปเล่นเกมต่อ
              </button>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-8 flex items-center gap-3">
              <Lightbulb size={40} className="text-amber-500 animate-pulse" /> เฉลยข้อสอบ O-NET (ด่านที่ {stage})
            </h1>
            <div className="space-y-8">
              {currentPool.map((q, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-6 md:p-8 rounded-[2.5rem] shadow-[6px_6px_0_0_#0F172A] dark:shadow-[6px_6px_0_0_#000000]">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6"><span className="text-emerald-500 dark:text-emerald-400 mr-2">ข้อที่ {i+1}:</span>{q.q}</h2>
                  {q.type === 'text' ? (
                    <div className="p-4 rounded-2xl border-4 border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                      คำตอบที่ถูกต้องคือ: <span className="font-black text-xl">{q.ans}</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {q.choices?.map(choice => {
                        const isCorrect = choice.startsWith(q.ans);
                        return (
                          <div key={choice} className={`p-4 rounded-2xl border-4 font-bold text-lg transition-all ${
                            isCorrect 
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' 
                              : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400'
                          }`}>
                            {choice}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
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
          {showStageClear && <ConfettiCelebration />}
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="neo-card p-10 max-w-sm w-full relative z-[310]">
            <div className="text-6xl mb-4">{showStageClear ? '🏆' : '💀'}</div>
            <h2 className={`text-3xl font-black mb-2 uppercase ${showStageClear ? 'text-emerald-500' : 'text-rose-500'}`}>{showStageClear ? `ด่าน ${stage} เคลียร์!` : 'พ่ายแพ้!'}</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 font-bold">{showStageClear ? 'เก่งมาก ไปลุยกันต่อเลย' : `คุณพลาดในด่านที่ ${stage}`}</p>
            <div className="flex flex-col gap-3">
              {showStageClear && stage < maxStages && <button onClick={() => initStage(stage + 1)} className="w-full neo-btn-blue py-4 font-black text-lg">ด่านต่อไป ➡️</button>}
              <button onClick={() => { setGameState('MAP'); setShowStageClear(false); setShowGameOver(false); }} className="w-full neo-btn-white py-4 font-black text-lg">🗺️ กลับหน้าแผนที่</button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* 🔄 กล่องข้อความยืนยันการรีเซ็ตด่าน */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm px-4 text-center">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="neo-card p-8 md:p-10 max-w-md w-full relative z-[410] bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700">
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/50 rounded-full border-4 border-rose-500 flex items-center justify-center text-rose-500 mx-auto mb-6">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">ต้องการรีเซ็ตใช่หรือไม่?</h2>
              <p className="text-rose-500 font-bold mb-8 leading-relaxed text-sm md:text-base bg-rose-50 dark:bg-rose-950/20 p-4 rounded-2xl border-2 border-rose-200 dark:border-rose-900/40">
                ⚠️ คำเตือน: ความคืบหน้าของด่านที่เคยผ่านทั้งหมดจะถูกลบถาวร และย้อนกลับไปเริ่มที่ด่านที่ 1 ใหม่ทั้งหมด!
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={handleResetProgress} 
                  className="flex-1 py-3 px-6 bg-rose-500 hover:bg-rose-600 text-white font-black rounded-xl border-3 border-slate-900 shadow-[3px_3px_0_#0f172a] transition-all text-sm md:text-base animate-pulse"
                >
                  ยืนยันการรีเซ็ต
                </button>
                <button 
                  onClick={() => setShowResetConfirm(false)} 
                  className="flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl border-3 border-slate-900 shadow-[3px_3px_0_#0f172a] dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white transition-all text-sm md:text-base"
                >
                  ยกเลิก
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}