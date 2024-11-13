const express = require("express");
const { auth, authLogin } = require("./authMiddleware");
const app = express();
const port = 4000;
app.listen(port, () => {
  console.log(`server listining to port ${port}`);
});
app.use("/admin", auth); //anything req that comes with admin it will get authorized first and it will get executed
app.get("/admin/allData", (req, res) => {
  res.send("All Data Send");
});
app.delete("/admin/deleteUser", (req, res) => {
  res.send("deleted user sucessfully");
});
app.put("/admin/modifyUser", (req, res) => {
  res.send("Modified use");
});
app.use("/user/login", (req, res) => {
  res.send("Login sucessfull");
});
app.use("/user", authLogin);
app.get("/user/getData", (req, res) => {
  res.send("All Data Send");
});
app.delete("/user/deleteUser", (req, res) => {
  res.send("deleted user sucessfully");
});
app.put("/user/modifyUser", (req, res) => {
  res.send("Modified user");
});
