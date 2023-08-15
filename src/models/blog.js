const mongoose = require("mongoose");
const User = require("./user");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    descr: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    blogger: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", schema);
