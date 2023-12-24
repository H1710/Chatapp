import mongoose, { Schema, Document } from 'mongoose';

export interface IFriendInvitation extends Document {
  senderId: mongoose.Schema.Types.ObjectId;
  receiverId: mongoose.Schema.Types.ObjectId;
  status: number;
}

const friendInvitationSchema: Schema<IFriendInvitation> = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1, 2, 3], // 'add friend', 'requested', 'pending', 'friends'
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFriendInvitation>(
  'FriendInvitation',
  friendInvitationSchema
);
