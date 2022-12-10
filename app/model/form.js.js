const mongoose = require("mongoose");

var schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      integer: true,
    },
    password: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
      integer: true,
    },
  },
  { timestamps: true }
);

const users = mongoose.model("users", schema);

module.exports = users;
