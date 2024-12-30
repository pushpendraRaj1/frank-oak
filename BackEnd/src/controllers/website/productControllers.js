const productModel = require("../../models/productModel");

const activeProductsForWebsite = async (req, res) => {
    try {
        const products = await productModel.find({ status: true, deleted_at: null }).populate('parent_category').populate('product_category').populate('size').populate('color');
        const filepath = `${req.protocol}://${req.get('host')}/frankandoak-files/`;
        res.status(200).json({ message: 'Success', data: products, filepath: filepath });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const searchProductsForWebsite = async (req, res) => {
    try {
        const key = req.params.key;
        const products = await productModel.find({
            deleted_at: null,
            $or: [
                { name: { $regex: new RegExp(key, 'i') } },
                { description: { $regex: new RegExp(key, 'i') } },
                { short_description: { $regex: new RegExp(key, 'i') } },
                !isNaN(key) ? { price: Number(key) } : null, // Check if key is a number
            ].filter(Boolean), // if product is not searched by price then it will give error so need to apply filter to filter out null values
        }).populate('parent_category').populate('product_category').populate('size').populate('color');

        const filepath = `${req.protocol}://${req.get('host')}/frankandoak-files/`;

        res.status(200).json({ message: 'Success', products, filepath: filepath });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = { activeProductsForWebsite, searchProductsForWebsite }