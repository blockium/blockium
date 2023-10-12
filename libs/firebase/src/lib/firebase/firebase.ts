// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Analytics, getAnalytics as fbGetAnalytics } from 'firebase/analytics';
import {
  Auth,
  User as UserAuth,
  connectAuthEmulator,
  getAuth as fbGetAuth,
  signOut,
} from 'firebase/auth';
import { Functions, getFunctions as fbGetFunctions } from 'firebase/functions';
import {
  Firestore,
  QueryDocumentSnapshot,
  WithFieldValue,
  collection,
  connectFirestoreEmulator,
  getFirestore as fbGetFirestore,
} from 'firebase/firestore';
import { createGlobalState } from 'react-use';

export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

export type FirebaseServices = {
  app?: FirebaseApp;
  analytics?: Analytics;
  auth?: Auth;
  functions?: Functions;
  firestore?: Firestore;
};

const fbServices: FirebaseServices = {};

// Initialize Firebase
const initFirebase = (firebaseConfig: FirebaseConfig) => {
  fbServices.app = initializeApp(firebaseConfig);
  fbServices.analytics = fbGetAnalytics(fbServices.app);
  fbServices.auth = fbGetAuth(fbServices.app);
  fbServices.auth.useDeviceLanguage();
  fbServices.functions = fbGetFunctions(fbServices.app);
  fbServices.firestore = fbGetFirestore(fbServices.app);

  const isDevLocal =
    typeof document !== 'undefined' &&
    document.location.hostname === 'localhost';

  if (isDevLocal) {
    connectAuthEmulator(fbServices.auth, 'http://localhost:9099');
    connectFirestoreEmulator(fbServices.firestore, 'localhost', 8080);
  }
};

const getApp = () => {
  const app = fbServices.app;
  if (!app) {
    throw new Error('initFirebase must be called before using getApp');
  }
  return app;
};

const getAnalytics = () => {
  const auth = fbServices.auth;
  if (!auth) {
    throw new Error('initFirebase must be called before using getAnalytics');
  }
  return auth;
};

const getAuth = () => {
  const auth = fbServices.auth;
  if (!auth) {
    throw new Error('initFirebase must be called before using getAuth');
  }
  return auth;
};

const getFunctions = () => {
  const functions = fbServices.functions;
  if (!functions) {
    throw new Error('initFirebase must be called before using getFunctions');
  }
  return functions;
};

const getFirestore = () => {
  const firestore = fbServices.firestore;
  if (!firestore) {
    throw new Error('initFirebase must be called before using getFirestore');
  }
  return firestore;
};

const useAuth = createGlobalState<UserAuth | null>(null);

const useSignIn = () => {
  const [, setUser] = useAuth();
  return (user: UserAuth | null) => {
    setUser(user);
  };
};

const useSignOut = () => {
  const [, setUser] = useAuth();
  return async () => {
    const auth = getAuth();
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

const dataPoint = <T>(collectionPath: string) => {
  const firestore = getFirestore();
  return collection(firestore, collectionPath).withConverter(converter<T>());
};

export const Firebase = {
  initFirebase,
  getApp,
  getAnalytics,
  getAuth,
  getFunctions,
  getFirestore,
  useAuth,
  useSignIn,
  useSignOut,
  dataPoint,
};

export default Firebase;
