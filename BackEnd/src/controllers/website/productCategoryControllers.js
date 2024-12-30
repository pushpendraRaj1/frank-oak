const productCategoryModel = require("../../models/productCategoryModel");


const activeProductCategoriesForWebsite = async (req, res) => {
    try {
        const productCategories = await productCategoryModel.find({ status: true, deleted_at: null }).populate('parent_category');
        const filepath = `${req.protocol}://${req.get('host')}/frankandoak-files/`;
        res.status(200).json({ message: 'Success', data: productCategories, filepath: filepath });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = { activeProductCategoriesForWebsite }