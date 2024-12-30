const express = require('express');
const { createCart, readCart, deleteCartProduct, updateProductQuantityInCart } = require('../../controllers/controllers');

const cartRoute = express.Router();

cartRoute.post('/add-to-cart', createCart);
cartRoute.get('/read-cart/:user', readCart);
cartRoute.delete('/delete-cart-product/:_id', deleteCartProduct);
cartRoute.put('/update-product-quantity-in-cart/:_id', updateProductQuantityInCart);

module.exports = cartRoute;