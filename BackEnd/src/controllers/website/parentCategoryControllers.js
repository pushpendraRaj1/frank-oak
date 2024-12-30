const parentCategoryModel = require("../../models/parentCategoryModel");



const activeParentCategoriesForWebsite = async (req, res) => {
    try {
        const parentCategories = await parentCategoryModel.find({ status: true, deleted_at: null });
        res.status(200).json({ message: 'Success', data: parentCategories});
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = { activeParentCategoriesForWebsite }