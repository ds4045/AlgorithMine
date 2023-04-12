import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Item, ReviewItemType } from '../types/types';
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
    addReviewItem: (
      state,
      action: PayloadAction<{
        reviews: ReviewItemType[];
        itemID: string;
      }>,
    ) => {
      state.items = state.items.map((el) => {
        if (el.id === action.payload.itemID) return { ...el, reviews: action.payload.reviews };
        else return el;
      });
    },
  },
});

export const { addItem, pushAllItems, addReviewItem } = usersSlice.actions;
export default usersSlice.reducer;
