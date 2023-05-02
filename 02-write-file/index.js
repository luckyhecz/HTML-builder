const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdin, stdout } = process;


let output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
console.log('Введите текст:');
stdin.on('data', (data) => {
  if (data.toString().trim() == 'exit') {
    console.log('Завершение программы');
    process.exit();     
  }
  console.log('Введите текст(или завершите программу коммандой exit)');
  output.write(data);
});

// Начинаем чтение из stdin, чтобы процесс не завершился.
process.stdin.resume();

// Оповещение нажатия ctrl+c
process.on('SIGINT', () => {
  console.log('Завершение программы');
  process.exit(); 
});
