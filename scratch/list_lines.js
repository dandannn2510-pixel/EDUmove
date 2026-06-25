const fs = require('fs');
const lines = fs.readFileSync('src/data/allQuestions.ts', 'utf8').split('\n');
lines.forEach((line, index) => {
  if (line.includes('// ===') || line.includes('p4:') || line.includes('p5:') || line.includes('p6:') || line.includes('chapterTitle:')) {
    console.log(`${index + 1}: ${line.trim()}`);
  }
});
