import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { getElementFromFirestoreDB } from '../firbase/firebaseAPI';
import { UserFirestoreDB } from '../types/types';
import { RootState } from '../redux/store';
import { isAuthTrue } from '../redux/authSlice';

export const fetchSingleUser = async (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
  id: string,
) => {
  const res = await getElementFromFirestoreDB('users', id);
  if (res) dispatch(isAuthTrue(res as UserFirestoreDB));
  return res;
};
