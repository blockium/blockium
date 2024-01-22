import { AppBase, AuthConfig, RouteElement } from '@blockium/appbase';
import { useAuth } from '@blockium/firebase';
import { useTranslation } from 'react-i18next';
import './App.styles.css';

export function App() {
  // 1. Configure Authentication
  const firebaseConfig = {
    apiKey: 'AIzaSyC-uQwpo2NV99ATkKuKfyTEsRUDGgp-0Kk',
    authDomain: 'blockiumjs.firebaseapp.com',
    projectId: 'blockiumjs',
    storageBucket: 'blockiumjs.appspot.com',
    messagingSenderId: '61328530945',
    appId: '1:61328530945:web:c5c5592a3a3f019d222a00',
  };
  const authConfig: AuthConfig = {
    config: firebaseConfig,
  };

  // 2. Create the home page component
  const HomePage = () => {
    // You get access to user data:
    const [user] = useAuth();
    // You get access to i18n too:
    const { t } = useTranslation();
    //
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

  // 3. Define the routes - in this case we have only the <HomePage />
  const routeElements: RouteElement[] = [{ path: '/', element: <HomePage /> }];

  return <AppBase authConfig={authConfig} routeElements={routeElements} />;
}

export default App;
