//Admin controllers
const { testAdmin,
    adminLogin,
    registerAdmin,
    updateAdmin,
    generateOTP,
    updateEmail } = require('./admin-panel/adminControllers')

//Color controllers
const { addColor,
    readColor,
    updateStatusColor,
    deleteColor,
    deleteColors,
    colorByID,
    updateColor,
    deletedColors,
    recoverColor,
    activatedColors,
    permanentDeleteColor,
    recoverColors,
    permanentDeleteColors,
    searchColors } = require('./admin-panel/colorController')

//Parent Category controllers
const { createParentCategory,
    readParentCategory,
    updateStatusParentCategory,
    deleteParentCategory,
    deleteParentCategories,
    parentCategoryByID,
    updateParentCategory,
    deletedParentCategories,
    recoverParentCategory,
    activatedParentCategories,
    permanentDeleteParentCategory,
    recoverParentCategories,
    permanentDeleteParentCategories,
    searchParentCategories, } = require('./admin-panel/parentCategoryController')

//Product Category controllers
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
    productCategoriesByParentCategory,
    permanentDeleteProductCategory,
    recoverProductCategories,
    permanentDeleteProductCategories,
    searchProductCategories } = require('./admin-panel/productCategoryControllers')

//Product controllers
const { createProduct,
    readProducts,
    permanentDeleteProduct,
    updateStatusProduct,
    deleteProduct,
    deletedProducts,
    recoverProduct,
    deleteProducts,
    readProductByID,
    updateProduct,
    recoverProducts,
    permanentDeleteProducts,
    productsByParentCategory } = require('./admin-panel/productControllers')

//Size controllers
const { createSize,
    readSize,
    updateStatusSize,
    deleteSize,
    deleteSizes,
    sizeByID,
    updateSize,
    deletedSizes,
    recoverSize,
    activatedSizes,
    permanentDeleteSize,
    recoverSizes,
    permanentDeleteSizes,
    searchSizes } = require('./admin-panel/sizeController')


//Website UserControllers
const {
    sendOtpOnUserRegistration, loginUser, validateOtpAndRegisterUser,
    verifyJWT,
    forgotPassword
} = require('./website/userControllers')

//Website ProductControllers
const {
    activeProductsForWebsite,
    searchProductsForWebsite
} = require('./website/productControllers')
const { activeProductCategoriesForWebsite } = require('./website/productCategoryControllers')
const { activeParentCategoriesForWebsite } = require('./website/parentCategoryControllers')
const { createCart, readCart, deleteCartProduct, updateProductQuantityInCart } = require('./website/cartControllers')
const { checkout } = require('./website/paymentControllers')


module.exports = {

    // Admin - Panel
    testAdmin, adminLogin, registerAdmin, createParentCategory, readParentCategory, updateStatusParentCategory,
    addColor, readColor, updateStatusColor, createSize, readSize, updateStatusSize, deleteParentCategory,
    deleteParentCategories, deleteColor, deleteColors, deleteSize, deleteSizes, parentCategoryByID,
    updateParentCategory, colorByID, updateColor, sizeByID, updateSize, deletedParentCategories, recoverParentCategory,
    deletedSizes, recoverSize, deletedColors, recoverColor, activatedParentCategories, createProductCategory,
    readProductCategory, updateStatusProductCategory, updateIsFeaturedProductCategory, deleteProductCategory,
    deleteProductCategories, deletedProductCategories, recoverProductCategory, productCategoryByID, updateProductCategory,
    updateAdmin, generateOTP, updateEmail, activatedProductCategories, activatedSizes, activatedColors, activeProductCategoriesByParentCategory,
    createProduct, readProducts, permanentDeleteParentCategory, permanentDeleteProduct, updateStatusProduct, deleteProduct,
    deletedProducts, recoverProduct, deleteProducts, readProductByID, updateProduct, permanentDeleteProductCategory,
    permanentDeleteSize, permanentDeleteColor, recoverSizes, permanentDeleteSizes, recoverColors, permanentDeleteColors,
    recoverParentCategories, permanentDeleteParentCategories, recoverProductCategories, permanentDeleteProductCategories,
    recoverProducts, permanentDeleteProducts, searchParentCategories, searchProductCategories, searchColors, searchSizes,
    productsByParentCategory, productCategoriesByParentCategory,

    //Website User Controllers
    sendOtpOnUserRegistration, loginUser, validateOtpAndRegisterUser, forgotPassword, verifyJWT,

    //Website Product Category Controllers
    activeParentCategoriesForWebsite,

    //Website Product Category Controllers
    activeProductCategoriesForWebsite,

    //Website Product Controllers
    activeProductsForWebsite, searchProductsForWebsite,

    //Website AddToCart
    createCart, readCart, deleteCartProduct, updateProductQuantityInCart,

    //Website Payment
    checkout
}