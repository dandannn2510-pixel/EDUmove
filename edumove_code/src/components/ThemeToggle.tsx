'use client';

import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from './themeStore';

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
      className={`relative flex h-8 w-14 shrink-0 items-center rounded-full border p-1 transition-colors duration-300 ${
        isDark
          ? 'justify-end border-slate-600 bg-slate-700'
          : 'justify-start border-slate-200 bg-slate-100'
      }`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full shadow-sm transition-colors duration-300 ${
          isDark ? 'bg-slate-500 text-white' : 'bg-white text-slate-600'
        }`}
      >
        {isDark ? <Moon size={13} /> : <Sun size={13} />}
      </span>
    </button>
  );
}
