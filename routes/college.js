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
router.get('/logs', collegeController.handleGetCollegeLogs);
router.get('/last', collegeController.getLastCollege);
router.get('/:id', collegeController.getCollege);
router.post('/', collegeController.handleNewCollege);
router.put('/:id', collegeController.updateCollege);
router.post('/upload/:id', upload.array('images'), collegeController.addFacilities);
router.post('/logo', upload.single('image'), collegeController.addCollegeLogo);

module.exports = router;