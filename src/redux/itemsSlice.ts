import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../types/types';
type AllItemsState = {
  items: Item[];
};
const initialState: AllItemsState = {
  items: [],
};

export const usersSlice = createSlice({
  name: 'allItems',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    pushAllItems: (state, action: PayloadAction<Array<Item>>) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, pushAllItems } = usersSlice.actions;
export default usersSlice.reducer;
