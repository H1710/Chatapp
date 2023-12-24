import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  content: string;
  senderId: mongoose.Schema.Types.ObjectId;
}

const messageSchema: Schema<IMessage> = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMessage>('Message', messageSchema);
