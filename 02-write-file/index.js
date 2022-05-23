const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const readLine = readline.createInterface({ input, output });
const writenStream = fs.createWriteStream(path.join(__dirname, 'text.txt'), 'utf8');

console.log('\nВведите тескт для записи в файл. Для выхода нажмите Ctrl+C или введите exit. \n');

process.on('exit', () => {
  console.log('\nТекст записан в файл.\n');
});

readLine.on('line', (line) => {
  if (line.toLowerCase() == 'exit') {
    readLine.close();
  } else {
    writenStream.write(line + '\n');
  }
});
