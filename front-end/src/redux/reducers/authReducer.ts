import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../models/user.model';

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: {
      _id: '',
      access_token: '',
      chatroom: [],
      email: '',
      firstname: '',
      friends: [],
      birthday: '',
      lastname: '',
      avatar: '',
      offlineAt: new Date(),
    } as User,
  },
  reducers: {
    setAuth: (state, action: PayloadAction<User>) => {
      state.auth = action.payload;
    },
    changeAvatar: (state, action: PayloadAction<string>) => {
      state.auth.avatar = action.payload;
    },
    changeInfo: (state, action: PayloadAction<Partial<User>>) => {
      state.auth = { ...state.auth, ...action.payload };
    },
  },
});

export const { setAuth, changeAvatar, changeInfo } = AuthSlice.actions;
export default AuthSlice.reducer;
