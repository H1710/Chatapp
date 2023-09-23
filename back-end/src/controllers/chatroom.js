const ChatRoom = require('../entities/chatRoom');
const User = require('../entities/user');
const cloudinary = require('../utils/cloudinary');

class ChatRoomController {
  static async createChatroom(req, res, next) {
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

      const users = userIds.split(',');

      const chatroom = await ChatRoom.create({
        userIds: users,
        avatar: result.url,
        name: name,
      });

      users.forEach(async item => {
        const user = await User.findById(item);
        user.chatroom.push(chatroom._id);
        await user.save();
      });
      return res
        .status(200)
        .send({ message: 'Create room success', chatroom: chatroom });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'Something went wrong' });
    }
  }

  static async getChatroomMessages(req, res, next) {
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
        })
        .populate({
          path: 'userIds',
          model: 'User',
          select: '_id firstname lastname avatar',
        });

      const user = req.user;
      let isJoinChatroom = false;
      for (let i = 0; i < chatroom.userIds.length; i++) {
        if (chatroom.userIds[i]._id.equals(user._id)) {
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
      res.status(500).send({ message: 'Cannot found chatroom' });
    }
  }
}

exports.ChatRoomController = ChatRoomController;
