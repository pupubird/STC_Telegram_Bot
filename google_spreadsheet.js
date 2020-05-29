require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./client_secret.json');

async function init() {
    // more info: https://www.npmjs.com/package/google-spreadsheet
    // spreadsheet key is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(process.env.spreadsheet_url);

    // OAuth
    await doc.useServiceAccountAuth(require('./client_secret.json'));
    await doc.loadInfo();

    console.log(doc.title + " spreadsheet is ready")
    return doc;
}
module.exports = init;