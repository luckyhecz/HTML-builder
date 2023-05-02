const fs = require('fs');
const path = require('path');

const direction =  path.resolve('03-files-in-folder', 'secret-folder');
fs.readdir(direction, {withFileTypes: true}, function(err, file) { // с {withFileTypes: true} объекты представлены в виде инстанса класса Dirent
  for (let i = 0; i < file.length; i++) {
    if (file[i].isFile() === true) { //dirent.isFile() 
      fs.stat(`03-files-in-folder/secret-folder/${file[i].name}`, (error, stats) => { 
        console.log(`${file[i].name.split('.').slice(0, 1)} - ${file[i].name.split('.').slice(1, 2)} - ${stats.size} bytes`); 
      });        
    } else if (file[i].isDirectory() === true) {
      fs.readdir(`03-files-in-folder/secret-folder/${file[i].name}`, function(err, file_error) {
        for (let n = 0; n < file_error.length; n++) {
          fs.stat(`03-files-in-folder/secret-folder/${file[i].name}/${file_error[n]}`, (error, stats) => {
            console.log(`${file_error[n]} - ${stats.size} bytes`);               
          });
        }
      });
    }          
  }  
});
