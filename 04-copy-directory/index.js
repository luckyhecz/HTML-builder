const fs = require('fs');
const path = require('path');
const direction =  path.resolve('04-copy-directory', 'files-copy');
const source =  path.resolve('04-copy-directory', 'files');
const fsPromises = require('fs/promises');


fs.mkdir(direction, { recursive: true }, err => {
  if(err) throw err;
});
async function copyDir()
{
  try {
    const files = await fsPromises.readdir('04-copy-directory/files-copy', {withFileTypes: true});
    for (let file of files) {
      fs.unlink(`04-copy-directory/files-copy/${file.name}`, function(err) {
        if (err) {
          console.log(err);
        } 
        else {
          console.log(`${file.name} deleted`);
        }
      });
    }
    const newFiles = await fsPromises.readdir('04-copy-directory/files', {withFileTypes: true});
    for (const newFile of newFiles) {
      if (newFile.isFile()) {
        fs.copyFile(`04-copy-directory/files/${newFile.name}`, `04-copy-directory/files-copy/${newFile.name}`, (err) => {
          if (err) {
            console.log('Error Found:', err);
          }
          else {
            console.log(`${newFile.name} created`);   
          }    
        });
      }
    }
  } catch(err) {
      console.log((err)); 
    }
}
copyDir();
