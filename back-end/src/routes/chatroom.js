const { ChatRoomController } = require('../controllers/chatroom');

const router = require('express').Router();

router.post('/create', ChatRoomController.createChatroom);
router.get('/:chatRoomId', ChatRoomController.getChatroomMessages);
module.exports = router;
