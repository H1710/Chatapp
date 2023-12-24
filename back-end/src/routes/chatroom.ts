import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { ChatRoomController } from '../controllers/chatroom';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});
const upload = multer({ storage: storage });

const router = Router();

router.post(
  '/create',
  upload.single('avatar'),
  AuthMiddleware.auth,
  ChatRoomController.createChatroom
);
router.get(
  '/:chatRoomId',
  AuthMiddleware.auth,
  ChatRoomController.getChatroomData
);

export default router;
