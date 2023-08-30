const { ChatroomModel } = require('../models/chatroom');
const ChatRoom = require('../entities/chatRoom');

class ChatRoomController {
  static async createChatroom(req, res, next) {
    const userIDs = req.body;
    const result = await ChatroomModel.createChatroom(userIDs);
    return res.status(result.getStatusCode()).send(result.getData());
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
            select: '_id firstname lastname',
          },
        })
        .populate({
          path: 'userIds',
          model: 'User',
          select: '_id firstname lastname',
        });
      if (!chatroom)
        return res.status(400).send({ message: 'Chatroom not exist' });
      res.status(200).send({ chatroom });
    } catch (err) {
      res.status(500).send({ message: 'Cannot found chatroom' });
    }
  }
}

exports.ChatRoomController = ChatRoomController;
