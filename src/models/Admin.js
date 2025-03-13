const mongoose = require("mongoose");
const { create } = require("./User");

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: true },
});

module.exports = mongoose.model("Admin", AdminSchema);
