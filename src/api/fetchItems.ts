import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { getDataFromDB } from '../firbase/firebaseAPI';
import { pushAllItems } from '../redux/itemsSlice';
import { Item } from '../types/types';
import { RootState } from '../redux/store';
import { Dispatch, SetStateAction } from 'react';

export const fetchItems = async (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
  setIsLoading?: Dispatch<SetStateAction<any>>,
) => {
  setIsLoading && setIsLoading(true);
  const res = await getDataFromDB('items');
  dispatch(pushAllItems(res as Item[]));
  setIsLoading && setIsLoading(false);
};
