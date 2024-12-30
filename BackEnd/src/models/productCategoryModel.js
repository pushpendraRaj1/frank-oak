const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    thumbnail: String,
    parent_category :{
        type:mongoose.Schema.Types.ObjectId, // specifying the forein key, from the primary key(ObjectId) of the table 'parent category'
        ref: 'parent_category'
    },
    slug:{ type: String, required: true, unique: true }, 
    description: String,
    is_featured: { type: Boolean, default: false},
    status: { type: Boolean, default: true, set: value => value === '' ? true : value }, // in case if no value came from user, then set it to true otherwise that value, because when the page was on, there was nothing selected in radio button but we have now included 'checked' in the Display radion button as default in the checkede one so we won't need this attribute 'set', but i just put here for future reference, if i needed this code somewhere else
    created_at: Date,
    update_at: Date,
    deleted_at: { type: Date, default: null }
});


productCategorySchema.pre('save', function () {
    this.created_at = new Date();
})

productCategorySchema.pre('insertOne', function () {
    this.created_at = new Date();
})

productCategorySchema.pre('updateOne', function () {
    this.update_at = new Date();
})

productCategorySchema.pre('findByIdAndUpdate', function () {
    this.created_at = new Date();
})

const productCategoryModel = mongoose.model('product_category', productCategorySchema);

module.exports = productCategoryModel;