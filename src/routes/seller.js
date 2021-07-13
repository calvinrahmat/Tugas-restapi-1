const express = require('express');
const router = express.Router();
const ctrlSeller = require('../controllers/account');

router.post('/registration', ctrlSeller.seller.sellerRegistration);
router.put('/reset-password', ctrlSeller.seller.resetPassword);

module.exports = router;
