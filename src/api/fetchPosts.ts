import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { getDataFromDB, getElementFromFirestoreDB } from '../firbase/firebaseAPI';
import { PostType } from '../types/types';
import { RootState } from '../redux/store';
import { Dispatch, SetStateAction } from 'react';
import { pushAllPosts, replacePost } from '../redux/postsSlice';

export const fetchPosts = async (
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
  setIsLoading?: Dispatch<SetStateAction<any>>,
) => {
  setIsLoading && setIsLoading(true);
  const res = await getDataFromDB('posts');
  dispatch(pushAllPosts(res as PostType[]));
  setIsLoading && setIsLoading(false);
};
export const fetchSinglePost = async (
  id: string,
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
) => {
  const res = await getElementFromFirestoreDB('posts', id);
  dispatch(replacePost({ id, post: res as PostType }));
};
