import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // <--- สวิตช์เปิดโหมดมืด (Dark Mode) อยู่ตรงนี้ครับ!
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;