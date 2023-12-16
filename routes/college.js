const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');

const multer = require('multer');

const upload = multer({ dest: 'files/applicationProcess' });

router.get('/', collegeController.getAllColleges);
router.get('/logs', collegeController.handleGetCollegeLogs);
router.get('/last', collegeController.getLastCollege);
router.post('/', upload.single('file'), collegeController.handleNewCollege);

module.exports = router;