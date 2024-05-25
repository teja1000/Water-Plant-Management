const mongoose = require('mongoose');

const PresentdayLogSchema = new mongoose.Schema({
  Date: { type: Date, required: true, default: Date.now },
  Bill: { type: Number, required: true },
  RefilledCans: { type: Number, required: true },
  ReturnedCans: { type: Number, required: true },
  NumberofCoolCans: { type: Number, required: true },
  NumberofNormalCans: { type: Number, required: true },
  DrinksAmount: { type: Number, required: true }
});

module.exports = mongoose.model("PresentdayLog", PresentdayLogSchema);


