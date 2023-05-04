import { signInWithEmailAndPassword } from 'firebase/auth';
import { FC, FormEvent, useCallback, useState } from 'react';
import { auth } from '../../firbase/firebaseConfig';
import styles from './auth.module.css';
import Form from '../UI/Form';
import { Link, useNavigate } from 'react-router-dom';
import GoogleForm from './GoogleAuth';
import { useAppDispatch } from '../../redux/hooks';
import { FormattedMessage } from 'react-intl';
import { fetchSingleUser } from '../../api/fetchUsers';
import { isAuthTrue } from '../../redux/authSlice';
import { UserFirestoreDB } from '../../types/types';
import { setUserDataCookie } from '../../hooks/useAutoSignIn';
import { Spin } from 'antd';

const Login: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLoginWithEmailPasswordSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        setIsLoading(true);
        e.preventDefault();
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        setLoginEmail('');
        setLoginPassword('');
        if (auth.currentUser?.uid) {
          const newUser = await fetchSingleUser(dispatch, auth.currentUser.uid);
          newUser && dispatch(isAuthTrue(newUser as UserFirestoreDB));
          navigate('/');
          setUserDataCookie({
            email: loginEmail,
            password: loginPassword,
          });
        } else {
          return alert('Login failed');
        }
      } catch (err: any) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, loginEmail, loginPassword, navigate],
  );
  return (
    <Spin spinning={isLoading}>
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
    </Spin>
  );
};

export default Login;
