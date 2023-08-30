const { FriendInvitationModel } = require('../models/friendInvitation');
const FriendInvitation = require('../entities/friendInvitation');
const User = require('../entities/user');
const ChatRoom = require('../entities/chatRoom');

class FriendInvitationController {
  static async sendFriendRequest(req, res, next) {
    try {
      const { myId, receiverId } = req.body;

      const myUser = await User.findById(myId);
      if (!myUser) return new ResponseAPI(400, { message: 'User not found' });
      const receiver = await User.findById(receiverId);
      if (!receiver) return new ResponseAPI(400, { message: 'User not found' });

      const myInvitation = await FriendInvitation.create({
        senderId: myId,
        receiverId: receiverId,
        status: 1,
      });

      myUser.friends.push(myInvitation);
      await myUser.save();

      const friendInvitation = await FriendInvitation.create({
        senderId: myId,
        receiverId: receiverId,
        status: 2,
      });

      receiver.friends.push(friendInvitation);
      await receiver.save();

      return res.status(200).send({ message: 'Sended request' });
    } catch (err) {
      res
        .status(500)
        .send({ message: 'Something went wrong cannot send request' });
    }
  }

  static async acceptFriendRequest(req, res, next) {
    try {
      const { myId, senderId } = req.body;

      const myUser = await User.findById(myId);
      if (!myUser) return res.status(400).send({ message: 'User not exist' });
      const sender = await User.findById(senderId);
      if (!sender) return res.status(400).send({ message: 'User not exist' });

      await FriendInvitation.updateMany(
        { $and: [{ senderId: senderId }, { receiverId: myId }] },
        {
          $set: { status: 3 },
        }
      );

      const chatroom = await ChatRoom.create({ userIds: [myId, senderId] });
      myUser.chatroom.push(chatroom._id);
      await myUser.save();
      sender.chatroom.push(chatroom._id);
      await sender.save();
      return res.status(200).send({ message: 'Accept request successfully' });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Something went wrong. Cannot accept request' });
    }
  }

  static async cancelFriendRequest(req, res, next) {
    try {
      const { myId, senderId } = req.body;

      const myUser = await User.findById(myId);
      if (!myUser) return res.status(400).send({ message: 'User not exist' });
      const sender = await User.findById(senderId);
      if (!sender) return res.status(400).send({ message: 'User not exist' });

      const friends = await FriendInvitation.find({
        $and: [{ senderId: senderId }, { receiverId: myId }],
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
        .send({ message: 'Something went wrong. Cannnot cancelled request' });
    }
  }

  static async recallFriendRequest(req, res, next) {
    try {
      const { myId, receiverId } = req.body;

      const myUser = await User.findById(myId);
      if (!myUser) return res.status(400).send({ message: 'User not exist' });
      const receiver = await User.findById(receiverId);
      if (!receiver) return res.status(400).send({ message: 'User not exist' });

      const friends = await FriendInvitation.find({
        $and: [{ receiverId: receiverId }, { sender: myId }],
      }).select('_id');
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

exports.FriendInvitationController = FriendInvitationController;
