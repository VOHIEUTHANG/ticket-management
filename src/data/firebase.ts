import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  connectAuthEmulator,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCxHQ0qBcUNtnirj8QeNckdh1Likj-Bf0w',
  authDomain: 'ticket-management-9c401.firebaseapp.com',
  projectId: 'ticket-management-9c401',
  storageBucket: 'ticket-management-9c401.appspot.com',
  messagingSenderId: '758035454362',
  appId: '1:758035454362:web:7984461bf87a7c10668223',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// connectAuthEmulator(auth, 'http://localhost:9099');

const signIn = async (
  email: string,
  password: string,
  successHandler: (user: any) => void,
  errorHandler?: (...prams: any[]) => void,
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    successHandler(userCredential);
  } catch (error) {
    errorHandler && errorHandler(error);
  }
};

const onAuthStateChange = (handler: (user: any) => void) => {
  onAuthStateChanged(auth, handler);
};

export { signIn, signInWithEmailAndPassword as login, onAuthStateChange };
