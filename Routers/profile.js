const express = require("express");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const user = require("../DataBase/models/user");
const { userAuth } = require("../Middlewares&Route Handlers/authMiddleware");
const {
  validateEditRequest,
} = require("../DataBase/DataBase with Mongoose/utils/validation");

profileRouter.get("/profile/get", userAuth, async (req, res) => {
  try {
    // const { token } = req.cookies; //if reading cookies or using cookies always import cookie parser

    // if (!token) {
    //   throw new Error("Please Login First");
    // }
    // const decodeToken = jwt.verify(token, "Happy@143");
    // if (!decodeToken) {
    //   throw new Error("Unauthorized access");
    // }
    // const { _id } = decodeToken;
    const userData = req.user; //await user.findById(_id); all of aboves are auth logic and we have created middleware for this
    if (!userData) {
      throw new Error(" Unauthorized access");
    }

    res.send(userData);
  } catch (err) {
    res.status(401).send("Error Occured " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditRequest(req)) {
      throw new Error("Not allowed to edit");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      Message: `${loggedInUser.firstName} your Data Saved Succesfully`,
      loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error Occured => " + err.message);
  }
});

profileRouter.patch("/profile/changePassword", userAuth, (req, res) => {});

module.exports = profileRouter;
