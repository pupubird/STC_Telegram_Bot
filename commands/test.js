function test(ctx) {
    let message = ctx.message.text.replace("/test", "");
    ctx.reply(`Message received: ${message} `);
}

module.exports = test;