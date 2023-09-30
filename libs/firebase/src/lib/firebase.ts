// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  User as UserAuth,
  connectAuthEmulator,
  getAuth,
  signOut,
} from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import {
  QueryDocumentSnapshot,
  WithFieldValue,
  collection,
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore';
import { createGlobalState } from 'react-use';

const envSource = import.meta.env;
const isDevLocal =
  typeof document !== 'undefined' && document.location.hostname === 'localhost';

const firebaseConfig = {
  apiKey: isDevLocal
    ? envSource['VITE_FIREBASE_API_KEY_DEV']
    : envSource['VITE_FIREBASE_API_KEY'],
  authDomain: envSource['VITE_FIREBASE_AUTH_DOMAIN'],
  projectId: envSource['VITE_FIREBASE_PROJECT_ID'],
  storageBucket: envSource['VITE_FIREBASE_STORAGE_BUCKET'],
  messagingSenderId: envSource['VITE_FIREBASE_MESSAGING_SENDER_ID'],
  appId: envSource['VITE_FIREBASE_APP_ID'],
  measurementId: envSource['VITE_FIREBASE_MEASUREMENT_ID'],
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.useDeviceLanguage();
const functions = getFunctions(app);
const firestore = getFirestore(app);

if (isDevLocal) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}

const useAuth = createGlobalState(auth.currentUser);

const useSignIn = () => {
  const [, setUser] = useAuth();
  return (user: UserAuth | null) => {
    setUser(user);
  };
};

const useSignOut = () => {
  const [, setUser] = useAuth();
  return async () => {
    if (auth.currentUser) {
      await signOut(auth);
    }
    setUser(null);
  };
};

const converter = <T>() => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

const dataPoint = <T>(collectionPath: string) =>
  collection(firestore, collectionPath).withConverter(converter<T>());

export {
  app,
  analytics,
  auth,
  useAuth,
  useSignIn,
  useSignOut,
  functions,
  dataPoint,
};
