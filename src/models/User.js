const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  interestedIn: { type: String, enum: ["male", "female", "both"], required: true },
  hobbies: { type: [String], default: [] },
  birthday: { type: Date },
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  loveRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  reportedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("User", userSchema);