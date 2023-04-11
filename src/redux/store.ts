import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import users from './allUsersSlice';
import items from './itemsSlice';
export const store = configureStore({
  reducer: {
    auth,
    users,
    items,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
