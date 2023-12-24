import { IFriendInvitation } from './../entities/friendInvitation';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../entities/user';

class SearchController {
  static async findByFullname(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId, fullname } = req.params;
      const users = await User.find({
        $expr: {
          $regexMatch: {
            input: { $concat: ['$firstname', ' ', '$lastname'] },
            regex: fullname,
            options: 'i',
          },
        },
      }).populate({
        path: 'friends',
        match: { $or: [{ senderId: userId }, { receiverId: userId }] },
      });

      res.status(200).send({ users });
    } catch (err) {
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
}

export { SearchController };
