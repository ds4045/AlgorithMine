import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../types/types';
import { saveCartToLocalStorage } from '../helpers/localStorage';
export type AddedCartItems = Item & {
  count: number;
};
export type BasketStateType = {
  addedItems: AddedCartItems[];
  totalPrice: number;
  orderedItems: AddedCartItems[];
};
const initialState: BasketStateType = {
  addedItems: [],
  totalPrice: 0,
  orderedItems: [],
};

export const cartSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      const findItem = state.addedItems.find((item) => item.id === action.payload.id);
      findItem ? findItem.count++ : state.addedItems.push({ ...action.payload, count: 1 });
      state.totalPrice = state.addedItems.reduce((acc, item) => acc + item.price * item.count, 0);
      saveCartToLocalStorage(state.addedItems, 'cart');
    },
    removeItem: (state, action: PayloadAction<Item>) => {
      const findItem = state.addedItems.find((item) => item.id === action.payload.id);
      if (findItem) {
        if (findItem.count - 1 === 0) {
          state.addedItems = state.addedItems.filter((el) => el.id !== findItem.id);
        } else {
          findItem.count--;
        }
      }
      state.totalPrice = state.addedItems.reduce((acc, item) => acc + item.price * item.count, 0);
      saveCartToLocalStorage(state.addedItems, 'cart');
    },
    pushAddedItems: (state, action: PayloadAction<AddedCartItems[]>) => {
      state.addedItems = action.payload;
      state.totalPrice = state.addedItems.reduce((acc, item) => acc + item.price * item.count, 0);
      saveCartToLocalStorage(state.addedItems, 'cart');
    },
    pushOrderedItems: (state) => {
      state.orderedItems = state.orderedItems.concat(state.addedItems);
      state.addedItems = [];
      saveCartToLocalStorage(state.addedItems, 'cart');
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, pushAddedItems, pushOrderedItems } = cartSlice.actions;
export default cartSlice.reducer;
