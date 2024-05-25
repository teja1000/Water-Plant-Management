
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction'); // Ensure this path is correct

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
