const fs = require('fs');
const file = 'edumove_code/src/data/allQuestions.ts';
if (fs.existsSync(file)) {
  const content = fs.readFileSync(file, 'utf8')
    .replace(/export interface [\s\S]*?\n}/g, '')
    .replace(/export const allQuestions: [\s\S]*? = {/g, 'const allQuestions = {');
  
  try {
    eval(content + `;
    console.log("allQuestions keys in edumove_code:", Object.keys(allQuestions));
    for (const key of Object.keys(allQuestions)) {
      console.log(key, Object.keys(allQuestions[key] || {}));
    }
    `);
  } catch (e) {
    console.log("Error evaluating edumove_code file:", e.message);
  }
} else {
  console.log("edumove_code/src/data/allQuestions.ts does not exist.");
}
