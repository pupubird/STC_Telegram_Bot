<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/FxL5qM0.jpg" alt="Bot logo"></a>
</p>

<h3 align="center">STC Telegram Bot</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> 
🤖 A Telegram bot for Sunway Tech Club operations
  <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [How it works](#working)
- [Getting Started](#getting_started)
- [Contribute](#contribute)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

As Sunway Tech Club uses Telegram as it's main communication channel, it went harder and harder to manage all the groups and channels, hence, a bot that helps to manage and even generate quick video meeting link is becoming more important.

Why not using Slack? Well, because building a telegram bot sounds cooler 😎.

## 💭 How it works <a name = "working"></a>

Bots are special Telegram accounts designed to handle messages automatically. Users can interact with bots by sending them command messages in private or group chats. These accounts serve as an interface for code running somewhere on your server.

This bot uses [Telegraf](https://telegraf.js.org/#/) as a wrapper to the telegram core API to ease out and smoothen the development process.

The backend: 🤩 Google Sheets as Backend!

## 🎈 Usage <a name = "usage"></a>

To use the bot, go to:

[https://t.me/sunwaytechclub_bot](https://t.me/sunwaytechclub_bot)

and type

```bash
/start
```

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

This program is written in javascript, hence [Node.js](https://nodejs.org/en/) is required.

### Installing

Simply run

```
npm i
```

## 🚀 Contribute <a name = "contribute"></a>

To create new command:

1. Create a new JavaScript file in `/commands` folder, the script will detect the file and build the endpoint based on the file name
2. write a function with `ctx` as argument, and export the function. an example is as shown below:

```javascript
function test(ctx) {
  ctx.reply("Hello world!");
}

module.exports = test;
```

to get the bot object

```javascript
let { Bot } = require('../store');
let bot = Bot.get().bot
```

3. And you are good to go! Simply create a new bot from the @BotFather, create a file called `.env` at the root level and write

```env
BOT_TOKEN=<YOUR BOT TOKEN>
```

*...tbc tutorial on integrating spreadsheet (or you may checkout this https://developers.google.com/sheets/api/quickstart/nodejs)*

## ⛏️ Built Using <a name = "built_using"></a>

- [Telegraf](https://telegraf.js.org/#/) - Telegram API wrapper

## ✍️ Authors <a name = "authors"></a>

- [pupubird](https://github.com/pupubird) - The lonely programmer

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Kudos on Mark Tan on his comprehensive [Udemy course](https://www.udemy.com/course/build-telegram-bots-with-javascript-the-complete-guide/)
