
const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Transaction = require('../models/Transaction');

router.post('/', async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const result = await newCustomer.save();
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Customer.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send('Customer not found');
    }
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/settle/:id', async (req, res) => {
  try {
    
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).send('Customer not found');
    }

    
    const transaction = new Transaction({
      name: customer.name,
      phoneNumber: customer.phoneNumber,
      address: customer.address,
      reference: customer.reference,
      numberOfCans: customer.numberOfCans,
      costPerCan: customer.costPerCan,
      deposit: customer.deposit,
      addedCans: customer.addedCans,
      refilledCans: customer.refilledCans,
      returnedCans: customer.returnedCans,
      startDate: customer.createdAt,  
      endDate: new Date()
    });

    
    await transaction.save();

    
    await Customer.findByIdAndDelete(req.params.id);

    res.json(transaction);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
