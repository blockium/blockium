import { useTranslation } from 'react-i18next';
import { Home as HomeIcon } from '@mui/icons-material';
import { Speed as AsyncIcon } from '@mui/icons-material';

import { AppBase, AuthConfig, RouteElement } from '@blockium/appbase';
import { FirebaseConfig, useFirebaseUser } from '@blockium/firebase';
import { LayoutConfig } from '@blockium/layout';

import { AsyncPage } from '../pages';
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
    // loginMethods: ['google', 'phone', 'whatsapp'],
  };

  // You get access to i18n too:
  const { t } = useTranslation();

  // 2. Define the layout
  const layoutConfig: LayoutConfig = {
    sideBar: {
      sideMenu: [
        {
          label: t('side-menu.home'),
          href: '/',
          icon: <HomeIcon />,
        },
        {
          label: t('side-menu.async'),
          href: '/async',
          icon: <AsyncIcon />,
        },
      ],
    },
  };

  // 3. Create the home page component
  const HomePage = () => {
    // You get access to user data:
    const [firebaseUser] = useFirebaseUser();
    //
    return (
      <div className="content">
        <div>
          <span style={{ fontWeight: 700 }}>
            {t('hello', { name: firebaseUser?.displayName })}
            <br />
            {t('welcome')}
          </span>
        </div>
      </div>
    );
  };

  // 4. Define the routes - in this case we have only the <HomePage />
  const routeElements: RouteElement[] = [
    { path: '/', element: <HomePage /> },
    { path: '/async', element: <AsyncPage /> },
  ];

  return (
    <AppBase
      authConfig={authConfig}
      layoutConfig={layoutConfig}
      routeElements={routeElements}
    />
  );
}

export default App;
