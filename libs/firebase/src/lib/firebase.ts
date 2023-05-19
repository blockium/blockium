// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { User, connectAuthEmulator, getAuth, signOut } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { createGlobalState } from 'react-use';

// Gets environment variables from process (Node) or import.meta (Browser)
const env: {
  FIREBASE_API_KEY?: string;
  FIREBASE_AUTH_DOMAIN?: string;
  FIREBASE_PROJECT_ID?: string;
  FIREBASE_STORAGE_BUCKET?: string;
  FIREBASE_MESSAGING_SENDER_ID?: string;
  FIREBASE_APP_ID?: string;
  FIREBASE_MEASUREMENT_ID?: string;
  DEV?: boolean;
} = {};

const envSource =
  typeof process !== 'undefined' ? process.env : import.meta.env;

if (typeof process !== 'undefined') {
  env.DEV = envSource.NODE_ENV === 'development';
  env.FIREBASE_API_KEY = envSource.FIREBASE_API_KEY;
  env.FIREBASE_AUTH_DOMAIN = envSource.FIREBASE_AUTH_DOMAIN;
  env.FIREBASE_PROJECT_ID = envSource.FIREBASE_PROJECT_ID;
  env.FIREBASE_STORAGE_BUCKET = envSource.FIREBASE_STORAGE_BUCKET;
  env.FIREBASE_MESSAGING_SENDER_ID = envSource.FIREBASE_MESSAGING_SENDER_ID;
  env.FIREBASE_APP_ID = envSource.FIREBASE_APP_ID;
  env.FIREBASE_MEASUREMENT_ID = envSource.FIREBASE_MEASUREMENT_ID;
} else {
  env.DEV = envSource.MODE === 'development';
  env.FIREBASE_API_KEY =
    env.DEV ||
    (typeof document !== 'undefined' &&
      document.location.hostname === 'localhost')
      ? envSource.VITE_FIREBASE_API_KEY_DEV
      : envSource.VITE_FIREBASE_API_KEY;
  env.FIREBASE_AUTH_DOMAIN = envSource.VITE_FIREBASE_AUTH_DOMAIN;
  env.FIREBASE_PROJECT_ID = envSource.VITE_FIREBASE_PROJECT_ID;
  env.FIREBASE_STORAGE_BUCKET = envSource.VITE_FIREBASE_STORAGE_BUCKET;
  env.FIREBASE_MESSAGING_SENDER_ID =
    envSource.VITE_FIREBASE_MESSAGING_SENDER_ID;
  env.FIREBASE_APP_ID = envSource.VITE_FIREBASE_APP_ID;
  env.FIREBASE_MEASUREMENT_ID = envSource.VITE_FIREBASE_MEASUREMENT_ID;
}

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.useDeviceLanguage();
const functions = getFunctions(app);
const db = getFirestore(app);

if (env.DEV) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

const useAuth = createGlobalState(auth.currentUser);

const useSignIn = () => {
  const [, setUser] = useAuth();
  return (user: User | null) => {
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

export { app, analytics, auth, useAuth, useSignIn, useSignOut, functions, db };
