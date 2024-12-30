const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'size'
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'color'
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const CartModel = mongoose.model('cart', cartSchema);


module.exports = CartModel;