const { log } = require("console");
const fs = require("fs");
let a = 545;
setTimeout(() => {
  process.nextTick(() => {
    console.log(" inner next tick");
    console.log(a * 2);
  });
  Promise.resolve("promise").then(console.log);
}, 1000);
fs.readFile("./file.txt", "utf-8", (data) => {
  console.log(data + "file readed");
});

process.nextTick(() => {
  setInterval(() => {
    console.log("Timer");
  }, 5000);
  setTimeout(() => {
    console.log("inside next interval");
  }, 500);
});

console.log("last line of code");

//op what i expect
/*
*last line of code
*inside next interval
*data+file readed
inner next tick
a*2 value
promise
timer
timer
*
*
*/
