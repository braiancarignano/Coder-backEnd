const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    age: Number,
    email: { type: String, unique: true },
    password: String,
  },
  {
    versionKey: false,
  }
);
const modelUser = mongoose.model("users", userSchema);

module.exports = modelUser;
