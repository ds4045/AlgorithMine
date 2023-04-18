import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { getDataFromDB } from '../firbase/firebaseAPI';
import { PostType } from '../types/types';
import { RootState } from '../redux/store';
import { Dispatch, SetStateAction } from 'react';
import { pushAllPosts } from '../redux/postsSlice';

export const fetchPosts = async (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
  setIsLoading?: Dispatch<SetStateAction<any>>,
) => {
  setIsLoading && setIsLoading(true);
  const res = await getDataFromDB('posts');
  dispatch(pushAllPosts(res as PostType[]));
  setIsLoading && setIsLoading(false);
};
