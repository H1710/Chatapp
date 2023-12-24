import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../entities/user';
import { IDecodedToken, IReqAuth } from '../utils/interface';

class AuthMiddleware {
  static async auth(req: IReqAuth, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return res.status(400).json({ message: 'Invalid Authentication.' });
      }

      const decoded = <IDecodedToken>(
        jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
      );
      if (!decoded) {
        return res.status(400).json({ message: 'Invalid Authentication.' });
      }

      const user = await User.findOne({ _id: decoded._id });
      if (!user) {
        return res.status(400).json({ message: 'User does not exist.' });
      }

      req.user = user;

      next();
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }
}

export { AuthMiddleware };
