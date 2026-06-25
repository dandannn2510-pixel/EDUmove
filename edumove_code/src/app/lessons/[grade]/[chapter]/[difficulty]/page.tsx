'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FlaskConical, AlertCircle, Lightbulb, ArrowLeft, CheckCircle2, Info } from 'lucide-react';

import SinglePlayerCamera from '@/components/SinglePlayerCamera';
import CameraDetection from '@/components/CameraDetection';
import TugOfWarCamera from '@/components/TugOfWarCamera';
import { challengeData } from '@/data/challengeData';

// 📚 ฐานข้อมูลข้อสอบวิทยาศาสตร์ (กางโครงสร้างชัดเจนครบทุกบท ป.4 - ป.6 ป้องกันระบบพัง)
const scienceQuizData: Record<string, any> = {
  p4: {
    chapter1: { 
      easy: [
        { q: "สิ่งมีชีวิตจัดกลุ่มได้กี่กลุ่มใหญ่ๆ?", choiceA: "2 กลุ่ม", choiceB: "3 กลุ่ม", choiceC: "4 กลุ่ม", choiceD: "5 กลุ่ม", ans: "B", explanation: "จำแนกได้ 3 กลุ่ม คือ พืช สัตว์ และที่ไม่ใช่พืช/สัตว์" },
        { q: "ข้อใดเป็นลักษณะสำคัญของพืช?", choiceA: "สร้างอาหารเองได้", choiceB: "เคลื่อนที่ได้", choiceC: "หายใจด้วยเหงือก", choiceD: "ไม่มีข้อถูก", ans: "A", explanation: "พืชมีคลอโรฟิลล์ สร้างอาหารผ่านการสังเคราะห์แสง" },
        { q: "เห็ดและรา จัดอยู่ในกลุ่มใด?", choiceA: "กลุ่มพืช", choiceB: "กลุ่มสัตว์", choiceC: "กลุ่มที่ไม่ใช่พืชและสัตว์", choiceD: "สิ่งไม่มีชีวิต", ans: "C", explanation: "ไม่สามารถสร้างอาหารเองได้ และไม่สามารถเคลื่อนที่ได้" },
        { q: "ข้อใดคือสิ่งมีชีวิตกลุ่มสัตว์?", choiceA: "แบคทีเรีย", choiceB: "เฟิร์น", choiceC: "ฟองน้ำ", choiceD: "ปะการัง", ans: "D", explanation: "ปะการัง เป็นสัตว์ที่ไม่มีกระดูกสันหลัง" },
        { q: "กลุ่มใดที่ต้องกินสิ่งมีชีวิตอื่นเป็นอาหาร?", choiceA: "พืช", choiceB: "สัตว์", choiceC: "เห็ดรา", choiceD: "แบคทีเรีย", ans: "B", explanation: "สัตว์ไม่สามารถสร้างอาหารเองได้" },
        { q: "ข้อใดเป็นลักษณะเฉพาะของแบคทีเรีย?", choiceA: "มีขนาดใหญ่", choiceB: "มองไม่เห็นด้วยตาเปล่า", choiceC: "มีดอกและผล", choiceD: "เคลื่อนที่เร็ว", ans: "B", explanation: "แบคทีเรียเป็นจุลินทรีย์ขนาดเล็ก ต้องใช้กล้องจุลทรรศน์ส่อง" },
        { q: "สิ่งมีชีวิตใดช่วยย่อยสลายซากพืชซากสัตว์?", choiceA: "รา", choiceB: "หญ้า", choiceC: "มด", choiceD: "นก", ans: "A", explanation: "รา (เชื้อรา) ทำหน้าที่เป็นผู้ย่อยสลายในระบบนิเวศ" },
        { q: "เฟิร์น สร้างอาหารเองได้หรือไม่?", choiceA: "ได้ เพราะเป็นพืช", choiceB: "ไม่ได้ เพราะไม่มีดอก", choiceC: "ได้ เพราะเป็นเห็ดรา", choiceD: "ไม่ได้ เพราะอยู่ในน้ำ", ans: "A", explanation: "เฟิร์นเป็นพืชสีเขียว จึงสามารถสังเคราะห์ด้วยแสงได้" },
        { q: "ลักษณะใดที่ 'เห็ด' ต่างจาก 'พืช'?", choiceA: "เห็ดมีดอก", choiceB: "เห็ดสร้างอาหารไม่ได้", choiceC: "เห็ดเคลื่อนที่ได้", choiceD: "เห็ดมีใบ", ans: "B", explanation: "เห็ดสร้างอาหารไม่ได้ ต้องอาศัยสารอาหารจากซากสิ่งมีชีวิตอื่น" },
        { q: "สิ่งมีชีวิตกลุ่มที่ไม่ใช่พืชและสัตว์ มีประโยชน์อย่างไร?", choiceA: "สร้างกระดาษ", choiceB: "ทำปุ๋ยหมักชีวภาพ", choiceC: "ดูดซับคาร์บอน", choiceD: "ไม่มีประโยชน์", ans: "B", explanation: "นำมาทำปุ๋ยหมัก ยารักษาโรค และของหมักดองได้" }
      ],
      hard: [
        { q: "ปะการัง และ ดอกไม้ทะเล จัดเป็นสิ่งมีชีวิตกลุ่มใด?", choiceA: "พืช", choiceB: "สัตว์", choiceC: "แบคทีเรีย", choiceD: "เห็ดรา", ans: "B", explanation: "ปะการังและดอกไม้ทะเลคือสัตว์น้ำชนิดหนึ่ง ไม่มีกระดูกสันหลัง" },
        { q: "ยีสต์ (Yeast) จัดอยู่ในกลุ่มใด?", choiceA: "พืช", choiceB: "สัตว์", choiceC: "จุลินทรีย์/เห็ดรา", choiceD: "ปรสิต", ans: "C", explanation: "ยีสต์จัดเป็นเชื้อราเซลล์เดียว ที่ใช้ทำขนมปัง" },
        { q: "เหตุใด 'ฟองน้ำ' จึงถูกจัดเป็นสัตว์?", choiceA: "มีระบบประสาท", choiceB: "มีตาและปาก", choiceC: "กินอาหารผ่านเซลล์", choiceD: "เดินได้", ans: "C", explanation: "ฟองน้ำไม่มีอวัยวะ แต่กรองกินแบคทีเรียเป็นอาหาร" },
        { q: "พืชกินแมลง สร้างอาหารเองได้หรือไม่?", choiceA: "ได้", choiceB: "ไม่ได้", choiceC: "ได้บางช่วง", choiceD: "ไม่แน่นอน", ans: "A", explanation: "มีสีเขียวจึงสร้างอาหารเองได้ แต่มันจับแมลงเพื่อเสริมธาตุอาหาร" },
        { q: "สัตว์ชนิดใดไม่มีกระดูกสันหลัง?", choiceA: "ค้างคาว", choiceB: "กิ้งก่า", choiceC: "หมึกทะเล", choiceD: "ปลาตะเพียน", ans: "C", explanation: "หมึกทะเลเป็นสัตว์ลำตัวอ่อนนุ่ม ไม่มีกระดูกสันหลัง" },
        { q: "แบคทีเรียต่างจากพืชและสัตว์อย่างไร?", choiceA: "มีขนาดใหญ่", choiceB: "ไม่มีนิวเคลียสแท้จริง", choiceC: "สืบพันธุ์ไม่ได้", choiceD: "สร้างอาหารเองได้", ans: "B", explanation: "แบคทีเรียเป็นเซลล์ขนาดเล็กมาก ไม่มีเยื่อหุ้มนิวเคลียส" },
        { q: "พืชสร้างอาหารด้วยกระบวนการใด?", choiceA: "การหายใจ", choiceB: "การย่อยอาหาร", choiceC: "การสังเคราะห์ด้วยแสง", choiceD: "การดูดซึม", ans: "C", explanation: "พืชใช้แสงอาทิตย์ น้ำ และคาร์บอนไดออกไซด์ในการสร้างอาหาร" },
        { q: "สิ่งมีชีวิตใดที่ 'ไม่จัด' เป็นทั้งพืช สัตว์ และเห็ดรา?", choiceA: "เห็ดโคน", choiceB: "แบคทีเรีย/ไวรัส", choiceC: "ฟองน้ำ", choiceD: "เฟิร์น", ans: "B", explanation: "แบคทีเรียเป็นจุลินทรีย์ ส่วนไวรัสยังก้ำกึ่งระหว่างสิ่งมีชีวิตและไม่มีชีวิต" },
        { q: "สัตว์มีกระดูกสันหลังกลุ่มใดที่หายใจด้วยเหงือกตลอดชีวิต?", choiceA: "สัตว์สะเทินน้ำสะเทินบก", choiceB: "ปลา", choiceC: "สัตว์เลื้อยคลาน", choiceD: "สัตว์เลี้ยงลูกด้วยนม", ans: "B", explanation: "ปลาใช้เหงือกในการแลกเปลี่ยนก๊าซในน้ำตลอดชีวิต" },
        { q: "ข้อใดเป็นสัตว์เลี้ยงลูกด้วยนมที่บินได้?", choiceA: "นกกระจอกเทศ", choiceB: "ค้างคาว", choiceC: "นกเพนกวิน", choiceD: "ผีเสื้อ", ans: "B", explanation: "ค้างคาวเป็นสัตว์เลี้ยงลูกด้วยนมเพียงชนิดเดียวที่บินได้จริง" },
        { q: "พืชใบเลี้ยงเดี่ยวมีลักษณะอย่างไร?", choiceA: "รากแก้ว เส้นใบรากแห", choiceB: "รากฝอย เส้นใบขนาน", choiceC: "รากแก้ว เส้นใบขนาน", choiceD: "รากฝอย เส้นใบรากแห", ans: "B", explanation: "ตัวอย่างเช่น หญ้า ข้าว ไผ่ มีระบบรากฝอยและเส้นใบเรียงขนานกัน" },
        { q: "เชื้อราที่ขึ้นบนขนมปัง เกิดจากอะไร?", choiceA: "สปอร์ของราที่ลอยอยู่ในอากาศ", choiceB: "ความร้อนในอากาศ", choiceC: "ขนมปังสร้างราขึ้นมาเอง", choiceD: "แบคทีเรียเปลี่ยนรูป", ans: "A", explanation: "สปอร์ของราปลิวมาตกบนขนมปังที่มีความชื้น จึงเจริญเติบโต" },
        { q: "ตะไคร่น้ำ จัดเป็นสิ่งมีชีวิตกลุ่มใด?", choiceA: "พืช", choiceB: "เห็ดรา", choiceC: "แบคทีเรีย", choiceD: "สัตว์เซลล์เดียว", ans: "A", explanation: "ตะไคร่น้ำคือสาหร่ายสีเขียว ซึ่งจัดอยู่ในกลุ่มพืชชั้นต่ำที่สร้างอาหารเองได้" },
        { q: "วาฬ และ โลมา จัดเป็นสัตว์กลุ่มใด?", choiceA: "ปลา", choiceB: "สัตว์ครึ่งบกครึ่งน้ำ", choiceC: "สัตว์เลื้อยคลาน", choiceD: "สัตว์เลี้ยงลูกด้วยนม", ans: "D", explanation: "พวกมันหายใจด้วยปอด ออกลูกเป็นตัว และเลี้ยงลูกด้วยนม" },
        { q: "สัตว์ใดที่มีการสืบพันธุ์แบบไม่อาศัยเพศ (เช่น การแตกหน่อ)?", choiceA: "สุนัข", choiceB: "ไฮดรา", choiceC: "แมลงวัน", choiceD: "นกพิราบ", ans: "B", explanation: "ไฮดราสามารถสืบพันธุ์โดยการแตกหน่อ (Budding) ออกมาจากตัวแม่" },
        { q: "สิ่งมีชีวิตใดเป็น 'ผู้ผลิต' ในระบบนิเวศ?", choiceA: "มนุษย์", choiceB: "สิงโต", choiceC: "ต้นหญ้า", choiceD: "เห็ดฟาง", ans: "C", explanation: "ผู้ผลิตคือสิ่งมีชีวิตที่สร้างอาหารเองได้ ซึ่งก็คือพืช" },
        { q: "รากของพืชมีหน้าที่หลักคืออะไร?", choiceA: "สร้างอาหาร", choiceB: "ดูดน้ำและแร่ธาตุ", choiceC: "หายใจ", choiceD: "สืบพันธุ์", ans: "B", explanation: "รากทำหน้าที่ยึดลำต้น และดูดซึมน้ำ/แร่ธาตุจากดินส่งไปเลี้ยงส่วนต่างๆ" },
        { q: "เห็บ และ หมัด จัดเป็นสิ่งมีชีวิตประเภทใด?", choiceA: "ผู้ผลิต", choiceB: "ผู้บริโภคพืช", choiceC: "ผู้ย่อยสลาย", choiceD: "ปรสิต", ans: "D", explanation: "ปรสิตคือสิ่งมีชีวิตที่อาศัยดูดเลือดและแย่งอาหารจากโฮสต์ (Host)" },
        { q: "สิ่งมีชีวิตใดหายใจด้วยปอดและผิวหนัง?", choiceA: "ปลาทู", choiceB: "กบ", choiceC: "จระเข้", choiceD: "งู", ans: "B", explanation: "สัตว์สะเทินน้ำสะเทินบก เช่น กบ ตอนโตจะใช้ทั้งปอดและผิวหนังที่ชุ่มชื้นในการหายใจ" },
        { q: "สัตว์ชนิดใดไม่มีขา แต่มีกระดูกสันหลัง?", choiceA: "ไส้เดือน", choiceB: "ตะขาบ", choiceC: "งู", choiceD: "ปลิง", ans: "C", explanation: "งูเป็นสัตว์เลื้อยคลานที่มีกระดูกสันหลังยาวต่อกันตลอดลำตัว" }
      ]
    },
    chapter2: {
      easy: [
        { q: "แรงโน้มถ่วงของโลกมีทิศทางไปทางใด?", choiceA: "พุ่งออกนอกโลก", choiceB: "เข้าสู่ศูนย์กลางโลก", choiceC: "ขนานกับพื้นโลก", choiceD: "ไม่มีทิศทาง", ans: "B", explanation: "แรงโน้มถ่วงดึงดูดวัตถุเข้าหาจุดศูนย์กลางโลกเสมอ" },
        { q: "ใครเป็นผู้ค้นพบแรงโน้มถ่วง?", choiceA: "ไอน์สไตน์", choiceB: "กาลิเลโอ", choiceC: "ไอแซก นิวตัน", choiceD: "ทอมัส เอดิสัน", ans: "C", explanation: "นิวตันค้นพบจากการสังเกตแอปเปิ้ลตก" },
        { q: "มวลของวัตถุมีผลต่อน้ำหนักหรือไม่?", choiceA: "มีผล มวลมากน้ำหนักมาก", choiceB: "มีผล มวลมากน้ำหนักน้อย", choiceC: "ไม่มีผล", choiceD: "มวลคือน้ำหนัก", ans: "A", explanation: "โลกจะออกแรงดึงดูดวัตถุมวลมาก ทำให้มีน้ำหนักมาก" },
        { q: "เครื่องมือใดใช้วัดน้ำหนักของวัตถุ?", choiceA: "ไม้บรรทัด", choiceB: "เครื่องชั่งสปริง", choiceC: "เทอร์โมมิเตอร์", choiceD: "เข็มทิศ", ans: "B", explanation: "อาศัยหลักการดึงของแรงโน้มถ่วงในการยืดสปริง" },
        { q: "ดวงจันทร์มีแรงโน้มถ่วงหรือไม่?", choiceA: "ไม่มี", choiceB: "มี แต่น้อยกว่าโลก", choiceC: "มี และมากกว่าโลก", choiceD: "เท่ากับโลก", ans: "B", explanation: "ดวงจันทร์มีแรงโน้มถ่วงน้อยกว่าโลก 6 เท่า" }
      ],
      hard: [
        { q: "แรงต้านของอากาศมีทิศทางอย่างไรกับวัตถุที่กำลังตกลงมา?", choiceA: "ทิศทางเดียวกัน", choiceB: "ทิศทางตรงกันข้าม", choiceC: "ตั้งฉากกัน", choiceD: "หมุนรอบวัตถุ", ans: "B", explanation: "แรงต้านอากาศจะพยายามพยุงวัตถุไว้ จึงมีทิศชี้ขึ้นสวนทางกับวัตถุที่ตกลงมา" },
        { q: "วัตถุ 2 ชิ้น มวลต่างกัน ปล่อยในสุญญากาศ ชิ้นใดตกถึงพื้นก่อน?", choiceA: "มวลมาก", choiceB: "มวลน้อย", choiceC: "ตกพร้อมกัน", choiceD: "ลอยเคว้ง", ans: "C", explanation: "ในสุญญากาศไม่มีแรงต้านอากาศ วัตถุจะตกด้วยความเร่งเท่ากันเสมอ" },
        { q: "หน่วยของ แรง (Force) คืออะไร?", choiceA: "กิโลกรัม", choiceB: "นิวตัน", choiceC: "จูล", choiceD: "เมตร/วินาที", ans: "B", explanation: "หน่วยของแรงและน้ำหนักคือ นิวตัน (N)" },
        { q: "ร่มชูชีพช่วยให้ตกลงมาอย่างปลอดภัยเพราะเหตุใด?", choiceA: "ลดแรงโน้มถ่วง", choiceB: "ต้านแรงโน้มถ่วง", choiceC: "เพิ่มพื้นที่รับแรงต้านอากาศ", choiceD: "ทำให้เบาลง", ans: "C", explanation: "ร่มชูชีพกางออกเพื่อเพิ่มพื้นที่สัมผัส ทำให้แรงต้านอากาศพยุงตัวไว้ได้มากขึ้น" },
        { q: "หินบนโลกหนัก 60 นิวตัน ชั่งบนดวงจันทร์จะหนักเท่าไร?", choiceA: "10 N", choiceB: "60 N", choiceC: "360 N", choiceD: "0 N", ans: "A", explanation: "ดวงจันทร์มีแรงโน้มถ่วงเป็น 1/6 ของโลก 60 หาร 6 = 10 N" }
      ]
    },
    chapter3: {
      easy: [
        { q: "แหล่งกำเนิดแสงที่ใหญ่ที่สุดของโลกคือสิ่งใด?", choiceA: "ดวงจันทร์", choiceB: "ดวงอาทิตย์", choiceC: "หลอดไฟ", choiceD: "หิ่งห้อย", ans: "B", explanation: "ดวงอาทิตย์เป็นดาวฤกษ์ที่แผ่พลังงานแสงมายังโลกมากที่สุด" },
        { q: "เรามองเห็นวัตถุได้อย่างไร?", choiceA: "ตาเราเปล่งแสงไป", choiceB: "แสงสะท้อนวัตถุเข้าตา", choiceC: "วัตถุเรืองแสงในที่มืด", choiceD: "ตาปรับสภาพเอง", ans: "B", explanation: "แสงตกกระทบวัตถุ แล้วสะท้อนเข้าสู่ดวงตาของเรา" },
        { q: "กระจกใส จัดเป็นตัวกลางประเภทใด?", choiceA: "โปร่งใส", choiceB: "โปร่งแสง", choiceC: "ทึบแสง", choiceD: "กักเก็บแสง", ans: "A", explanation: "ตัวกลางโปร่งใส ยอมให้แสงผ่านได้เกือบทั้งหมด" },
        { q: "กระดาษไข จัดเป็นตัวกลางประเภทใด?", choiceA: "โปร่งใส", choiceB: "โปร่งแสง", choiceC: "ทึบแสง", choiceD: "ไม่มีข้อถูก", ans: "B", explanation: "ตัวกลางโปร่งแสง ยอมให้แสงผ่านได้บางส่วน" },
        { q: "แผ่นไม้ จัดเป็นวัตถุประเภทใด?", choiceA: "โปร่งใส", choiceB: "โปร่งแสง", choiceC: "ทึบแสง", choiceD: "สะท้อนแสง", ans: "C", explanation: "ไม่ยอมให้แสงผ่านไปได้เลย ทำให้เกิดเงาด้านหลัง" }
      ],
      hard: [
        { q: "แสงเดินทางด้วยลักษณะใด?", choiceA: "เส้นโค้ง", choiceB: "เส้นซิกแซก", choiceC: "เส้นตรง", choiceD: "เกลียวคลื่น", ans: "C", explanation: "แสงเดินทางออกจากแหล่งกำเนิดในแนวเส้นตรง" },
        { q: "เงามืด (Umbra) เกิดจากวัตถุชนิดใด?", choiceA: "โปร่งใส", choiceB: "โปร่งแสง", choiceC: "ทึบแสง", choiceD: "กระจกเงา", ans: "C", explanation: "เกิดจากการที่วัตถุทึบแสงกั้นทางเดินของแสงทั้งหมด" },
        { q: "ถ้าเราเดินเข้าใกล้แหล่งกำเนิดแสง เงาจะเป็นอย่างไร?", choiceA: "ใหญ่ขึ้น", choiceB: "เล็กลง", choiceC: "เท่าเดิม", choiceD: "เงาหายไป", ans: "A", explanation: "ยิ่งใกล้วัตถุกำเนิดแสง เงาที่ทอดไปจะยิ่งขยายใหญ่ขึ้น" },
        { q: "การเกิดจันทรุปราคา เป็นหลักการของเรื่องใด?", choiceA: "การหักเหแสง", choiceB: "การเกิดเงา", choiceC: "การสะท้อนแสง", choiceD: "การกระจายแสง", ans: "B", explanation: "โลกบังแสงอาทิตย์ ทำให้เงาของโลกทอดทับดวงจันทร์" },
        { q: "ปริซึม แยกแสงขาวออกเป็นกี่สี?", choiceA: "3 สี", choiceB: "5 สี", choiceC: "7 สี", choiceD: "ไม่มีสี", ans: "C", explanation: "แยกเป็นสเปกตรัม 7 สี (ม่วง คราม น้ำเงิน เขียว เหลือง แสด แดง)" }
      ]
    },
    // สุ่มคำถามมาตรฐานสำหรับบทที่เหลือของ ป.4
    chapter4: { easy: [{ q: "ตัวกลางโปร่งใสคือ?", choiceA: "กระจกใส", choiceB: "หมอก", choiceC: "ไม้", choiceD: "เหล็ก", ans: "A", explanation: "ยอมให้แสงผ่านได้ดี" }], hard: [{ q: "เงามืดเกิดจากวัตถุประเภทใด?", choiceA: "โปร่งใส", choiceB: "โปร่งแสง", choiceC: "ทึบแสง", choiceD: "ไม่มีเงา", ans: "C", explanation: "วัตถุทึบแสงกั้นแสงทั้งหมด" }] },
    chapter5: { easy: [{ q: "สถานะของน้ำแข็งคือ?", choiceA: "ของแข็ง", choiceB: "ของเหลว", choiceC: "แก๊ส", choiceD: "พลาสม่า", ans: "A", explanation: "โมเลกุลชิดกันแน่น" }], hard: [{ q: "การควบแน่นคือกระบวนการใด?", choiceA: "ของแข็งเป็นของเหลว", choiceB: "แก๊สเป็นของเหลว", choiceC: "ของเหลวเป็นแก๊ส", choiceD: "แก๊สเป็นของแข็ง", ans: "B", explanation: "ไอน้ำกระทบความเย็นกลายเป็นหยดน้ำ" }] },
    chapter6: { easy: [{ q: "ดาวเคราะห์ดวงใดอยู่ใกล้ดวงอาทิตย์ที่สุด?", choiceA: "พุธ", choiceB: "ศุกร์", choiceC: "โลก", choiceD: "อังคาร", ans: "A", explanation: "ดาวพุธ" }], hard: [{ q: "ดาวเคราะห์หินประกอบด้วยดาวดวงใดบ้าง?", choiceA: "พุธ ศุกร์ โลก อังคาร", choiceB: "พฤหัส เสาร์ ยูเรนัส เนปจูน", choiceC: "โลก ดวงจันทร์", choiceD: "ดวงอาทิตย์", ans: "A", explanation: "สี่ดวงแรกเป็นดาวเคราะห์หิน" }] }
  },
  p5: {
    chapter1: {
      easy: [
        { q: "แรงลัพธ์คืออะไร?", choiceA: "ผลรวมของแรงหลายแรง", choiceB: "แรงจากเครื่องจักร", choiceC: "แรงดึงดูดของโลก", choiceD: "แรงเสียดทาน", ans: "A", explanation: "แรงลัพธ์ คือผลรวมของแรงตั้งแต่ 2 แรงขึ้นไป" },
        { q: "แรงเสียดทานมีทิศทางอย่างไร?", choiceA: "ทิศเดียวกับการเคลื่อนที่", choiceB: "ทิศตรงข้ามกับการเคลื่อนที่", choiceC: "ตั้งฉากกับการเคลื่อนที่", choiceD: "ไม่มีทิศทาง", ans: "B", explanation: "แรงเสียดทานเป็นแรงต้านการเคลื่อนที่ จึงมีทิศตรงข้ามเสมอ" },
        { q: "พื้นผิวแบบใดมีแรงเสียดทานมากที่สุด?", choiceA: "กระเบื้องมัน", choiceB: "น้ำแข็ง", choiceC: "พื้นทรายขรุขระ", choiceD: "กระจก", ans: "C", explanation: "พื้นผิวที่ขรุขระมาก จะสร้างแรงต้านได้มาก" },
        { q: "ล้อรถมีดอกยางเพื่ออะไร?", choiceA: "ความสวยงาม", choiceB: "ลดแรงเสียดทาน", choiceC: "เพิ่มแรงเสียดทานกันลื่น", choiceD: "กันระเบิด", ans: "C", explanation: "ดอกยางช่วยเพิ่มหน้าสัมผัส ทำให้เกาะถนนได้ดีขึ้น" },
        { q: "กิจกรรมใดต้องการ 'ลด' แรงเสียดทาน?", choiceA: "การเดิน", choiceB: "เบรกรถ", choiceC: "หยอดน้ำมันบานพับ", choiceD: "เปิดขวด", ans: "C", explanation: "การหยอดน้ำมันช่วยลดความฝืด ทำให้ประตูเปิดง่ายขึ้น" }
      ],
      hard: [
        { q: "ดึงกล่องไปขวา 10 N และซ้าย 4 N แรงลัพธ์คือ?", choiceA: "14 N ขวา", choiceB: "6 N ขวา", choiceC: "6 N ซ้าย", choiceD: "10 N ขวา", ans: "B", explanation: "แรงสวนทางกันให้นำมาลบกัน 10 - 4 = 6 N ไปทางขวา" },
        { q: "ดึงชักเย่อด้วยแรงเท่ากันสองฝั่ง วัตถุจะเป็นอย่างไร?", choiceA: "เคลื่อนที่เร็วขึ้น", choiceB: "หยุดนิ่ง", choiceC: "หมุน", choiceD: "ขาด", ans: "B", explanation: "เมื่อแรงเท่ากันและสวนทางกัน จะหักล้างกันจนแรงลัพธ์เป็น 0" },
        { q: "น้ำหนักมีผลต่อแรงเสียดทานหรือไม่?", choiceA: "มี วัตถุหนักแรงต้านน้อย", choiceB: "มี วัตถุหนักแรงต้านมาก", choiceC: "ไม่มี", choiceD: "มีแค่แนวดิ่ง", ans: "B", explanation: "ยิ่งน้ำหนักกดทับมาก แรงเสียดทานก็ยิ่งมาก" },
        { q: "ตลับลูกปืน (Ball Bearing) มีเพื่ออะไร?", choiceA: "เพิ่มน้ำหนัก", choiceB: "เพิ่มแรงเสียดทาน", choiceC: "ลดความฝืด", choiceD: "เบรกดีขึ้น", ans: "C", explanation: "เปลี่ยนจากการไถลเป็นการกลิ้ง ลดแรงเสียดทาน" },
        { q: "แรงเสียดทานสถิต เกิดขึ้นเมื่อใด?", choiceA: "เคลื่อนที่เร็ว", choiceB: "เคลื่อนที่ช้า", choiceC: "ดันแต่ยังไม่ขยับ", choiceD: "ลอยในอากาศ", ans: "C", explanation: "แรงต้านที่เกิดขึ้นก่อนที่วัตถุจะเริ่มเคลื่อนที่" }
      ]
    },
    // สุ่มคำถามสำหรับบทที่เหลือของ ป.5
    chapter2: { easy: [{ q: "เสียงเกิดจากอะไร?", choiceA: "ความร้อน", choiceB: "การสั่นสะเทือน", choiceC: "แสงสะท้อน", choiceD: "แรงโน้มถ่วง", ans: "B", explanation: "เกิดจากการสั่นของแหล่งกำเนิด" }], hard: [{ q: "เสียงเดินทางผ่านอะไรเร็วที่สุด?", choiceA: "ของแข็ง", choiceB: "ของเหลว", choiceC: "แก๊ส", choiceD: "สุญญากาศ", ans: "A", explanation: "โมเลกุลของแข็งอยู่ชิดกันที่สุด" }] },
    chapter3: { easy: [{ q: "เกลือละลายน้ำเป็นการเปลี่ยนแปลงแบบใด?", choiceA: "ทางเคมี", choiceB: "ทางกายภาพ", choiceC: "สถานะ", choiceD: "ปฏิกิริยา", ans: "B", explanation: "เปลี่ยนแค่รูปร่าง" }], hard: [{ q: "ข้อใดเกิดสารใหม่?", choiceA: "ฉีกกระดาษ", choiceB: "เหล็กเป็นสนิม", choiceC: "น้ำแข็งละลาย", choiceD: "ทุบแก้ว", ans: "B", explanation: "สนิมเป็นปฏิกิริยาเคมี" }] },
    chapter4: { easy: [{ q: "วัฏจักรน้ำเริ่มจากอะไร?", choiceA: "เมฆ", choiceB: "ความร้อนดวงอาทิตย์", choiceC: "ต้นไม้", choiceD: "ภูเขา", ans: "B", explanation: "ทำให้น้ำระเหยเป็นไอ" }], hard: [{ q: "เมฆเกิดจากอะไร?", choiceA: "ควันไฟ", choiceB: "ไอน้ำควบแน่น", choiceC: "ก๊าซพิษ", choiceD: "ลม", ans: "B", explanation: "ไอน้ำกระทบความเย็น" }] },
    chapter5: { easy: [{ q: "ดาวฤกษ์คืออะไร?", choiceA: "มีวงแหวน", choiceB: "มีแสงในตัวเอง", choiceC: "เคลื่อนที่เร็ว", choiceD: "ไม่มีแสง", ans: "B", explanation: "มีปฏิกิริยานิวเคลียร์" }], hard: [{ q: "ดาวศุกร์มีชื่อเรียกอีกอย่างว่าอะไร?", choiceA: "ดาวไถ", choiceB: "ดาวประจำเมือง", choiceC: "ดาวแดง", choiceD: "ดาวเต่า", ans: "B", explanation: "หรือดาวประกายพรึก" }] },
    chapter6: { easy: [{ q: "PM2.5 คืออะไร?", choiceA: "คลื่นวิทยุ", choiceB: "ฝุ่นละอองขนาดเล็กมาก", choiceC: "ไวรัส", choiceD: "ก๊าซ", ans: "B", explanation: "เล็กกว่า 2.5 ไมครอน" }], hard: [{ q: "ก๊าซเรือนกระจกตัวใดเกิดจากมนุษย์มากสุด?", choiceA: "ออกซิเจน", choiceB: "คาร์บอนไดออกไซด์", choiceC: "ไนโตรเจน", choiceD: "ไฮโดรเจน", ans: "B", explanation: "จากการเผาไหม้" }] }
  },
  p6: {
    chapter1: {
      easy: [
        { q: "สารอาหารหมู่ใดให้พลังงานแก่ร่างกาย?", choiceA: "วิตามิน", choiceB: "เกลือแร่", choiceC: "คาร์โบไฮเดรต", choiceD: "น้ำ", ans: "C", explanation: "คาร์โบไฮเดรต โปรตีน และไขมัน เป็นสารอาหารที่ให้พลังงาน" },
        { q: "สารอาหารใดช่วยซ่อมแซมส่วนที่สึกหรอของร่างกาย?", choiceA: "คาร์โบไฮเดรต", choiceB: "โปรตีน", choiceC: "ไขมัน", choiceD: "วิตามิน", ans: "B", explanation: "โปรตีน (เนื้อ นม ไข่ ถั่ว) เป็นโครงสร้างหลักของกล้ามเนื้อและเซลล์" },
        { q: "อวัยวะใดเป็นด่านแรกของระบบย่อยอาหาร?", choiceA: "กระเพาะอาหาร", choiceB: "ลำไส้เล็ก", choiceC: "ปาก", choiceD: "หลอดอาหาร", ans: "C", explanation: "การย่อยเริ่มต้นที่ปาก โดยฟันจะเคี้ยว และน้ำลายจะเริ่มย่อยแป้ง" },
        { q: "การย่อยอาหารและดูดซึมสารอาหารส่วนใหญ่เกิดขึ้นที่ใด?", choiceA: "กระเพาะอาหาร", choiceB: "ลำไส้เล็ก", choiceC: "ลำไส้ใหญ่", choiceD: "ตับ", ans: "B", explanation: "ลำไส้เล็กมีความยาวมากที่สุด ทำหน้าที่ย่อยและดูดซึมสารอาหารเข้าสู่กระแสเลือดมากที่สุด" },
        { q: "ลำไส้ใหญ่มีหน้าที่หลักคืออะไร?", choiceA: "ย่อยโปรตีน", choiceB: "ดูดซึมน้ำและเกลือแร่กลับ", choiceC: "สร้างน้ำดี", choiceD: "บดเคี้ยวอาหาร", ans: "B", explanation: "ลำไส้ใหญ่ไม่ได้ย่อยอาหารแล้ว แต่จะดูดน้ำกลับจากกากอาหารเพื่อกลายเป็นอุจจาระ" }
      ],
      hard: [
        { q: "เอนไซม์ 'อะไมเลส' ในน้ำลาย ทำหน้าที่ย่อยสารอาหารประเภทใด?", choiceA: "โปรตีน", choiceB: "ไขมัน", choiceC: "คาร์โบไฮเดรต (แป้ง)", choiceD: "วิตามิน", ans: "C", explanation: "อะไมเลสช่วยย่อยแป้งให้กลายเป็นน้ำตาล (สังเกตจากการเคี้ยวข้าวเปล่าจะรู้สึกหวาน)" },
        { q: "อวัยวะใดทำหน้าที่สร้าง 'น้ำดี' เพื่อช่วยย่อยไขมัน?", choiceA: "กระเพาะอาหาร", choiceB: "ตับอ่อน", choiceC: "ตับ", choiceD: "ลำไส้เล็ก", ans: "C", explanation: "ตับสร้างน้ำดีไปเก็บไว้ที่ถุงน้ำดี ซึ่งช่วยทำให้ไขมันแตกตัวเป็นหยดเล็กๆ" },
        { q: "โรคกระเพาะอาหาร มักเกิดจากสาเหตุใด?", choiceA: "กินอาหารตรงเวลา", choiceB: "กินรสจืด", choiceC: "กินอาหารไม่ตรงเวลา / เครียด", choiceD: "ดื่มน้ำมากไป", ans: "C", explanation: "การกินไม่ตรงเวลาทำให้น้ำย่อยที่หลั่งออกมากัดเยื่อบุกระเพาะอาหาร" },
        { q: "สารอาหารประเภทใดให้พลังงานสูงที่สุดต่อ 1 กรัม?", choiceA: "โปรตีน", choiceB: "คาร์โบไฮเดรต", choiceC: "ไขมัน", choiceD: "น้ำตาล", ans: "C", explanation: "ไขมัน 1 กรัม ให้พลังงานถึง 9 กิโลแคลอรี ในขณะที่แป้งและโปรตีนให้เพียง 4" },
        { q: "โครงสร้างที่มีลักษณะคล้ายนิ้วมือยื่นออกมาในลำไส้เล็ก (Villi) มีประโยชน์อย่างไร?", choiceA: "ช่วยบีบรัดอาหาร", choiceB: "เพิ่มพื้นที่ผิวในการดูดซึม", choiceC: "สร้างเอนไซม์", choiceD: "ขับกากอาหารทิ้ง", ans: "B", explanation: "วิลไล (Villi) ช่วยเพิ่มพื้นที่ผิวสัมผัส ทำให้ดูดซึมสารอาหารได้เร็วและมากขึ้น" }
      ]
    },
    // สุ่มคำถามสำหรับบทที่เหลือของ ป.6
    chapter2: { easy: [{ q: "การร่อนด้วยตะแกรง ใช้แยกสารแบบใด?", choiceA: "ของแข็งขนาดต่างกัน", choiceB: "ของเหลวปนของเหลว", choiceC: "ของแข็งละลายน้ำ", choiceD: "ของเหลวปนแก๊ส", ans: "A", explanation: "เช่น ร่อนทราย" }], hard: [{ q: "แยกผงตะไบเหล็กออกจากทราย ใช้วิธีใดดีที่สุด?", choiceA: "หยิบออก", choiceB: "ใช้แม่เหล็กดูด", choiceC: "ร่อน", choiceD: "ละลายน้ำ", ans: "B", explanation: "แม่เหล็กจะดูดเฉพาะผงเหล็ก" }] },
    chapter3: { easy: [{ q: "แหล่งกำเนิดไฟฟ้าในบ้านมาจากไหน?", choiceA: "แบตเตอรี่", choiceB: "โรงไฟฟ้า", choiceC: "ฟ้าผ่า", choiceD: "โซลาร์เซลล์", ans: "B", explanation: "ผลิตจากโรงไฟฟ้าและส่งตามสายไฟ" }], hard: [{ q: "วัสดุใดเป็นฉนวนไฟฟ้า?", choiceA: "น้ำ", choiceB: "เหล็ก", choiceC: "ยางพารา", choiceD: "ทองแดง", ans: "C", explanation: "ยางไม่นำไฟฟ้า" }] },
    chapter4: { easy: [{ q: "จันทรุปราคา เกิดจากอะไร?", choiceA: "ดวงจันทร์บังดวงอาทิตย์", choiceB: "โลกบังดวงอาทิตย์", choiceC: "โลกบังดวงจันทร์", choiceD: "ดาวศุกร์บังโลก", ans: "B", explanation: "โลกอยู่ตรงกลางทำให้เกิดเงา" }], hard: [{ q: "สุริยุปราคา เกิดในเวลาใด?", choiceA: "กลางคืน", choiceB: "ตอนเย็น", choiceC: "กลางวัน", choiceD: "เที่ยงคืน", ans: "C", explanation: "เกิดตอนสว่างแล้วถูกดวงจันทร์บัง" }] },
    chapter5: { easy: [{ q: "หินอัคนี เกิดจากอะไร?", choiceA: "หินผุพัง", choiceB: "ลาวาเย็นตัว", choiceC: "ซากสัตว์", choiceD: "ดินเหนียวร้อน", ans: "B", explanation: "เย็นตัวและตกผลึก" }], hard: [{ q: "หินชั้น (ตะกอน) มีลักษณะเด่นคืออะไร?", choiceA: "มีรูพรุน", choiceB: "เป็นชั้นและมีฟอสซิล", choiceC: "แข็งที่สุด", choiceD: "เป็นแก้ว", ans: "B", explanation: "เกิดจากการทับถม" }] },
    chapter6: { easy: [{ q: "แผ่นดินไหว เกิดจากอะไร?", choiceA: "พายุ", choiceB: "เปลือกโลกเสียดสี", choiceC: "โลกหมุนเร็ว", choiceD: "น้ำขึ้น", ans: "B", explanation: "เกิดรอยเลื่อนและปล่อยพลังงาน" }], hard: [{ q: "สึนามิ มักเกิดหลังจากอะไร?", choiceA: "แผ่นดินไหวใต้ทะเล", choiceB: "ทอร์นาโด", choiceC: "น้ำท่วม", choiceD: "หิมะละลาย", ans: "A", explanation: "แรงสั่นสะเทือนใต้ทะเลทำให้เกิดคลื่น" }] }
  }
};

export default function ScienceDynamicQuizPage() {
  const params = useParams();
  const router = useRouter();
  const [showAnswers, setShowAnswers] = useState(false);

  const grade = (params?.grade as string) || 'p4';
  const chapterOrChallenge = (params?.chapter as string) || 'chapter1'; 
  const difficulty = (params?.difficulty as string) || 'easy'; 

  const isChallenge = chapterOrChallenge.includes('challenge');
  
  // 🚀 ใส่ as any[] เพื่อบอก TypeScript ไม่ต้องตกใจเรื่อง Type ซ้อนทับ
  const questions: any[] = isChallenge 
    ? challengeData[grade]?.[chapterOrChallenge]?.[difficulty] || []
    : scienceQuizData[grade]?.[chapterOrChallenge]?.[difficulty] || [];

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white p-6 text-center">
        <FlaskConical size={80} className="text-emerald-500 mb-6 animate-pulse" />
        <h1 className="text-4xl text-emerald-400 font-black mb-6">ยังไม่มีข้อสอบในระบบ 🚧</h1>
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
            วิชาวิทยาศาสตร์ | โหมด: {isChallenge ? 'ด่านท้าทาย' : (difficulty === 'easy' ? 'Pre-test' : 'Post-test')} | จำนวน {questions.length} ข้อ
          </p>

          <div className="space-y-8">
            {questions.map((q: any, i: number) => (
              <div key={i} className="bg-slate-900/80 border border-slate-700/50 p-6 md:p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-slate-800 text-slate-500 font-black text-6xl opacity-30 p-4 rounded-bl-[3rem] pointer-events-none">{i + 1}</div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed relative z-10"><span className="text-emerald-400 mr-2">Q:</span>{q.q}</h2>
                
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
                  <div className="mt-6 p-5 bg-teal-500/10 border border-teal-500/30 rounded-2xl flex gap-4 items-start relative z-10">
                    <div className="bg-teal-500/20 p-2 rounded-full text-teal-400 shrink-0"><Info size={24} /></div>
                    <div><h4 className="text-teal-300 font-bold text-sm uppercase tracking-wider mb-1">คำอธิบายเฉลย</h4><p className="text-teal-100/90 text-base md:text-lg leading-relaxed">{q.explanation}</p></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 🚀 ป้ายชื่อเกมแบบทางการ ตามที่คุณครูขอ
  const gradeText = grade === 'p4' ? 'ป.4' : grade === 'p5' ? 'ป.5' : 'ป.6';
  let expName = "";

  if (isChallenge) {
    const term = chapterOrChallenge === 'challenge1' ? '1' : '2';
    const diffText = difficulty === 'easy' ? 'ง่าย' : difficulty === 'medium' ? 'ปานกลาง' : 'ยาก';
    expName = `ระดับชั้น ${gradeText} ภาคเรียนที่ ${term} ระดับ ${diffText}`;
  } else {
    const typeText = difficulty === 'easy' ? 'Pre-test' : 'Post-test';
    const chapterNumber = chapterOrChallenge.replace('chapter', '');
    expName = `วิทยาศาสตร์ ${gradeText} บทที่ ${chapterNumber} : ${typeText}`;
  }

  return (
    <div className="w-full h-screen bg-[#020617] overflow-hidden relative">
      <button 
        onClick={() => setShowAnswers(true)} 
        className="absolute bottom-6 right-6 z-[100] bg-slate-900/80 hover:bg-amber-500 hover:text-slate-900 border border-amber-500/50 text-amber-400 px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] group"
      >
        <Lightbulb size={20} className="animate-pulse group-hover:animate-none" /> ดูเฉลยด่วน
      </button>

      {/* 🚀 บังคับ Type ด้วย as any เพื่อให้ TypeScript เลิกงอแง */}
      {isChallenge ? (
        <SinglePlayerCamera questions={questions as any} onExit={() => router.back()} experimentName={expName} />
      ) : difficulty === 'hard' ? (
        <TugOfWarCamera questions={questions as any} onFinish={() => router.back()} experimentName={expName} />
      ) : (
        <CameraDetection questions={questions as any} onFinish={() => router.back()} onViewAnswers={() => setShowAnswers(true)} experimentName={expName} />
      )}
    </div>
  );
}