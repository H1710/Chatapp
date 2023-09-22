const User = require('../entities/user');
const jwt = require('jsonwebtoken');
const { Token } = require('../utils/generateToken');
const sendVerificationEmail = require('../utils/OTPutil');
const bcrypt = require('bcrypt');

class AuthController {
  static async auth(req, res, next) {
    try {
      const token = req.header('Authorization');
      if (!token)
        return res.status(400).json({ message: 'Invalid Authentication.' });

      const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
      if (!decoded)
        return res.status(400).json({ message: 'Invalid Authentication.' });

      const user = await User.findOne({ _id: decoded._id });
      if (!user)
        return res.status(400).json({ message: 'User does not exist.' });

      req.user = user;

      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .send({ message: 'This account does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).send({ message: 'Password incorrect' });
      }

      if (!user.firstname || !user.lastname) {
        return res
          .status(400)
          .send({ message: 'Account has not been registered' });
      }

      const access_token = await Token.generateAccessToken({ _id: user._id });
      const refresh_token = await Token.generateRefreshToken({ _id: user._id });
      await res.cookie('refreshtoken', refresh_token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
        sameSite: 'none',
      });

      return res.status(200).send({
        message: 'Login successful',
        access_token,
        user: { ...user._doc, password: '' },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to do somthing exceptional' });
    }
  }

  static async refresh_token(req, res, next) {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) {
        return res.status(400).json({ message: 'Please login now' });
      }

      const decode = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);

      if (!decode) return res.status(400).json({ message: 'Please login now' });
      if (decode._id) {
        const user = await User.findById(decode._id)
          .select('-password')
          .populate({
            path: 'chatroom',
            populate: {
              path: 'userIds',
              model: 'User',
              select: '_id firstname lastname avatar',
            },
          })
          .populate({
            path: 'friends',
            populate: {
              path: 'senderId',
              model: 'User',
              select: '_id firstname lastname avatar',
            },
          })
          .populate({
            path: 'friends',
            populate: {
              path: 'receiverId',
              model: 'User',
              select: '_id firstname lastname avatar',
            },
          });
        if (!user) {
          return res
            .status(400)
            .json({ message: 'This account does not exist' });
        }

        const access_token = await Token.generateAccessToken({ _id: user._id });
        return res.status(200).json({ access_token, user });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to do somthing exceptional' });
    }
  }

  static async logout(req, res, next) {
    try {
      await res.clearCookie('refreshtoken', {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        // domain: 'https://chat-app-fe-ruddy.vercel.app/',
      });
      return res.status(200).send({ message: 'Logged out' });
    } catch (err) {
      return res.status(500).send({ message: 'Logout error' });
    }
  }

  static async firstStepRegisteration(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (user && !user.OTPCode) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const OTP = Math.floor(100000 + Math.random() * 900000);

      await sendVerificationEmail(email, OTP);

      const hashedPassword = await bcrypt.hash(password, 10);

      if (user) {
        user.OTPCode = OTP;
        user.password = hashedPassword;
        await user.save();
      } else {
        await User.create({
          email: email,
          OTPCode: OTP,
          password: hashedPassword,
        });
      }

      return res.status(200).send({
        message: 'First step success.Please check your mail to get OTP code',
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: 'Failed to do somthing exceptional' });
    }
  }

  static async submitOTP(req, res, next) {
    try {
      const { email, OTPCode } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      if (OTPCode != user.OTPCode) {
        return res.status(400).json({ message: 'OTP code not correct' });
      }

      user.OTPCode = 0;
      await user.save();

      return res
        .status(200)
        .send({ message: 'Register successfully. Please enter your infor' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to do somthing exceptional' });
    }
  }

  static async setInfo(req, res, next) {
    try {
      const { firstname, lastname, email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      user.firstname = firstname;
      user.lastname = lastname;
      user.save();

      return res.status(200).send({ message: 'Update info success' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to do somthing exceptional' });
    }
  }
}

exports.AuthController = AuthController;
