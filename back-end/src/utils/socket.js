const { createServer } = require('http');
const socket = require('socket.io');
const User = require('../entities/user');

module.exports = {
  socketConnect: async server => {
    const io = socket(server, {
      cors: {
        origin: process.env.CLIENT_SOCKET_ENDPOINT,
        credentials: true,
      },
    });
    // io.set('transports', ['websocket']);
    const socketUser = {};
    const offlineUsersTime = {}; // key is id of user, value is time offline
    const globalUsers = {};
    io.on('connection', socket => {
      socket.on('join-room', data => {
        socket.join(data.chatRoomId);
      });

      socket.on('send-msg', async data => {
        socket.broadcast.to(data.chatRoomId).emit('receive-msg', data);
      });

      socket.on('login', function (data) {
        // console.log('a user ' + data.userId + ' connected');
        socketUser[socket.id] = data.userId;
        globalUsers[data.userId] = socket.id;
        delete offlineUsersTime[data.userId];
        // saving userId to object with socket ID
        io.emit('onlineUser', {
          onlineUsers: globalUsers,
          offlineUsersTime: offlineUsersTime,
        });
      });

      socket.on('logout', async function (data) {
        // console.log('a user ' + data.userId + ' connected');
        const socket_id = globalUsers[data.userId];
        await delete globalUsers[data.userId];
        await delete socketUser[socket_id];
        // saving userId to object with socket ID
        io.emit('onlineUser', {
          onlineUsers: globalUsers,
        });
      });

      socket.on('disconnect', async function () {
        // console.log('user ' + socketUser[socket.id] + ' disconnected');
        offlineUsersTime[socketUser[socket.id]] = new Date();
        // remove saved socket from users object
        const user = await User.findById(socketUser[socket.id]);
        if (user) {
          user.offlineAt = new Date();
          await user.save();
        }
        await delete globalUsers[socketUser[socket.id]];
        await delete socketUser[socket.id];
        await io.emit('onlineUser', {
          onlineUsers: globalUsers,
          offlineUsersTime: offlineUsersTime,
        });

        // io.emit('onlineUser', onlineUsers)
      });

      socket.on('send-friend-request', async data => {
        console.log(data.receiverId, data.myId);
        socket
          .to(globalUsers[data.receiverId])
          .emit('get-friend-request', data.myId);
      });
    });
  },
};
