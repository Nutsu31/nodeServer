const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  re_password: {
    type: String,
  },
  developer: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
});

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
