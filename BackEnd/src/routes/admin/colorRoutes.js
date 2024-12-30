const express = require('express');
const { addColor, readColor, updateStatusColor, deleteColor, deleteColors, colorByID, updateColor, deletedColors, recoverColor, activatedColors, permanentDeleteColor, recoverColors, permanentDeleteColors, searchColors } = require('../../controllers/controllers');

const colorRoutes = express.Router();

colorRoutes.post('/add-color', addColor);
colorRoutes.get('/read-color', readColor);
colorRoutes.put('/update-status/:_id', updateStatusColor);
colorRoutes.put('/delete-color/:_id', deleteColor);
colorRoutes.put('/delete-colors', deleteColors);
colorRoutes.get('/read-color/:_id', colorByID);
colorRoutes.put('/update-color/:_id', updateColor);
colorRoutes.get('/deleted-colors', deletedColors);
colorRoutes.put('/recover-color/:_id', recoverColor);
colorRoutes.get('/activated-colors', activatedColors);
colorRoutes.delete('/permanent-delete-color/:_id', permanentDeleteColor);
colorRoutes.put('/recover-colors', recoverColors);
colorRoutes.delete('/permanent-delete-colors', permanentDeleteColors);
colorRoutes.post('/search-colors/:key', searchColors);

module.exports = colorRoutes;