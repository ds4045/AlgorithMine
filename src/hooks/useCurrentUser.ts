import { useEffect, useState } from 'react';
import { UserFirestoreDB } from '../types/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { isAuthTrue } from '../redux/authSlice';

export const useCurrentUser = (): UserFirestoreDB | null => {
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector((state) => state.users.users);
  const currentUserEmail = useAppSelector((state) => state.auth.login?.email);
  const [currentUser, setCurrentUser] = useState<UserFirestoreDB | null>(null);

  useEffect(() => {
    if (allUsers.length > 0 && currentUserEmail) {
      const user = allUsers.find((el) => el.email === currentUserEmail);
      if (user?.id) {
        setCurrentUser(user);
        dispatch(isAuthTrue(user));
      }
    }
  }, [allUsers, currentUserEmail, dispatch]);

  return currentUser;
};
