import { SingleQuestionData } from '@/components/SinglePlayerCamera';

// โครงสร้าง Database: [ชั้นเรียน] -> [เทอม/ด่าน] -> [ความยาก]
export const challengeData: Record<string, Record<string, Record<string, SingleQuestionData[]>>> = {
  // ==================== ป.4 ====================
  p4: {
    challenge1: { // เทอม 1
      easy: [
        { q: 'สัตว์มีกระดูกสันหลังคือข้อใด?', leftChoice: 'สุนัข', rightChoice: 'หมึก', ans: 'LEFT' },
        { q: 'แรงโน้มถ่วงมีทิศทางไปทางใด?', leftChoice: 'ขึ้นฟ้า', rightChoice: 'ลงพื้น', ans: 'RIGHT' },
        { q: 'วัสดุใดโปร่งใส?', leftChoice: 'กระจกใส', rightChoice: 'แผ่นไม้', ans: 'LEFT' },
        { q: 'พืชใช้สิ่งใดสร้างอาหาร?', leftChoice: 'แสงแดด', rightChoice: 'ความร้อน', ans: 'LEFT' },
        { q: 'ของเหลวมีสมบัติอย่างไร?', leftChoice: 'รูปร่างคงที่', rightChoice: 'เปลี่ยนตามภาชนะ', ans: 'RIGHT' }
      ],
      medium: [
        { q: 'การงอกของรากพืชเกี่ยวข้องกับแรงใด?', leftChoice: 'แรงแม่เหล็ก', rightChoice: 'แรงโน้มถ่วง', ans: 'RIGHT' },
        { q: 'ข้อใดคือสิ่งมีชีวิตกลุ่มที่ไม่ใช่พืชและสัตว์?', leftChoice: 'เห็ดรา', rightChoice: 'ปะการัง', ans: 'LEFT' },
        { q: 'เครื่องมือใดใช้วัดน้ำหนัก?', leftChoice: 'ไม้บรรทัด', rightChoice: 'เครื่องชั่งสปริง', ans: 'RIGHT' },
        { q: 'ยางยืดมีสมบัติเด่นเรื่องใด?', leftChoice: 'ความแข็ง', rightChoice: 'สภาพยืดหยุ่น', ans: 'RIGHT' },
        { q: 'อากาศรอบตัวเป็นสสารสถานะใด?', leftChoice: 'แก๊ส', rightChoice: 'ของเหลว', ans: 'LEFT' }
      ],
      hard: [
        { q: 'ถ้าไม่มีแรงโน้มถ่วงจะเกิดอะไรขึ้น?', leftChoice: 'สิ่งของลอยเคว้งคว้าง', rightChoice: 'น้ำหนักเพิ่มขึ้น', ans: 'LEFT' },
        { q: 'มวลและน้ำหนักต่างกันอย่างไร?', leftChoice: 'มวลคงที่ แต่น้ำหนักเปลี่ยนได้', rightChoice: 'มวลเปลี่ยน แต่น้ำหนักคงที่', ans: 'LEFT' },
        { q: 'ท่อลำเลียงน้ำของพืชเรียกว่าอะไร?', leftChoice: 'ไซเล็ม (Xylem)', rightChoice: 'โฟลเอ็ม (Phloem)', ans: 'LEFT' },
        { q: 'แสงเดินทางในลักษณะใด?', leftChoice: 'เส้นซิกแซก', rightChoice: 'เส้นตรง', ans: 'RIGHT' },
        { q: 'สสารในข้อใดมีรูปร่างและปริมาตรคงที่?', leftChoice: 'ก้อนหิน (ของแข็ง)', rightChoice: 'น้ำมัน (ของเหลว)', ans: 'LEFT' }
      ]
    },
    challenge2: { // เทอม 2
      easy: [
        { q: 'ศูนย์กลางของระบบสุริยะคืออะไร?', leftChoice: 'โลก', rightChoice: 'ดวงอาทิตย์', ans: 'RIGHT' },
        { q: 'ดวงจันทร์มีแสงในตัวเองหรือไม่?', leftChoice: 'ไม่มี', rightChoice: 'มี', ans: 'LEFT' },
        { q: 'ดาวเคราะห์ดวงใดใหญ่ที่สุด?', leftChoice: 'ดาวพฤหัสบดี', rightChoice: 'ดาวเสาร์', ans: 'LEFT' },
        { q: 'ข้างขึ้นข้างแรมเกิดจากอะไร?', leftChoice: 'ดวงจันทร์โคจรรอบโลก', rightChoice: 'โลกโคจรรอบดวงอาทิตย์', ans: 'LEFT' },
        { q: 'ดาวเคราะห์ดวงใดอยู่ใกล้ดวงอาทิตย์ที่สุด?', leftChoice: 'ดาวพุธ', rightChoice: 'ดาวศุกร์', ans: 'LEFT' }
      ],
      medium: [
        { q: 'ดาวศุกร์ได้รับฉายาว่าอะไร?', leftChoice: 'ดาวเคราะห์สีแดง', rightChoice: 'ฝาแฝดของโลก', ans: 'RIGHT' },
        { q: 'ทำไมเราจึงเห็นดวงจันทร์สว่าง?', leftChoice: 'สะท้อนแสงจากดวงอาทิตย์', rightChoice: 'สร้างแสงได้เอง', ans: 'LEFT' },
        { q: 'วันขึ้น 15 ค่ำ ดวงจันทร์มีลักษณะอย่างไร?', leftChoice: 'มืดสนิท', rightChoice: 'สว่างเต็มดวง', ans: 'RIGHT' },
        { q: 'โลกหมุนรอบตัวเอง 1 รอบใช้เวลาเท่าใด?', leftChoice: '24 ชั่วโมง', rightChoice: '365 วัน', ans: 'LEFT' },
        { q: 'ดาวเสาร์มีลักษณะเด่นอย่างไร?', leftChoice: 'มีวงแหวนขนาดใหญ่', rightChoice: 'เป็นดาวเคราะห์หิน', ans: 'LEFT' }
      ],
      hard: [
        { q: 'ปรากฏการณ์น้ำขึ้นน้ำลงเกิดจากอะไร?', leftChoice: 'แรงดึงดูดของดวงจันทร์', rightChoice: 'ความร้อนจากดวงอาทิตย์', ans: 'LEFT' },
        { q: 'แถบดาวเคราะห์น้อยอยู่ระหว่างดาวดวงใด?', leftChoice: 'อังคาร กับ พฤหัสบดี', rightChoice: 'โลก กับ อังคาร', ans: 'LEFT' },
        { q: 'ดาวตก (Shooting Star) แท้จริงคืออะไร?', leftChoice: 'ดาวฤกษ์ที่หลุดวงโคจร', rightChoice: 'อุกกาบาตเสียดสีชั้นบรรยากาศ', ans: 'RIGHT' },
        { q: 'ทำไมเราจึงเห็นดวงจันทร์เพียงด้านเดียว?', leftChoice: 'เวลาหมุนรอบตัวเองเท่ากับโคจรรอบโลก', rightChoice: 'อีกด้านถูกเงาโลกบังเสมอ', ans: 'LEFT' },
        { q: 'ดาวเคราะห์หิน (Inner Planets) มีกี่ดวง?', leftChoice: '4 ดวง', rightChoice: '8 ดวง', ans: 'LEFT' }
      ]
    }
  },

  // ==================== ป.5 ====================
  p5: {
    challenge1: { // เทอม 1
      easy: [
        { q: 'ลักษณะใดถ่ายทอดทางพันธุกรรมได้?', leftChoice: 'รอยสัก', rightChoice: 'ลักยิ้ม', ans: 'RIGHT' },
        { q: 'เสียงเกิดจากอะไร?', leftChoice: 'การสั่นสะเทือน', rightChoice: 'การสะท้อนของแสง', ans: 'LEFT' },
        { q: 'ข้อใดช่วยเพิ่มแรงเสียดทาน?', leftChoice: 'ดอกยางรถยนต์', rightChoice: 'น้ำมันหล่อลื่น', ans: 'LEFT' },
        { q: 'แรงลัพธ์ต้องมีกี่แรงขึ้นไป?', leftChoice: '1 แรง', rightChoice: '2 แรงขึ้นไป', ans: 'RIGHT' },
        { q: 'เสียงเดินทางผ่านอะไรได้เร็วที่สุด?', leftChoice: 'ของแข็ง', rightChoice: 'อากาศ', ans: 'LEFT' }
      ],
      medium: [
        { q: 'หน่วยความดังของเสียงคือข้อใด?', leftChoice: 'เดซิเบล (dB)', rightChoice: 'นิวตัน (N)', ans: 'LEFT' },
        { q: 'ยีนเด่น (Dominant) มีลักษณะอย่างไร?', leftChoice: 'ข่มยีนด้อยได้', rightChoice: 'มักแฝงตัวอยู่', ans: 'LEFT' },
        { q: 'ดันกล่องไปทางเดียวกัน 5N กับ 10N แรงลัพธ์คือ?', leftChoice: '15 N', rightChoice: '5 N', ans: 'LEFT' },
        { q: 'เสียงแหลมเกิดจากอะไร?', leftChoice: 'ความถี่สูง', rightChoice: 'ความถี่ต่ำ', ans: 'LEFT' },
        { q: 'พันธุกรรมเก็บอยู่ในส่วนใดของเซลล์?', leftChoice: 'นิวเคลียส', rightChoice: 'ไซโทพลาซึม', ans: 'LEFT' }
      ],
      hard: [
        { q: 'ใครคือบิดาแห่งวิชาพันธุศาสตร์?', leftChoice: 'ไอแซก นิวตัน', rightChoice: 'เกรเกอร์ เมนเดล', ans: 'RIGHT' },
        { q: 'มลพิษทางเสียงเริ่มที่ความดังเท่าใด?', leftChoice: '85 เดซิเบล', rightChoice: '50 เดซิเบล', ans: 'LEFT' },
        { q: 'ผลักกล่องสวนทางกัน 10N กับ 10N แรงลัพธ์คือ?', leftChoice: '0 N (กล่องไม่ขยับ)', rightChoice: '20 N', ans: 'LEFT' },
        { q: 'ส่วนใดของหูรับการสั่นสะเทือนเป็นจุดแรก?', leftChoice: 'คอเคลีย', rightChoice: 'เยื่อแก้วหู', ans: 'RIGHT' },
        { q: 'การผสมถั่วลันเตาของเมนเดลใช้อัตราส่วนยีนเด่นต่อด้อยเท่าใดในรุ่นหลาน?', leftChoice: '3 : 1', rightChoice: '1 : 1', ans: 'LEFT' }
      ]
    },
    challenge2: { // เทอม 2 (จำลองไว้ก่อน คุณครูเพิ่มทีหลังได้ครับ)
      easy: [ { q: 'การระเหยเป็นการเปลี่ยนสถานะจากอะไรเป็นอะไร?', leftChoice: 'ของเหลว เป็น แก๊ส', rightChoice: 'ของแข็ง เป็น ของเหลว', ans: 'LEFT' } ],
      medium: [ { q: 'วัฏจักรน้ำมีกระบวนการใดสำคัญที่สุด?', leftChoice: 'การระเหยและการควบแน่น', rightChoice: 'การหลอมเหลว', ans: 'LEFT' } ],
      hard: [ { q: 'แผนที่ดาวใช้ดูอะไร?', leftChoice: 'กลุ่มดาวฤกษ์', rightChoice: 'ดาวตก', ans: 'LEFT' } ]
    }
  },

  // ==================== ป.6 ====================
  p6: {
    challenge1: { // เทอม 1
      easy: [
        { q: 'โปรตีนช่วยเรื่องอะไรในร่างกาย?', leftChoice: 'ซ่อมแซมส่วนที่สึกหรอ', rightChoice: 'ให้พลังงานหลัก', ans: 'LEFT' },
        { q: 'การกรองใช้แยกสารประเภทใด?', leftChoice: 'ของแข็งที่ละลายในน้ำ', rightChoice: 'ของแข็งที่ไม่ละลายในน้ำ', ans: 'RIGHT' },
        { q: 'วงจรไฟฟ้าอย่างง่ายต้องมีอะไรบ้าง?', leftChoice: 'ถ่านไฟฉายและสายไฟ', rightChoice: 'ถ่านไฟฉาย สายไฟ และหลอดไฟ', ans: 'RIGHT' },
        { q: 'อวัยวะใดย่อยอาหารเป็นด่านแรก?', leftChoice: 'ปาก', rightChoice: 'กระเพาะอาหาร', ans: 'LEFT' },
        { q: 'วัสดุใดนำไฟฟ้าได้?', leftChoice: 'ทองแดง', rightChoice: 'พลาสติก', ans: 'LEFT' }
      ],
      medium: [
        { q: 'การต่อหลอดไฟแบบใด หากดวงหนึ่งขาดอีกดวงยังสว่าง?', leftChoice: 'แบบอนุกรม', rightChoice: 'แบบขนาน', ans: 'RIGHT' },
        { q: 'สารส้มมีประโยชน์อย่างไรในการแยกสาร?', leftChoice: 'ทำให้ตะกอนตกเร็วขึ้น', rightChoice: 'ฆ่าเชื้อแบคทีเรีย', ans: 'LEFT' },
        { q: 'กระเพาะอาหารย่อยสารอาหารประเภทใดเป็นหลัก?', leftChoice: 'โปรตีน', rightChoice: 'ไขมัน', ans: 'LEFT' },
        { q: 'การทำนาเกลือใช้วิธีใด?', leftChoice: 'การตกตะกอน', rightChoice: 'การระเหยแห้ง', ans: 'RIGHT' },
        { q: 'การต่อถ่านไฟฉายหลายก้อนเรียงกันเรียกว่าอะไร?', leftChoice: 'ต่อแบบขนาน', rightChoice: 'ต่อแบบอนุกรม', ans: 'RIGHT' }
      ],
      hard: [
        { q: 'ลำไส้เล็กมีหน้าที่หลักคืออะไร?', leftChoice: 'ดูดซึมสารอาหารทุกประเภท', rightChoice: 'ดูดซึมน้ำกลับ', ans: 'LEFT' },
        { q: 'การแยกผงตะไบเหล็กออกจากทรายใช้วิธีใดดีที่สุด?', leftChoice: 'การร่อน', rightChoice: 'การใช้แม่เหล็กดูด', ans: 'RIGHT' },
        { q: 'น้ำลายมีเอนไซม์ชนิดใดย่อยแป้ง?', leftChoice: 'อะไมเลส', rightChoice: 'เพปซิน', ans: 'LEFT' },
        { q: 'หากต้องการให้ไฟสว่างมากขึ้น ควรต่อถ่านไฟฉายแบบใด?', leftChoice: 'แบบขนาน', rightChoice: 'แบบอนุกรม', ans: 'RIGHT' },
        { q: 'ฉนวนไฟฟ้ามีหน้าที่อะไรในวงจร?', leftChoice: 'ป้องกันกระแสไฟฟ้ารั่วไหล', rightChoice: 'เพิ่มกระแสไฟฟ้า', ans: 'LEFT' }
      ]
    },
    challenge2: { // เทอม 2 (จำลองไว้ก่อน)
      easy: [ { q: 'สุริยุปราคา เกิดจากดาวดวงใดบังแสงอาทิตย์?', leftChoice: 'ดวงจันทร์', rightChoice: 'โลก', ans: 'LEFT' } ],
      medium: [ { q: 'หินอัคนีเกิดจากอะไร?', leftChoice: 'แมกมาเย็นตัว', rightChoice: 'การทับถมของตะกอน', ans: 'LEFT' } ],
      hard: [ { q: 'ซากดึกดำบรรพ์มักพบในหินชนิดใด?', leftChoice: 'หินตะกอน (หินชั้น)', rightChoice: 'หินแปร', ans: 'LEFT' } ]
    }
  }
};