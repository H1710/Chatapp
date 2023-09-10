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
    closeSocket: (state, action) => {
      state.socket.close();
    },
  },
});

export const { setSocket, closeSocket } = SocketSlice.actions;

export default SocketSlice.reducer;
