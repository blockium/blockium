import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { initFirebase } from '@blockium/firebase';
import { ThemeConfig, ThemeProvider } from '@blockium/theme';

import { App2Router } from './components';

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
  fontConfig: {
    // primary: ['Public Sans', 'sans-serif'],
  },
  paletteConfig: {
    light: {
      primary: { main: '#329273' },
      secondary: { main: '#030B09' },
    },
    dark: {
      primary: { main: '#329273' },
      secondary: { main: '#ECF8F5' },
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
      {/* 4. Create the AppRouter2 */}
      <App2Router />
    </ThemeProvider>
    ,
  </StrictMode>,
);
