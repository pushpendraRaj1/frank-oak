const CartModel = require("../../models/cartModel");

const createCart = async (req, res) => {
    try {
        console.log(req.body);
        const ifCart = await CartModel.find({ user: req.body.user, product: req.body.product, size: req.body.size, color: req.body.color });

        console.log(ifCart);
        if (ifCart.length !== 0) {
            const response = await CartModel.findByIdAndUpdate(ifCart[0]._id, { quantity: ifCart[0].quantity + 1 });
            console.log('Cart Updated =>', response);
            res.status(200).json({ message: 'cart-quantity-updated', data: response });
            return;
        }
        const cartData = new CartModel(req.body);
        const response = await cartData.save();
        console.log('Cart Created =>', response);
        res.status(200).json({ message: 'cart-product-added', data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const readCart = async (req, res) => {
    try {
        const data = await CartModel.find(req.params)
            .populate('user')
            .populate('product')
            .populate('size')
            .populate('color');
        const filepath = `${req.protocol}://${req.get('host')}/frankandoak-files/`;
        res.status(200).json({ message: 'success', data, filepath });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deleteCartProduct = async (req, res) => {
    try {
        console.log(req.params);
        const deletedProduct = await CartModel.findByIdAndDelete(req.params._id)
            .populate('user')
            .populate('product')
            .populate('size')
            .populate('color');
        console.log(deletedProduct);
        res.status(200).json({ message: 'cart-product-deleted', deletedProduct });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateProductQuantityInCart = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);

        const response = await CartModel.findOneAndUpdate(req.params, { quantity: req.body.newQuantity });
        res.status(200).json({ message: 'Product quantity updated successfully', data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    createCart,
    readCart,
    deleteCartProduct,
    updateProductQuantityInCart
};