const fs = require('fs');
const content = fs.readFileSync('app/src/App.tsx', 'utf8');
const matches = content.match(/['"][^'"]*assets\/[^'"]*['"]/g);
console.log('Matches:', matches);
