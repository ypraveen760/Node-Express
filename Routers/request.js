const express = require("express");
const requestRouter = express.Router();
const jwt = require("jsonwebtoken");
const { findById } = require("../DataBase/models/user");
const cookieParser = require("cookie-parser");
const User = require("../DataBase/models/user");

requestRouter.post(
  "/sendconnectionrequest",
  cookieParser(),
  async (req, res) => {
    try {
      const { token } = req.cookies;
      console.log(token);

      if (!token) {
        throw new Error("Please Login First");
      }
      const decodeToken = await jwt.verify(token, "Happy@143");
      if (!decodeToken) {
        throw new Error("Invalid or unauthorise user");
      }
      const { _id } = decodeToken;
      const userData = await User.findById(_id);
      if (!userData) {
        throw new Error("Invalid or unauthorise user");
      }
      const { firstName, lastName } = userData;
      res.send("Frend Request Sent from " + firstName + " " + lastName);
    } catch (err) {
      res.status(401).send("Error Occured " + err.message);
    }
  }
);

module.exports = requestRouter;
