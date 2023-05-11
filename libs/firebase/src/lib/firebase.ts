// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

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

if (typeof process !== 'undefined') {
  env.FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
  env.FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN;
  env.FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
  env.FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;
  env.FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID;
  env.FIREBASE_APP_ID = process.env.FIREBASE_APP_ID;
  env.FIREBASE_MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID;
  env.DEV = process.env.NODE_ENV === 'development';
} else {
  env.FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
  env.FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
  env.FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
  env.FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
  env.FIREBASE_MESSAGING_SENDER_ID =
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID;
  env.FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
  env.FIREBASE_MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;
  env.DEV = import.meta.env.DEV;
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

export { app, analytics, auth, functions, db };
