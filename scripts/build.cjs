const fs = require('node:fs');
const path = require('node:path');
const babel = require('@babel/standalone');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'source/Portfolio.jsx'), 'utf8');
const output = babel.transform(source, { presets: ['react'], minified: true, comments: false }).code;
fs.writeFileSync(path.join(root, 'assets/portfolio.js'), output + '\n');
console.log('Compiled source/Portfolio.jsx → assets/portfolio.js');
