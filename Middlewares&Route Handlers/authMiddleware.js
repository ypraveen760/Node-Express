const jwt = require("jsonwebtoken");
const User = require("../DataBase/models/user");

const authdummy = (req, res, next) => {
  const token = "xyx";
  const isAuth = token === "xyx";
  if (!isAuth) {
    //if token and auth key is not equal then it will send 401 statusCode and send User is not authorized
    res.status(401).send("User is not authorized");
  } else next(); //else next function will be called so that next responseHandler can respond
};
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login !");
    }
    const decordMessage = await jwt.verify(token, "Happy@143");
    const { _id } = decordMessage;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).send("invalid token");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send("Error occurred while verifying the token");
  }
};
module.exports = { authdummy, userAuth };
