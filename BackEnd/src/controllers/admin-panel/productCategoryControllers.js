const path = require("path");
const productCategoryModel = require("../../models/productCategoryModel");
const fs = require('fs');
const productModel = require("../../models/productModel");
const CartModel = require("../../models/cartModel");

const createProductCategory = async (req, res) => {
    try {
        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename
        }
        const dataToSave = new productCategoryModel(data);
        const response = await dataToSave.save();
        res.status(200).json({ message: 'successful', data: response });
    }
    catch (error) {

        if (req.files && req.files.thumbnail) { // If a thumbnail image is selected and an error occurs while submitting the form(eg. required field is missing), Multer will still store the file on the backend. If the user corrects the error and submits again, there will be two images with different names. To prevent this, we will delete the stored file immediately if any error occurs during submission.
            if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product-category', req.files.thumbnail[0].filename)))
                fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product-category', req.files.thumbnail[0].filename));
        }

        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Category already exists." });
        }

        if (error.name == 'ValidationError') return res.status(400).json({ message: 'required fields are missing!' })
        res.status(500).json({ message: 'Internal server error' });
    }
}

const readProductCategory = async (req, res) => {
    try {
        const data = await productCategoryModel.find({ deleted_at: null }).populate('parent_category');
        const filepath = `${req.protocol}://${req.get('host')}/frankandoakservices/admin-panel/product-category/`;

        res.status(200).json({ message: 'successful', data, filepath });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
}

const updateStatusProductCategory = async (req, res) => {
    try {
        const response = await productCategoryModel.findByIdAndUpdate(req.params._id, { status: req.body.status })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const updateIsFeaturedProductCategory = async (req, res) => {
    try {

        const response = await productCategoryModel.findByIdAndUpdate(req.params._id, { is_featured: req.body.is_featured })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const deleteProductCategory = async (req, res) => {
    try {
        const response = await productCategoryModel.findByIdAndUpdate(req.params._id, { deleted_at: Date.now() })
        res.status(200).json({ message: 'successfully Deleted', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Serer Error' });
    }
}

const deleteProductCategories = async (req, res) => {
    try {
        const response = await productCategoryModel.updateMany(
            { _id: req.body.checkedCategoriesIDs }, {
            $set: {
                deleted_at: Date.now()
            }
        });
        res.status(200).json({ message: 'Successfully Deleted', response });
        // console.log(req.body.checkedCategoriesIDs);

    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deletedProductCategories = async (req, res) => {
    try {
        const data = await productCategoryModel.find({ deleted_at: { $ne: null } }).populate('parent_category');
        res.status(200).json({ message: 'success', data });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const recoverProductCategory = async (req, res) => {
    try {
        const response = await productCategoryModel.findByIdAndUpdate(req.params._id, { deleted_at: null })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const productCategoryByID = async (req, res) => {
    try {
        const data = await productCategoryModel.find({ _id: req.params._id }).populate('parent_category');
        const filepath = `${req.protocol}://${req.get('host')}/frankandoakservices/admin-panel/product-category/`;
        res.status(200).json({ message: 'data by ID', data, filepath })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const updateProductCategory = async (req, res) => {
    try {

        const oldData = await productCategoryModel.findById(req.params);
        // const ProductCategory = JSON.parse(req.body.ProductCategory); // Object sent from frontend using JSON.stringify should be converted using JSON.parse to read in backend
        // console.log(ProductCategory);
        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) {
                if (oldData.thumbnail) { // checking if there is a thumbnail key in the old data
                    if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product-category', oldData.thumbnail))) { // checking if old file exists || __dirname giving path of this current productCategoryController.js file but not the path of project root directory, so used process.cwd() because it is giving path of root directory
                        fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product-category', oldData.thumbnail)); // deleting old file if it exists
                    }
                }
                data.thumbnail = req.files.thumbnail[0].filename;
            }
        }
        const response = await productCategoryModel.findByIdAndUpdate(req.params._id, data)
        res.status(200).json({ message: 'successfully Updated', response });

        // if(Object.keys(req.files).length > 0) console.log(req.files); // if(req.files) <- this one was not working so used if(Object.keys(req.files).length > 0)
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Category already exists." });
        }
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const activatedProductCategories = async (req, res) => {
    try {
        const data = await productCategoryModel.find({ status: true, deleted_at: null });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const activeProductCategoriesByParentCategory = async (req, res) => {
    try {
        const data = await productCategoryModel.find({ status: true, deleted_at: null, parent_category: req.params._id }).populate('parent_category');
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const productCategoriesByParentCategory = async (req, res) => {
    try {
        const data = await productCategoryModel.find({ deleted_at: null, parent_category: req.params._id }).populate('parent_category');
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const permanentDeleteProductCategory = async (req, res) => {
    try {

        const products = await productModel.find({ product_category: req.params._id });
        const productCategories = await productCategoryModel.find(req.params);

        console.log('products', products)
        console.log('productCategory', productCategories);

        products.map((product) => {
            if (product.thumbnail) {
                if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', product.thumbnail))) { // checking if old file exists || __dirname giving path of this current productCategoryController.js file but not the path of project root directory, so used process.cwd() because it is giving path of root directory
                    fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', product.thumbnail)); // deleting old file if it exists
                }
            }

            if (product.image_on_hover) {
                if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', product.image_on_hover))) { // checking if old file exists || __dirname giving path of this current productCategoryController.js file but not the path of project root directory, so used process.cwd() because it is giving path of root directory
                    fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', product.image_on_hover)); // deleting old file if it exists
                }
            }

            if (product.gallery) {
                product.gallery.map((img) => {
                    if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', img))) { // checking if old file exists || __dirname giving path of this current productCategoryController.js file but not the path of project root directory, so used process.cwd() because it is giving path of root directory
                        fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', img)); // deleting old file if it exists
                    }
                })
            }
        })


        productCategories.map((productCategory) => {
            if (productCategory.thumbnail) {
                if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product-category', productCategory.thumbnail))) { // checking if old file exists || __dirname giving path of this current productCategoryController.js file but not the path of project root directory, so used process.cwd() because it is giving path of root directory
                    fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product-category', productCategory.thumbnail)); // deleting old file if it exists
                }
            }
        })

        console.log(products);

        await CartModel.deleteMany({ product: { $in: products } });
        await productModel.deleteMany({ product_category: req.params._id });
        await productCategoryModel.deleteOne(req.params);

        res.status(200).json({ message: 'Permanetly Deleted Successfully' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const recoverProductCategories = async (req, res) => {
    try {
        const response = await productCategoryModel.updateMany(
            { _id: req.body.checkedCategoriesIDsInBin },
            {
                $set: {
                    deleted_at: null
                }
            });
        res.status(200).json({ message: 'Successfully Deleted', response });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const permanentDeleteProductCategories = async (req, res) => {
    try {
        const products = await productModel.find({ product_category: { $in: req.body.checkedCategoriesIDsInBin } });
        const productCategories = await productCategoryModel.find({ _id: { $in: req.body.checkedCategoriesIDsInBin } });

        products.map((product) => {
            if (product.thumbnail) {
                if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', product.thumbnail))) {
                    fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', product.thumbnail));
                }
            }

            if (product.image_on_hover) {
                if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', product.image_on_hover))) {
                    fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', product.image_on_hover));
                }
            }

            if (product.gallery) {
                product.gallery.map((img) => {
                    if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', img))) {
                        fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', img));
                    }
                })
            }
        })

        productCategories.map((productCategory) => {
            if (productCategory.thumbnail) {
                if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product-category', productCategory.thumbnail))) {
                    fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product-category', productCategory.thumbnail));
                }
            }
        })

        await CartModel.deleteMany({ product: { $in: products } });
        await productModel.deleteMany({ product_category: { $in: req.body.checkedCategoriesIDsInBin } });
        await productCategoryModel.deleteMany({ _id: { $in: req.body.checkedCategoriesIDsInBin } });
        
        res.status(200).json({ message: 'Permanetly Deleted Successfully' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const searchProductCategories = async (req, res) => {
    try {
        const data = await productCategoryModel.find({
            deleted_at: null,
            $or: [
                { name: { $regex: new RegExp(req.params.key, 'i') } },
                { description: { $regex: new RegExp(req.params.key, 'i') } },
                { slug: { $regex: new RegExp(req.params.key, 'i') } }
            ]
        }).populate('parent_category');
        console.log(data);
        res.status(200).json({ message: 'succes', data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

module.exports = {
    createProductCategory,
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
    productCategoriesByParentCategory
};