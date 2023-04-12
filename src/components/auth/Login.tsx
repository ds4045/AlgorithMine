import { signInWithEmailAndPassword } from 'firebase/auth';
import { FC, FormEvent, useState } from 'react';
import { auth } from '../../firbase/firebaseConfig';
import styles from './auth.module.css';
import Form from '../UI/Form';
import { Link, useNavigate } from 'react-router-dom';
import GoogleForm from './GoogleAuth';
import { useAppDispatch } from '../../redux/hooks';
import { confirmAuthorizedUser } from '../../firbase/confirmAuthorizedUser';
import { FormattedMessage } from 'react-intl';

const Login: FC = () => {
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLoginWithEmailPasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail('');
      setLoginPassword('');
      console.log(auth);
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
      };
      confirmAuthorizedUser(auth, loginEmail, loginPassword, dispatch, navigate, newUser);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.form_container}>
        <h3>
          <FormattedMessage id="auth.titleEmailPassword" />
        </h3>
        <Form
          handleSubmit={handleLoginWithEmailPasswordSubmit}
          setEmail={setLoginEmail}
          setPassword={setLoginPassword}
          email={loginEmail}
          password={loginPassword}
          buttonName={<FormattedMessage id="header.login" />}
        />
        <GoogleForm buttonName={<FormattedMessage id="auth.titleGoogle" />} />
        <div className={styles.links}>
          <Link to="/register">
            <p>{<FormattedMessage id="auth.btn_register" />}</p>
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

export default Login;
