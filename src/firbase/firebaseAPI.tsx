import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { DB } from './firebaseConfig';
import { Item, LeadType, OrderType, UserFirestoreDB } from '../types/types';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { FormattedMessage } from 'react-intl';

const switchNameDB = (nameDB: string) => {
  switch (nameDB) {
    case 'items':
      return collection(DB, 'items');
    case 'users':
      return collection(DB, 'users');
    case 'orders':
      return collection(DB, 'orders');
    case 'leads':
      return collection(DB, 'leads');
    case 'posts':
      return collection(DB, 'posts');
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
export const addDataForDB = async (
  nameDB: string,
  data: Item | UserFirestoreDB | OrderType | LeadType,
) => {
  const db = switchNameDB(nameDB);
  try {
    await addDoc(db as CollectionReference<DocumentData>, data);
    return true;
  } catch (err) {
    console.log(err);
  }
};
export const addNewUserForDB = async (user: UserFirestoreDB) => {
  try {
    const res = await setDoc(doc(collection(DB, 'users'), user.id), user);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
export const updateForFirestore = async (
  nameDB: string,
  id: string,
  field: string,
  newValue: any,
  setIsLoading?: Dispatch<SetStateAction<any>>,
  alertSuccess?: (text: ReactNode) => void,
  alertError?: (text: ReactNode) => void,
  alertType?: string,
) => {
  const db = switchNameDB(nameDB);
  try {
    setIsLoading &&
      setIsLoading((prev: any) => (typeof prev === 'boolean' ? true : { ...prev, [field]: true }));
    const updateData = doc(db as CollectionReference<DocumentData>, id);
    await updateDoc(updateData, { [field]: newValue });
    alertType &&
      alertSuccess &&
      alertSuccess(<FormattedMessage id={`pc.alert_succ_${alertType}`} />);
    return true;
  } catch (err) {
    console.log(err);
    alertType && alertError && alertError(<FormattedMessage id={`pc.alert_err_${alertType}`} />);
    return false;
  } finally {
    setIsLoading &&
      setIsLoading((prev: any) =>
        typeof prev === 'boolean' ? false : { ...prev, [field]: false },
      );
  }
};
export const getElementFromFirestoreDB = async (nameDB: string, docId: string) => {
  const db = switchNameDB(nameDB);
  try {
    const docRef = doc(db as CollectionReference<DocumentData>, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
