import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserFirestoreDB } from '../types/types';
export type AllUsersState = {
  users: UserFirestoreDB[];
};
const initialState: AllUsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<UserFirestoreDB>) => {
      state.users.push(action.payload);
    },
    pushAllUsers: (state, action: PayloadAction<Array<UserFirestoreDB>>) => {
      state.users = action.payload;
    },
    replaceUsers: (
      state,
      action: PayloadAction<{
        id: string;
        user: UserFirestoreDB;
      }>,
    ) => {
      state.users = state.users.map((el) =>
        el.id === action.payload.id ? action.payload.user : el,
      );
    },
  },
});

export const { addUsers, pushAllUsers, replaceUsers } = usersSlice.actions;
export default usersSlice.reducer;
