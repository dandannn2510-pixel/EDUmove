const fs = require('fs');

const file = 'src/app/lessons/[grade]/[chapter]/[difficulty]/page.tsx';
if (fs.existsSync(file)) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.includes('allQuestions')) {
      console.log(`${index + 1}: ${line.trim()}`);
    }
  });
} else {
  console.log("File not found");
}
