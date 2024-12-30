const mongoose = require('mongoose');

const parentCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    status: { type: Boolean, default: true},
    created_at: Date,
    update_at: Date,
    deleted_at: { type: Date, default: null }
})

parentCategorySchema.pre('save', function () {
    this.created_at = new Date();
})

parentCategorySchema.pre('insertOne', function () {
    this.created_at = new Date();
})

parentCategorySchema.pre('updateOne', function () {
    this.update_at = new Date();
})

parentCategorySchema.pre('findByIdAndUpdate', function () {
    this.created_at = new Date();
})

const parentCategoryModel = mongoose.model('parent_category', parentCategorySchema);

module.exports = parentCategoryModel;

