function group(ctx) {
    let message = ctx.message.text.replace("/group", "");
    ctx.reply(`Message received: ${message} `);
}

module.exports = group;