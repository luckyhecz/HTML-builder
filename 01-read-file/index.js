const fs = require('fs');
const path = require('path');


const direction = path.resolve('01-read-file', 'text.txt');
const stream = fs.createReadStream(direction, 'utf-8');
let data = '';
stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('Error', error.message));
// fs.readFile(
//   path.join(__dirname, 'text.txt'),
//   'utf-8',
//   (err, data) => {
//       if (err) throw err;
//       console.log(data);
//   }
// );