import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../types/types';
import { FormattedMessage } from 'react-intl';

export type ComparisonStateType = {
  addedItems: Item[];
};
const initialState: ComparisonStateType = {
  addedItems: [],
};

export const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    addItemToComparison: (
      state,
      action: PayloadAction<{
        item: Item;
        alertError: (text: React.ReactNode) => void;
        alertSuccess: (text: React.ReactNode) => void;
      }>,
    ) => {
      if (state.addedItems.length >= 3)
        action.payload.alertError(<FormattedMessage id="catalog.comparison_more2" />);
      else if (state.addedItems.some((el) => el.id === action.payload.item.id))
        action.payload.alertError(<FormattedMessage id="catalog.comparison_already_added" />);
      else {
        state.addedItems.push(action.payload.item);
        action.payload.alertSuccess(<FormattedMessage id="catalog.comparison_add" />);
      }
    },
    removeItemFromComparison: (state, action: PayloadAction<string>) => {
      state.addedItems = state.addedItems.filter((el) => el.id !== action.payload);
    },
  },
});

export const { addItemToComparison, removeItemFromComparison } = comparisonSlice.actions;
export default comparisonSlice.reducer;
