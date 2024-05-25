
const express = require('express');
const router = express.Router();
const Account = require('../models/Accounts');
const PreviousLog = require('../models/PreviousLog');
const PresentdayLog = require('../models/PresentdayLog');


router.post('/', async (req, res) => {
  try {
    const newAccount = new Account(req.body);
    const result = await newAccount.save();
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.get('/:accountId/present-day-log', async (req, res) => {
  try {
    const presentDayLog = await PresentdayLog.findOne({ accountId: req.params.accountId });
    res.json(presentDayLog);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.post('/:accountId/present-day-log', async (req, res) => {
  try {
    const log = await PresentdayLog.findOneAndUpdate(
      { accountId: req.params.accountId },
      { ...req.body, accountId: req.params.accountId },
      { upsert: true, new: true }
    );
    res.json(log);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


router.get('/:accountId/previous-day-log', async (req, res) => {
  try {
    const previousDayLogs = await PreviousLog.find({ accountId: req.params.accountId });
    res.json(previousDayLogs);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


const cron = require('node-cron');
const moment = require('moment');

cron.schedule('30 23 * * *', async () => {
  try {
    const presentDayLogs = await PresentdayLog.find();
    for (const log of presentDayLogs) {
      const { Date, Bill, RefilledCans, ReturnedCans, NumberofCoolCans, NumberofNormalCans, DrinksAmount, accountId } = log;
      const newPreviousLog = new PreviousLog({
        Date,
        Bill,
        CoolingCans: NumberofCoolCans,
        NormalCans: NumberofNormalCans,
        DrinkAmount: DrinksAmount,
        accountId
      });
      await newPreviousLog.save();
      await log.remove();
    }
    console.log('Successfully converted present day logs to previous day logs.');
  } catch (error) {
    console.error('Error converting present day logs to previous day logs:', error);
  }
});

module.exports = router;
