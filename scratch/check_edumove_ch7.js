const fs = require('fs');
const content = fs.readFileSync('edumove_code/src/data/allQuestions.ts', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
  if (line.includes('chapter7') || line.includes('ไฟฟ้าสถิต') || line.includes('บทที่ 7')) {
    console.log(`${index + 1}: ${line.trim()}`);
  }
});
