const fs = require("fs");

const a = 100;

Promise.resolve(() => {
  console.log("Promises");
});
setImmediate(() => console.log("SetImmedate"));
fs.readFile("./file.txt", "utf-8", () => {
  console.log("File Readed");
});
setTimeout(() => {
  console.log("SetTimeout");
}, 20);
process.nextTick(() => {
  console.log("process nexttick");
});
const printA = () => {
  console.log("a=", a);
};
printA();
console.log("last line of the file");
