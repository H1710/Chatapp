import { Router } from 'express';
import { MessageController } from '../controllers/message';

const router = Router();

router.post('/send', MessageController.sendMessage);

export default router;
