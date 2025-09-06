const express = require('express');
const router = express.Router();
const donationController = require('./donationController');

// Submit donation
router.post('/submit', donationController.submitDonation);

module.exports = router;