
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const result = await newOrder.save();
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('customer');
    res.json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Order.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send('Order not found');
    }
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
