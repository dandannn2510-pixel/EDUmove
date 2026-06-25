const fs = require('fs');

const file = 'edumove_code/src/data/allQuestions.ts';
if (fs.existsSync(file)) {
  const buf = fs.readFileSync(file);
  let hasCorrupt = false;
  for (let i = 0; i < buf.length - 1; i++) {
    if (buf[i] === 0x27 && buf[i+1] === 0xad) {
      console.log(`Found corrupt sequence 0x27 0xad at byte offset ${i}`);
      hasCorrupt = true;
    }
  }
  if (!hasCorrupt) {
    console.log("No corrupt sequence 0x27 0xad found in edumove_code version.");
  }
} else {
  console.log("File does not exist.");
}
