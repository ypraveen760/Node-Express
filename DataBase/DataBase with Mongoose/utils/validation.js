const validator = require("validator");
const signupValidator = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please Enter Name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Please Enter Valid Email ID");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Please Enter Strong Password ,Your Password is not Strong"
    );
  }
};
module.exports = { signupValidator };
