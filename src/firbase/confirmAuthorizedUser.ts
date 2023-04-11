import { Auth } from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';
import { AppDispatch } from '../redux/store';
import { setUserDataCookie } from '../hooks/useAutoSignIn';
import { isAuthTrue } from '../redux/authSlice';
import { UserFirestoreDB } from '../types/types';

type ConfirmAuthorizedUserType = (
  auth: Auth,
  email: string,
  password: string,
  dispatch: AppDispatch,
  navigate: NavigateFunction,
  newUser: UserFirestoreDB,
) => void;

export const confirmAuthorizedUser: ConfirmAuthorizedUserType = (
  auth,
  email,
  password,
  dispatch,
  navigate,
  newUser,
) => {
  if (auth?.currentUser?.email) {
    dispatch(isAuthTrue(newUser));
    navigate('/');
    setUserDataCookie({ email, password });
  }
};
