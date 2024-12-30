const productModel = require("../../models/productModel");
const fs = require('fs');
const path = require('path');
const CartModel = require("../../models/cartModel");

const createProduct = async (req, res) => {
    try {
        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if (req.files.image_on_hover) data.image_on_hover = req.files.image_on_hover[0].filename;
            if (req.files.gallery) data.gallery = req.files.gallery.map(img => img.filename);
        }

        const dataToSave = new productModel(data);
        const savedData = await dataToSave.save();

        res.status(200).json({ message: 'product added', data: savedData });
    }
    catch (error) {

        if (req.files) { // If a thumbnail image is selected and an error occurs while submitting the form(eg. required field is missing), Multer will still store the file on the backend. If the user corrects the error and submits again, there will be two images with different names. To prevent this, we will delete the stored file immediately if any error occurs during submission.
            if (req.files.thumbnail) {
                fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', req.files.thumbnail[0].filename));
                fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', req.files.thumbnail[0].filename));
            }

            if (req.files.image_on_hover) {
                if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', req.files.image_on_hover[0].filename))) {
                    fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', req.files.image_on_hover[0].filename));
                }
            }

            if (req.files.gallery) {
                req.files.gallery.map((img) => {
                    if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', img.filename))) {
                        fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', img.filename));
                    }
                })
            }
        }

        if (error.errors) {
            if (error.errors.price && error.errors.price.kind == 'Number' || error.errors.mrp && error.errors.mrp.kind == 'Number') return res.status(400).json({ message: 'price/mrp should be in a Number!' })
        }

        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Product with the same name already exists." });
        }

        if (error.name == 'ValidationError') return res.status(400).json({ message: 'required fields are missing!' })
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

const readProducts = async (req, res) => {
    try {
        const data = await productModel.find({ deleted_at: null }).populate('parent_category').populate('product_category').populate('size').populate('color');
        const filepath = `${req.protocol}://${req.get('host')}/frankandoakservices/admin-panel/product/`;

        res.status(200).json({ message: 'successful', data, filepath });

        /*
        
        const products = await productModel.find({ deleted_at: null }).populate('parent_category').populate('product_category').populate('size').populate('color').lean();
        // Using .lean() with mongoose queries will make Mongoose skip the creation of a full Mongoose document(with our data being in _doc key when trying to add new key in the returned result from mongoose query), instead returning a plain JavaScript object. We needed to add a new key(filepath) to every product we get but adding a new key map on all products, the data wasn't reaching in front-end in appropriate format but in with some newly unwanted keys and our data being in '_doc' key.  https://stackoverflow.com/questions/18821212/mongoose-whats-up-with-doc
        const filepath = `${req.protocol}://${req.get('host')}/frankandoakservices/admin-panel/product/`;

        const data = products.map((product) => ({ ...product, filepath: filepath }));
        res.status(200).json({ message: 'successful', data });

        */
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateStatusProduct = async (req, res) => {
    try {
        const response = await productModel.findByIdAndUpdate(req.params._id, { status: req.body.status })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const deleteProduct = async (req, res) => { // soft delete
    try {
        const response = await productModel.findByIdAndUpdate(req.params._id, { deleted_at: Date.now() })
        res.status(200).json({ message: 'successfully Deleted', response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Serer Error' });
    }
}

const deletedProducts = async (req, res) => {
    try {
        const data = await productModel.find({ deleted_at: { $ne: null } }).populate('parent_category').populate('product_category').populate('size').populate('color');
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const deleteProducts = async (req, res) => {
    try {
        const response = await productModel.updateMany(
            { _id: req.body.checkedProductsIDs }, {
            $set: {
                deleted_at: Date.now()
            }
        });
        res.status(200).json({ message: 'Successfully Deleted', response });

    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const recoverProduct = async (req, res) => {
    try {
        const response = await productModel.findByIdAndUpdate(req.params._id, { deleted_at: null })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const readProductByID = async (req, res) => {
    try {
        const data = await productModel.find(req.params).populate('parent_category').populate('product_category').populate('size').populate('color');
        const filepath = `${req.protocol}://${req.get('host')}/frankandoakservices/admin-panel/product/`;

        res.status(200).json({ message: 'successful', data, filepath });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const updateProduct = async (req, res) => {
    try {

        console.log(req.files);
        console.log(req.body);
        console.log(req.params);

        const oldData = await productModel.findById(req.params);
        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) {
                if (oldData.thumbnail) { // checking if there is a thumbnail key in the old data
                    if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', oldData.thumbnail))) { // checking if old file exists || __dirname giving path of this current productCategoryController.js file but not the path of project root directory, so used process.cwd() because it is giving path of root directory
                        fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', oldData.thumbnail)); // deleting old file if it exists
                    }
                }
                data.thumbnail = req.files.thumbnail[0].filename;
            }
            if (req.files.image_on_hover) {
                if (oldData.image_on_hover) { // checking if there is a image_on_hover key in the old data
                    if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', oldData.image_on_hover))) { // checking if old file exists || __dirname giving path of this current productCategoryController.js file but not the path of project root directory, so used process.cwd() because it is giving path of root directory
                        fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', oldData.image_on_hover)); // deleting old file if it exists
                    }
                }
                data.image_on_hover = req.files.image_on_hover[0].filename;
            }
            if (req.files.gallery) {
                if (oldData.gallery) { // checking if there is a gallery key in the old data
                    oldData.gallery.map((img) => {
                        if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', img))) { // checking if old file exists || __dirname giving path of this current productCategoryController.js file but not the path of project root directory, so used process.cwd() because it is giving path of root directory
                            fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', img)); // deleting old file if it exists
                        }
                    })

                }
                data.gallery = req.files.gallery.map((img) => (img.filename));
            }
        }
        const response = await productModel.findByIdAndUpdate(req.params._id, data)
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        console.log(error);
        // console.log(error.kind);
        // console.log(error.path);
        // console.log(error.reason.path);
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Product already exists with the same name." });
        }
        if (error.name == 'ValidationError') return res.status(400).json({ message: 'required fields are missing!' })
        if (error.kind == '[ObjectId]' && error.reason.path == 'size') return res.status(400).json({ message: 'size is required!' });
        if (error.kind == '[ObjectId]' && error.reason.path == 'color') return res.status(400).json({ message: 'color is required!' });
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}


const permanentDeleteProduct = async (req, res) => {
    try {

        const oldData = await productModel.findById(req.params);
        console.log(req.params);

        if (oldData) {

            if (oldData.thumbnail) { // checking if there is a thumbnail key in the old data
                if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', oldData.thumbnail))) { // checking if old file exists || __dirname giving path of this current productCategoryController.js file but not the path of project root directory, so used process.cwd() because it is giving path of root directory
                    fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', oldData.thumbnail)); // deleting old file if it exists
                }
            }


            if (oldData.image_on_hover) {
                if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', oldData.image_on_hover))) {
                    fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', oldData.image_on_hover));
                }
            }


            if (oldData.gallery) {
                oldData.gallery.map((img) => {
                    if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', img))) {
                        fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', img));
                    }
                })

            }

        }

        await CartModel.deleteMany({ product: req.params._id });
        const data = await productModel.findOneAndDelete(req.params); // The deleteOne method in Mongoose only returns information about the delete operation's success but does not provide the details of the deleted document itself. To get the details of the deleted document, you can use findOneAndDelete instead, which will delete the document and return its details in a single operation
        
        res.status(200).json({ message: 'product deleted permanently', data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const recoverProducts = async (req, res) => {
    try {
        const response = await productModel.updateMany(
            { _id: req.body.checkedProductsIDsInBin },
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

const permanentDeleteProducts = async (req, res) => {
    try {

        const productCategories = await productModel.find({ _id: { $in: req.body.checkedProductsIDsInBin } });

        productCategories.map((productCategory) => {
            if (productCategory.thumbnail) {
                if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product-category', productCategory.thumbnail))) { // checking if old file exists || __dirname giving path of this current productCategoryController.js file but not the path of project root directory, so used process.cwd() because it is giving path of root directory
                    fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product-category', productCategory.thumbnail)); // deleting old file if it exists
                }
            }

            if (productCategory.image_on_hover) {
                if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', productCategory.image_on_hover))) {
                    fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', productCategory.image_on_hover));
                }
            }

            if (productCategory.gallery) {
                productCategory.gallery.map((img) => {
                    if (fs.existsSync(path.join(process.cwd(), 'src', 'uploads', 'product', img))) {
                        fs.unlinkSync(path.join(process.cwd(), 'src', 'uploads', 'product', img));
                    }
                })

            }
        })

        await CartModel.deleteMany({ product: { $in: req.body.checkedProductsIDsInBin } })
        await productModel.deleteMany({ _id: { $in: req.body.checkedProductsIDsInBin } });

        res.status(200).json({ message: 'Permanetly Deleted Successfully' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const productsByParentCategory = async (req, res) => {
    try {
        const data = await productModel.find({ deleted_at: null, parent_category: req.params._id }).populate('parent_category').populate('product_category').populate('size').populate('color');
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}


module.exports = {
    createProduct,
    readProducts,
    updateStatusProduct,
    deleteProduct,
    deletedProducts,
    recoverProduct,
    deleteProducts,
    readProductByID,
    updateProduct,
    permanentDeleteProduct,
    recoverProducts,
    permanentDeleteProducts,
    productsByParentCategory
}

