const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://ayoub:ayoub@cluster0-5vi5j.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch(err => console.log(err.message));

const express = require("express"),
  app = express(),
  cors = require("cors");

const googleSheetsRoutes = require("./routes/googlesheets");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/sheets", googleSheetsRoutes);

const port = process.env.PORT || 5000;

app.listen(port, console.log.bind("", "connected to server"));
