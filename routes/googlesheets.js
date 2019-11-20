const router = require("express").Router();
const client = require("../gs");
const { google } = require("googleapis");
const Request = require("../models/Request");

const updateSpreadSheets = async () => {
  try {
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
    const res = await gsapi.spreadsheets.values.update(options);
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
    console.log(e.message);
    res.status(400).send();
  }
});

module.exports = router;
