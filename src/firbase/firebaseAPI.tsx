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
import {
  FieldsUserType,
  Item,
  ReviewsType,
  UserFirestoreDB,
  UserTemplatesPCLoadingType,
} from '../types/types';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';
const users = collection(DB, 'users');
export const getDataFromDB = async (nameDB: string) => {
  let db = null;
  switch (nameDB) {
    case 'items': {
      db = collection(DB, 'items');
      break;
    }
    case 'users': {
      db = collection(DB, 'users');
      break;
    }
    default:
      return alert('Something went wrong');
  }
  try {
    const data = await getDocs(db as CollectionReference<DocumentData>);
    return data.docs.map((el) => ({ ...el.data(), id: el.id }));
  } catch (err) {
    console.log(err);
  }
};
export const addDataForDB = async (nameDB: string, user: Item | UserFirestoreDB) => {
  let db = null;
  switch (nameDB) {
    case 'items': {
      db = collection(DB, 'items');
      break;
    }
    case 'users': {
      db = collection(DB, 'users');
      break;
    }
    default:
      return alert('Something went wrong');
  }
  try {
    await addDoc(db as CollectionReference<DocumentData>, user);
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
