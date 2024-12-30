const multer = require('multer');
const path = require('path');

const storage = (foldername) => multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./src/uploads/${foldername}`);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + Math.floor(Math.random() * 99999999) + path.extname(file.originalname));
    }
})

const upload = (foldername) => multer({ storage: storage(foldername) }).fields(
    [
        {
            name: 'thumbnail',
            maxCount: 1
        },
        {
            name: 'profileImg',
            maxCount: 1
        },
        {
            name: 'logo',
            maxCount: 1
        },
        {
            name: 'favicon',
            maxCount: 1
        },
        {
            name: 'footer_icon',
            maxCount: 1
        },
        {
            name: 'image_on_hover',
            maxCount: 1
        },
        {
            name: 'gallery',
            maxCount: 10
        }
    ]
);

module.exports = upload;