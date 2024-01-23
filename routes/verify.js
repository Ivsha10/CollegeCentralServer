const express = require('express');
const router = express.Router();
const verifyController = require('../controllers/verifyController');


router.post('/sendCode', verifyController.sendVerificationCode)
router.post('/', verifyController.verifyAccount);


module.exports = router;