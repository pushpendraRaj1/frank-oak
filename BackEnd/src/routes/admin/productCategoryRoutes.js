const express = require('express');

const { createProductCategory,
    readProductCategory,
    updateStatusProductCategory,
    updateIsFeaturedProductCategory,
    deleteProductCategory,
    deleteProductCategories,
    deletedProductCategories,
    recoverProductCategory,
    productCategoryByID,
    updateProductCategory,
    activatedProductCategories,
    activeProductCategoriesByParentCategory,
    permanentDeleteProductCategory, 
    recoverProductCategories,
    permanentDeleteProductCategories,
    searchProductCategories,
    productCategoriesByParentCategory} = require('../../controllers/controllers');

const upload = require('../../middlewares/multer');

const productCategoryRoutes = express();

productCategoryRoutes.post('/create-category', upload('product-category'), createProductCategory);
productCategoryRoutes.get('/read-category', readProductCategory);
productCategoryRoutes.put('/update-status/:_id', updateStatusProductCategory)
productCategoryRoutes.put('/update-IsFeatured/:_id', updateIsFeaturedProductCategory)
productCategoryRoutes.put('/delete-category/:_id', deleteProductCategory);
productCategoryRoutes.put('/delete-categories', deleteProductCategories);
productCategoryRoutes.get('/deleted-categories', deletedProductCategories);
productCategoryRoutes.put('/recover-category/:_id', recoverProductCategory);
productCategoryRoutes.get('/read-category/:_id', productCategoryByID);
productCategoryRoutes.put('/update-category/:_id', upload('product-category'), updateProductCategory)
productCategoryRoutes.get('/activated-categories', activatedProductCategories);
productCategoryRoutes.put('/active-product-categories-by-parent-category/:_id', activeProductCategoriesByParentCategory);
productCategoryRoutes.put('/product-categories-by-parent-category/:_id', productCategoriesByParentCategory);
productCategoryRoutes.delete('/permanent-delete-category/:_id', permanentDeleteProductCategory);
productCategoryRoutes.put('/recover-categories', recoverProductCategories);
productCategoryRoutes.delete('/permanent-delete-categories', permanentDeleteProductCategories);
productCategoryRoutes.post('/search-categories/:key', searchProductCategories);

module.exports = productCategoryRoutes;