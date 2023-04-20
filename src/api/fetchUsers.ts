import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { getDataFromDB, getElementFromFirestoreDB } from '../firbase/firebaseAPI';
import { UserFirestoreDB } from '../types/types';
import { RootState } from '../redux/store';
import { isAuthTrue } from '../redux/authSlice';
//NO USED
export const fetchUsers = async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
  const res = await getDataFromDB('users');
  return res;
};
export const fetchSingleUser = async (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
  id: string,
) => {
  const res = await getElementFromFirestoreDB('users', id);
  if (res) dispatch(isAuthTrue(res as UserFirestoreDB));
  return res;
};
