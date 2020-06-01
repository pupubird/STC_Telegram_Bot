const config = require('./calendar_settings.js');
const CalendarAPI = require('node-google-calendar');

async function init() {
    const cal = new CalendarAPI(config);

    return cal;
}

const calendarIdList = config.calendarId;

module.exports = {
    init: init,
    calendarIdList: calendarIdList
}