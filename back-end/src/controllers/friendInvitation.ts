import { Response, Request, NextFunction } from 'express';
import FriendInvitation from '../entities/friendInvitation';
import User from '../entities/user';
import ChatRoom from '../entities/chatRoom';

class FriendInvitationController {
  static async sendFriendRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { senderId, receiverId } = req.body;

      const myUser = await User.findById(senderId);
      if (!myUser) return res.status(400).send({ message: 'User not found' });
      const receiver = await User.findById(receiverId);
      if (!receiver) return res.status(400).send({ message: 'User not found' });

      const myInvitation = await FriendInvitation.create({
        senderId: senderId,
        receiverId: receiverId,
        status: 1,
      });

      myUser.friends.push(myInvitation._id);
      await myUser.save();

      const friendInvitation = await FriendInvitation.create({
        senderId: senderId,
        receiverId: receiverId,
        status: 2,
      });

      receiver.friends.push(friendInvitation._id);
      await receiver.save();

      return res.status(200).send({ message: 'Sended request' });
    } catch (err) {
      res
        .status(500)
        .send({ message: 'Something went wrong cannot send request' });
    }
  }

  static async acceptFriendRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { receiverId, senderId } = req.body;

      const myUser = await User.findById(receiverId);
      if (!myUser) return res.status(400).send({ message: 'User not exist' });
      const sender = await User.findById(senderId);
      if (!sender) return res.status(400).send({ message: 'User not exist' });

      await FriendInvitation.updateMany(
        { $and: [{ senderId: senderId }, { receiverId: receiverId }] },
        {
          $set: { status: 3 },
        }
      );

      const chatroom = await ChatRoom.create({
        userIds: [receiverId, senderId],
      });
      myUser.chatroom.push(chatroom._id);
      await myUser.save();
      sender.chatroom.push(chatroom._id);
      await sender.save();

      const info = await chatroom.populate({
        path: 'userIds',
        model: 'User',
        select: '_id firstname lastname avatar',
      });
      return res
        .status(200)
        .send({ message: 'Accept request successfully', chatroom: info });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Something went wrong. Cannot accept request' });
    }
  }

  static async cancelFriendRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { receiverId, senderId } = req.body;

      const myUser = await User.findById(receiverId);
      if (!myUser) return res.status(400).send({ message: 'User not exist' });
      const sender = await User.findById(senderId);
      if (!sender) return res.status(400).send({ message: 'User not exist' });

      const friends = await FriendInvitation.find({
        $and: [{ senderId: senderId }, { receiverId: receiverId }],
      }).select('_id');
      await FriendInvitation.deleteMany({
        _id: { $in: friends },
      });

      for (let i = 0; i < friends.length; i++) {
        await myUser.updateOne({
          $pull: { friends: friends[i]._id.toString() },
        });
        await sender.updateOne({
          $pull: { friends: friends[i]._id.toString() },
        });
      }

      return res.status(200).send({ message: 'Canceled request' });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Something went wrong. Cannot cancelled request' });
    }
  }

  static async recallFriendRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { senderId, receiverId } = req.body;

      const myUser = await User.findById(senderId);
      if (!myUser) return res.status(400).send({ message: 'User not exist' });
      const receiver = await User.findById(receiverId);
      if (!receiver) return res.status(400).send({ message: 'User not exist' });

      const friends = await FriendInvitation.find({
        receiverId,
        senderId: senderId,
      });
      await FriendInvitation.deleteMany({
        _id: { $in: friends },
      });

      for (let i = 0; i < friends.length; i++) {
        await myUser.updateOne({
          $pull: { friends: friends[i]._id.toString() },
        });
        await receiver.updateOne({
          $pull: { friends: friends[i]._id.toString() },
        });
      }

      return res.status(200).send({ message: 'Canceled request' });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Something went wrong. Cannot recall request' });
    }
  }
}
export { FriendInvitationController };
