const mongoose = require("mongoose");

const callSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  call_reason: {
    type: String,
    required: true,
  },
  call_date: {
    type: Date,
    required: true,
    // default: Date.now,
  },
});

module.exports = mongoose.model("Call", callSchema);
