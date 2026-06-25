const fs = require('fs');

const file1 = 'src/data/allQuestions.ts';
const file2 = 'edumove_code/src/data/allQuestions.ts';

if (fs.existsSync(file1) && fs.existsSync(file2)) {
  const stat1 = fs.statSync(file1);
  const stat2 = fs.statSync(file2);
  console.log(`src/data/allQuestions.ts: ${stat1.size} bytes`);
  console.log(`edumove_code/src/data/allQuestions.ts: ${stat2.size} bytes`);
  
  const content1 = fs.readFileSync(file1, 'utf8');
  const content2 = fs.readFileSync(file2, 'utf8');
  console.log(`src file lines: ${content1.split('\n').length}`);
  console.log(`edumove file lines: ${content2.split('\n').length}`);
} else {
  console.log("One of the files does not exist.");
}
