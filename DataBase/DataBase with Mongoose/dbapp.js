const express = require("express");
const dbConnect = require("../config/database");
const user = require("../models/user");
const { auth } = require("../../Middlewares&Route Handlers/authMiddleware");
const { default: mongoose } = require("mongoose");

const app = express();
const port = 4000;

app.use(express.json()); //now we will get req body into readable format used app.use to handle all http method and didnt give any  path just to handle all the path
app.use("/admin", auth); //added middleware so that only authorised can get access

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
app.patch("/admin/updateuser", async (req, res) => {
  const userid = req.body.userid;
  const Updatedata = req.body;
  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return res.status(400).send("ID is not valid");
  }
  try {
    const data = await user.findByIdAndUpdate(userid, Updatedata);
    res.send("Data updated sucessfully");
  } catch (err) {
    res.status(501).send("Somthing went wrong");
  }
});
app.get("/admin/allData", async (req, res) => {
  const userData = await user.find({});
  res.send(userData);
});
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
