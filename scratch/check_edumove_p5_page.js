const fs = require('fs');
const file = 'edumove_code/src/app/lessons/p5/page.tsx';
if (fs.existsSync(file)) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.includes('chapter') || line.includes('Link href') || line.includes('h3')) {
      console.log(`${index + 1}: ${line.trim()}`);
    }
  });
} else {
  console.log("edumove_code/src/app/lessons/p5/page.tsx does not exist.");
}
