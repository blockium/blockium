import { AppBase, AuthConfig, RouteElement } from '@blockium/appbase';
import { FirebaseConfig, useFirebaseUser } from '@blockium/firebase';
import { useTranslation } from 'react-i18next';
import './App.styles.scss';

export function App() {
  // 1. Configure Authentication
  const firebaseConfig: FirebaseConfig = {
    apiKey: 'AIzaSyC-uQwpo2NV99ATkKuKfyTEsRUDGgp-0Kk',
    authDomain: 'hello.blockium.dev',
    projectId: 'blockiumjs',
    storageBucket: 'blockiumjs.appspot.com',
    messagingSenderId: '61328530945',
    appId: '1:61328530945:web:c5c5592a3a3f019d222a00',
    // localEmulator: false,
  };
  const authConfig: AuthConfig = {
    config: firebaseConfig,
  };

  // 2. Create the home page component
  const HomePage = () => {
    // You get access to user data:
    const [firebaseUser] = useFirebaseUser();
    // You get access to i18n too:
    const { t } = useTranslation();
    //
    return (
      <div className="content">
        <span style={{ fontWeight: 700 }}>
          {t('hello', { name: firebaseUser?.displayName })}
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
