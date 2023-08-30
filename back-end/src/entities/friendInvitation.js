const mongoose = require('mongoose');

const friendInvitationSchema = new mongoose.Schema(
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
      enums: [
        0, //'add friend'
        1, //'requested'
        2, //'pending'
        3, //'friends'
      ],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('FriendInvitation', friendInvitationSchema);
