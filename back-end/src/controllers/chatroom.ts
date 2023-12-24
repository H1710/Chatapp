import { Request, Response, NextFunction } from 'express';
import ChatRoom from '../entities/chatRoom';
import User from '../entities/user';
import cloudinary from '../utils/cloudinary';
import { IReqAuth } from '../utils/interface';
import message from '../entities/message';

class ChatRoomController {
  static async createChatroom(
    req: IReqAuth,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userIds, name } = req.body;
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

      const users = JSON.parse(userIds);

      const chatroom = await ChatRoom.create({
        userIds: users,
        avatar: result.url,
        name: name,
      });

      for (const item of users) {
        const user = await User.findById(item);
        if (!user) {
          return res.status(500).send({ message: 'User not found' });
        }
        user.chatroom.push(chatroom._id);
        await user.save();
      }

      res
        .status(200)
        .send({ message: 'Create room success', chatroom: chatroom });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Something went wrong' });
    }
  }

  static async getChatroomData(
    req: IReqAuth,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { chatRoomId } = req.params;
      const chatroom = await ChatRoom.findById(chatRoomId)
        .populate({
          path: 'messages',
          populate: {
            path: 'senderId',
            model: 'User',
            select: '_id firstname lastname avatar',
          },
          options: {
            model: message,
          },
        })
        .populate({
          path: 'userIds',
          model: 'User',
          select: '_id firstname lastname avatar',
        })
        .select('name avatar');

      if (!chatroom) {
        return res.status(500).send({ message: 'Chat room not found' });
      }

      const user = req.user;
      if (!user) {
        return res.status(500).send({ message: 'User not found' });
      }
      let isJoinChatroom = false;
      for (let i = 0; i < chatroom.userIds.length; i++) {
        if (chatroom.userIds[i]._id.toString() === user._id.toString()) {
          isJoinChatroom = true;
          break;
        }
      }

      if (!isJoinChatroom) {
        return res.status(400).send({ message: 'Chatroom not valid' });
      }

      if (!chatroom)
        return res.status(400).send({ message: 'Chatroom not exist' });

      res.status(200).send({ chatroom });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: 'Cannot found chatroom' });
    }
  }
}

export { ChatRoomController };
