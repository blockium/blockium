// import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { IntlProvider } from '@blockium/i18n';
import { ThemeConfig, ThemeProvider } from '@blockium/theme';

import { AppRouter } from './components/AppRouter';

// These are exact the defaults.
// They are here just to show how to override them.
const themeConfig: ThemeConfig = {
  initialMode: 'light',
  fontConfig: {
    primaryFonts: [
      '"Nunito Sans"',
      'Roboto',
      '"Helvetica Neue"',
      '-apple-system',
      'sans-serif',
    ],
    headerFonts: ['Poppins', 'sans-serif'],
    // headerWeights: {
    //   h1: 400,
    //   h2: 400,
    //   h3: 400,
    //   h4: 400,
    //   h5: 400,
    //   h6: 400,
    //   subtitle1: 400,
    //   subtitle2: 400,
    // },
  },
  palleteConfig: {
    primaryColors: {
      lighter: '#D8F9E2',
      light: '#86DEB0',
      main: '#329273',
      dark: '#19695F',
      darker: '#094146',
    },
    primaryDarkColors: {
      lighter: '#D8F9E2',
      light: '#86DEB0',
      main: '#329273',
      dark: '#19695F',
      darker: '#094146',
    },
    // primaryDarkColors: {
    //   lighter: '#E7F8EF',
    //   light: '#D8F9E2',
    //   main: '#86DEB0',
    //   dark: '#329273',
    //   darker: '#19695F',
    // },
    secondaryColors: {
      lighter: '#2EA88A', // 300
      light: '#185848', // 400
      main: '#030B09', // 500
      dark: '#020807', // 700
      darker: '#010403', // 900
    },
    secondaryDarkColors: {
      lighter: '#F4FBF9', // 300
      light: '#F0FAF7', // 400
      main: '#ECF8F5', // 500
      dark: '#A6DED0', // 600
      darker: '#5FC4AB', // 700
    },
    backgroundDarkColors: {
      paper: '#131E28',
      default: '#263238',
    },
  },
};

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
const { Firebase } = await import('@blockium/firebase');
Firebase.initFirebase(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  // <StrictMode>
  <IntlProvider>
    <ThemeProvider config={themeConfig}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  </IntlProvider>,
  // </StrictMode>
);
