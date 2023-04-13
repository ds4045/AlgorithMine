import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuth } from '../../firbase/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import styles from './auth.module.css';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { confirmAuthorizedUser } from '../../firbase/confirmAuthorizedUser';
import { addUsers } from '../../redux/allUsersSlice';
import { addDataForDB } from '../../firbase/firebaseAPI';

type GoogleFormProps = {
  buttonName: any;
};

const GoogleAuth: FC<GoogleFormProps> = ({ buttonName }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const allUsers = useAppSelector((state) => state.users.users);
  const handleLoginWithGoogleSubmit = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      const newUser = {
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
      confirmAuthorizedUser(
        auth,
        googleAuth.providerId,
        googleAuth.providerId,
        dispatch,
        navigate,
        newUser,
      );
      if (allUsers.some((user) => user.email === auth.currentUser?.email)) return;
      else if (!newUser.email) return;
      else {
        dispatch(addUsers(newUser));
        addDataForDB('users', newUser);
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
