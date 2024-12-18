const express = require("express");
const dbConnect = require("../config/database");
const cors = require("cors");

const {
  authdummy,
  userAuth,
} = require("../../Middlewares&Route Handlers/authMiddleware");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const User = require("../models/user");
const app = express();
const port = 4000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); //now we will get req body into readable format used app.use to handle all http method and didnt give any  path just to handle all the path
app.use("/admin", authdummy); //added middleware so that only authorised can get access
app.use(cookieparser());
const authRouter = require("../../Routers/auth");
const profileRouter = require("../../Routers/profile");
const requestRouter = require("../../Routers/request");
const userRouter = require("../../Routers/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//get user data
app.get("/user", userAuth, async (req, res) => {
  try {
    const userData = req.user;
    res.send(userData);
  } catch (err) {
    res.status(500).send("somthing went wrong!!");
  }
});
//to update user data
app.patch("/profile/update", userAuth, async (req, res) => {
  const userid = req.user._id;
  const Updatedata = req.body;
  if (!mongoose.Types.ObjectId.isValid(userid)) {
    return res.status(400).send("ID is not valid");
  }
  try {
    const allowedUpdate = ["age", "gender", "about", "photo", "skills"];
    const filteredUpdates = {};
    const isAllowedUpdate = Object.keys(Updatedata).every((k) =>
      allowedUpdate.includes(k)
    );
    if (!isAllowedUpdate) {
      throw new Error("update not allowed");
    }
    const data = await User.findByIdAndUpdate(userid, Updatedata, {
      new: true,
      runValidators: true,
    });

    res.json({ message: "Data updated sucessfully" });
  } catch (err) {
    res.status(501).send("Somthing went wrong => " + err.message);
  }
});
//to get all data only for admin
app.get("/admin/allData", async (req, res) => {
  const userData = await User.find({});
  res.send(userData);
});
//to delete by emailId
app.delete("/admin/deleteuser", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const userData = await User.findOne({ emailId: userEmail });

    if (!userData) {
      res.status(404).send("no user found");
    } else {
      const userid = userData.id;

      await User.deleteOne({ _id: userid });
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
      const userData = await User.findOne({ emailId: userEmail });
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

  const newUser = new User(req.body); //now used req.body so it can save it into database
  try {
    await newUser.save();
    res.send("Data saved sucessfully");
  } catch (err) {
    res.status(501).send("Somthing went Wrong:" + err.message);
  }
});

/** this is now we are doing via router and we will do every api via routers
 * //signup api 
  app.post("/signup", async (req, res) => {
  try {
    //data validation
    signupValidator(req);

    //now destructuring the data
    const { firstName, lastName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const signupUser = new User({
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
    const loginuser = await User.findOne({ emailId: emailId });
    const { _id } = loginuser;

    if (!loginuser) {
      throw new Error("invalid credential");
    }
    const isValidPassword = await loginuser.ispasswordVerified(password);
    if (!isValidPassword) {
      throw new Error("invalid credential");
    } else {
      const token = await loginuser.getJWT();
      res.send("Login sucessfull");
    }
  } catch (err) {
    const statusCode = err.message.startsWith("invalid") ? 401 : 501;
    res.status(statusCode).send("Error : " + err.message);
  }
});
*/

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
