const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: String,
    name: String,
    fb: String,
    insta: String,
    youtube: String,
    twitter: String,
    profileImg: String,
    logo: String,
    favicon: String,
    footer_icon: String
})

const AdminModel = mongoose.model('admins', adminSchema);

module.exports = AdminModel;