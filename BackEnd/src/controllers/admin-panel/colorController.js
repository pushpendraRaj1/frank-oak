const colorModel = require("../../models/colorModel");

const addColor = async (req, res) => {
    try {
        console.log(req.body);
        const dataToSave = new colorModel(req.body);
        const savedData = await dataToSave.save();
        res.status(200).json({ message: 'Color Controller', data: savedData });
    }
    catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Color already exists." });
        }

        if (error.name == 'ValidationError') return res.status(400).json({ message: 'required fields are missing!' })
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const readColor = async (req, res) => {
    try {
        const data = await colorModel.find({ deleted_at: null });
        res.status(200).json({ message: 'Success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateStatusColor = async (req, res) => {
    try {
        const response = await colorModel.findByIdAndUpdate(req.params._id, { status: req.body.status })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const deleteColor = async (req, res) => {
    try {
        const response = await colorModel.findByIdAndUpdate(req.params._id, { deleted_at: Date.now() })
        res.status(200).json({ message: 'successfully Deleted', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Serer Error' });
    }
}

const deleteColors = async (req, res) => {
    try {
        const response = await colorModel.updateMany(
            { _id: req.body.checkedColorsIDs }, {
            $set: {
                deleted_at: Date.now()
            }
        });
        res.status(200).json({ message: 'Successfully Deleted', response });
        // console.log(req.body.checkedCategoriesIDs);

    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const colorByID = async (req, res) => {
    try {
        const data = await colorModel.find({ _id: req.params._id });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error);
    }
}

const updateColor = async (req, res) => {
    try {
        const response = await colorModel.findByIdAndUpdate(req.params._id,
            {
                name: req.body.name,
                code: req.body.code
            })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).send({ message: "Color already exists." });
        }
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const deletedColors = async (req, res) => {
    try {
        const data = await colorModel.find({ deleted_at: { $ne: null } });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const recoverColor = async (req, res) => {
    try {
        const response = await colorModel.findByIdAndUpdate(req.params._id, { deleted_at: null })
        res.status(200).json({ message: 'successfully Updated', response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const activatedColors = async (req, res) => {
    try {
        const data = await colorModel.find({ status: true, deleted_at: null });
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const permanentDeleteColor = async (req, res) => {
    try {
        await colorModel.deleteOne(req.params);
        res.status(200).json({ message: 'Permanetly Deleted Successfully' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const recoverColors = async (req, res) => {
    try {
        const response = await colorModel.updateMany(
            { _id: req.body.checkedColorsIDsInBin },
            {
                $set: {
                    deleted_at: null
                }
            });
        res.status(200).json({ message: 'Successfully Deleted', response });

    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const permanentDeleteColors = async (req, res) => {
    try {
        await colorModel.deleteMany({ _id: { $in: req.body.checkedColorsIDsInBin } });
        res.status(200).json({ message: 'Permanetly Deleted Successfully' })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

const searchColors = async (req, res) => {
    try {
        const data = await colorModel.find({
            deleted_at: null,
            $or: [
                { name: { $regex: new RegExp(req.params.key, 'i') } },
                { code: { $regex: new RegExp(req.params.key, 'i') } }
            ]
        })
        console.log(data);
        res.status(200).json({ message: 'succes', data: data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Errror' });
    }
}

module.exports = {
    addColor,
    readColor,
    updateStatusColor,
    deleteColor,
    deleteColors,
    colorByID,
    updateColor,
    deletedColors,
    recoverColor,
    activatedColors,
    permanentDeleteColor,
    recoverColors,
    permanentDeleteColors,
    searchColors
}