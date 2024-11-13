const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("../config/database");

const app = express();
const port = 4000;

dbConnect().then(() => {
  try {
    console.log("Sucessfully Connected to Database");
    app.listen(port, () => {
      console.log(`Server sucessfully  listining to port ${port}...`);
    });
  } catch (err) {
    console.log("Error Occured", err.message);
  }
});
