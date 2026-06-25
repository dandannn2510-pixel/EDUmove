import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SciLab Classroom",
  description: "แพลตฟอร์มการเรียนรู้วิทยาศาสตร์และคณิตศาสตร์",
  manifest: "/manifest.json",
};

const themeInitScript = `
(function () {
  try {
    var raw = localStorage.getItem('scilab-theme');
    var theme = null;
    if (raw) {
      var parsed = JSON.parse(raw);
      theme = parsed && parsed.state && parsed.state.theme;
    }
    if (!theme) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Navbar />
        <div className="h-20 w-full shrink-0" />
        {children}
      </body>
    </html>
  );
}
