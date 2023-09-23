import { combineReducers } from '@reduxjs/toolkit';
import auth from './authReducer';
import alert from './alertReducer';
import socket from './socketReducer';
import otp from './otpReducer';
import chatroom from './chatroomReducer';
import user from './userReducer';

export default combineReducers({
  auth,
  alert,
  socket,
  otp,
  chatroom,
  user,
});
