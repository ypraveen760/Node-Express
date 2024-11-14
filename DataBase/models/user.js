const mongoose = require("mongoose");

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
      maxLength: 50,
      required: true,
      trim: true,
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
    },
    skills: {
      type: [String],
      max: 10,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
