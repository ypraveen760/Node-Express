//to import modules we have to use require function and path
// const obj=require("./sum")this is normal way and now we can use obj.caluclate or obj.x but we do destructure of fly
{
  // // we have to do this for ES module import export
  // first create package.json and create this
  // {
  //   "type": "module"
  // }
  //to export we use export in front of module
}
//require("./xyz");
// const { calculateSum, x } = require("./sum"); not require in esmodule this needs only common js module

const { calculateMultiply, calculateSum } = require("./calculate");
const data = require("./data.json");
console.log(data);

let a = 10;
let b = 20;
console.log(calculateSum(a, b));
console.log(calculateMultiply(a, b));
