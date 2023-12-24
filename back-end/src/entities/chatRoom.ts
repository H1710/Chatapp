import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user';

interface IChatroom extends Document {
  name?: string;
  userIds: IUser[];
  avatar?: string;
  messages: mongoose.Schema.Types.ObjectId[];
}

const chatRoomSchema: Schema<IChatroom> = new Schema(
  {
    name: {
      type: String,
    },
    userIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    avatar: {
      type: String,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IChatroom>('Chatroom', chatRoomSchema);
