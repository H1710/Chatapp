import { Server } from 'http';
import { Server as SocketIO } from 'socket.io';
import { Socket } from 'socket.io';
import User from '../entities/user';

export const socketConnect = async (server: Server) => {
  const io = new SocketIO(server, {
    cors: {
      origin: process.env.CLIENT_SOCKET_ENDPOINT,
      credentials: true,
    },
  });

  const socketUser: Record<string, string> = {};
  const offlineUsersTime: Record<string, Date> = {};
  const globalUsers: Record<string, string> = {};

  io.on('connection', (socket: Socket) => {
    socket.on('join-room', data => {
      socket.join(data.chatRoomId);
    });

    socket.on('send-msg', async data => {
      socket.broadcast.to(data.chatRoomId).emit('receive-msg', data);
    });

    socket.on('login', function (data) {
      socketUser[socket.id] = data.userId;
      globalUsers[data.userId] = socket.id;
      delete offlineUsersTime[data.userId];

      io.emit('onlineUser', {
        onlineUsers: globalUsers,
        offlineUsersTime: offlineUsersTime,
      });
    });

    socket.on('logout', async function (data) {
      const socket_id = globalUsers[data.userId];
      delete globalUsers[data.userId];
      delete socketUser[socket_id];

      io.emit('onlineUser', {
        onlineUsers: globalUsers,
      });
    });

    socket.on('disconnect', async function () {
      offlineUsersTime[socketUser[socket.id]] = new Date();

      const user = await User.findById(socketUser[socket.id]);
      if (user) {
        user.offlineAt = new Date();
        await user.save();
      }

      delete globalUsers[socketUser[socket.id]];
      delete socketUser[socket.id];

      io.emit('onlineUser', {
        onlineUsers: globalUsers,
        offlineUsersTime: offlineUsersTime,
      });
    });

    socket.on('send-friend-request', async data => {
      socket
        .to(globalUsers[data.receiverId])
        .emit('get-friend-request', data.myId);
    });
  });
};
