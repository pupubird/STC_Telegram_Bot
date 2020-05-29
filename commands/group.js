let { Bot } = require('../store');
let bot = Bot.get().bot

const Group = require('../models/Group');
function group(ctx) {
    let text = ctx.message.text.replace("/group", "")
    let message = `
Hey ${ctx.from.username},
This is the group:
${Group.name}
${Group.url}
${Group.desc}
    `;
    console.log(ctx.from)

    ctx.reply(`Message received: ${message} `);
}

module.exports = group;