'use client';
import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // ดักจับระบบเบราว์เซอร์ เมื่อพร้อมให้ติดตั้งแอป
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault(); // ป้องกันไม่ให้เบราว์เซอร์เด้งหน้าต่างเอง
      setDeferredPrompt(e); // เก็บ Event ไว้ให้ปุ่มของเรากด
      setIsReady(true); // โชว์ปุ่มลอยของเราขึ้นมา
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // พอคนกดปุ่ม ให้โชว์หน้าต่างยืนยันการติดตั้ง
    deferredPrompt.prompt(); 
    
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsReady(false); // ถ้ากดติดตั้งสำเร็จ ให้ซ่อนปุ่มนี้ทิ้งไปเลย
    }
    setDeferredPrompt(null);
  };

  // ถ้าเครื่องนี้ติดตั้งแล้ว หรือระบบยังไม่พร้อม จะไม่โชว์ปุ่มให้เกะกะ
  if (!isReady) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-6 left-6 z-[100] flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3.5 rounded-full shadow-[0_10px_30px_rgba(79,70,229,0.5)] font-black text-sm sm:text-base border-2 border-white/20 hover:scale-105 active:scale-95 transition-all animate-bounce"
    >
      <Download size={24} className="animate-pulse" />
      ติดตั้งแอปลงเครื่อง
    </button>
  );
}