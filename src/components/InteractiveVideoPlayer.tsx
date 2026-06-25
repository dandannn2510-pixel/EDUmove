'use client';
import { allQuestions } from '@/data/allQuestions';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import Webcam from 'react-webcam';
import { HandLandmarker } from '@mediapipe/tasks-vision';
import { getHandLandmarker } from '@/utils/mediapipe';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X, ChevronRight, Trophy, HelpCircle, Video, FastForward, Camera, Sparkles, Pause, Play, Maximize, Minimize, Hand } from 'lucide-react';

interface InteractiveQuestion {
  q: string;
  leftChoice: string;
  rightChoice: string;
  ans: 'LEFT' | 'RIGHT';
  explanation: string;
}

interface VideoSegment {
  youtubeId: string;
  title: string;
  questions: InteractiveQuestion[];
}

const CHAPTER3_P4_LESSON: { segments: VideoSegment[]; summaryTitle: string; summaryItems: string[] } = {
  segments: [
    {
      youtubeId: '_4Pns0KNxzk',
      title: 'EP. 1: น้ำแข็ง น้ำ และไอน้ำ',
      questions: [
        {
          q: 'น้ำแข็ง น้ำ และไอน้ำ เป็นสิ่งเดียวกันหรือไม่?',
          leftChoice: 'เป็นสิ่งเดียวกัน',
          rightChoice: 'เป็นคนละสารกัน',
          ans: 'LEFT',
          explanation: 'คำตอบถูก! เพราะทั้งสามสิ่งเป็นน้ำเหมือนกัน แต่แตกต่างกันที่สถานะ (ของแข็ง ของเหลว แก๊ส)'
        }
      ]
    },
    {
      youtubeId: '_4Pns0KNxzk',
      title: 'EP. 2: ทำไมน้ำแข็งจึงละลาย',
      questions: [
        {
          q: 'ทำไมน้ำแข็งจึงละลายกลายเป็นน้ำ?',
          leftChoice: 'เพราะได้รับความร้อน',
          rightChoice: 'เพราะได้รับความเย็น',
          ans: 'LEFT',
          explanation: 'คำตอบถูก! เพราะความร้อนทำให้อุณหภูมิสูงขึ้นจนเกิดการหลอมเหลวเปลี่ยนสถานะ'
        }
      ]
    },
    {
      youtubeId: '_4Pns0KNxzk',
      title: 'EP. 3: เสื้อผ้าเปียกตากแล้วแห้ง',
      questions: [
        {
          q: 'ทำไมเสื้อผ้าเปียกที่ตากไว้จึงแห้งได้?',
          leftChoice: 'น้ำเปลี่ยนเป็นไอน้ำ',
          rightChoice: 'ผ้าดูดซับน้ำหายไป',
          ans: 'LEFT',
          explanation: 'คำตอบถูก! เพราะน้ำได้รับความร้อนจากแสงแดดแล้วระเหยกลายเป็นไอน้ำลอยไปในอากาศ'
        }
      ]
    },
    {
      youtubeId: '_4Pns0KNxzk',
      title: 'EP. 4: หยดน้ำข้างแก้ว',
      questions: [
        {
          q: 'หยดน้ำเกาะรอบแก้วน้ำเย็นเกิดขึ้นจากอะไร?',
          leftChoice: 'น้ำซึมออกจากรูของแก้ว',
          rightChoice: 'ไอน้ำในอากาศควบแน่น',
          ans: 'RIGHT',
          explanation: 'คำตอบถูก! เพราะไอน้ำในอากาศกระทบกับความเย็นรอบแก้วจึงควบแน่นเป็นหยดน้ำเกาะอยู่'
        }
      ]
    },
    {
      youtubeId: '_4Pns0KNxzk',
      title: 'EP. 5: การระเหยของน้ำ',
      questions: [
        {
          q: 'ถ้าวางน้ำแข็งทิ้งไว้ในห้อง แล้วน้ำค่อยๆ หายไป เกิดจากขั้นตอนใด?',
          leftChoice: 'หลอมเหลวแล้วระเหย',
          rightChoice: 'แข็งตัวแล้วควบแน่น',
          ans: 'LEFT',
          explanation: 'คำตอบถูก! เพราะน้ำแข็งจะหลอมเหลวเป็นของเหลวก่อน จากนั้นจึงระเหยเป็นแก๊สลอยไปในอากาศ'
        }
      ]
    },
    {
      youtubeId: '_4Pns0KNxzk',
      title: 'EP. 6: การแข็งตัวของสสาร',
      questions: [
        {
          q: 'น้ำเปล่าที่นำไปแช่ในช่องฟรีซกลายเป็นน้ำแข็ง เกิดกระบวนการใด?',
          leftChoice: 'การได้รับความร้อน',
          rightChoice: 'การสูญเสียความร้อน',
          ans: 'RIGHT',
          explanation: 'คำตอบถูก! เพราะน้ำคายหรือสูญเสียความร้อนอุณหภูมิจึงลดลงจนถึงจุดเยือกแข็งและแข็งตัว'
        }
      ]
    },
    {
      youtubeId: '_4Pns0KNxzk',
      title: 'EP. 7: เมฆและหมอก',
      questions: [
        {
          q: 'การเกิดเมฆและหมอกบนท้องฟ้าเกี่ยวข้องกับกระบวนการใด?',
          leftChoice: 'การควบแน่นของไอน้ำ',
          rightChoice: 'การหลอมเหลวของน้ำแข็ง',
          ans: 'LEFT',
          explanation: 'คำตอบถูก! เพราะไอน้ำกระทบความเย็นด้านบนควบแน่นเป็นละอองน้ำเล็กๆ ก่อตัวเป็นเมฆและหมอก'
        }
      ]
    },
    {
      youtubeId: '_4Pns0KNxzk',
      title: 'EP. 8: สรุปบทเรียน เรื่องสสาร ป.4',
      questions: []
    }
  ],
  summaryTitle: '💡 สรุปคำสำคัญประจำบทเรียน',
  summaryItems: [
    'ได้รับความร้อน → การหลอมเหลว (ของแข็งเป็นของเหลว), การกลายเป็นไอ/การระเหย (ของเหลวเป็นแก๊ส)',
    'สูญเสียความร้อน → การแข็งตัว (ของเหลวเป็นของแข็ง), การควบแน่น (แก๊สเป็นของเหลว)'
  ]
};

interface Props {
  onClose: () => void;
  initialSegmentIndex?: number;
  grade?: string;
  chapterId?: string;
  summaryTitle?: string;
  summaryItems?: string[];
  title?: string;
}

// ─── YouTube Player type ──────────────────────────────────────────────────────
interface YTPlayer {
  destroy: () => void;
}


export function getInteractiveLessonData(grade: string, chapterId: string) {
  if (grade === 'p4' && chapterId === 'chapter3') {
    return CHAPTER3_P4_LESSON;
  }

  const rawQuestions = allQuestions[grade]?.[chapterId]?.pretest?.questions || [];
  const segments = rawQuestions.slice(0, 4).map((q, idx) => {
    let leftChoice = q.choiceA;
    let rightChoice = q.choiceB;
    let ans: 'LEFT' | 'RIGHT' = q.ans === 'B' ? 'RIGHT' : 'LEFT';
    if (q.ans === 'C' || q.ans === 'D') {
      leftChoice = q.choiceC;
      rightChoice = q.choiceD;
      ans = q.ans === 'D' ? 'RIGHT' : 'LEFT';
    }
    return {
      youtubeId: 'M7lc1UVf-VE',
      title: `คำถามทบทวนหัวข้อที่ ${idx + 1}`,
      questions: [
        {
          q: q.q,
          leftChoice,
          rightChoice,
          ans,
          explanation: q.explanation || "เก่งมาก! เป็นคำตอบที่ถูกต้อง"
        }
      ]
    };
  });

  if (segments.length === 0) {
    segments.push({
      youtubeId: 'M7lc1UVf-VE',
      title: 'แนะนำบทเรียนเบื้องต้น',
      questions: [
        {
          q: 'วิทยาศาสตร์คือการเรียนรู้เกี่ยวกับธรรมชาติ ใช่หรือไม่?',
          leftChoice: 'ใช่',
          rightChoice: 'ไม่ใช่',
          ans: 'LEFT',
          explanation: 'ถูกต้อง! วิทยาศาสตร์คือกระบวนการเรียนรู้และหาคำอธิบายปรากฏการณ์ต่างๆ ในธรรมชาติ'
        }
      ]
    });
  }

  return {
    segments,
    summaryTitle: '💡 สรุปประเด็นสำคัญประจำบทเรียน',
    summaryItems: [
      'ทบทวนบทเรียนผ่านคลิปและการตอบคำถาม',
      'เรียนรู้แนวคิดหลักเพื่อเตรียมทำแบบทดสอบหลังเรียน'
    ]
  };
}

export default function InteractiveVideoPlayer({ 
  onClose, 
  initialSegmentIndex = 0,
  grade = 'p4',
  chapterId = 'chapter3',
  summaryTitle,
  summaryItems,
  title
}: Props) {
  const lessonData = getInteractiveLessonData(grade, chapterId);
  const activeSummaryTitle = summaryTitle || lessonData.summaryTitle;
  const activeSummaryItems = summaryItems || lessonData.summaryItems;
  
  const isMath = title?.includes('คณิตศาสตร์');
  const themeColor = isMath ? 'text-fuchsia-500 dark:text-fuchsia-400' : 'text-emerald-500 dark:text-emerald-400';
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const holdFramesRef = useRef({ LEFT: 0, RIGHT: 0 });
  const isProcessingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [modalStage, setModalStage] = useState<'PLAYING_VIDEO' | 'PREPARE_QUIZ' | 'PLAYING_QUIZ' | 'SHOW_EXPLANATION' | 'SUMMARY'>('PLAYING_VIDEO');
  const [prepareCountdown, setPrepareCountdown] = useState(3);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(initialSegmentIndex);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lockedChoice, setLockedChoice] = useState<'LEFT' | 'RIGHT' | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSegment = lessonData.segments[currentSegmentIndex];
  const currentQData = currentSegment?.questions[currentQuestionIndex];
  const [score, setScore] = useState(0);

  // คำนวณจำนวนข้อทั้งหมดด้วย useMemo (ไม่ต้องใช้ useEffect + setState)
  const totalQuestionsCount = useMemo(() =>
    lessonData.segments.reduce((sum, seg) => sum + seg.questions.length, 0),
    [lessonData.segments]
  );

  // 1. โหลด YouTube Iframe Player API
  useEffect(() => {
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    const prevCallback = (window as any).onYouTubeIframeAPIReady;
    (window as any).onYouTubeIframeAPIReady = () => {
      if (prevCallback) prevCallback();
      setIsApiLoaded(true);
    };

    if ((window as any).YT && (window as any).YT.Player) {
      setIsApiLoaded(true);
    }

    return () => {
      (window as any).onYouTubeIframeAPIReady = prevCallback;
    };
  }, []);

  // 2. ควบคุมเครื่องเล่นวิดีโอ YouTube
  useEffect(() => {
    if (!isApiLoaded || modalStage !== 'PLAYING_VIDEO' || !currentSegment) return;

    let player: YTPlayer | null = null;
    const playerDivId = `yt-player-${currentSegmentIndex}`;

    // ดีเลย์นิดหน่อยให้ Div มั่นใจว่าเรนเดอร์ใน DOM แล้ว
    const timer = setTimeout(() => {
      try {
        player = new (window as any).YT.Player(playerDivId, {
          height: '100%',
          width: '100%',
          videoId: currentSegment.youtubeId,
          playerVars: {
            autoplay: 1,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            showinfo: 0
          },
          events: {
            onStateChange: (event: { data: number }) => {
              // state 0 คือ ENDED
              if (event.data === 0) {
                handleVideoEnd();
              }
            }
          }
        });
      } catch (err) {
        console.error('Failed to initialize YouTube Player:', err);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (player && typeof player.destroy === 'function') {
        try {
          player.destroy();
        } catch (e) {}
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApiLoaded, currentSegmentIndex, modalStage]);

  // 3. โหลด Hand Landmarker สำหรับตรวจจับทิศทางมือ
  useEffect(() => {
    getHandLandmarker(1)
      .then(setHandLandmarker)
      .catch((err) => console.error('Failed to initialize MediaPipe HandLandmarker:', err));
  }, []);

  // 3.1 ฟัง์ชันควบคุมหน้าจอเต็มจอ (Fullscreen)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('Failed to enter fullscreen:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  const handleClose = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    onClose();
  };

  // 4. ตรวจจับตำหน่งมือ
  useEffect(() => {
    if (modalStage !== 'PLAYING_QUIZ' || !handLandmarker) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const HOLD_THRESHOLD = 18; // เฟรมที่ต้องค้างไว้่อนจะตอบ

    const detect = () => {
      if (webcamRef.current && webcamRef.current.video && webcamRef.current.video.readyState === 4 && !isProcessingRef.current) {
        const video = webcamRef.current.video;
        const result = handLandmarker.detectForVideo(video, performance.now());
        const canvas = canvasRef.current;

        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // วาดเส้นบ่งหน้าจอซ้าย/ขวา
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 4;
            ctx.setLineDash([10, 15]);
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.35, 0);
            ctx.lineTo(canvas.width * 0.35, canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(canvas.width * 0.65, 0);
            ctx.lineTo(canvas.width * 0.65, canvas.height);
            ctx.stroke();
            ctx.setLineDash([]);

            if (result.landmarks && result.landmarks.length > 0) {
              const hand = result.landmarks[0];
              const mcp = hand[9]; // จุดศูนย์ลาง่ามือ
              const xRatio = 1 - mcp.x; // ระจเงา (สะท้อนน X)
              const yRatio = mcp.y;
              const x = xRatio * canvas.width;
              const y = yRatio * canvas.height;

              let detectedZone: 'LEFT' | 'RIGHT' | null = null;
              if (xRatio < 0.35) detectedZone = 'LEFT';
              else if (xRatio > 0.65) detectedZone = 'RIGHT';

              ctx.fillStyle = detectedZone ? '#22c55e' : '#ffffff';
              ctx.beginPath();
              ctx.arc(x, y, 10, 0, 2 * Math.PI);
              ctx.fill();

              // วาดวงลมสะท้อนเวลาที่ค้างไว้
              if (detectedZone === 'LEFT') {
                holdFramesRef.current.LEFT++;
                holdFramesRef.current.RIGHT = 0;
                const progress = holdFramesRef.current.LEFT / HOLD_THRESHOLD;
                drawProgressRing(ctx, x, y, progress, '#06b6d4');
                if (holdFramesRef.current.LEFT >= HOLD_THRESHOLD) {
                  triggerChoice('LEFT');
                }
              } else if (detectedZone === 'RIGHT') {
                holdFramesRef.current.RIGHT++;
                holdFramesRef.current.LEFT = 0;
                const progress = holdFramesRef.current.RIGHT / HOLD_THRESHOLD;
                drawProgressRing(ctx, x, y, progress, '#ec4899');
                if (holdFramesRef.current.RIGHT >= HOLD_THRESHOLD) {
                  triggerChoice('RIGHT');
                }
              } else {
                holdFramesRef.current.LEFT = 0;
                holdFramesRef.current.RIGHT = 0;
                ctx.beginPath();
                ctx.arc(x, y, 35, 0, 2 * Math.PI);
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
                ctx.lineWidth = 4;
                ctx.stroke();
              }
            }
          }
        }
      }
      animationFrameRef.current = requestAnimationFrame(detect);
    };

    detect();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [handLandmarker, modalStage]);

  const drawProgressRing = (ctx: CanvasRenderingContext2D, x: number, y: number, progress: number, color: string) => {
    ctx.beginPath();
    ctx.arc(x, y, 35, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * Math.min(1, progress));
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const triggerChoice = (choice: 'LEFT' | 'RIGHT') => {
    isProcessingRef.current = true;
    setLockedChoice(choice);

    const correctChoice = currentQData?.ans;
    const isCorrect = choice === correctChoice;
    if (isCorrect) setScore(prev => prev + 1);
    setIsAnswerCorrect(isCorrect);

    setTimeout(() => {
      setModalStage('SHOW_EXPLANATION');
      isProcessingRef.current = false;
      holdFramesRef.current = { LEFT: 0, RIGHT: 0 };
    }, 600);
  };

  const handleVideoEnd = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setLockedChoice(null);
    setIsAnswerCorrect(null);
    if (currentSegment && currentSegment.questions.length > 0) {
      setPrepareCountdown(3);
      setModalStage('PREPARE_QUIZ');
    } else {
      const isLastSegment = currentSegmentIndex + 1 >= lessonData.segments.length;
      if (!isLastSegment) {
        setCurrentSegmentIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
        setModalStage('PLAYING_VIDEO');
      } else {
        setModalStage('SUMMARY');
      }
    }
  };

  const handleNext = () => {
    const isLastQuestionOfSegment = currentQuestionIndex + 1 >= currentSegment.questions.length;
    
    if (!isLastQuestionOfSegment) {
      // ไปคำถามข้อถัดไปในคลิปเดิม
      setCurrentQuestionIndex(prev => prev + 1);
      setLockedChoice(null);
      setIsAnswerCorrect(null);
      setPrepareCountdown(3);
      setModalStage('PREPARE_QUIZ');
    } else {
      // คำถามในคลิปนี้หมดล้ว ไปวิดีโอ segment ถัดไป
      const isLastSegment = currentSegmentIndex + 1 >= lessonData.segments.length;
      if (!isLastSegment) {
        setCurrentSegmentIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
        setLockedChoice(null);
        setIsAnswerCorrect(null);
        setModalStage('PLAYING_VIDEO');
      } else {
        // จบทุวิดีโอละทุคำถามล้ว ไปหน้าสรุป
        setModalStage('SUMMARY');
      }
    }
  };

  // นับถอยหลังเตรียมตัว 3 วินาที (ใช้ setTimeout recursive แทน setInterval เพื่อความแม่นยำ)
  useEffect(() => {
    if (modalStage !== 'PREPARE_QUIZ') return;
    let cancelled = false;

    const tick = (remaining: number) => {
      if (cancelled) return;
      if (remaining <= 0) {
        setModalStage('PLAYING_QUIZ');
        return;
      }
      setPrepareCountdown(remaining);
      setTimeout(() => tick(remaining - 1), 1000);
    };

    tick(prepareCountdown);
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalStage, currentSegmentIndex, currentQuestionIndex]);

  // นับถอยหลัง 60 วินาทีสำหรับข้ามไปคลิปถัดไปในหน้าเฉลย (ใช้ setTimeout recursive)
  useEffect(() => {
    if (modalStage !== 'SHOW_EXPLANATION') {
      setCountdown(60);
      setIsTimerActive(true);
      return;
    }

    if (!isTimerActive) return;
    let cancelled = false;

    const tick = (remaining: number) => {
      if (cancelled || !isTimerActive) return;
      if (remaining <= 0) {
        handleNext();
        return;
      }
      setCountdown(remaining);
      setTimeout(() => tick(remaining - 1), 1000);
    };

    tick(countdown);
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalStage, currentSegmentIndex, currentQuestionIndex, isTimerActive]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
      {/* ม่านพื้นหลังดำโปร่งใส */}
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md cursor-default"></div>

      {/* หน้าต่างหลั (ขยายขนาดเป็น max-w-7xl ละความสูงเป็น h-[90vh] max-h-[850px]) */}
      <div className="relative w-full max-w-7xl bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 rounded-[2.5rem] shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] overflow-hidden z-10 flex flex-col h-[90vh] max-h-[850px]">
        
        {/* Header บาร์ */}
        <div className="flex items-center justify-between p-6 border-b-4 border-slate-900 dark:border-slate-700 bg-white dark:bg-slate-900 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <Video className={themeColor} size={24} />
            <h3 className="font-black text-slate-900 dark:text-white text-lg sm:text-xl">
              {title || `บทเรียนอัจฉริยะ ป.4: สสารและการเปลี่ยนแปลง`}
            </h3>
          </div>
          <button onClick={handleClose} className="text-slate-900 dark:text-slate-400 hover:text-white bg-white dark:bg-slate-800 hover:bg-rose-500 dark:hover:bg-rose-500 border-2 border-slate-900 dark:border-slate-700 p-2.5 rounded-full shadow-[2px_2px_0_0_#000000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            <X size={20} />
          </button>
        </div>

        {/* ส่วนสดงเนื้อหา/ารเล่น */}
        <div className="flex-grow relative bg-slate-950 overflow-hidden flex flex-col items-center justify-center">
          
          {/* ===================== STAGE 1: PLAYING VIDEO ===================== */}
          {modalStage === 'PLAYING_VIDEO' && currentSegment && (
            <div className="absolute inset-0 flex flex-col bg-slate-950" ref={playerContainerRef}>
              {/* ถบหัวข้อย่อยด้านบน */}
              <div className="absolute top-4 inset-x-6 z-10 flex justify-between items-center pointer-events-none">
                <div className="bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-2 rounded-full text-sm font-black shadow-[2px_2px_0_0_#000000]">
                  {currentSegment.title}
                </div>
                <div className="flex items-center gap-3 pointer-events-auto">
                  <button
                    onClick={toggleFullscreen}
                    className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-slate-900 dark:border-slate-700 px-4 py-2 rounded-full text-sm font-bold shadow-[2px_2px_0_0_#000000] active:translate-y-[2px] active:shadow-none flex items-center gap-1.5 transition-all"
                  >
                    {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                    {isFullscreen ? 'ย่อหน้าจอ' : 'ขยายเต็มจอ'}
                  </button>
                  <button
                    onClick={handleVideoEnd}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 border-2 border-slate-900 px-5 py-2 rounded-full text-sm font-black shadow-[2px_2px_0_0_#000000] active:translate-y-[2px] active:shadow-none flex items-center gap-1.5 transition-all"
                  >
                    {currentSegment.questions.length > 0 ? 'ข้ามวิดีโอไปตอบคำถาม' : 'ข้ามวิดีโอ'} <FastForward size={16} />
                  </button>
                </div>
              </div>

              {/* วิดีโอ YouTube */}
              <div className="flex-grow w-full h-full relative">
                <div id={`yt-player-${currentSegmentIndex}`} className="w-full h-full"></div>
              </div>
            </div>
          )}

          {/* ===================== STAGE 2: PREPARE & PLAYING QUIZ ===================== */}
          {(modalStage === 'PREPARE_QUIZ' || modalStage === 'PLAYING_QUIZ') && currentQData && (
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
              {/* กล้องเว็บแคมสำหรับตอบ */}
              <div className="absolute inset-0 w-full h-full">
                <Webcam
                  ref={webcamRef}
                  mirrored={true}
                  className="w-full h-full object-cover opacity-60"
                  videoConstraints={{ facingMode: 'user' }}
                  onUserMedia={() => setIsCameraActive(true)}
                  onUserMediaError={() => setIsCameraActive(false)}
                />
                {modalStage === 'PLAYING_QUIZ' && (
                  <canvas ref={canvasRef} width={1280} height={720} className="absolute inset-0 w-full h-full pointer-events-none" />
                )}
              </div>

              {/* ส่วนหัวข้อคำถาม */}
              <div className="absolute top-4 inset-x-6 z-20 flex justify-between items-center pointer-events-none">
                <div className="bg-indigo-600 border-2 border-indigo-400 text-white px-5 py-2 rounded-full text-sm font-black shadow-lg">
                  คำถามข้อที่ {currentQuestionIndex + 1}
                </div>
                {!isCameraActive && (
                  <div className="bg-rose-500 border border-rose-300 text-white px-5 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
                    <Camera size={14} /> กำลังเปิดกล้องเพื่อตรวจจับมือ...
                  </div>
                )}
              </div>

              {modalStage === 'PREPARE_QUIZ' ? (
                /* หน้าเตรียมตัว */
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/75 backdrop-blur-md z-30 select-none">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="relative overflow-hidden bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-10 rounded-[2.5rem] shadow-[8px_8px_0_0_#f59e0b] flex flex-col items-center justify-center text-center max-w-md w-full mx-4"
                  >
                    {/* Dotted pattern inside card */}
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

                    <div className="relative z-10 w-20 h-20 bg-amber-300 border-4 border-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-[4px_4px_0_0_#000000]">
                      <Hand size={42} strokeWidth={2.5} className="text-slate-900" />
                    </div>
                    <h2 className="relative z-10 text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">เตรียมยกมือตอบ!</h2>
                    <p className="relative z-10 text-slate-600 dark:text-slate-400 font-bold text-sm mb-8 max-w-[280px] leading-relaxed">
                      ยกฝ่ามือขึ้นมาในตำแหน่งกล้อง เพื่อเตรียมควบคุมตัวเลือกตอบ
                    </p>
                    <div className="relative z-10 h-28 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={prepareCountdown}
                          initial={{ scale: 0.3, opacity: 0 }}
                          animate={{ scale: 1.1, opacity: 1 }}
                          exit={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="text-8xl font-black text-amber-400 font-sans drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                        >
                          {prepareCountdown}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              ) : (
                /* หน้าเล่นคำถามจริง */
                <>
                  {/* ขยายขนาดล่องโจทย์คำถามลางหน้าจอ (w-[850px], padding เพิ่มขึ้น ละ text size ให่ขึ้น) */}
                  <div className="absolute top-[18%] left-1/2 -translate-x-1/2 bg-white dark:bg-slate-900 border-4 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0_0_#f59e0b] p-8 md:p-10 rounded-[2rem] max-w-[95%] w-[850px] text-center z-20 select-none overflow-hidden">
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:20px_20px] opacity-35 pointer-events-none" />
                    <h2 className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-relaxed">
                      {currentQData.q}
                    </h2>
                  </div>

                  {/* ขยายขนาดปุ่มช้อยส์สองฝั่งสำหรับเล่นแบบชูมือ (เพิ่มขนาดฟอนต์/กล่อง และ shadow สไตล์ Neo-brutalism) */}
                  <div className="absolute inset-x-8 bottom-[10%] flex gap-8 z-20 w-[90%] max-w-5xl justify-center items-stretch select-none">
                    {/* ปุ่มช้อยส์ซ้าย */}
                    <div
                      className={`relative flex-1 bg-cyan-400 dark:bg-cyan-500 border-4 border-slate-900 p-8 rounded-[2rem] flex flex-col justify-center items-center text-center shadow-[8px_8px_0_0_#000000] dark:shadow-[8px_8px_0_0_#000000] transition-all min-h-[180px] ${
                        lockedChoice === 'LEFT' ? 'scale-105 -translate-y-2 border-white dark:border-white shadow-[12px_12px_0_0_#06b6d4]' : ''
                      }`}
                    >
                      <span className="absolute -top-4 left-6 bg-cyan-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-slate-900">
                        👈 ยกมือฝั่งซ้ายตอบ
                      </span>
                      <span className="text-xl sm:text-2xl md:text-3xl font-black leading-snug">
                        {currentQData.leftChoice}
                      </span>
                    </div>

                    {/* ปุ่มช้อยส์ขวา */}
                    <div
                      className={`relative flex-1 bg-pink-400 dark:bg-pink-500 border-4 border-slate-900 p-8 rounded-[2rem] flex flex-col justify-center items-center text-center shadow-[8px_8px_0_0_#000000] dark:shadow-[8px_8px_0_0_#000000] transition-all min-h-[180px] ${
                        lockedChoice === 'RIGHT' ? 'scale-105 -translate-y-2 border-white dark:border-white shadow-[12px_12px_0_0_#ec4899]' : ''
                      }`}
                    >
                      <span className="absolute -top-4 right-6 bg-pink-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border border-slate-900">
                        ยกมือฝั่งขวาตอบ 👉
                      </span>
                      <span className="text-xl sm:text-2xl md:text-3xl font-black leading-snug">
                        {currentQData.rightChoice}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ===================== STAGE 3: SHOW EXPLANATION ===================== */}
          {modalStage === 'SHOW_EXPLANATION' && currentQData && (
            <div className="absolute inset-0 flex items-center justify-center p-6 bg-slate-950/90 z-30 select-none">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative overflow-hidden bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 md:p-10 rounded-[2.5rem] shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] max-w-3xl w-full flex flex-col items-center text-center"
              >
                {/* Dotted pattern inside explanation card */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(#CBD5E1_2px,transparent_2px)] dark:bg-[radial-gradient(#334155_2px,transparent_2px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

                {/* ไอคอนผลลัพธ์ */}
                {isAnswerCorrect ? (
                  <div className="relative z-10 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-5 border-4 border-slate-900 shadow-[4px_4px_0_0_#000000]">
                    <CheckCircle2 size={48} className="text-white" />
                  </div>
                ) : (
                  <div className="relative z-10 w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mb-5 border-4 border-slate-900 shadow-[4px_4px_0_0_#000000]">
                    <XCircle size={48} className="text-white" />
                  </div>
                )}

                <h2 className={`relative z-10 text-2xl md:text-3xl font-black mb-4 ${isAnswerCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {isAnswerCorrect ? 'คำตอบถูก! ✅' : 'คำตอบผิด! ❌'}
                </h2>

                {/* โจทย์และเฉลยคำอธิบาย */}
                <div className="relative z-10 bg-slate-50 dark:bg-slate-950 rounded-[1.5rem] p-6 border-4 border-slate-900 dark:border-slate-800 text-left w-full mb-6 max-h-[220px] overflow-y-auto">
                  <p className="text-slate-500 dark:text-slate-400 font-black text-sm mb-3">คำถาม: {currentQData.q}</p>
                  <p className="text-emerald-700 dark:text-emerald-300 font-black text-lg leading-relaxed">
                    {currentQData.explanation}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full font-sans">
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl font-black text-xl border-4 border-slate-950 flex items-center justify-center gap-2 active:translate-y-[4px] active:shadow-none hover:-translate-y-[2px] transition-all shadow-[4px_4px_0_0_#000000]"
                  >
                    ไปยังเนื้อหาถัดไป {isTimerActive ? `(${countdown} วินาที)` : '(หยุดเวลาอยู่)'} <ChevronRight size={22} />
                  </button>
                  <button
                    onClick={() => setIsTimerActive(!isTimerActive)}
                    className="w-full sm:w-auto px-6 py-4 bg-white dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-600 rounded-2xl font-black text-lg border-4 border-slate-900 flex items-center justify-center gap-2 active:translate-y-[4px] active:shadow-none hover:-translate-y-[2px] transition-all shadow-[4px_4px_0_0_#000000]"
                  >
                    {isTimerActive ? <Pause size={20} /> : <Play size={20} />}
                    {isTimerActive ? 'หยุดเวลา' : 'เล่นต่อ'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* ===================== STAGE 4: SUMMARY SCREEN ===================== */}
          {modalStage === 'SUMMARY' && (
            <div className="absolute inset-0 flex items-center justify-center p-6 bg-slate-950/90 z-30 select-none">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-slate-800 border-4 border-slate-900 dark:border-slate-700 p-8 md:p-10 rounded-[2.5rem] shadow-[8px_8px_0_0_#0F172A] dark:shadow-[8px_8px_0_0_#000000] max-w-2xl w-full text-center"
              >
                <div className="w-24 h-24 bg-amber-300 border-4 border-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0_0_#000000]">
                  <Trophy size={56} className="text-slate-900" />
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">ยินดีด้วย! ผ่านการเรียนรู้แล้ว</h1>
                <p className="text-cyan-600 dark:text-cyan-400 text-xl font-black mb-6">คุณได้คะแนนกิจกรรมตอบคำถาม {score} / {totalQuestionsCount} คะแนน</p>

                {/* กล่องสรุปคำสำคัญ */}
                <div className="bg-slate-50 dark:bg-slate-950 border-4 border-slate-900 dark:border-slate-800 rounded-[2rem] p-6 text-left mb-8 shadow-[4px_4px_0_0_#000000]">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="text-amber-500" size={20} />
                    <h3 className="font-black text-slate-900 dark:text-white text-lg">{activeSummaryTitle}</h3>
                  </div>
                  <div className="space-y-3.5 text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300">
                    {activeSummaryItems.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 bg-white dark:bg-slate-900 p-3 rounded-xl border-2 border-slate-900 dark:border-slate-800">
                        <span className="text-amber-500 shrink-0">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black text-xl border-4 border-slate-950 flex items-center justify-center gap-2 active:translate-y-[4px] active:shadow-none hover:-translate-y-[2px] transition-all shadow-[4px_4px_0_0_#000000] mx-auto"
                >
                  เสร็จสิ้นกิจกรรมหลัก
                </button>
              </motion.div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
