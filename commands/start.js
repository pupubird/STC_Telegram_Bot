const fs = require('fs');
let { Bot } = require('../store');
let bot = Bot.get().bot
let { array_to_chunks } = require('../utils');

let file_names;

//joining path of directory 
const directoryPath = __dirname;
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    file_names = files.map(d => d.replace('.js', ''));
});

function start(ctx) {
    ctx.deleteMessage();
    let message = `All available commands`;
    let names = file_names.map(d => {
        return {
            text: '/' + d
        }
    })

    let output_keyboards = array_to_chunks(names, 2)

    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            keyboard: output_keyboards
        }
    });
}

module.exports = start;