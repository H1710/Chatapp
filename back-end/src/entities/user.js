const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    contentType: {
      type: String,
    },
    imageBase64: {
      type: String,
    },
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FriendInvitation',
    },
  ],
  chatroom: [
    {
      type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('User', userSchema);
