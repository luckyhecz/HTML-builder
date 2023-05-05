const fs = require('fs'); //импорт commonjs modules
const path = require('path'); //импорт commonjs modules
const fsPromises = require('fs/promises'); //импорт commonjs modules
const projectDist = path.resolve(`${__dirname}/project-dist`); //создание абсолютного пути для папки project-dist
const indexhHtml = path.resolve(`${__dirname}/project-dist/index.html`); //создание абсолютного пути для файла index.html
const styleCss = path.resolve(`${__dirname}/project-dist/style.css`); //создание абсолютного пути для файла style.css
const assets = path.resolve(`${__dirname}/project-dist/assets`); //создание абсолютного пути для папки assets

//создание папки project-dist
fs.mkdir(projectDist, { recursive: true }, err => { 
  if(err) throw err;
});

//cоздание папки assets
fs.mkdir(assets, { recursive: true }, err => {
  if(err) throw err;
});

//создание пустого файла index.html
fs.writeFile(indexhHtml, '', (err) => { 
  if (err) throw err;
  // console.log('The index.html has been created!');
});

//создание пустого файла style.css
fs.writeFile(styleCss, '', (err) => { 
  if (err) throw err;
  // console.log('The style.css has been created!');
}); 

//копирование содержимого папки
async function copyDir () {
  try {
    //чтение содержимого папки
    const read = await fsPromises.readdir('06-build-page/assets', {withFileTypes: true}); 
    //создание подпапок
    for (let i = 0; i < read.length; i++) {
      let newFiles = await fsPromises.readdir(`06-build-page/assets/${read[i].name}`, {withFileTypes: true});
      fs.mkdir(`06-build-page/project-dist/assets/${read[i].name}`, { recursive: true }, err => { 
        if(err) throw err; 
      });
      let files = await fsPromises.readdir(`06-build-page/project-dist/assets/${read[i].name}`, {withFileTypes: true});
      
      //удаление ранее созданных файлов
      for (const file of files) { 
        fs.unlink(`06-build-page/project-dist/assets/${read[i].name}/${file.name}`, function(err){
          if (err) {
            console.log(err);
          } 
        });
      }

      //копирование файлов
      for (const newFile of newFiles) { 
        fs.copyFile(`06-build-page/assets/${read[i].name}/${newFile.name}`, `06-build-page/project-dist/assets/${read[i].name}/${newFile.name}`, (err) => {
          if (err) {
            console.log('Error Found:', err);
          }  
        });
      }

    }
  } catch(err) {
    console.log((err)); 
  }
}
copyDir();

//наполнение index.html компонентами
async function writeHtml() {
  try {
    //считывание контента файла
    let templateHtml = await fsPromises.readFile(`${__dirname}/template.html`);
    //считывание содержимого папки
    let componentsHtml = await fsPromises.readdir(`${__dirname}/components`, {withFileTypes: true});
    let htmlTxt = templateHtml.toString();
    let currentPart = '';

    // замена шаблонных тегов содержимым html компонент
    for (const component of componentsHtml) {
      if (component.isFile() && path.extname(component.name) === '.html') {
        currentPart = await fsPromises.readFile(`${__dirname}/components/${component.name}`);
        htmlTxt = htmlTxt.replace(`{{${component.name.slice(0, -5)}}}`, currentPart.toString()); 
      }
    }

    //запись файла index
    fsPromises.writeFile(`${__dirname}/project-dist/index.html`, htmlTxt);
  }  catch(err) {
    console.log((err)); 
  }
}
writeHtml();


//сбор стилей из файлов из папки styles
fs.readdir('06-build-page/styles', {withFileTypes: true}, function(_err, files) { //считывание содержимого каталога
  for (let i = 0; i < files.length; i++) {
    if (files[i].isFile() === true && path.extname(files[i].name) == '.css') { //условие на существование файла с расширением css
      fs.readFile(`06-build-page/styles/${files[i].name}`, 'utf-8', (_err, data) => { //считывание содержимого файла
        fs.appendFile(styleCss, data, err => { //добавление данных в общий файл стилей
            if (err) throw err;
        });
      });
    }
  }
});

