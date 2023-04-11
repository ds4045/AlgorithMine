import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import {
  FieldsUserType,
  ReviewsType,
  UserFirestoreDB,
  UserTemplatesPCLoadingType,
} from '../types/types';
import { usersDB } from '../config/firebase';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';
const users = collection(usersDB, 'users');

export const addUsersForFirestoreDB = async (user: UserFirestoreDB) => {
  try {
    await addDoc(users, user);
  } catch (err) {
    console.log(err);
  }
};
export const getDBFromFirestoreDB = async () => {
  try {
    const data = await getDocs(users);
    return data.docs.map((el) => ({ ...el.data(), id: el.id }));
  } catch (err) {
    console.log(err);
  }
};
export const updateForFirestoreDB = async (
  id: string,
  field: FieldsUserType,
  newValue: string | number | ReviewsType[],
  setIsLoading: Dispatch<SetStateAction<UserTemplatesPCLoadingType>>,
  alertSuccess: (text: ReactNode) => void,
  alertError: (text: ReactNode) => void,
) => {
  try {
    setIsLoading((prev) => ({ ...prev, [field]: true }));
    const updateUser = doc(users, id);
    await updateDoc(updateUser, { [field]: newValue });
    setIsLoading((prev) => ({ ...prev, [field]: false }));
    alertSuccess(<FormattedMessage id="pc.alert_succ_change" />);
  } catch (err) {
    console.log(err);
    alertError(<FormattedMessage id="pc.alert_err_change" />);
  }
};
