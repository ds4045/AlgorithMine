import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuth } from '../../firbase/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import styles from './auth.module.css';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch } from '../../redux/hooks';
import { fetchSingleUser } from '../../api/fetchUsers';
import { isAuthTrue } from '../../redux/authSlice';
import { UserFirestoreDB } from '../../types/types';
import { setUserDataCookie } from '../../hooks/useAutoSignIn';
import { addNewDataForDBWithId } from '../../firbase/firebaseAPI';

type GoogleFormProps = {
  buttonName: any;
};

const GoogleAuth: FC<GoogleFormProps> = ({ buttonName }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLoginWithGoogleSubmit = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      if (auth.currentUser?.uid) {
        let newUser: UserFirestoreDB | false | { id: string } = await fetchSingleUser(
          dispatch,
          auth.currentUser.uid,
        );
        if (!newUser) {
          newUser = {
            name: auth.currentUser?.displayName ?? '',
            surname: '',
            email: auth.currentUser?.email ?? '',
            age: '',
            reviews: {},
            image: auth.currentUser?.photoURL ?? '',
            orders: [],
            city: '',
            phone: '',
            cart: [],
            isAdmin: false,
            favorites: [],
            id: auth.currentUser?.uid ?? '',
          };
          await addNewDataForDBWithId(newUser as UserFirestoreDB, 'users');
        }
        dispatch(isAuthTrue(newUser as UserFirestoreDB));
        setUserDataCookie({
          email: googleAuth.providerId,
          password: googleAuth.providerId,
        });
        navigate('/');
      }
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <div className={styles.login_with_Google}>
      <button onClick={handleLoginWithGoogleSubmit}>
        {buttonName} <FcGoogle className={styles.google_icon} />
      </button>
    </div>
  );
};

export default GoogleAuth;
