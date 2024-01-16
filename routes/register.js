const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController')
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 10,
        fileSize: 10 * 1024 * 1024
    }
});

router.post('/', upload.single('image'), registerController.handleNewUser);

module.exports = router;