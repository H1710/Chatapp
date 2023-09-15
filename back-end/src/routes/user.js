const { AuthController } = require('../controllers/auth');
const { UserController } = require('../controllers/user');
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

router.get('/get-notifications/:userId', UserController.getNotifications);
router.get('/get-contacts', UserController.getAllContacts);
router.get('/get-friendlist/:userId', UserController.getFriendsList);
router.patch('/change-info', AuthController.auth, UserController.changeInfo);
router.patch(
  '/change-avatar',
  upload.single('avatar'),
  AuthController.auth,
  UserController.changeAvatar
);

module.exports = router;
