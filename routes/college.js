const express = require('express');
const router = express.Router();
const collegeController = require('../controllers/collegeController');

const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 10,
        fileSize: 10 * 1024 * 1024
    }
});

router.get('/', collegeController.getAllColleges);
router.get('/:id', collegeController.getCollege);
router.get('/logs', collegeController.handleGetCollegeLogs);
router.get('/last', collegeController.getLastCollege);
router.post('/', collegeController.handleNewCollege);
router.put('/', collegeController.updateCollege);
router.put('/facilities', upload.array('images'), collegeController.addFacilities);

module.exports = router;