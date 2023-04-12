import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ReviewsUserType, UserFirestoreDB } from '../types/types';

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
    addReviewUser: (state, action: PayloadAction<ReviewsUserType>) => {
      if (state.login) state.login = { ...state.login, reviews: action.payload };
    },
  },
});

export const { isAuthTrue, isAuthFalse, addReviewUser } = authSlice.actions;
export default authSlice.reducer;
