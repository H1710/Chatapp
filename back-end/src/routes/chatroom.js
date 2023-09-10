const { AuthController } = require('../controllers/auth');
const { ChatRoomController } = require('../controllers/chatroom');
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});
let upload = multer({ storage: storage });

const router = require('express').Router();

router.post(
  '/create',
  upload.single('avatar'),
  AuthController.auth,
  ChatRoomController.createChatroom
);
router.get('/:chatRoomId', ChatRoomController.getChatroomMessages);
module.exports = router;
