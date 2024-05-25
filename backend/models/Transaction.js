const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  reference: { type: String, required: false },
  numberOfCans: { type: Number, required: true },
  costPerCan: { type: Number, required: true },
  deposit: { type: Number, required: true },
  addedCans: { type: Number, required: true },
  refilledCans: { type: Number, required: true },
  returnedCans: { type: Number, required: true },
  startDate: { type: Date, required: true },  
  endDate: { type: Date, required: true } 
});

module.exports = mongoose.model('Transaction', TransactionSchema);
