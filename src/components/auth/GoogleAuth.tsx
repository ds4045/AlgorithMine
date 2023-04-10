import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleAuth } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import styles from './auth.module.css';
import { FcGoogle } from 'react-icons/fc';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { confirmAuthorizedUser } from '../../helpers/confirmAuthorizedUser';
import { addUsers } from '../../redux/allUsersSlice';
import { addUsersForFirestoreDB } from '../../helpers/firestoreDBUsers';

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
        id: auth?.currentUser?.uid ?? '',
        name: auth.currentUser?.displayName ?? '',
        surname: '',
        email: auth.currentUser?.email ?? '',
        age: '',
        reviews: [],
        image: auth.currentUser?.photoURL ?? '',
        orders: [],
        city: '',
        phone: '',
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
        addUsersForFirestoreDB(newUser);
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
