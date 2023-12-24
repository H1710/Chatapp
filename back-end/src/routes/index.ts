import { Router, Request, Response } from 'express';
import userRoute from '../routes/user';
import invitationRoute from './invite';
import messageRoute from './message';
import searchRoute from './search';
import chatroomRoute from './chatroom';
import authRoute from './auth';

const router = Router();

router.use('/user', userRoute);
router.use('/message', messageRoute);
router.use('/invite', invitationRoute);
router.use('/search', searchRoute);
router.use('/chatroom', chatroomRoute);
router.use('/auth', authRoute);

router.get('/ok', async (req: Request, res: Response) => {
  return res.status(200).send({ ok: 'ok' });
});

router.use('/', (req: Request, res: Response) => {
  res.status(404).send({ message: 'Not Found' });
});

export default router;
