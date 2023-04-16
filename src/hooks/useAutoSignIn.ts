import { useAppDispatch } from './../redux/hooks';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleAuth } from '../firbase/firebaseConfig';
import { isAuthTrue } from '../redux/authSlice';
import { fetchSingleUser } from '../api/fetchUsers';
import { UserFirestoreDB } from '../types/types';

type UserData = {
  email: string;
  password: string;
};

const useAutoSignIn = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const autoSignIn = async () => {
      const userDataCookie = Cookies.get('userData');
      if (!userDataCookie) return;
      const userData: UserData = JSON.parse(userDataCookie);
      const signInPromise =
        userData.email === 'google.com' && userData.password === 'google.com'
          ? signInWithPopup(auth, googleAuth)
          : signInWithEmailAndPassword(auth, userData.email, userData.password);
      try {
        await signInPromise;
        if (auth.currentUser?.uid) {
          const newUser = await fetchSingleUser(dispatch, auth.currentUser.uid);
          newUser && dispatch(isAuthTrue(newUser as UserFirestoreDB));
        }
      } catch (error) {
        console.log(error);
      }
    };
    autoSignIn();
  }, [dispatch]);
};

const setUserDataCookie = (userData: UserData | null) => {
  if (userData === null) Cookies.remove('userData');
  else {
    const jsonUserData = JSON.stringify(userData);
    Cookies.set('userData', jsonUserData, { expires: 7 });
  }
};

export { useAutoSignIn, setUserDataCookie };
