let { Bot } = require('../store');
let { array_to_chunks } = require('../utils');
let bot = Bot.get().bot


function meeting(ctx) {
    try {
        ctx.deleteMessage();
    } catch (error) { }

    if (ctx.message && ctx.message.text.includes("/meeting add")) {
        return ctx.reply("To add a new meeting to the list, please use this form https://google.com")
    }

    let message = `Meetings available`;

    let output_keyboards = getMeetings();
    output_keyboards = output_keyboards.map((d, i) => {
        createAction(d.name);
        return {
            text: d.name,
            callback_data: '/meeting ' + d.name
        }
    });
    output_keyboards = [...output_keyboards, {
        text: 'Add new meeting',
        callback_data: '/meeting add'
    }]
    output_keyboards = array_to_chunks(output_keyboards, 2);

    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: output_keyboards
        }
    });
}

function createAction(key) {
    bot.action('/meeting ' + key, (ctx) => {
        ctx.deleteMessage();
        let message = 'Join ' + key
        ctx.reply(message)
    });
}

function getMeetings() {
    return [
        {
            "name": "testing",
            "url": "https://google.com",
            "desc": "This is a testing2 meeting"
        },
        {
            "name": "testing2",
            "url": "https://google.com",
            "desc": "This is a testing2 meeting"
        }, {
            "name": "testing2",
            "url": "https://google.com",
            "desc": "This is a testing meeting"
        }
    ]
}

bot.action('/meeting add', (ctx) => {
    ctx.deleteMessage();
    ctx.reply("To add a new meeting to the list, please use this form https://google.com")
});

module.exports = meeting;