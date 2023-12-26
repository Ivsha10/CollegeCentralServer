const express = require('express');
const router = express.Router();
const controller = require('../controllers/chatRoomController');

router.post('/', controller.getChatRoomId);


module.exports = router;