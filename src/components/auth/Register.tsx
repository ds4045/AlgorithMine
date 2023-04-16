import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
} from 'firebase/auth';
import { FC, FormEvent, useState } from 'react';
import { auth } from '../../firbase/firebaseConfig';
import styles from './auth.module.css';
import Form from '../UI/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { FormattedMessage } from 'react-intl';
import GoogleAuth from './GoogleAuth';
import { addNewUserForDB } from '../../firbase/firebaseAPI';
import { isAuthTrue } from '../../redux/authSlice';
import { UserFirestoreDB } from '../../types/types';
import { setUserDataCookie } from '../../hooks/useAutoSignIn';

const Register: FC = () => {
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      await setPersistence(auth, browserSessionPersistence);
      const newUser: UserFirestoreDB = {
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
      addNewUserForDB(newUser);
      dispatch(isAuthTrue(newUser));
      navigate('/');
      setUserDataCookie({
        email: registerEmail,
        password: registerPassword,
      });
      setRegisterEmail('');
      setRegisterPassword('');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form_container}>
        <h3>
          <FormattedMessage id="auth.titleCreate" />
        </h3>
        <Form
          handleSubmit={handleRegisterSubmit}
          setEmail={setRegisterEmail}
          setPassword={setRegisterPassword}
          email={registerEmail}
          password={registerPassword}
          buttonName={<FormattedMessage id="auth.btn_register" />}
        />
        <GoogleAuth buttonName={<FormattedMessage id="auth.titleRegGoogle" />} />
        <div className={styles.links}>
          <Link to="/login">
            <p>
              <FormattedMessage id="auth.btn_i_have_acc" />
            </p>
          </Link>
          <Link to="/">
            <p>
              <FormattedMessage id="auth.btn_back" />
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
