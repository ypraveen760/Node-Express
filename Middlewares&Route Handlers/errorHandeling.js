const express = require("express");
const app = express();
const port = 4000;
app.listen(port, () => {
  console.log("server running on 4000 port");
});
//first and best way
app.use("/user", (req, res) => {
  try {
    throw new Error("sdfhgsbdfjkh");
    res.send("everything is fine");
  } catch (err) {
    res.status(500).send("Somthing went wrong contact to support");
  }
});
//still unexpected

app.use("/admin", (req, res) => {
  throw new Error("sdfhgsbdfjkh");
  res.send("everything is fine");
});
app.use("/admin", (err, req, res, next) => {
  if (err) {
    res
      .status(500)
      .send("Somthing went wrong contact to support,unexpected way");
  }
});
