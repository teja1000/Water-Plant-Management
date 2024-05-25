const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  numberOfCans: { type: Number, required: true },
  numberOfDrums: { type: Number, required: true },
  advance: { type: Number, required: true },
  dateOfDelivery: { type: Date, required: true },
  time: { type: String, required: true },
  vehicle: { type: Boolean, required: true },
});

module.exports = mongoose.model('Order', OrderSchema);
