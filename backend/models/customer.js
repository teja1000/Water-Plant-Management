
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  reference: { type: String, required: false },
  numberOfCans: { type: Number, required: true },
  costPerCan: { type: Number, required: true },
  deposit: { type: Number, required: true },
  addedCans: { type: Number, required: false, default: 0 }, 
  refilledCans: { type: Number, required: false, default: 0 },
  returnedCans: { type: Number, required: false, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', CustomerSchema);