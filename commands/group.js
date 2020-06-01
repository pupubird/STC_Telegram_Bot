const spreadsheet = require('../google_spreadsheet');
let { array_to_chunks } = require('../utils');
let bot = global.Bot;
let groups = []


async function group(ctx) {
    try {
        ctx.deleteMessage();
    } catch (error) { }

    if (ctx.message && ctx.message.text.includes("/group add")) {
        return ctx.reply("To add a new group to the list, please use this form https://google.com")
    }

    let message = `Groups available`;

    let output_keyboards = await getGroups();
    groups = output_keyboards
    output_keyboards = output_keyboards.map((d, i) => {
        return {
            text: d.name,
            url: d.url
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

async function getGroups() {
    let doc = await spreadsheet();
    let group = doc.sheetsByIndex[0];
    let rows = await group.getRows()
    let output = rows.map(d => {
        return {
            "name": d.name,
            "url": d.url
        }
    })
    return output;
}

bot.action('/group add', (ctx) => {
    ctx.deleteMessage();

    let url = "https://docs.google.com/forms/d/e/1FAIpQLSdnGHhAP2dLhOlMfDHR9xD5V4en1Ya4Xgjr63dKO3uOLPl0eQ/viewform?usp=sf_link"
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

module.exports = group;