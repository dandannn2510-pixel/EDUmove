import type { Metadata } from "next";
import localFont from "next/font/local";
import { Prompt } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

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

const prompt = Prompt({
  subsets: ['thai', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-prompt',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'EDUmove | วิทยาศาสตร์ & คณิตศาสตร์ ป.4-6',
    template: '%s | EDUmove',
  },
  description: 'แพลตฟอร์มการเรียนรู้วิทยาศาสตร์และคณิตศาสตร์ระดับประถมศึกษา ป.4-6 ด้วยระบบ AI กล้องตรวจจับท่าทาง',
  manifest: '/manifest.json',
  keywords: ['วิทยาศาสตร์', 'คณิตศาสตร์', 'ประถมศึกษา', 'ป.4', 'ป.5', 'ป.6', 'O-NET', 'EDUmove', 'AI classroom'],
  authors: [{ name: 'EDUmove Project' }],
  openGraph: {
    title: 'EDUmove | วิทยาศาสตร์ & คณิตศาสตร์',
    description: 'เรียนสนุกด้วย AI กล้อง — สำหรับนักเรียน ป.4-6',
    locale: 'th_TH',
    type: 'website',
  },
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
        className={`${geistSans.variable} ${geistMono.variable} ${prompt.variable} min-h-screen antialiased bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ScrollToTop />
        <Navbar />
        <div className="h-20 w-full shrink-0" />
        {children}
      </body>
    </html>
  );
}
