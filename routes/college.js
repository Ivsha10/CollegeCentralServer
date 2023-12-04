const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');

const multer = require('multer');

const upload = multer({ dest: 'files/applicationProcess' });

router.get('/logs', collegeController.handleGetCollegeLogs);

router.post('/', upload.single('file'), collegeController.handleNewCollege);

module.exports = router;