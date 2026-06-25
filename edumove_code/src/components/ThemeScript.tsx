// src/components/ThemeScript.tsx
export default function ThemeScript() {
  const code = `
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
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}