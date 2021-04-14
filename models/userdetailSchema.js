const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    index: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Userdetail = mongoose.model("Userdetail", userSchema);
module.exports = Userdetail;
