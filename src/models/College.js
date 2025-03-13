const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  admissionDate: { type: Date },
  events: [String],
  researchHistory: [String],
  sports: [String],
  rating: { type: Number, default: 0 }
})

module.exports = mongoose.model("College", collegeSchema);