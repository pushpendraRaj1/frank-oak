const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    code: { type: String, required: true, unique: true},
    status: { type: Boolean, default: true },
    created_at: Date,
    update_at: Date,
    deleted_at: { type: Date, default: null }
})

colorSchema.pre('save', function () {
    this.created_at = new Date();
})

colorSchema.pre('insertOne', function () {
    this.created_at = new Date();
})

colorSchema.pre('updateOne', function () {
    this.update_at = new Date();
})

colorSchema.pre('findByIdAndUpdate', function () {
    this.created_at = new Date();
})

const colorModel = mongoose.model('color', colorSchema);

module.exports = colorModel;

