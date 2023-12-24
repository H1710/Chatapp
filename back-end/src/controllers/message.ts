import { Request, Response, NextFunction } from 'express';
import ChatRoom from '../entities/chatRoom';
import Message from '../entities/message';

class MessageController {
  static async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const { chatRoomId, senderId, message } = req.body;

      const chatroom = await ChatRoom.findById(chatRoomId);
      if (!chatroom) {
        return res.status(400).send({ message: 'Chatroom not exist' });
      }

      const trimmedMessage = message.trim();

      const newMessage = new Message({
        content: trimmedMessage,
        senderId: senderId,
      });

      await newMessage.save();

      chatroom.messages.push(newMessage._id);
      await chatroom.save();

      return res
        .status(200)
        .send({ message: 'Send message success', content: trimmedMessage });
    } catch (error) {
      res.status(500).send({ message: 'Something went wrong' });
    }
  }
}

export { MessageController };
