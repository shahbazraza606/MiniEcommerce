const express = require('express');
const router = express.Router();
const PaymentController = require('../Controllers/PaymentController.js');
const auth = require("../Middleware/auth");
const paymentController = new PaymentController();
router.post('/pay', auth.verifytoken, paymentController.processPayment);

module.exports = router;