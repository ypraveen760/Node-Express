//modules prevent their variables and functions from leaking
console.log("Using calculate function from another module");

function calculateSum(a, b) {
  return a + b;
}
let x = "WELCOME LETS GET STARTED";

//to export we use module.exports (object if have multiple exports)
// module.exports= {x:x,calculateSum:calculateSum} this is object but we use shorthands
module.exports = { x, calculateSum };
