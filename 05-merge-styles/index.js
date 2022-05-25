const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

let pathStyle = path.join(__dirname, 'styles');
let testStyle = path.join(__dirname, 'project-dist', 'bundle.css');

(async () => {
  const styleFiles = await readdir(pathStyle, { withFileTypes: true });
  for await (const file of styleFiles) {
    if (file.isFile() && path.extname(file.name) == '.css') {
      let readableStream = fs.createReadStream(`${pathStyle}\\${file.name}`, 'utf-8');
      readableStream.on('data', (data) => {
        fs.appendFile(testStyle, data, (err) => {
          if (err) console.log(err);
          return;
        });
      });
    }
  }
})();
