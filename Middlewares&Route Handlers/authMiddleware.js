const auth = (req, res, next) => {
  const token = "xyx";
  const isAuth = token === "xyx";
  if (!isAuth) {
    //if token and auth key is not equal then it will send 401 statusCode and send User is not authorized
    res.status(401).send("User is not authorized");
  } else next(); //else next function will be called so that next responseHandler can respond
};
const authLogin = (req, res, next) => {
  const token = "aaa";
  const isAuth = token === "aaa";
  if (!isAuth) {
    //if token and auth key is not equal then it will send 401 statusCode and send User is not authorized
    res.status(401).send("User is not authorized");
  } else next(); //else next function will be called so that next responseHandler can respond
};
module.exports = { auth, authLogin };
