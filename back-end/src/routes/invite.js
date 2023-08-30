const {
  FriendInvitationController,
} = require('../controllers/friendInvitation');

const router = require('express').Router();

router.post('/send', FriendInvitationController.sendFriendRequest);
router.post('/accept', FriendInvitationController.acceptFriendRequest);
router.post('/cancel', FriendInvitationController.cancelFriendRequest);
router.post('/recall', FriendInvitationController.recallFriendRequest);

module.exports = router;
