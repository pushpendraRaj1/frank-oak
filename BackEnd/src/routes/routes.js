const express = require('express');
const adminRoutes = require('./admin/adminRoutes');
const parentCategoryRouter = require('./admin/parentCategoryRoutes');
const colorRoutes = require('./admin/colorRoutes');
const sizeRouter = require('./admin/sizeRoutes');
const productCategoryRoutes = require('./admin/productCategoryRoutes');
const productRoutes = require('./admin/productRoutes');

const userRoute = require('./website/userRoutes');
const websiteProductRoute = require('./website/productRoutes');
const websiteProductCategoryRoute = require('./website/productCategoryRoutes');
const websiteParentCategoryRoute = require('./website/parentCategoryRoutes');
const cartRoute = require('./website/cartRoutes');
const paymentRoute = require('./website/paymentRoutes');

const adminPanelRoutes = express.Router();
const websiteRoutes = express.Router();
const appRoutes = express.Router();

adminPanelRoutes.use('/admin', adminRoutes);
adminPanelRoutes.use('/color', colorRoutes);
adminPanelRoutes.use('/size', sizeRouter);
adminPanelRoutes.use('/parent-category', parentCategoryRouter);
adminPanelRoutes.use('/product-category', productCategoryRoutes);
adminPanelRoutes.use('/product', productRoutes);

websiteRoutes.use('/user', userRoute);
websiteRoutes.use('/parent-category', websiteParentCategoryRoute);
websiteRoutes.use('/product-category', websiteProductCategoryRoute);
websiteRoutes.use('/product', websiteProductRoute);
websiteRoutes.use('/cart', cartRoute);
websiteRoutes.use('/payment', paymentRoute);




module.exports = { adminPanelRoutes, websiteRoutes, appRoutes };