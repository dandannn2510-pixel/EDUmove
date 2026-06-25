'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Settings, Palette, Volume2, VolumeX, HelpCircle, ArrowLeft, Home } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  // ใช้เช็คว่าอยู่หน้าไหน และใช้สำหรับกดย้อนกลับ
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-lg transition-colors duration-300 dark:border-slate-800/60 dark:bg-[#0b1120]/70" style={{ fontFamily: "var(--font-prompt), sans-serif" }}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* ฝั่งซ้าย: ปุ่มย้อนกลับ + โลโก้ */}
        <div className="flex items-center gap-3 sm:gap-5">
          {!isHomePage && (
            <button
              onClick={() => router.back()}
              aria-label="ย้อนกลับ"
              className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-slate-200 bg-white/50 text-slate-600 shadow-sm transition-all hover:scale-105 hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-md focus:outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-indigo-500/20 dark:hover:text-indigo-400"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          <Link href="/" className="group flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-2xl">
            {/* 💡 เอากรอบออกแล้ว! และตั้งค่าให้แสดงรูปแบบอิสระ (object-contain) */}
            <div className="shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <img src="/logo.png" alt="edumove logo" className="h-10 w-10 sm:h-12 sm:w-12 object-contain drop-shadow-sm" />
            </div>
            <span className="hidden sm:block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-xl font-bold tracking-tight text-transparent dark:from-blue-400 dark:to-indigo-400">
              edumove
            </span>
          </Link>
        </div>

        {/* ฝั่งขวา: ปุ่มหน้าหลัก + การตั้งค่า */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* ปุ่ม หน้าหลัก (ซ่อนในหน้าโฮม) */}
          {!isHomePage && (
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-3 py-2.5 sm:px-4 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md hover:ring-2 hover:ring-indigo-100 focus-visible:outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:ring-indigo-900/50"
            >
              <Home size={18} className="text-indigo-600 dark:text-indigo-400 transition-transform hover:scale-110" />
              <span className="hidden sm:inline">หน้าหลัก</span>
            </Link>
          )}

          {/* ปุ่ม ตั้งค่า */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="ตั้งค่า"
              className={`flex items-center gap-2 rounded-full border px-3 py-2.5 sm:px-4 text-sm font-semibold shadow-sm transition-all duration-300 focus-visible:outline-none ${
                menuOpen 
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-100 dark:border-indigo-500/50 dark:bg-indigo-500/20 dark:text-indigo-300 dark:ring-indigo-900/50' 
                  : 'border-slate-200 bg-white/50 text-slate-700 hover:bg-white hover:shadow-md hover:ring-2 hover:ring-indigo-100 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Settings size={18} className={`transition-transform duration-500 ${menuOpen ? 'rotate-90' : 'group-hover:rotate-90'}`} />
              <span className="hidden sm:inline">การตั้งค่า</span>
            </button>

            {/* Premium Dropdown Menu */}
            {menuOpen && (
              <div role="menu" className="absolute right-0 mt-3 w-80 origin-top-right rounded-[2rem] border border-slate-200/80 bg-white/90 p-2 shadow-2xl backdrop-blur-xl transition-all dark:border-slate-700/80 dark:bg-slate-800/90">
                <div className="border-b border-slate-100 px-5 pb-4 pt-3 dark:border-slate-700/50">
                  <p className="text-base font-bold text-slate-900 dark:text-white">การตั้งค่าระบบ</p>
                  <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">ปรับแต่งประสบการณ์การเรียนรู้ของคุณ</p>
                </div>

                <div className="mt-2 flex flex-col gap-1 p-1">
                  {/* 1. Theme Toggle */}
                  <div className="flex items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                        <Palette size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">โหมดหน้าจอ</p>
                        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">สลับสว่าง / มืด</p>
                      </div>
                    </div>
                    <ThemeToggle />
                  </div>

                  {/* 2. Sound Toggle */}
                  <button 
                    onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                    className="flex w-full items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${isSoundEnabled ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                        {isSoundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">เสียงประกอบ</p>
                        <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{isSoundEnabled ? 'เปิดใช้งานอยู่' : 'ปิดเสียงแล้ว'}</p>
                      </div>
                    </div>
                    {/* Animated Switch */}
                    <div className={`relative flex h-7 w-12 items-center rounded-full px-1 shadow-inner transition-colors duration-300 ${isSoundEnabled ? 'bg-emerald-500 justify-end' : 'bg-slate-300 dark:bg-slate-600 justify-start'}`}>
                      <div className="h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300"></div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-slate-100 dark:border-slate-700/50"></div>

                  {/* 3. Help / Guide Link */}
                  <Link 
                    href="/guide" 
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                        <HelpCircle size={18} />
                      </div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">คู่มือการใช้งาน (แบบละเอียด)</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}