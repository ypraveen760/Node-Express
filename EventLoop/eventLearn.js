const fs = require("fs");
const a = 11;
setImmediate(() => console.log("Set Immedate Run"));

fs.readFile("./file.txt", "utf8", () => {
  console.log("File reading");
});

setTimeout(() => {
  console.log("Time expired");
}, 0);

function printA() {
  console.log("a=", a);
}
printA();
console.log("Last line of file");
