import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  avatar?: string;
  birthday?: Date;
  gender?: string;
  friends: Types.ObjectId[];
  chatroom: Types.ObjectId[];
  offlineAt?: Date;
  OTPCode: number;
  _doc: object;
}

const userSchema = new Schema<IUser>({
  firstname: {
    type: String,
    default: '',
  },
  lastname: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  avatar: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  gender: {
    type: String,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'FriendInvitation',
    },
  ],
  chatroom: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Chatroom',
    },
  ],
  offlineAt: {
    type: Date,
  },
  OTPCode: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model<IUser>('User', userSchema);
