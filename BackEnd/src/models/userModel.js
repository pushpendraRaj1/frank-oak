const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    iShopFor: { type: String, default: 'All' },
    created_at: Date,
    update_at: Date,
    deleted_at: { type: Date, default: null }
})

userSchema.pre('save', function () {
    this.created_at = new Date();
})

userSchema.pre('insertOne', function () {
    this.created_at = new Date();
})

userSchema.pre('updateOne', function () {
    this.update_at = new Date();
})

userSchema.pre('findByIdAndUpdate', function () {
    this.created_at = new Date();
})

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;