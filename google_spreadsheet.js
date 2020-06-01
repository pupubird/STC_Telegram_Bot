require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');

async function init() {
    // more info: https://www.npmjs.com/package/google-spreadsheet
    // spreadsheet key is the long id in the sheets URL
    try {

        const doc = new GoogleSpreadsheet(process.env.spreadsheet_url);

        // OAuth
        await doc.useServiceAccountAuth(require('./client_secret.json'));
        await doc.loadInfo();

        console.log(doc.title + " spreadsheet is ready")
    } catch (err) {
        console.log("Something went wrong")
        return false
    }
    return doc;
}
module.exports = init;