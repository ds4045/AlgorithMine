import { FormattedMessage } from 'react-intl';
import { updateForFirestore } from './firebaseAPI';
import { PostType, UserFirestoreDB } from '../types/types';
import { fetchSinglePost } from '../api/fetchPosts';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';
export type ToggleLikeHandlerType = (
  type: 'add' | 'delete',
  user: UserFirestoreDB,
  isAuth: boolean,
  post: PostType,
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>,
  alertError: (text: ReactNode) => void,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
) => Promise<any>;
export const toggleLikeHandler: ToggleLikeHandlerType = async (
  type,
  user,
  isAuth,
  post,
  dispatch,
  alertError,
  setIsLoading,
) => {
  if (!user || !isAuth) return alertError(<FormattedMessage id="posts.check_login" />);
  let like;
  switch (type) {
    case 'add': {
      like = [...post.like, user.id];
      break;
    }
    case 'delete': {
      like = [...post.like.filter((el) => el !== user.id)];
      break;
    }
    default:
      return alert('Something went wrong!');
  }
  try {
    setIsLoading(true);
    await updateForFirestore('posts', post.id, 'like', like);
    await fetchSinglePost(post.id, dispatch);
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};
