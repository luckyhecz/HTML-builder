const fs = require('fs'); //импорт commonjs modules
const path = require('path'); //импорт commonjs modules
const bundle = path.resolve(`${__dirname}/project-dist/bundle.css`); //создание абсолютного пути для общего файла стилей

//создание пустого файла
fs.writeFile(bundle, '', (err) => { 
  if (err) throw err;
  console.log('The file has been created!');
}); 

fs.readdir('05-merge-styles/styles', {withFileTypes: true}, function(_err, files) { //считывание содержимого каталога
  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile() === true && path.extname(files[i].name) == '.css') { //условие на существование файла с расширением css
      fs.readFile(`05-merge-styles/styles/${files[i].name}`, 'utf-8', (_err, data) => { //считывание содержимого файла
        fs.appendFile(bundle, data, err => { //добавление данных в общий файл стилей
            if (err) throw err;
        });
      });
    }
  }
});