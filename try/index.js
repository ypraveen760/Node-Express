const express = require("express");
const app = express();

const port = 4000;

app.get("/", (req, res) => {
  console.log(req.rawHeaders);

  res.send("Hello World");
});
app.get("/about", (req, res) => {
  res.send("<h1>About</h1> praveen yadav");
});
app.get("/contact", (req, res) => {
  res.send("<h1>Contact US</h1> praveen yadav <br/> Phone no:9527093180");
});

app.listen(port, () => {
  console.log(`server started on port ${port}.`);
});
