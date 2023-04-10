import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserFirestoreDB } from '../types/types';
type AllUsersState = {
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
  },
});

export const { addUsers, pushAllUsers } = usersSlice.actions;
export default usersSlice.reducer;
