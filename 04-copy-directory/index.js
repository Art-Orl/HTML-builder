const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '/files');
const filePathCopy = path.join(__dirname, '/files-copy');


fs.mkdir(filePathCopy, { recursive: true }, err => {
  if(err) throw err;  
});

(async () => {
  const files = await readdir(filePath, { withFileTypes: true });
  const filesCopy = await readdir(filePathCopy, { withFileTypes: true });
 
  if(filesCopy.length){
    for (const fileCopy of filesCopy){
      let pathCopy =  `${filePathCopy}\\${fileCopy.name}`;
      fs.unlink(pathCopy, (err) =>{
        if(err) {
          console.log(err);
          return;
        }
      }); 
    }
  }
  for await (const file of files) { 
    if (file.isFile()) {
      let temp = `${filePath}\\${file.name}`;
      let copy = `${filePathCopy}\\${file.name}`;
      fs.copyFile(temp, copy, (err) => {
        if (err) throw err;
      });
    }
  }
})();
