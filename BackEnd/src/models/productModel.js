const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    short_description: String,
    price: { type: Number, required: true, },
    mrp: { type: Number, required: true, },
    parent_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'parent_category'
    },
    product_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_category'
    },
    isStockAvail: { type: Boolean },
    brand: String,
    size: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'size',
    }],
    color: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'color',
    }],
    status: {
        type: Boolean,
        default: true,
    },
    thumbnail: String,
    image_on_hover: String,
    gallery: Object,
    created_at: Date,
    update_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
})

productSchema.pre('save', function () {
    this.created_at = new Date();
})

productSchema.pre('insertOne', function () {
    this.created_at = new Date();
})

const productModel = new mongoose.model('product', productSchema);
module.exports = productModel;