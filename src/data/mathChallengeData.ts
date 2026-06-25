import { SingleQuestionData } from '@/components/SinglePlayerCamera';

export const mathChallengeData: Record<string, Record<string, Record<string, SingleQuestionData[]>>> = {
  // ==================== ป.4 ====================
  p4: {
    challenge1: { // เทอม 1
      easy: [
        { q: '500 + 350 เท่ากับเท่าใด?', leftChoice: '850', rightChoice: '750', ans: 'LEFT' },
        { q: '12 × 5 เท่ากับเท่าใด?', leftChoice: '60', rightChoice: '50', ans: 'LEFT' },
        { q: 'ข้อใดคือค่าประจำหลักของ 7 ใน 74,000?', leftChoice: 'หมื่น', rightChoice: 'พัน', ans: 'LEFT' },
        { q: '1 ชั่วโมง มีกี่นาที?', leftChoice: '30 นาที', rightChoice: '60 นาที', ans: 'RIGHT' },
        { q: 'ถ้าแบ่งพิซซ่าเป็น 4 ส่วน กินไป 1 ส่วน เขียนเป็นเศษส่วนได้อย่างไร?', leftChoice: '1/4', rightChoice: '4/1', ans: 'LEFT' }
      ],
      medium: [
        { q: '8,500 - 3,250 เท่ากับเท่าใด?', leftChoice: '5,150', rightChoice: '5,250', ans: 'RIGHT' },
        { q: '144 ÷ 12 เท่ากับเท่าใด?', leftChoice: '11', rightChoice: '12', ans: 'RIGHT' },
        { q: '2 วัน มีกี่ชั่วโมง?', leftChoice: '48 ชั่วโมง', rightChoice: '24 ชั่วโมง', ans: 'LEFT' },
        { q: '2/4 มีค่าเท่ากับเศษส่วนในข้อใด?', leftChoice: '1/2', rightChoice: '3/4', ans: 'LEFT' },
        { q: '1 กิโลกรัม เท่ากับกี่กรัม?', leftChoice: '1,000 กรัม', rightChoice: '100 กรัม', ans: 'LEFT' }
      ],
      hard: [
        { q: '(25 × 4) + 150 เท่ากับเท่าใด?', leftChoice: '200', rightChoice: '250', ans: 'LEFT' },
        { q: 'ถ้ามีเงิน 1,000 บาท ซื้อของไป 345 บาท จะเหลือเงินเท่าใด?', leftChoice: '645 บาท', rightChoice: '655 บาท', ans: 'RIGHT' },
        { q: '3/5 + 1/5 เท่ากับเท่าใด?', leftChoice: '4/5', rightChoice: '2/5', ans: 'LEFT' },
        { q: '500 มิลลิลิตร เท่ากับครึ่งลิตร ใช่หรือไม่?', leftChoice: 'ใช่', rightChoice: 'ไม่ใช่', ans: 'LEFT' },
        { q: '120 × 10 เท่ากับเท่าใด?', leftChoice: '1,200', rightChoice: '12,000', ans: 'LEFT' }
      ]
    },
    challenge2: { // เทอม 2
      easy: [
        { q: 'มุมที่มีขนาด 90 องศา เรียกว่ามุมอะไร?', leftChoice: 'มุมฉาก', rightChoice: 'มุมแหลม', ans: 'LEFT' },
        { q: 'ทศนิยม 0.5 อ่านว่าอย่างไร?', leftChoice: 'ศูนย์จุดห้า', rightChoice: 'ห้าจุดศูนย์', ans: 'LEFT' },
        { q: 'รูปสี่เหลี่ยมที่มีด้านเท่ากันทุกด้าน และมุมทุกมุมเป็นมุมฉาก คือรูปใด?', leftChoice: 'สี่เหลี่ยมผืนผ้า', rightChoice: 'สี่เหลี่ยมจัตุรัส', ans: 'RIGHT' },
        { q: '1/2 มีค่าเท่ากับทศนิยมในข้อใด?', leftChoice: '0.5', rightChoice: '0.2', ans: 'LEFT' },
        { q: '0.2 + 0.3 เท่ากับเท่าใด?', leftChoice: '0.5', rightChoice: '0.6', ans: 'LEFT' }
      ],
      medium: [
        { q: 'มุมแหลม มีขนาดกี่องศา?', leftChoice: 'น้อยกว่า 90 องศา', rightChoice: 'มากกว่า 90 องศา', ans: 'LEFT' },
        { q: '0.75 - 0.25 เท่ากับเท่าใด?', leftChoice: '0.50', rightChoice: '0.25', ans: 'LEFT' },
        { q: 'พื้นที่รูปสี่เหลี่ยมผืนผ้า กว้าง 4 ซม. ยาว 5 ซม. คือเท่าใด?', leftChoice: '9 ตร.ซม.', rightChoice: '20 ตร.ซม.', ans: 'RIGHT' },
        { q: 'ข้อใดคือทศนิยม 2 ตำแหน่ง?', leftChoice: '1.25', rightChoice: '1.2', ans: 'LEFT' },
        { q: '3/10 + 4/10 เท่ากับเท่าใด?', leftChoice: '7/10', rightChoice: '7/20', ans: 'LEFT' }
      ],
      hard: [
        { q: 'มุมป้าน มีขนาดกี่องศา?', leftChoice: 'มากกว่า 90 องศา แต่น้อยกว่า 180 องศา', rightChoice: 'มากกว่า 180 องศา', ans: 'LEFT' },
        { q: '1.5 + 2.75 เท่ากับเท่าใด?', leftChoice: '4.25', rightChoice: '3.25', ans: 'LEFT' },
        { q: 'เศษส่วน 4/5 คิดเป็นทศนิยมได้เท่าใด?', leftChoice: '0.8', rightChoice: '0.4', ans: 'LEFT' },
        { q: 'ถ้ามุม A มีขนาด 45 องศา มุม A คือมุมชนิดใด?', leftChoice: 'มุมฉาก', rightChoice: 'มุมแหลม', ans: 'RIGHT' },
        { q: 'ความยาวรอบรูปของสี่เหลี่ยมจัตุรัส ด้านละ 6 ซม. คือเท่าใด?', leftChoice: '24 ซม.', rightChoice: '36 ซม.', ans: 'LEFT' }
      ]
    }
  },

  // ==================== ป.5 ====================
  p5: {
    challenge1: { // เทอม 1
      easy: [
        { q: '1/2 + 1/4 เท่ากับเท่าใด?', leftChoice: '3/4', rightChoice: '2/6', ans: 'LEFT' },
        { q: '0.5 + 0.3 เท่ากับเท่าใด?', leftChoice: '0.8', rightChoice: '0.08', ans: 'LEFT' },
        { q: 'มุมใดมีขนาดเล็กกว่ามุมฉาก?', leftChoice: 'มุมป้าน', rightChoice: 'มุมแหลม', ans: 'RIGHT' },
        { q: 'เศษส่วนใดมีค่ามากกว่า 1/2?', leftChoice: '3/4', rightChoice: '1/3', ans: 'LEFT' },
        { q: '1.2 × 10 เท่ากับเท่าใด?', leftChoice: '12', rightChoice: '120', ans: 'LEFT' }
      ],
      medium: [
        { q: '2.5 × 4 เท่ากับเท่าใด?', leftChoice: '10', rightChoice: '100', ans: 'LEFT' },
        { q: 'รูปสี่เหลี่ยมจัตุรัส มีมุมฉากกี่มุม?', leftChoice: '2 มุม', rightChoice: '4 มุม', ans: 'RIGHT' },
        { q: '1/3 ของ 30 เท่ากับเท่าใด?', leftChoice: '10', rightChoice: '20', ans: 'LEFT' },
        { q: '3/4 คิดเป็นทศนิยมได้เท่าใด?', leftChoice: '0.75', rightChoice: '0.50', ans: 'LEFT' },
        { q: 'สูตรหาพื้นที่สี่เหลี่ยมด้านขนานคือข้อใด?', leftChoice: 'ฐาน × สูง', rightChoice: 'กว้าง × ยาว', ans: 'LEFT' }
      ],
      hard: [
        { q: '(0.2 × 5) + 1.5 เท่ากับเท่าใด?', leftChoice: '2.5', rightChoice: '3.0', ans: 'LEFT' },
        { q: 'พื้นที่สี่เหลี่ยมผืนผ้า กว้าง 5 ยาว 8 เท่ากับเท่าใด?', leftChoice: '40 ตร.หน่วย', rightChoice: '26 ตร.หน่วย', ans: 'LEFT' },
        { q: 'ถ้าซื้อของ 80 บาท ขายไป 100 บาท ได้กำไรกี่บาท?', leftChoice: '20 บาท', rightChoice: '80 บาท', ans: 'LEFT' },
        { q: '0.75 คิดเป็นเศษส่วนอย่างต่ำคือข้อใด?', leftChoice: '3/4', rightChoice: '1/4', ans: 'LEFT' },
        { q: 'เส้นขนาน คือเส้นตรง 2 เส้นที่ไม่มีวันตัดกัน ใช่หรือไม่?', leftChoice: 'ใช่', rightChoice: 'ไม่ใช่', ans: 'LEFT' }
      ]
    },
    challenge2: { // เทอม 2
      easy: [
        { q: 'ร้อยละ 50 เท่ากับเศษส่วนข้อใด?', leftChoice: '1/2', rightChoice: '1/4', ans: 'LEFT' },
        { q: 'ปริมาตรทรงสี่เหลี่ยมมุมฉาก สูตรคือข้อใด?', leftChoice: 'กว้าง × ยาว × สูง', rightChoice: 'กว้าง + ยาว + สูง', ans: 'LEFT' },
        { q: '20% ของ 100 เท่ากับเท่าใด?', leftChoice: '20', rightChoice: '50', ans: 'LEFT' },
        { q: 'รูปสามเหลี่ยมมีด้านกี่ด้าน?', leftChoice: '3 ด้าน', rightChoice: '4 ด้าน', ans: 'LEFT' },
        { q: 'มุมภายในรูปสามเหลี่ยมรวมกันได้กี่องศา?', leftChoice: '180 องศา', rightChoice: '360 องศา', ans: 'LEFT' }
      ],
      medium: [
        { q: 'ลูกบาศก์มีด้านทุกด้านยาวเท่ากัน ใช่หรือไม่?', leftChoice: 'ใช่', rightChoice: 'ไม่ใช่', ans: 'LEFT' },
        { q: '25% ของ 200 เท่ากับเท่าใด?', leftChoice: '50', rightChoice: '25', ans: 'LEFT' },
        { q: 'ปริมาตรของลูกบาศก์ที่ยาวด้านละ 3 ซม. คือเท่าใด?', leftChoice: '27 ลบ.ซม.', rightChoice: '9 ลบ.ซม.', ans: 'LEFT' },
        { q: 'เศษส่วน 1/4 ทำเป็นร้อยละได้เท่าใด?', leftChoice: 'ร้อยละ 25', rightChoice: 'ร้อยละ 40', ans: 'LEFT' },
        { q: 'พื้นที่รูปสามเหลี่ยม สูตรคือข้อใด?', leftChoice: '1/2 × ฐาน × สูง', rightChoice: 'ฐาน × สูง', ans: 'LEFT' }
      ],
      hard: [
        { q: 'สินค้าติดราคา 500 บาท ลดราคา 10% จะต้องจ่ายเงินกี่บาท?', leftChoice: '450 บาท', rightChoice: '50 บาท', ans: 'LEFT' },
        { q: 'กล่องกว้าง 2 ซม. ยาว 5 ซม. สูง 4 ซม. มีปริมาตรเท่าใด?', leftChoice: '40 ลบ.ซม.', rightChoice: '11 ลบ.ซม.', ans: 'LEFT' },
        { q: 'สามเหลี่ยมหน้าจั่ว มีด้านยาวเท่ากันกี่ด้าน?', leftChoice: '2 ด้าน', rightChoice: '3 ด้าน', ans: 'LEFT' },
        { q: 'ทุน 200 บาท ขายได้กำไร 20% ขายไปราคาเท่าใด?', leftChoice: '240 บาท', rightChoice: '220 บาท', ans: 'LEFT' },
        { q: 'ร้อยละ 75 คิดเป็นเศษส่วนอย่างต่ำได้เท่าใด?', leftChoice: '3/4', rightChoice: '1/2', ans: 'LEFT' }
      ]
    }
  },

  // ==================== ป.6 ====================
  p6: {
    challenge1: { // เทอม 1
      easy: [
        { q: 'ห.ร.ม. ของ 10 และ 20 คือเท่าใด?', leftChoice: '10', rightChoice: '20', ans: 'LEFT' },
        { q: 'จำนวนเฉพาะในข้อใดถูกต้อง?', leftChoice: '2, 3, 5, 7', rightChoice: '1, 2, 4, 6', ans: 'LEFT' },
        { q: 'ค.ร.น. ของ 3 และ 4 คือเท่าใด?', leftChoice: '12', rightChoice: '7', ans: 'LEFT' },
        { q: 'อัตราส่วน 1 : 2 เท่ากับอัตราส่วนใด?', leftChoice: '2 : 4', rightChoice: '3 : 5', ans: 'LEFT' },
        { q: '1/2 + 0.5 เท่ากับเท่าใด?', leftChoice: '1.0', rightChoice: '0.55', ans: 'LEFT' }
      ],
      medium: [
        { q: 'ห.ร.ม. ของ 8 และ 12 คือเท่าใด?', leftChoice: '4', rightChoice: '2', ans: 'LEFT' },
        { q: 'ร้อยละ 20 ของ 100 เท่ากับเท่าใด?', leftChoice: '20', rightChoice: '80', ans: 'LEFT' },
        { q: 'ข้อใดคือตัวประกอบทั้งหมดของ 6?', leftChoice: '1, 2, 3, 6', rightChoice: '2, 3', ans: 'LEFT' },
        { q: '0.5 × 0.5 เท่ากับเท่าใด?', leftChoice: '0.25', rightChoice: '2.5', ans: 'LEFT' },
        { q: 'มาตราส่วน 1 ซม. : 10 ม. ถ้าในแผนที่ยาว 3 ซม. ของจริงยาวเท่าใด?', leftChoice: '30 เมตร', rightChoice: '3 เมตร', ans: 'LEFT' }
      ],
      hard: [
        { q: 'ค.ร.น. ของ 12, 18, 24 คือเท่าใด?', leftChoice: '72', rightChoice: '36', ans: 'LEFT' },
        { q: 'ฝากเงิน 1,000 บาท ดอกเบี้ย 5% ต่อปี สิ้นปีได้เงินรวมเท่าใด?', leftChoice: '1,050 บาท', rightChoice: '1,005 บาท', ans: 'LEFT' },
        { q: '(1/2 ÷ 1/4) × 2 เท่ากับเท่าใด?', leftChoice: '4', rightChoice: '1', ans: 'LEFT' },
        { q: 'ห.ร.ม. ของ 15 และ 25 คือเท่าใด?', leftChoice: '5', rightChoice: '15', ans: 'LEFT' },
        { q: 'ถ้า a : b = 2 : 3 และ b = 15 แล้ว a เท่ากับเท่าใด?', leftChoice: '10', rightChoice: '5', ans: 'LEFT' }
      ]
    },
    challenge2: { // เทอม 2
      easy: [
        { q: 'มุมภายในรูปสี่เหลี่ยมรวมกันได้กี่องศา?', leftChoice: '360 องศา', rightChoice: '180 องศา', ans: 'LEFT' },
        { q: 'สมการ a + 5 = 10, a มีค่าเท่าใด?', leftChoice: '5', rightChoice: '15', ans: 'LEFT' },
        { q: 'พื้นที่วงกลม สูตรคือข้อใด?', leftChoice: 'πr²', rightChoice: '2πr', ans: 'LEFT' },
        { q: 'รูปเรขาคณิต 3 มิติ ที่มีฐานเป็นวงกลม คือรูปใด?', leftChoice: 'ทรงกระบอก', rightChoice: 'ลูกบาศก์', ans: 'LEFT' },
        { q: 'ความยาวรอบรูปวงกลม สูตรคือข้อใด?', leftChoice: '2πr', rightChoice: 'πr²', ans: 'LEFT' }
      ],
      medium: [
        { q: 'ถ้า 2x = 18 แล้ว x มีค่าเท่าใด?', leftChoice: '9', rightChoice: '36', ans: 'LEFT' },
        { q: 'รูปหลายเหลี่ยมที่มี 5 ด้าน เรียกว่ารูปอะไร?', leftChoice: 'รูปห้าเหลี่ยม', rightChoice: 'รูปหกเหลี่ยม', ans: 'LEFT' },
        { q: 'เส้นผ่านศูนย์กลางยาวเป็นกี่เท่าของรัศมี?', leftChoice: '2 เท่า', rightChoice: 'ครึ่งหนึ่ง', ans: 'LEFT' },
        { q: 'ปริมาตรทรงกระบอก สูตรคือข้อใด?', leftChoice: 'πr²h', rightChoice: '1/3 πr²h', ans: 'LEFT' },
        { q: 'สถิติที่นำเสนอข้อมูลเป็นรูปวงกลม แบ่งเป็นสัดส่วน เรียกว่าอะไร?', leftChoice: 'แผนภูมิรูปวงกลม', rightChoice: 'แผนภูมิแท่ง', ans: 'LEFT' }
      ],
      hard: [
        { q: 'ถ้า 3y - 4 = 11 แล้ว y มีค่าเท่าใด?', leftChoice: '5', rightChoice: '15', ans: 'LEFT' },
        { q: 'วงกลมมีรัศมี 7 ซม. พื้นที่ประมาณเท่าใด? (π≈22/7)', leftChoice: '154 ตร.ซม.', rightChoice: '44 ตร.ซม.', ans: 'LEFT' },
        { q: 'รูปปริซึมสามเหลี่ยม มีหน้าตัดเป็นรูปอะไร?', leftChoice: 'สามเหลี่ยม', rightChoice: 'สี่เหลี่ยม', ans: 'LEFT' },
        { q: 'ถ้า 4(a + 2) = 24 แล้ว a มีค่าเท่าใด?', leftChoice: '4', rightChoice: '8', ans: 'LEFT' },
        { q: 'ค่าเฉลี่ยของ 4, 6, 8, 10 คือเท่าใด?', leftChoice: '7', rightChoice: '28', ans: 'LEFT' }
      ]
    }
  }
};