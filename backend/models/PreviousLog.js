const mongoose = require('mongoose');

const PreviousLogSchema = new mongoose.Schema({
  Date: { type: Date, required: true },
  Bill: { type: Number, required: true },
  CoolingCans: { type: Number, required: true },
  NormalCans: { type: Number, required: true },
  DrinkAmount: { type: Number, required: true }
});

module.exports = mongoose.model('PreviousLog', PreviousLogSchema);
