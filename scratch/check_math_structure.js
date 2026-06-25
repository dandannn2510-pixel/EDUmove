const fs = require('fs');

const file = 'src/app/math-lessons/[level]/[chapter]/[difficulty]/page.tsx';
if (fs.existsSync(file)) {
  const content = fs.readFileSync(file, 'utf8');
  // Match mathQuizData block
  const match = content.match(/const mathQuizData: Record<string, any> = ({[\s\S]*?\n};)/);
  if (match) {
    const dataStr = match[1];
    try {
      eval('const data = ' + dataStr + ' console.log("mathQuizData keys:", Object.keys(data)); for (const level of Object.keys(data)) { console.log(level, Object.keys(data[level])); for (const ch of Object.keys(data[level])) { console.log("  ", ch, Object.keys(data[level][ch])); } }');
    } catch (e) {
      console.log("Error evaluating mathQuizData:", e.message);
    }
  } else {
    console.log("mathQuizData block not found");
  }
} else {
  console.log("Math page file does not exist");
}
