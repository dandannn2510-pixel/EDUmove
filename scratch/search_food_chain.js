const fs = require('fs');

const files = ['src/data/allQuestions.ts', 'edumove_code/src/data/allQuestions.ts'];
files.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('โซ่อาหาร')) {
      console.log(`Found โซ่อาหาร in ${file}`);
    } else {
      console.log(`NOT found โซ่อาหาร in ${file}`);
    }
  }
});
