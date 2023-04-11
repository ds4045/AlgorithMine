import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FC, FormEvent, useState } from 'react';
import { auth } from '../../firbase/firebaseConfig';
import styles from './auth.module.css';
import Form from '../UI/Form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { confirmAuthorizedUser } from '../../firbase/confirmAuthorizedUser';
import { addUsers } from '../../redux/allUsersSlice';
import { FormattedMessage } from 'react-intl';
import GoogleAuth from './GoogleAuth';
import { addDataForDB } from '../../firbase/firebaseAPI';

const Register: FC = () => {
  const allUsers = useAppSelector((state) => state.users.users);
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      const newUser = {
        name: auth.currentUser?.displayName ?? '',
        surname: '',
        email: auth.currentUser?.email ?? '',
        age: '',
        reviews: [],
        image: auth.currentUser?.photoURL ?? '',
        orders: [],
        city: '',
        phone: '',
        cart: [],
        isAdmin: false,
        favorites: [],
      };
      confirmAuthorizedUser(auth, registerEmail, registerPassword, dispatch, navigate, newUser);
      setRegisterEmail('');
      setRegisterPassword('');
      if (allUsers.some((user) => user.email === auth.currentUser?.email && !newUser.email)) return;
      else {
        dispatch(addUsers(newUser));
        addDataForDB('users', newUser);
      }
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
