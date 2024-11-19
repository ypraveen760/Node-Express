const express = require("express");
const profileRouter = express.Router();
const jwt = require("jsonwebtoken");
const user = require("../DataBase/models/user");
const { userAuth } = require("../Middlewares&Route Handlers/authMiddleware");
const {
  validateEditRequest,
  validateChangePasswordRequest,
} = require("../DataBase/DataBase with Mongoose/utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");

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

profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
  try {
    if (!validateChangePasswordRequest(req)) {
      throw new Error("Not allowed to Edit");
    }
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const loggedInUser = req.user;

    if (!validator.isStrongPassword(confirmPassword)) {
      throw new Error("Enter Strong Password");
    }
    const validPassword = await loggedInUser.ispasswordVerified(
      currentPassword
    );
    if (!validPassword) {
      throw new Error("Invalid current Password");
    }
    if (newPassword !== confirmPassword) {
      throw new Error(" Both Password are not Same");
    }
    passwordHash = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = passwordHash;

    await loggedInUser.save();
    res.send("Password changed sucessfully");
  } catch (err) {
    res.status(400).send("Error Occured => " + err.message);
  }
});

module.exports = profileRouter;
