const ChatRoom = require('../entities/chatRoom');
const Message = require('../entities/message');

class MessageController {
  static async sendMessage(req, res, next) {
    try {
      const { chatRoomId, senderId, message } = req.body;

      const chatroom = await ChatRoom.findById(chatRoomId);
      if (!chatroom)
        return res.status(400).send({ message: 'Chatroom not exist' });

      message.trim();

      const newMessage = new Message({
        content: message,
        senderId: senderId,
      });
      await newMessage.save();

      chatroom.messages.push(newMessage);
      await chatroom.save();

      return res
        .status(200)
        .send({ message: 'Send message success', content: message });
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
}

exports.MessageController = MessageController;
