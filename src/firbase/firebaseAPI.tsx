import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { DB } from './firebaseConfig';
import { Item, UserFirestoreDB, UserTemplatesPCLoadingType } from '../types/types';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';

const switchNameDB = (nameDB: string) => {
  switch (nameDB) {
    case 'items':
      return collection(DB, 'items');
    case 'users':
      return collection(DB, 'users');
    default:
      return alert('Something went wrong');
  }
};

export const getDataFromDB = async (nameDB: string) => {
  const db = switchNameDB(nameDB);
  try {
    const data = await getDocs(db as CollectionReference<DocumentData>);
    return data.docs.map((el) => ({ ...el.data(), id: el.id }));
  } catch (err) {
    console.log(err);
  }
};
export const addDataForDB = async (nameDB: string, user: Item | UserFirestoreDB) => {
  const db = switchNameDB(nameDB);
  try {
    await addDoc(db as CollectionReference<DocumentData>, user);
  } catch (err) {
    console.log(err);
  }
};

export const updateForFirestore = async (
  nameDB: string,
  id: string,
  field: string,
  newValue: any,
  setIsLoading: Dispatch<SetStateAction<UserTemplatesPCLoadingType>>,
  alertSuccess: (text: ReactNode) => void,
  alertError: (text: ReactNode) => void,
) => {
  const db = switchNameDB(nameDB);
  try {
    setIsLoading((prev) => ({ ...prev, [field]: true }));
    const updateUser = doc(db as CollectionReference<DocumentData>, id);
    await updateDoc(updateUser, { [field]: newValue });
    setIsLoading((prev) => ({ ...prev, [field]: false }));
    alertSuccess(<FormattedMessage id="pc.alert_succ_change" />);
  } catch (err) {
    console.log(err);
    alertError(<FormattedMessage id="pc.alert_err_change" />);
  }
};
