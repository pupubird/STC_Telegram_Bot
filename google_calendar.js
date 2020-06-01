const config = require('./calendar_settings.js');
const CalendarAPI = require('node-google-calendar');
const calendarIdList = config.calendarId;

async function init() {
    const cal = new CalendarAPI(config);
    return cal;
}

module.exports = {
    init: init,
    calendarIdList: calendarIdList
}