const router = require("express").Router();
const createClient = require("../gs");
const { google } = require("googleapis");
const Request = require("../models/Request");

const updateSpreadSheets = async () => {
  try {
    const client = await createClient();
    const requests = await Request.find({});
    const formattedRequests = requests.map(
      ({ name, phone, quantity, address }) => [name, phone, quantity, address]
    ).reverse();
    const spreadsheetId = "1CreV7X8DszfXml2NMFQwYu0-Q5b31NZ5EVUHc26H5QQ";
    const gsapi = google.sheets({ version: "v4", auth: client });
    const options = {
      spreadsheetId,
      range: "lanbenagel!A2",
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
router.post("/request", async (req, res) => {
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
