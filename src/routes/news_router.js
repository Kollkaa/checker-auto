const express = require('express');
const router = express.Router();
const news = require('../services/news');
const multer = require("multer");
const storage = multer.memoryStorage();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString()+ "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
var multipartUpload=multer({ storage }).single('images')
// const deleteUser = require('./delete_user.js');
// const updateUser = require('./update_user.js');

router.get(`/`, news.getNews);
router.get(`/:id`,news.getNewById);
router.post(`/`,multipartUpload, news.createNews);
router.delete(`/:id`, news.deleteNews);
router.put(`/:id`, news.updateNews);

module.exports = router;

