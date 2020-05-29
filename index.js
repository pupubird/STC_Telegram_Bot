require('dotenv').config();
const Telegraf = require('telegraf');
const path = require('path');
const fs = require('fs');
let { Bot } = require('./store');
const bot = new Telegraf(process.env.BOT_TOKEN);

Bot.store(bot);
createCommands(bot)
listen(); // listen on this server for development

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
            bot.action(d, require(`./commands/${d}`))
        })
    });
}

// a test command, will not shown in the directory
bot.command('/test', (ctx) => {
    ctx.reply("Test command")
})

function listen() {
    console.log("Bot listening commands")
    bot.launch()
}

// handler for aws lambda function
exports.handler = (event, context, callback) => {
    const tmp = JSON.parse(event.body); // get data passed to us
    bot.handleUpdate(tmp); // make Telegraf process that data
    return callback(null, { // return something for webhook, so it doesn't try to send same stuff again
        statusCode: 200,
        body: '',
    });
};

