const CartModel = require("../../models/cartModel");
const parentCategoryModel = require("../../models/parentCategoryModel");
const productCategoryModel = require("../../models/productCategoryModel");
const productModel = require("../../models/productModel");
const fs = require('fs');
const path = require('path');

const createParentCategory = async (req, res) => {
    try {
        console.log(req.body);
        const dataToSave = new parentCategoryModel(req.body);
        const savedData = await dataToSave.save();
        res.status(200).json({ message: 'Parent Category Controller', data: savedData });
    }
    catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Category already exists." });
        }

        if (error.name == 'ValidationError') return res.status(400).json({ message: 'required fields are missing!' })
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const readParentCategory = async (req, res) => {
    try {
        const data = await parentCategoryModel.find({ deleted_at: null });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const updateStatusParentCategory = async (req, res) => {
    try {
        const response = await parentCategoryModel.findByIdAndUpdate(req.params._id, { status: req.body.status })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const deleteParentCategory = async (req, res) => { // soft delete
    try {
        const response = await parentCategoryModel.findByIdAndUpdate(req.params._id, { deleted_at: Date.now() })
        res.status(200).json({ message: 'successfully Deleted', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Serer Error' });
    }
}

const deleteParentCategories = async (req, res) => {
    try {
        const response = await parentCategoryModel.updateMany(
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

const parentCategoryByID = async (req, res) => {
    try {
        const data = await parentCategoryModel.find({ _id: req.params._id });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error);
    }
}

const updateParentCategory = async (req, res) => {
    try {
        const response = await parentCategoryModel.findByIdAndUpdate(req.params._id,
            {
                name: req.body.name,
                description: req.body.description
            })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Category already exists." });
        }
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const deletedParentCategories = async (req, res) => {
    try {
        const data = await parentCategoryModel.find({ deleted_at: { $ne: null } });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const recoverParentCategory = async (req, res) => {
    try {
        const response = await parentCategoryModel.findByIdAndUpdate(req.params._id, { deleted_at: null })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const activatedParentCategories = async (req, res) => {
    try {
        const data = await parentCategoryModel.find({ status: true, deleted_at: null });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const permanentDeleteParentCategory = async (req, res) => {
    try {

        // Deleting all products and product categorries that use the current deleting parent category (the thumbnail and other images also need to be deleted of all products and product categories of connected parent category)

        const products = await productModel.find({ parent_category: req.params._id });
        const productCategories = await productCategoryModel.find({ parent_category: req.params._id });

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


        await CartModel.deleteMany({ product: { $in: products } });
        await productModel.deleteMany({ parent_category: req.params._id })
        await productCategoryModel.deleteMany({ parent_category: req.params._id })
        await parentCategoryModel.deleteOne(req.params);

        res.status(200).json({ message: 'Permanetly Deleted Successfully' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const recoverParentCategories = async (req, res) => {
    try {
        const response = await parentCategoryModel.updateMany(
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

const permanentDeleteParentCategories = async (req, res) => {
    try {

        const products = await productModel.find({ parent_category: { $in: req.body.checkedCategoriesIDsInBin } });
        const productCategories = await productCategoryModel.find({ parent_category: { $in: req.body.checkedCategoriesIDsInBin } });

        // products.map((product) => {
        //     if (product.thumbnail) {
        //         if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', product.thumbnail))) {
        //             fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', product.thumbnail));
        //         }
        //     }

        //     if (product.image_on_hover) {
        //         if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', product.image_on_hover))) {
        //             fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', product.image_on_hover));
        //         }
        //     }

        //     if (product.gallery) {
        //         product.gallery.map((img) => {
        //             if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', img))) {
        //                 fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', img));
        //             }
        //         })
        //     }
        // })

        // productCategories.map((productCategory) => {
        //     if (productCategory.thumbnail) {
        //         if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product-category', productCategory.thumbnail))) {
        //             fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product-category', productCategory.thumbnail));
        //         }
        //     }
        // })
        console.log('checkedCategoriesIDsInBin=', req.body.checkedCategoriesIDsInBin);

        console.log('products=>', products);
        console.log('Product Categories=>', productCategories);

        await CartModel.deleteMany({ product: { $in: products } });
        await productModel.deleteMany({ parent_category: { $in: req.body.checkedCategoriesIDsInBin } });
        await productCategoryModel.deleteMany({ parent_category: { $in: req.body.checkedCategoriesIDsInBin } });
        await parentCategoryModel.deleteMany({ _id: { $in: req.body.checkedCategoriesIDsInBin } });

        res.status(200).json({ message: 'Permanetly Deleted Successfully', products, productCategories })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const searchParentCategories = async (req, res) => {
    try {
        const data = await parentCategoryModel.find({
            deleted_at: null,
            $or: [ // or is defined so when the searched key match with name or description. If we wouldn't have added $or, then it would try to match all three conditions (deleted_at, name, description). It wil try to match the search text which match both name and description 
                { name: { $regex: new RegExp(req.params.key, 'i') } },  // $or operator take conditions as objects in an array
                { description: { $regex: new RegExp(req.params.key, 'i') } }
            ]
        })
        console.log(data);
        res.status(200).json({ message: 'succes', data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}




module.exports = {
    createParentCategory,
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
    searchParentCategories
};