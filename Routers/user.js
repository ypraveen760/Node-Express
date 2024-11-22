const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../Middlewares&Route Handlers/authMiddleware");
const connectionRequest = require("../DataBase/models/connectionRequest");
const publicData = ["firstName", "lastName", "about", "photo", "skills"];
const User = require("../DataBase/models/user");
const publidData = ["firstName", "lastName", "photos", "skills", "about"];
//see all request
userRouter.get("/user/request/recived", userAuth, async (req, res) => {
  try {
    const loggedinUser = req.user;
    const data = await connectionRequest
      .find({
        toUserId: loggedinUser._id,
        status: "intrested",
      })
      .populate("fromUserId", publicData);
    res.json(data);
  } catch (err) {
    res.status(401).send("Error Occured" + err.message);
  }
});
//see all connections
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    loggedinUser = req.user;
    const userConnections = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedinUser._id, status: "accepted" },
          { fromUserId: loggedinUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", publicData)
      .populate("toUserId", publicData);
    const userData = userConnections.map((row) => {
      if (row.fromUserId._id.toString() === loggedinUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });

    res.json({ message: `All Connections fetch successfully`, userData });
  } catch (err) {
    res.status(401).send("Error Occured" + err.message);
  }
});
//feed api
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 50;
    limit = Math.min(limit, 40);
    skip = (page - 1) * limit;
    loggedinUser = req.user;
    const feed = await connectionRequest
      .find({
        $or: [{ toUserId: loggedinUser }, { fromUserId: loggedinUser }],
      })
      .select("fromUserId toUserId");
    const hideUserFromFeed = new Set();
    feed.forEach((req) => {
      hideUserFromFeed.add(req.toUserId.toString());
      hideUserFromFeed.add(req.fromUserId.toString());
    });
    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedinUser._id } },
      ],
    })
      .select(publicData)
      .limit(limit)
      .skip(skip);
    res.send(user);
  } catch (err) {
    throw new Error("Error Occured => " + err.message);
  }
});
module.exports = userRouter;
