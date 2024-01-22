import { AppBase, AuthConfig, RouteElement } from '@blockium/appbase';
import { useAuth } from '@blockium/firebase';
import { useTranslation } from 'react-i18next';
import './App.styles.css';

export function App() {
  // 1. Configure Authentication
  const firebaseConfig = {
    apiKey: import.meta.env['VITE_FIREBASE_API_KEY'],
    authDomain: import.meta.env['VITE_FIREBASE_AUTH_DOMAIN'],
    projectId: import.meta.env['VITE_FIREBASE_PROJECT_ID'],
    storageBucket: import.meta.env['VITE_FIREBASE_STORAGE_BUCKET'],
    messagingSenderId: import.meta.env['VITE_FIREBASE_MESSAGING_SENDER_ID'],
    appId: import.meta.env['VITE_FIREBASE_APP_ID'],
    measurementId: import.meta.env['VITE_FIREBASE_MEASUREMENT_ID'],
  };
  const authConfig: AuthConfig = {
    config: firebaseConfig,
  };

  // 2. Create the initial component
  const Hello = () => {
    // You get access to user
    const [user] = useAuth();
    // You get access to i18n too
    const { t } = useTranslation();
    return (
      <div className="content">
        <span style={{ fontWeight: 700 }}>
          {t('hello', { name: user?.displayName })}
          <br />
          {t('welcome')}
        </span>
      </div>
    );
  };

  // 3. Define the routes
  const routeElements: RouteElement[] = [{ path: '/', element: <Hello /> }];

  return <AppBase authConfig={authConfig} routeElements={routeElements} />;
}

export default App;
