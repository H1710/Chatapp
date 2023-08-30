const { OTPMiddleware } = require('../controllers/otp');

const router = require('express').Router();

router.post('/send', OTPMiddleware.sendOTP);
router.post('/resend', OTPMiddleware.resendOTP);
router.post('/confirm', OTPMiddleware.confirmOTP);

module.exports = router;
