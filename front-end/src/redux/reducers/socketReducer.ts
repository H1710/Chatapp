import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket;
}

const initialState: any = {
  socket: {} as Socket,
};

export const SocketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket>) => {
      state.socket = action.payload;
    },
    closeSocket: state => {
      state.socket.close();
    },
  },
});

export const { setSocket, closeSocket } = SocketSlice.actions;

export default SocketSlice.reducer;
