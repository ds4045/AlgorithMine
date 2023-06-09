import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Item, ReviewItemType } from '../types/types';
export type AllItemsState = {
  items: Item[];
  searchedItems: Item[];
};
const initialState: AllItemsState = {
  items: [],
  searchedItems: [],
};

export const itemsSlice = createSlice({
  name: 'allItems',
  initialState,
  reducers: {
    addItemToStore: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
      state.searchedItems.push(action.payload);
    },
    pushAllItems: (state, action: PayloadAction<Array<Item>>) => {
      state.items = action.payload;
      state.searchedItems = action.payload;
    },
    addReviewItem: (
      state,
      action: PayloadAction<{
        reviews: ReviewItemType[];
        itemID: string;
      }>,
    ) => {
      const newItems = state.items.map((el) =>
        el.id === action.payload.itemID ? { ...el, reviews: action.payload.reviews } : el,
      );
      state.items = newItems;
      state.searchedItems = newItems;
    },
    searchItem: (state, action: PayloadAction<string>) => {
      state.searchedItems = state.items.filter((el) =>
        el.title.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
    sortItem: (state, action: PayloadAction<Array<Item>>) => {
      state.searchedItems = action.payload;
    },
    replaceItem: (
      state,
      action: PayloadAction<{
        id: string;
        item: Item;
      }>,
    ) => {
      state.items = state.items.map((el) =>
        el.id === action.payload.id ? action.payload.item : el,
      );
    },
  },
});

export const { addItemToStore, pushAllItems, addReviewItem, searchItem, sortItem, replaceItem } =
  itemsSlice.actions;
export default itemsSlice.reducer;
