const fs = require('fs');

const file1 = 'src/data/allQuestions.ts';
const file2 = 'edumove_code/src/data/allQuestions.ts';

if (fs.existsSync(file1) && fs.existsSync(file2)) {
  const src = fs.readFileSync(file1, 'utf8');
  const backup = fs.readFileSync(file2, 'utf8');
  
  const ch7Start = src.indexOf('    chapter7: {');
  // Find where it ends before ป.6 starts
  const p6Section = '  // ==================== ป.6 ====================';
  const ch7End = src.indexOf(p6Section);
  
  if (ch7Start === -1 || ch7End === -1) {
    console.error("Error: chapter7 or p6 section not found in src file");
    process.exit(1);
  }
  
  let ch7Block = src.substring(ch7Start, ch7End).trim();
  // The block ends with the closing of chapter7, which is followed by closing of p4.
  // The block in src is:
  //     chapter7: {
  //       ...
  //       ]
  //     }
  //   }
  // We want to keep the closing brace for chapter7 but drop the one for p4.
  // Let's find the last '}' that closes chapter7.
  // Let's check how many trailing closing braces are there.
  console.log("Extracted raw block tail:\n" + ch7Block.substring(ch7Block.length - 100));
  
  // Let's clean up the block so it only contains chapter7: { ... }
  // The block should end with two closing braces (one for posttest, one for chapter7):
  //       ]
  //     }
  //   }
  // Let's verify:
  const lastIndex = ch7Block.lastIndexOf('}');
  const secondLastIndex = ch7Block.lastIndexOf('}', lastIndex - 1);
  const thirdLastIndex = ch7Block.lastIndexOf('}', secondLastIndex - 1);
  
  // We want to slice up to the second last index of '}' (inclusive) to get the chapter7 block.
  // Wait, let's see. The structure is:
  // chapter7: {
  //   pretest: { ... },
  //   posttest: { ... }
  // }
  // So it ends with:
  //       ]
  //     }
  //   }
  // Let's slice up to thirdLastIndex or secondLastIndex depending on the exact indentation.
  // Let's output these to be sure.
} else {
  console.log("Files not found.");
}
