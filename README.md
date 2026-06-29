# 🚀 EDUmove (Scilab Classroom)

ระบบสื่อการเรียนรู้เชิงโต้ตอบด้วยท่าทาง (Gesture-based Interactive Learning System) สำหรับนักเรียนระดับประถมศึกษา (ป.4 - ป.6) ในวิชาวิทยาศาสตร์และคณิตศาสตร์ พัฒนาด้วย Next.js 14 และ Google MediaPipe Hand Landmarker

---

## ✨ ฟีเจอร์หลัก (Key Features)

1. **Gesture-Controlled Learning (การควบคุมด้วยท่าทาง)**
   - ใช้กล้องเว็บแคมตรวจจับการเคลื่อนไหวของมือในการตอบคำถามและทำกิจกรรมโดยไม่ต้องสัมผัสหน้าจอหรือใช้เมาส์
   - ขับเคลื่อนด้วยเทคโนโลยี **Google MediaPipe HandLandmarker** เพื่อตรวจจับข้อต่อของมือ (Hand Landmarks) แบบ Real-time
2. **Interactive Video Player (บทเรียนวิดีโอเชิงโต้ตอบ)**
   - รับชมวิดีโอประกอบการเรียนรู้ที่แบ่งเป็นย่อยๆ (EP.1 - EP.7 สำหรับ ป.6 เรื่องแรงไฟฟ้า)
   - ระบบจะหยุดวิดีโอโดยอัตโนมัติเมื่อถึงจุดที่กำหนด เพื่อให้ผู้เรียนยกมือตอบคำถามทบทวนความรู้ก่อนเรียนต่อ
3. **O-NET Boss Raid (โหมดสู้บอสข้อสอบ O-NET)**
   - โหมดตอบคำถามสู้บอสสุดมันส์สำหรับวิชาวิทยาศาสตร์และคณิตศาสตร์ เพื่อเตรียมตัวสอบ O-NET ป.6
   - โต้ตอบด้วยการยกมือเลือกคำตอบที่ถูกต้องเพื่อสร้างความเสียหาย (Damage) ให้กับบอส
4. **Multiplayer/Singleplayer Game Modes**
   - **Tug of War Camera**: เกมชักเย่อใช้การยกมือของสองผู้เล่นในการแข่งขันความเร็ว
   - **Single Player Camera**: ตอบคำถามแบบผู้เล่นเดี่ยวจับเวลา
5. **Responsive & Neo-Brutalist Design**
   - หน้าตา UI สไตล์ Neo-Brutalist สีสันสดใส ดึงดูดความสนใจของนักเรียน
   - รองรับ Dark Mode และการแสดงผลที่ตอบสนองได้ทุกอุปกรณ์ (Responsive Layout)
6. **Robust Testing Suite**
   - มีระบบ Unit/Integration Tests โดยใช้ Jest และ React Testing Library
   - ครอบคลุมการจำลองตรวจจับกล้อง, คอนโทรลเลอร์จับเวลา, และ Web Audio API

---

## 🛠️ โครงสร้างเทคโนโลยี (Tech Stack)

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (สำหรับควบคุมสถานะเกมและธีมเว็บ)
- **AI/Computer Vision**: `@mediapipe/tasks-vision` (Hand Landmarker Web API)
- **Icons**: `lucide-react`
- **Testing**: Jest + React Testing Library + Web Audio API Mocking

---

## 📂 โครงสร้างโฟลเดอร์ของโปรเจกต์ (Project Directory Structure)

```text
edumove/
├── public/                  # ไฟล์สาธารณะ โลโก้ และไอคอนต่างๆ
├── src/
│   ├── app/                 # หน้าหลักและเราเตอร์ระบบ (Next.js App Router)
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx       # เลย์เอาต์หลักของแอป
│   │   ├── page.tsx         # หน้าแรก (Home Page)
│   │   ├── grade/           # หน้าเลือกวิชา (วิทยาศาสตร์ / คณิตศาสตร์) ตามระดับชั้น
│   │   ├── guide/           # หน้าคู่มือการใช้งานและตั้งค่าการตรวจจับกล้อง
│   │   ├── lessons/         # เนื้อหาและแผนที่บทเรียนวิทยาศาสตร์ (ป.4 - ป.6)
│   │   ├── math-lessons/    # เนื้อหาและแผนที่บทเรียนคณิตศาสตร์ (ป.4 - ป.6)
│   │   ├── onet/            # หน้าเลือกวิชาสำหรับโหมดสู้บอส O-NET
│   │   └── onet-boss/       # โหมดเกมต่อสู้บอส O-NET (วิทยาศาสตร์ & คณิตศาสตร์)
│   ├── components/          # คอมโพเนนต์ที่ใช้ร่วมกัน
│   │   ├── CameraDetection.tsx       # ระบบตรวจจับมือและประมวลผลการตอบคำถาม
│   │   ├── ConfettiCelebration.tsx   # เอฟเฟกต์แสดงความยินดี (กระดาษโปรย)
│   │   ├── InteractiveVideoPlayer.tsx # เครื่องเล่นวิดีโอเชิงโต้ตอบพร้อมระบบคำถามคั่น
│   │   ├── Navbar.tsx                # แถบเมนูด้านบนที่รองรับ Responsive
│   │   ├── SinglePlayerCamera.tsx    # ระบบเล่นเกมคนเดียวผ่านกล้อง
│   │   ├── TugOfWarCamera.tsx        # เกมชักเย่อสองคนผ่านกล้อง
│   │   ├── ThemeScript.tsx & Toggle  # ระบบสลับโหมดมืด-สว่าง (Dark/Light Mode)
│   │   └── __tests__/                # ชุดทดสอบของคอมโพเนนต์ต่างๆ
│   ├── data/                # ข้อมูลคำถาม แผนการสอน และคลังคำตอบ
│   ├── store/               # Zustand Store สำหรับเก็บข้อมูลความคืบหน้าของเกมและธีม
│   └── utils/               # ฟังก์ชันการทำงานช่วยเหลือและเชื่อมต่อ MediaPipe API
├── jest.config.mjs          # ตั้งค่าสำหรับเครื่องมือทดสอบ Jest
├── jest.setup.ts            # การตั้งค่า global mocks สำหรับเสียงและ API
├── package.json             # ไฟล์กำหนด Dependency และ Scripts
└── tsconfig.json            # ไฟล์การตั้งค่า TypeScript
```

---

## 🚀 เริ่มต้นใช้งาน (Getting Started)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันในโหมดพัฒนา (Development Mode)
```bash
npm run dev
```
เปิดบราวเซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

### 3. ทดสอบการทำงาน (Run Unit Tests)
```bash
npm run test
```

### 4. บิลด์สำหรับ Production
```bash
npm run build
npm run start
```

---

## 💡 ข้อมูลระบบสำคัญ (System Notes)

- **การเปิดกล้อง**: ตัวระบบใช้งานเว็บแคมในการประมวลผลภาพเฉพาะที่บนเครื่องของฝั่งผู้ใช้ (Client-side) เท่านั้น ไม่มีการส่งข้อมูลภาพกลับไปยังเซิร์ฟเวอร์ใดๆ เพื่อความปลอดภัยทางด้านข้อมูลส่วนบุคคล (Privacy)
- **การตรวจจับประจุไฟฟ้า (บทเรียน ป.6)**: ลิงก์คลิปวิดีโอประกอบการเรียนการสอนได้รับการติดตั้งครอบคลุมตั้งแต่ EP. 1 ถึง EP. 7 โดยระบบจะปิดตัวเชื่อมโยงวิดีโอเริ่มต้นออก และทดแทนด้วยหน้าจอแจ้งเตือนข้อความกรณีที่บทเรียนย่อยยังไม่พร้อมให้บริการคลิปอย่างสวยงาม
