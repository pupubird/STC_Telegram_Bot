const spreadsheet = require('../google_spreadsheet');
let { Bot } = require('../store');
let { array_to_chunks } = require('../utils');
let bot = Bot.get().bot
let channels = []


async function channel(ctx) {
    try {
        ctx.deleteMessage();
    } catch (error) { }

    if (ctx.message && ctx.message.text.includes("/channel add")) {
        return ctx.reply("To add a new channel to the list, please use this form https://google.com")
    }

    let message = `channels available`;

    let output_keyboards = await getchannels();
    channels = output_keyboards
    output_keyboards = output_keyboards.map((d) => {
        return {
            text: d.name,
            url: d.url
        }
    });
    output_keyboards = [...output_keyboards, {
        text: 'Add new channel',
        callback_data: '/channel add'
    }]
    output_keyboards = array_to_chunks(output_keyboards, 2);

    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: output_keyboards
        }
    });
}

async function getchannels() {
    let doc = await spreadsheet();
    let channel = doc.sheetsByIndex[1];
    let rows = await channel.getRows()
    let output = rows.map(d => {
        return {
            "name": d.name,
            "url": d.url
        }
    })
    return output;
}

bot.action('/channel add', (ctx) => {
    ctx.deleteMessage();
    let url = "https://docs.google.com/forms/d/e/1FAIpQLSffFBVsFHk_5sqjjUG_BSpFIfCSVxufgH8nLZcAN_HjhS1TnA/viewform"
    bot.telegram.sendMessage(ctx.chat.id, "To add a new channel to the list, please use this form",
        {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Create", url: url }
                    ]
                ]
            }
        })
});

module.exports = channel;