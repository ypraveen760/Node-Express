const mongoose = require("mongoose");
const { KEY, USERNAME } = require("../Key");
const dbConnect = async () => {
  await mongoose.connect(
    `mongodb+srv://${USERNAME}:${KEY}@learning.tfgam.mongodb.net/TraderMatch`
  );
};

module.exports = dbConnect;
