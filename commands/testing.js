const calendar = require('../google_calendar');
let { Bot } = require('../store');
let bot = Bot.get().bot;

async function testing(ctx) {
    try {
        ctx.deleteMessage();
    } catch (error) { }

    if (ctx.message && ctx.message.text.includes('/testing add')) {
        ctx.reply("Please enter event detail in the format of <eventName>,<month>-<day>,<hour>:<minute>. E.g. WebLaunch Meeting,6-16,20:30");
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
                        "requestId": "uid", //uuid
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
                return ctx.reply(`Event name: ${confirmedName}\nDate: ${confirmedDate}\nTime: ${confirmedTime}\nMeeting link: ${confirmedLink}`);
            });
            
        })
    }
}

async function createEvent(event) {
    let cal = await calendar.init();
    let calendarIdList = calendar.creds.calendar_id;
    let optionalQueryParams = {
        'conferenceDataVersion': 1
    }
    let result = await cal.Events.insert(calendarIdList['primary'], event, optionalQueryParams).then(resp => {
        return resp;
    })
    return result;
}

module.exports = testing;

