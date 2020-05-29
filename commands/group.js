let { Bot } = require('../store');
let { array_to_chunks } = require('../utils');
let bot = Bot.get().bot



function group(ctx) {
    try {
        ctx.deleteMessage();
    } catch (error) { }

    if (ctx.message && ctx.message.text.includes("/group add")) {
        return ctx.reply("To add a new group to the list, please use this form https://google.com")
    }

    let message = `Groups available`;

    let output_keyboards = getGroups();
    output_keyboards = output_keyboards.map((d, i) => {
        createAction(d.name);
        return {
            text: d.name,
            callback_data: '/group ' + d.name
        }
    });
    output_keyboards = [...output_keyboards, {
        text: 'Add new group',
        callback_data: '/group add'
    }]
    output_keyboards = array_to_chunks(output_keyboards, 2);

    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: output_keyboards
        }
    });
}

function createAction(key) {
    bot.action('/group ' + key, (ctx) => {
        ctx.deleteMessage();
        let message = 'Join ' + key
        ctx.reply(message)
    });
}

function getGroups() {
    return [
        {
            "name": "testing",
            "url": "https://google.com",
            "desc": "This is a testing2 group"
        },
        {
            "name": "testing2",
            "url": "https://google.com",
            "desc": "This is a testing2 group"
        }, {
            "name": "testing2",
            "url": "https://google.com",
            "desc": "This is a testing group"
        }
    ]
}

bot.action('/group add', (ctx) => {
    ctx.deleteMessage();
    ctx.reply("To add a new group to the list, please use this form https://google.com")
});

module.exports = group;