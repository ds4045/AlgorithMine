import { ThunkDispatch } from '@reduxjs/toolkit';
import { getDataFromDB } from '../firbase/firebaseAPI';
import { pushAllUsers } from '../redux/allUsersSlice';
import { UserFirestoreDB } from '../types/types';

export const fetchUsers = async (dispatch: ThunkDispatch<any, any, any>) => {
  const res = await getDataFromDB('users');
  if (res) dispatch(pushAllUsers(res as UserFirestoreDB[]));
};
