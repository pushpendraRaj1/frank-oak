const express = require('express');
const { testAdmin, adminLogin, updateAdmin, generateOTP, updateEmail } = require('../../controllers/controllers');
const upload = require('../../middlewares/multer');
const adminRoutes = express.Router();

adminRoutes.get('/test-admin', testAdmin); // http://localhost:4000/api/admin-panel/test-admin
adminRoutes.post('/login', adminLogin); // http://localhost:4000/api/admin-panel/login
adminRoutes.put('/update-admin/:_id', upload('admin'), updateAdmin);
adminRoutes.post('/generate-otp', generateOTP);
adminRoutes.post('/update-email', updateEmail);

module.exports = adminRoutes;