import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    onlineUsers: [],
  },
  reducers: {
    addOnlineUser: (state, action) => {
      state.onlineUsers.push(...action.payload);
    },
  },
});

export const { addOnlineUser } = UserSlice.actions;

export default UserSlice.reducer;
