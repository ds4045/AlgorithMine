import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import items from './itemsSlice';
import cart from './cartSlice';
import comparison from './comparisonSlice';
export const store = configureStore({
  reducer: {
    auth,
    items,
    cart,
    comparison,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
