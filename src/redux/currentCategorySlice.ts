import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CategoryType } from '../types/types';

export type CurrentCategoryStateType = {
  currentCategory: CategoryType;
};
const initialState: CurrentCategoryStateType = {
  currentCategory: 'Asic',
};

export const currentCategorySlice = createSlice({
  name: 'currentCategory',
  initialState,
  reducers: {
    setCurrentCategory: (state, action: PayloadAction<CategoryType>) => {
      if (state.currentCategory === action.payload) return;
      state.currentCategory = action.payload;
    },
  },
});

export const { setCurrentCategory } = currentCategorySlice.actions;
export default currentCategorySlice.reducer;
