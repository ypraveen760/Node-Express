const express = require("express");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const { findById } = require("../DataBase/models/user");
const user = require("../DataBase/models/user");

const cookieParser = require("cookie-parser");

profileRouter.get("/profile", cookieParser(), async (req, res) => {
  try {
    const { token } = req.cookies; //if reading cookies or using cookies always import cookie parser

    if (!token) {
      throw new Error("Please Login First");
    }
    const decodeToken = jwt.verify(token, "Happy@143");
    if (!decodeToken) {
      throw new Error("Unauthorized access");
    }
    const { _id } = decodeToken;
    const userData = await user.findById(_id);
    if (!userData) {
      throw new Error(" Unauthorized access");
    }

    res.send(userData);
  } catch (err) {
    res.status(401).send("Error Occured " + err.message);
  }
});

module.exports = profileRouter;
