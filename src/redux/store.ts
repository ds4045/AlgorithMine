import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import users from './allUsersSlice';
export const store = configureStore({
  reducer: {
    auth,
    users,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
