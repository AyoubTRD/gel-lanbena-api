const { google } = require("googleapis");

const keys = require("./gs.json");

const connectToGoogleApi = async client => {
  try {
    const client = new google.auth.JWT(
      keys.client_email,
      null,
      keys.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );
    const res = await client.authorize();
    console.log("connected to google apis");
    return client;
  } catch (e) {
    console.log("error", e);
  }
};

module.exports = connectToGoogleApi;
