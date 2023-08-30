import { createSlice } from '@reduxjs/toolkit';

export const SocketSlice = createSlice({
  name: 'socket',
  initialState: {
    socket: {},
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = SocketSlice.actions;

export default SocketSlice.reducer;
