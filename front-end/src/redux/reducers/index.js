import { combineReducers } from '@reduxjs/toolkit';
import auth from './authReducer';
import alert from './alertReducer';
import socket from './socketReducer';
import chatroom from './chatroomReducer';
import user from './userReducer';

export default combineReducers({
  auth,
  alert,
  socket,
  chatroom,
  user,
});
