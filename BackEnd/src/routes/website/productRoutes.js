const express = require('express');
const { activeProductsForWebsite, searchProductsForWebsite } = require('../../controllers/controllers');

const websiteProductRoute = express.Router();

websiteProductRoute.get('/products', activeProductsForWebsite);
websiteProductRoute.post('/search-products/:key', searchProductsForWebsite);


module.exports = websiteProductRoute;