const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const  s = path.resolve(__dirname, 'project-dist', 'bundle.css');
const fd = fs.open(s);
let pathStyle = path.join(__dirname, '\\styles');
let testStyle = path.join(__dirname, '\\test.css');

// let arrStyle = []; 

(async () =>{
  const styleFiles = await readdir(pathStyle,{withFileTypes: true});
  for await(const file of styleFiles ){
    if(file.isFile() && path.extname(file.name) == '.css'){
      let readableStream = fs.createReadStream(`${pathStyle}\\${file.name}`, 'utf-8');
      readableStream.on('data', (data) =>{
        console.log(data);
        fs.appendFile(testStyle, data, (err) =>{
          if(err) console.log(err);
          return;        
        });
      }
      );
    }
  }
})();

