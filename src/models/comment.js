const mongoose = require("mongoose");
const Blog = require("./blog");
const User = require("./user");

const schema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Blog,
    },
    commentator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", schema);
