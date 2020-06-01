const config = require('./calendar_settings.json');
const CalendarAPI = require('node-google-calendar');
const creds = require('./calendar_settings.json');

async function init() {
    const cal = new CalendarAPI(config);

    return cal;
}

module.exports = {
    init: init,
    creds: creds
}