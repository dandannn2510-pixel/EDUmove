const fs = require('fs');
const path = require('path');

const cleanFileRegex = (filename) => {
  const filePath = path.join(__dirname, 'src', 'app', 'lessons', filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to remove "N: " or "N:  " inside h3 tags
  // Example: <h3 className="...">7: ไฟฟ้าสถิต</h3> -> <h3 className="...">ไฟฟ้าสถิต</h3>
  content = content.replace(/(<h3[^>]*>)\s*(?:\d+:)?\s*([^<]+)(<\/h3>)/g, (match, openTag, text, closeTag) => {
    return openTag + text.trim() + closeTag;
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Regex cleaned ${filename}`);
};

cleanFileRegex('p4/page.tsx');
cleanFileRegex('p5/page.tsx');
cleanFileRegex('p6/page.tsx');
