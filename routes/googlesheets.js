const router = require("express").Router();
const createClient = require("../gs");
const { google } = require("googleapis");
const Request = require("../models/Request");

const updateSpreadSheets = async () => {
  try {
    const client = await createClient();
    console.log(client);
    const requests = await Request.find({});
    const formattedRequests = requests.map(
      ({ name, phone, quantity, address }) => [name, phone, quantity, address]
    );
    const spreadsheetId = "11eC4HqXVlstnPEYuTz_vwZaqFVhD8UyeJi3IA81jzuQ";
    const gsapi = google.sheets({ version: "v4", auth: client });
    const options = {
      spreadsheetId,
      range: "Sheet1!A2",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: formattedRequests
      }
    };
    await gsapi.spreadsheets.values.update(options);
  } catch (e) {
    console.log(e);
  }
};
router.post("/", async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.send(201);
    updateSpreadSheets();
  } catch (e) {
    console.log("error", e.message);
    res.status(400).send();
  }
});

module.exports = router;
