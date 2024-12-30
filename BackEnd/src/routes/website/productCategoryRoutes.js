const express = require('express');
const { activeProductCategoriesForWebsite } = require('../../controllers/controllers');


const websiteProductCategoryRoute = express.Router();

websiteProductCategoryRoute.get('/product-categories', activeProductCategoriesForWebsite);

module.exports = websiteProductCategoryRoute;