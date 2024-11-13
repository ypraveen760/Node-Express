const express = require("express");
const port = 4000;
const app = express();
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
app.use("/test", (req, res) => {
  res.send("This is admin pannel for testing purpose ");
});
//this will only handle get call to /user
app.get("/user", (req, res) => {
  console.log(req.query);
  res.send({
    firstName: "Praveen",
    lastName: "Yadav",
  });
});
app.use("/param/:Id/:name/:email", (req, res) => {
  console.log(req.params);
  res.send("Got Parameters full data");
});
app.use("/param/:Id", (req, res) => {
  console.log(req.params);
  res.send("Got Parameters");
});

app.post("/user", (req, res) => {
  //update data to database
  res.send("Data updated sucessfully");
});
app.get("/ab+c", (req, res) => {
  res.send("you can add to many b as you want  ,(+)will match pattern");
});

app.post("/ab?C", (req, res) => {
  res.send(
    "? will make it optional if we didn't type or give b it will still work and we can also give () so it can group options like (abc)? now abc will be optional"
  );
});
app.patch("/ab*c", (req, res) => {
  res.send(
    "* anything at the place of star will work like ab`jdhgfsdhj`c this all will work "
  );
});
app.put(/k/, (req, res) => {
  res.send(
    "we can also use rejex at routing will search a in router if there is a it will work"
  );
});
app.put(/.*xxx$/, (req, res) => {
  res.send(
    "we can also use rejex at routing in this rejex xxx shoud be there to work * means in start anything can be but at last xxx should be there "
  );
});

app.delete("/user", (req, res) => {
  //delete the data
  res.send("Data Deleted SucessFully");
});
app.put("/user", (req, res) => {
  //update data to database
  res.send("Data Updated Sucessfully");
});
app.patch("/user", (req, res) => {
  //update name from user collection
  res.send("Name updated sucessfully");
});

//this will match all the call
app.use("/", (req, res) => {
  res.send("Hello from Server......");
});
