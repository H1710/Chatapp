const { AuthController } = require('../controllers/auth');
const { UserController } = require('../controllers/user');

const router = require('express').Router();

router.get('/get-all-users', UserController.getAllUsers);
router.get('/get-notifications/:userId', UserController.getNotifications);
router.get('/get-contacts', UserController.getAllContacts);
router.get('/get-friendlist/:id', UserController.getFriendsList);
router.get('/:userId', UserController.getUserById);
router.post('/change-password', UserController.changePassword);
router.post('/forgot-password', UserController.forgotPassword);
router.patch('/change-info', AuthController.auth, UserController.changeInfo);

module.exports = router;
