const express = require('express');
const { activeParentCategoriesForWebsite } = require('../../controllers/controllers');



const websiteParentCategoryRoute = express.Router();

websiteParentCategoryRoute.get('/parent-categories', activeParentCategoriesForWebsite);

module.exports = websiteParentCategoryRoute;