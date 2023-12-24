import { Router } from 'express';
import { AuthController } from '../controllers/auth';

const router = Router();

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/first-step-registration', AuthController.firstStepRegisteration);
router.post('/submitOTP', AuthController.submitOTP);
router.post('/setInfo', AuthController.setInfo);
router.get('/refresh_token', AuthController.refresh_token);

export default router;
