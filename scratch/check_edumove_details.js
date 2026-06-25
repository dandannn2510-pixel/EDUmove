const fs = require('fs');

const file = 'edumove_code/src/data/allQuestions.ts';
if (fs.existsSync(file)) {
  const content = fs.readFileSync(file, 'utf8')
    .replace(/export interface [\s\S]*?\n}/g, '')
    .replace(/export const allQuestions: [\s\S]*? = {/g, 'const allQuestions = {');
  
  eval(content + `;
  for (const grade of Object.keys(allQuestions)) {
    console.log('=== ' + grade + ' ===');
    for (const ch of Object.keys(allQuestions[grade])) {
      const chap = allQuestions[grade][ch];
      console.log('  ' + ch + ':');
      if (chap.pretest) {
        console.log('    pretest: ' + chap.pretest.title + ' | ' + chap.pretest.chapterTitle + ' | ' + chap.pretest.questions.length + ' Qs');
      } else {
        console.log('    pretest: missing');
      }
      if (chap.posttest) {
        console.log('    posttest: ' + chap.posttest.title + ' | ' + chap.posttest.chapterTitle + ' | ' + chap.posttest.questions.length + ' Qs');
      } else {
        console.log('    posttest: missing');
      }
    }
  }
  `);
} else {
  console.log("File does not exist.");
}
