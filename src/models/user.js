const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      match: [
        /^(?=.*[a-z])[a-z0-9]{1,10}$/,
        "user_name must be 1 to 10 characters long and contain only lowercase letters and digits",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", schema);
