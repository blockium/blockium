import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { initFirebase } from '@blockium/firebase';
import { ThemeConfig, ThemeProvider } from '@blockium/theme';

import { AppRouter } from './components';

// 1. Initialize Firebase
initFirebase({
  apiKey:
    document.location.hostname === 'localhost'
      ? import.meta.env['VITE_FIREBASE_API_KEY_DEV']
      : import.meta.env['VITE_FIREBASE_API_KEY'],
  authDomain: import.meta.env['VITE_FIREBASE_AUTH_DOMAIN'],
  projectId: import.meta.env['VITE_FIREBASE_PROJECT_ID'],
  storageBucket: import.meta.env['VITE_FIREBASE_STORAGE_BUCKET'],
  messagingSenderId: import.meta.env['VITE_FIREBASE_MESSAGING_SENDER_ID'],
  appId: import.meta.env['VITE_FIREBASE_APP_ID'],
  measurementId: import.meta.env['VITE_FIREBASE_MEASUREMENT_ID'],
});

// 2. Customize theme
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

// 3. Render App
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <ThemeProvider config={themeConfig}>
      {/* 4. Create the AppRouter */}
      <AppRouter />
    </ThemeProvider>
    ,
  </StrictMode>,
);
