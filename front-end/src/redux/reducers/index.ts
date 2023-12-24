import { combineReducers } from '@reduxjs/toolkit';
import auth from './authReducer';
import socket from './socketReducer';
import chatroom from './chatroomReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  auth,
  socket,
  chatroom,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
