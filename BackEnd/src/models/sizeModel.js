const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    order: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true, set: value => value === '' ? true : value },
    created_at: Date,
    update_at: Date,
    deleted_at: { type: Date, default: null }
})

sizeSchema.pre('save', function () {
    this.created_at = new Date();
})

sizeSchema.pre('insertOne', function () {
    this.created_at = new Date();
})

sizeSchema.pre('updateOne', function () {
    this.update_at = new Date();
})

sizeSchema.pre('findByIdAndUpdate', function () {
    this.created_at = new Date();
})

const sizeModel = mongoose.model('size', sizeSchema);

module.exports = sizeModel;

