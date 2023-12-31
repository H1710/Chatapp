import { Request, Response, NextFunction } from 'express';
import { IReqAuth } from '../utils/interface';

import User from '../entities/user';
import FriendInvitation from '../entities/friendInvitation';
import cloudinary from '../utils/cloudinary';

class UserController {
  static async getNotifications(
    req: IReqAuth,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId).populate({
        path: 'friends',
        match: { $and: [{ receiverId: userId }] },
        populate: {
          path: 'senderId',
          model: 'User',
          select: '_id firstname lastname avatar',
        },
      });
      return res.status(200).send({ user });
    } catch (err) {
      res
        .status(500)
        .send({ message: 'Something went wrong cannot get notifications' });
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
      return res.json({ msg: 'Logged out' });
    } catch (err) {
      return res.status(500).json({ msg: 'Logout error' });
    }
  }

  static async changeInfo(req: IReqAuth, res: Response, next: NextFunction) {
    if (!req.user)
      return res.status(400).json({ message: 'Invalid Authentication.' });
    const user = req.user;
    const { firstname, lastname, gender, birthday } = req.body;
    user.firstname = firstname;
    user.lastname = lastname;
    user.gender = gender;
    user.birthday = birthday;
    user.save();

    const info = { firstname, lastname, gender, birthday };

    return res.status(200).send({ message: 'Change info success', info: info });
  }

  static async changeAvatar(req: IReqAuth, res: Response, next: NextFunction) {
    try {
      if (!req.user)
        return res.status(400).json({ message: 'Invalid Authentication.' });
      const user = req.user;

      if (!req.file)
        return res.status(400).send({ message: 'Please upload a file' });
      const uploadFile = req.file;

      const result = await cloudinary.uploader.upload(uploadFile.path, {
        public_id: uploadFile.originalname,
        resource_type: 'auto',
        folder: 'chat-app',
        use_filename: true,
        unique_filename: false,
      });

      user.avatar = result.url;

      user.save();

      return res
        .status(200)
        .send({ message: 'Upload image successfully', avatar: result.url });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Something went wrong.Please Try again' });
    }
  }

  static async getFriendsList(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const friends = await FriendInvitation.find({
        $or: [
          { senderId: userId, status: 3 },
          { receiverId: userId, status: 3 },
        ],
      });
      res.status(200).send({ friends: friends });
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong.' });
    }
  }

  static async getAllContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const { myId } = req.body;
      const myUser = await User.findById(myId).populate({
        path: 'chatroom',
        populate: {
          path: 'userIds',
          model: 'User',
          select: '_id firstname lastname',
        },
      });

      return res.status(200).send({ myUser });
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }
}
export { UserController };
