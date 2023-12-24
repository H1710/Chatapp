import { createSlice } from '@reduxjs/toolkit';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    onlineUsers: [] as string[],
  },
  reducers: {
    addOnlineUser: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { addOnlineUser } = UserSlice.actions;

export default UserSlice.reducer;
