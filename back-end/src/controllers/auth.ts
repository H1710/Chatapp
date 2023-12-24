import { Request, Response, NextFunction } from 'express';
import User from '../entities/user';
import jwt from 'jsonwebtoken';
import { Token } from '../utils/generateToken';
import sendVerificationEmail from '../utils/OTPutil';
import bcrypt from 'bcrypt';
import { IDecodedToken } from '../utils/interface';
import chatRoom from '../entities/chatRoom';

class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user)
        return res
          .status(400)
          .send({ message: 'This account does not exist.' });

      const isMatch = await bcrypt.compare(password, user.password || '');
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
        secure: true,
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

  static async refresh_token(req: Request, res: Response, next: NextFunction) {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) {
        return res.status(400).json({ message: 'Please login now' });
      }

      const decode = <IDecodedToken>(
        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET || '')
      );

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
            options: {
              model: chatRoom,
              select: '-messages',
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
      console.log(error);
      return res
        .status(500)
        .json({ message: 'Failed to do somthing exceptional' });
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
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

  static async firstStepRegisteration(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (user && !user.OTPCode && user.firstname) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const OTP = Math.floor(100000 + Math.random() * 900000);

      await sendVerificationEmail(email, OTP.toString());

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

  static async submitOTP(req: Request, res: Response, next: NextFunction) {
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

  static async setInfo(req: Request, res: Response, next: NextFunction) {
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

export { AuthController };
