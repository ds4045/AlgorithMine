import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { getDataFromDB, getElementFromFirestoreDB } from '../firbase/firebaseAPI';
import { pushAllUsers, replaceUsers } from '../redux/allUsersSlice';
import { UserFirestoreDB } from '../types/types';
import { RootState } from '../redux/store';

export const fetchUsers = async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
  const res = await getDataFromDB('users');
  if (res) dispatch(pushAllUsers(res as UserFirestoreDB[]));
  return res;
};
export const fetchSingleUser = async (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
  id: string,
) => {
  const res = await getElementFromFirestoreDB('users', id);
  if (res) dispatch(replaceUsers({ id, user: res as UserFirestoreDB }));
  return res;
};