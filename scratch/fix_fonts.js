const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = [];
  fs.readdirSync(dir).forEach(f => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) files.push(...walk(full));
    else if (f.endsWith('.tsx') || f.endsWith('.ts')) files.push(full);
  });
  return files;
}

const OLD = "'Prompt', sans-serif";
const NEW = "var(--font-prompt), sans-serif";

let fixedCount = 0;
walk('src').forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes(OLD)) {
    const fixed = content.split(OLD).join(NEW);
    fs.writeFileSync(file, fixed, 'utf8');
    const count = (content.split(OLD).length - 1);
    console.log(`Fixed (${count}x): ${path.relative('.', file)}`);
    fixedCount++;
  }
});
console.log('Total files fixed:', fixedCount);
