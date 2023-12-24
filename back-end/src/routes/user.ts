import { Router } from 'express';
import { UserController } from '../controllers/user';
import multer from 'multer';
import { AuthMiddleware } from '../middlewares/authMiddleware';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage });

const router = Router();

router.get('/get-notifications/:userId', UserController.getNotifications);
router.get('/get-contacts', AuthMiddleware.auth, UserController.getAllContacts);
router.get(
  '/get-friendlist/:userId',
  AuthMiddleware.auth,
  UserController.getFriendsList
);
router.patch('/change-info', AuthMiddleware.auth, UserController.changeInfo);
router.patch(
  '/change-avatar',
  upload.single('avatar'),
  AuthMiddleware.auth,
  UserController.changeAvatar
);

export default router;
