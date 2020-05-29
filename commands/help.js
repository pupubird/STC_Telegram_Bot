const fs = require('fs');

let file_names;
//joining path of directory 
const directoryPath = __dirname;
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    file_names = files.map(d => "/" + d.replace('.js', ''));
});

function start(ctx) {
    let message = `Available commands: \n${file_names.join('\n')}`;
    ctx.reply(message)
}

module.exports = start;