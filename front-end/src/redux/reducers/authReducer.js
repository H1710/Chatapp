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
  },
});

export const { seft } = AuthSlice.actions;

export default AuthSlice.reducer;
