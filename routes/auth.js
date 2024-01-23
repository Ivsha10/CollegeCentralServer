const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.handleSignIn);

router.post('/changePwd', authController.handleChangePwd )



module.exports = router;