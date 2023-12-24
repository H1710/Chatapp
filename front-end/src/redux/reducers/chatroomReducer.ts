import { createSlice } from '@reduxjs/toolkit';

export const ChatroomSlice = createSlice({
  name: 'chatroom',
  initialState: {
    currentRoom: null,
  },
  reducers: {
    changeRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
  },
});

export const { changeRoom } = ChatroomSlice.actions;

export default ChatroomSlice.reducer;
