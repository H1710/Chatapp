import { Router } from 'express';
import { FriendInvitationController } from '../controllers/friendInvitation';

const router = Router();

router.post('/send', FriendInvitationController.sendFriendRequest);
router.post('/accept', FriendInvitationController.acceptFriendRequest);
router.post('/cancel', FriendInvitationController.cancelFriendRequest);
router.post('/recall', FriendInvitationController.recallFriendRequest);

export default router;
