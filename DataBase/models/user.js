const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 15,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 15,
      required: true,
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter valid email");
        }
      },
    },
    age: {
      type: Number,
      trim: true,
      min: 15,
      max: 101,
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Please enter valid gender");
        }
      },
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 500,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter strong password");
        }
      },
    },
    about: {
      type: String,
      minLength: 10,
      maxLength: 250,
    },
    photo: {
      type: String,
      default:
        "https://e7.pngegg.com/pngimages/348/800/png-clipart-man-wearing-blue-shirt-illustration-computer-icons-avatar-user-login-avatar-blue-child.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Please enter valid photo url");
        }
      },
    },
    skills: {
      type: [String],
      validate(value) {
        if (value.length > 10) {
          throw new Error("Skills should be not more than 10");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
