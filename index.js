require('dotenv').config();
const Telegraf = require('telegraf');
const path = require('path');
const fs = require('fs');
let { Bot } = require('./store');
const bot = new Telegraf(process.env.BOT_TOKEN);

Bot.store(bot);
createCommands(bot)
listen()

function createCommands(bot) {
    //joining path of directory 
    const directoryPath = path.join(__dirname, 'commands');
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        let file_names = files.map(d => d.replace('.js', ''));
        file_names.forEach(d => {
            bot.command(`/${d}`, require(`./commands/${d}`))
        })
    });
}

function listen() {
    console.log("Bot listening commands")
    bot.launch()
}