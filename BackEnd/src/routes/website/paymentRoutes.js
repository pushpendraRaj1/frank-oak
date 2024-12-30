const express = require('express');
const { checkout } = require('../../controllers/controllers');

const paymentRoute = express.Router();

paymentRoute.post('/checkout', checkout);


module.exports = paymentRoute;