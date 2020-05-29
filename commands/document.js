let { Bot } = require('../store');
let { array_to_chunks } = require('../utils');
let bot = Bot.get().bot;

function document(ctx) {
    try {
        ctx.deleteMessage();
    } catch (error) { }
    let message = `Recent documents`;

    let output_keyboards = getDocuments();
    output_keyboards = output_keyboards.map((d, i) => {
        createAction(d.name);
        return {
            text: d.name,
            callback_data: '/document ' + d.name
        }
    });
    output_keyboards = array_to_chunks(output_keyboards, 2);

    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: output_keyboards
        }
    });
}

function createAction(key) {
    bot.action('/document ' + key, (ctx) => {
        ctx.deleteMessage();
        let message = 'This is our ' + key
        ctx.reply(message)
    });
}
function getDocuments() {
    return [
        {
            "name": "Document 1",
            "url": "https://google.com",
            "desc": "this document one"
        },
        {
            "name": "Document 2",
            "url": "https://google.com",
            "desc": "this document two"
        },
        {
            "name": "Document 3",
            "url": "https://google.com",
            "desc": "this document three"
        },
        {
            "name": "Document 4",
            "url": "https://google.com",
            "desc": "this document four"
        }
    ]
}
module.exports = document;