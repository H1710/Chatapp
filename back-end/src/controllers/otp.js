const { otpModel } = require('../models/otp');
const { transportOTP } = require('../utils/OTPutil');
const User = require('../entities/user');

class OTPMiddleware {
  static async sendOTP(req, res, next) {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const OTP = Math.floor(100000 + Math.random() * 900000);

    user.OTPCode = OTP;

    return res.status(200).send('Send OTP successfully');
  }

  static async resendOTP(req, res, next) {
    const { username, email } = req.body;
    const result = await otpModel.resendOTP(username, email);
    return res.status(result.getStatusCode()).send(result.getData());
  }

  static async confirmOTP(req, res, next) {
    const { OTPcode, username, phone, password, email, fullname } = req.body;
    const result = await otpModel.confirmOTP(
      OTPcode,
      username,
      phone,
      password,
      email,
      fullname
    );
    return res.status(result.getStatusCode()).send(result.getData());
  }
}

exports.OTPMiddleware = OTPMiddleware;
