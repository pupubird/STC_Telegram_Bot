const calendar = require('../google_calendar');
const { v4: uuidv4 } = require('uuid');
let { Bot } = require('../store');
let { array_to_chunks } = require('../utils');
let bot = Bot.get().bot;

function meeting(ctx) {
    try {
        ctx.deleteMessage();
    } catch (error) { }

    if (ctx.message && ctx.message.text.includes("/meeting add")) {
        ctx.reply("Please enter event name: ")
        bot.on('text', (ctx) => {
            return ctx.reply(`${ctx.message.text}`)
        })
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

async function createEvent(event) {
    let cal = await calendar.init();
    let calendarIdList = calendar.calendarIdList;
    let optionalQueryParams = {
        'conferenceDataVersion': 1
    }
    let result = await cal.Events.insert(calendarIdList['primary'], event, optionalQueryParams).then(resp => {
        return resp;
    })
    return result;
}

bot.action('/meeting add', (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Please enter event details in the format of:\n<eventName>,<month>-<day>,<hour>:<minute>.\nE.g. General Meeting,6-16,20:30");
    bot.on('text', (ctx) => {
        let message = ctx.message.text.split(",");
        let eventName = message[0];
        let eventDate = message[1];
        let tempEventTime = message[2];
        let startDate = `2020-${eventDate}T${tempEventTime}:00+08:00`;
        let tempTime = tempEventTime.split(":");
        let timeHour = Number(tempTime[0]);
        let timeMin = tempTime[1];
        let endDate = `2020-${eventDate}T${timeHour+1}:${timeMin}:00+08:00`;
        let event = {
            'summary': eventName,
            'start': {
                'dateTime': startDate
            },
            'end': {
                'dateTime': endDate
            },
            "conferenceData": {
                "createRequest": {
                    "requestId": uuidv4(),
                    "conferenceSolution": {
                        'key': {
                            'type': 'eventHangout'
                        }
                    }
                }
            }
        };
        createEvent(event).then(result => {
            let confirmedName = result.summary;
            let confirmedLink = result.hangoutLink;
            let tempDateTime = result.start.dateTime.split('T');
            let confirmedDate = tempDateTime[0];
            let tempTime = tempDateTime[1].split('+');
            let confirmedTime = tempTime[0];
            return ctx.reply(`Event created! 🤩🤩🤩\nEvent name: ${confirmedName}\nDate: ${confirmedDate}\nTime: ${confirmedTime}\nMeeting link: ${confirmedLink}`);
        });
        
    })
});

module.exports = meeting;