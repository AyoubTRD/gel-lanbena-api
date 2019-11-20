const { google } = require("googleapis");

const keys = require("./gs.json");

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets"
]);

client
  .authorize()
  .then(data => {
    console.log("Connected to google apis");
  })
  .catch(err => console.log(err));

module.exports = client