import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserFirestoreDB } from '../types/types';

type AuthStateType = {
  isAuth: boolean;
  login: null | UserFirestoreDB;
};
const initialState: AuthStateType = {
  isAuth: false,
  login: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isAuthTrue: (state, action: PayloadAction<UserFirestoreDB>) => {
      state.isAuth = true;
      state.login = action.payload;
    },
    isAuthFalse: (state) => {
      state.isAuth = false;
      state.login = null;
    },
  },
});

export const { isAuthTrue, isAuthFalse } = authSlice.actions;
export default authSlice.reducer;
