import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyALVajng6mQ84LIwxrafDjZircx4BJVXcs',
  authDomain: 'minig-26cdf.firebaseapp.com',
  projectId: 'minig-26cdf',
  storageBucket: 'minig-26cdf.appspot.com',
  messagingSenderId: '946552298470',
  appId: '1:946552298470:web:ae0cd70c7f333bffe89427',
  measurementId: 'G-SH0Z6Z8MBG',
};

const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase);
export const googleAuth = new GoogleAuthProvider();
export const usersDB = getFirestore(appFirebase);
