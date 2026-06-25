const fs = require('fs');

const file1 = 'src/data/allQuestions.ts';
const file2 = 'edumove_code/src/data/allQuestions.ts';

if (fs.existsSync(file1) && fs.existsSync(file2)) {
  let src = fs.readFileSync(file1, 'utf8').replace(/\r\n/g, '\n');
  let backup = fs.readFileSync(file2, 'utf8').replace(/\r\n/g, '\n');
  
  const ch7Start = src.indexOf('    chapter7: {');
  const p6Section = '  // ==================== ป.6 ====================';
  const ch7End = src.indexOf(p6Section);
  
  if (ch7Start === -1 || ch7End === -1) {
    console.error("Error: chapter7 or p6 section not found in src file");
    process.exit(1);
  }
  
  let ch7Block = src.substring(ch7Start, ch7End).trim();
  
  // Slice ch7Block so it ends with the closing of chapter7
  const endIdx = ch7Block.lastIndexOf('    }');
  if (endIdx === -1) {
    console.error("Error: Could not find '    }' in ch7Block");
    process.exit(1);
  }
  ch7Block = ch7Block.substring(0, endIdx + 5);
  
  // Find the end of p5 in backup
  const p5EndStr = '    }\n  },\n  // ==================== ป.6 ====================';
  if (!backup.includes(p5EndStr)) {
    console.error("Error: Could not find p5EndStr in backup file");
    process.exit(1);
  }
  
  const replacement = '    },\n' + ch7Block + '\n  },\n  // ==================== ป.6 ====================';
  const result = backup.replace(p5EndStr, replacement);
  
  // Write out with standard LF or let Node handle it (Next.js accepts LF or CRLF)
  fs.writeFileSync('src/data/allQuestions.ts', result, 'utf8');
  console.log("Successfully reconstructed src/data/allQuestions.ts!");
} else {
  console.log("Files not found.");
}
