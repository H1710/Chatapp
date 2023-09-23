import { createSlice } from '@reduxjs/toolkit';

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: {},
  },
  reducers: {
    seft: (state, action) => {
      state.auth = action.payload;
    },
    changeAvatar: (state, action) => {
      state.auth.avatar = action.payload;
    },
    changeInfo: (state, action) => {
      state.auth.firstname = action.payload.firstname;
      state.auth.lastname = action.payload.lastname;
      state.auth.gender = action.payload.gender;
      state.auth.birthday = action.payload.birthday;
    },
    addRoom: (state, action) => {
      state.auth.chatroom.push(action.payload.chatroom);
    },
  },
});

export const { seft, changeAvatar, changeInfo, addRoom } = AuthSlice.actions;

export default AuthSlice.reducer;
