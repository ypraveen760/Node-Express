const express = require("express");
const dbConnect = require("../config/database");
const user = require("../models/user");
const { auth } = require("../../Middlewares&Route Handlers/authMiddleware");
const { default: mongoose } = require("mongoose");
const { signupValidator } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

const app = express();
const port = 4000;

app.use(express.json()); //now we will get req body into readable format used app.use to handle all http method and didnt give any  path just to handle all the path
app.use("/admin", auth); //added middleware so that only authorised can get access
//get user data
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const userData = await user.find({ emailId: userEmail });
    if (userData.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(userData);
    }
  } catch (err) {
    res.status(501).send("somthing went wrong!!");
  }
});
//to update user data
app.patch("/admin/updateuser/:userid", async (req, res) => {
  const userid = req.params?.userid;
  const Updatedata = req.body;
  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return res.status(400).send("ID is not valid");
  }
  try {
    const allowedUpdate = [
      "age",
      "gender",
      "password",
      "about",
      "photo",
      "skills",
    ];
    const isAllowedUpdate = Object.keys(Updatedata).every((k) =>
      allowedUpdate.includes(k)
    );
    if (!isAllowedUpdate) {
      throw new Error("update not allowed");
    }
    const data = await user.findByIdAndUpdate(userid, Updatedata, {
      runValidators: true,
    });

    res.send("Data updated sucessfully");
  } catch (err) {
    res.status(501).send("Somthing went wrong => " + err.message);
  }
});
//to get all data only for admin
app.get("/admin/allData", async (req, res) => {
  const userData = await user.find({});
  res.send(userData);
});
//to delete by emailId
app.delete("/admin/deleteuser", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const userData = await user.findOne({ emailId: userEmail });

    if (!userData) {
      res.status(404).send("no user found");
    } else {
      const userid = userData.id;

      await user.deleteOne({ _id: userid });
      res.send("Data Deleted ");
    }
  } catch (err) {
    res.status(500).send("error occured");
  }
});
//to get user data by email id
app.get("/admin/userdata", async (req, res) => {
  const userEmail = req.body.emailId;
  if (!userEmail) {
    res.status(501).send("Give valid emailID");
  } else {
    try {
      const userData = await user.findOne({ emailId: userEmail });
      if (userData.length === 0) {
        res.status(404).send("user not found");
      } else {
        res.send(userData);
      }
    } catch (err) {
      res.status(501).send("Somthing Went Wrong" + err.message);
    }
  }
});
//to add data in database
app.post("/user", async (req, res) => {
  // console.log(req.body); //getting undefined we have to add middleware to convert json into readeable format for this we will use {express.json()} middleware

  const newUser = new user(req.body); //now used req.body so it can save it into database
  try {
    await newUser.save();
    res.send("Data saved sucessfully");
  } catch (err) {
    res.status(501).send("Somthing went Wrong:" + err.message);
  }
});
//signup api
app.post("/signup", async (req, res) => {
  try {
    //data validation
    signupValidator(req);

    //now destructuring the data
    const { firstName, lastName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const signupUser = new user({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    await signupUser.save();
    res.send("Sucessfully logined");
  } catch (err) {
    const statusCode = err.message.startsWith("Please") ? 400 : 500;
    res.status(statusCode).send("Error Occured : " + err.message);
  }
});
//login api
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("invalid credential");
    }
    const loginuser = await user.findOne({ emailId: emailId });
    if (!loginuser) {
      throw new Error("invalid credential");
    }
    const isValidPassword = await bcrypt.compare(password, loginuser.password);
    if (!isValidPassword) {
      throw new Error("invalid credential");
    } else {
      res.send("Login sucessfull");
    }
  } catch (err) {
    const statusCode = err.message.startsWith("invalid") ? 401 : 501;
    res.status(statusCode).send("Error : " + err.message);
  }
});

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
