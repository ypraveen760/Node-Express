const express = require("express");
const app = express();
port = 4000;
app.listen(port, () => {
  console.log(`Server is sucessfully listining on port ${port}...`);
});
app.use(
  "/user",
  (req, res, next) => {
    console.log("Handling 1st route!!");
    next(); //it will take next handler to run or jump to next handler
  },
  (req, res, next) => {
    console.log("Handling 2nd route!!");
    next(); //it will take next handler to run or jump to next handler
  },
  (req, res, next) => {
    console.log("Handling 3rd route");
    // res.send("got output"); //what if we dont send response here, it will go to infinite loop
    //it printed all the output and stuck in loop because its still searching for respond.
    next(); //but if we do next then it will give error it will not stuck in loop because it think there will be new route handler
  },
  (req, res, next) => {
    console.log("final handler");
    res.send("Got output");
  }
);

//second way of defining route handlers(Seprate Route Handlers)
app.use("/profile", (req, res, next) => {
  console.log(
    "This is a seprate route handler + we are not sending request here so it is also knows as middleware "
  );
  next();
});
app.use("/profile", (req, res, next) => {
  console.log(
    "this is seprate route handler which is also called by sepret handler inside of next + we are sending response here so it will called as request handler"
  );
  res.send("Test successfull");
});
