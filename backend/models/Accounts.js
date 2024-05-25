
const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  reference: { type: String, required: false },
  costPerNormalCan: { type: Number, required: true },
  costPerCoolCan: { type: Number, required: true },
  deposit: { type: Number, required: true },
  TotalCoolCans: { type: Number, required: false, default: 0 },
  TotalNormalCans: { type: Number, required: false, default: 0 },
  PhysicalCans: { type: Number, required: false, default: 0 },
  TotalDrinkAmount: { type: Number, required: false, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Account', AccountSchema);
