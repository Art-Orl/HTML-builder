
const { readdir } = require('fs/promises');

const path = require('path');

const { stat } = require('fs');

const filePath = path.join(__dirname, '/secret-folder');

(async () =>{
  const files = await readdir(filePath,{withFileTypes: true});
  for await (const file of files){
    
    if(file.isFile()){
      let f = `${filePath}\\${file.name}`;
      stat(f, (error,stats) =>{
        console.log(file.name, '-', path.extname(file.name).replace('.', ''), '-', `${stats.size}B`);
      });
    }
  }
})();
