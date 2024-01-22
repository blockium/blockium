import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';

import { AppBase, AuthConfig, RouteElement } from '@blockium/appbase';
import { createPaletteConfig } from '@blockium/theme';
import { LayoutConfig } from '@blockium/layout';

import { CriatyLogo } from '@criaty/ui';
import { CalendarPage, WeeklyPostsPage } from '../../pages';

export const App: React.FC = (props) => {
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
    loginMethods: ['google'],
    leftImage: '/images/login_768_1064.webp',
    topImage: '/images/login_1064_768.webp',
  };

  // 2. Customize theme
  const themeConfig = { paletteConfig: createPaletteConfig('#329273') };

  // 3. Define the layout
  const { t } = useTranslation();
  const layoutConfig: LayoutConfig = {
    logo: {
      light: <CriatyLogo />,
      dark: <CriatyLogo colorScheme="green-green-white-transparent" />,
      loading: (
        <CriatyLogo
          full={false}
          colorScheme="transparent-green-green-transparent"
          sx={{ marginTop: '0.75rem' }}
        />
      ),
    },
    sideBar: {
      sideMenu: [
        {
          label: t('side-menu.calendar'),
          href: '/',
          icon: <CalendarMonthIcon />,
        },
      ],
    },
  };

  // 4. Define the routes
  const routeElements: RouteElement[] = [
    { path: '/', element: () => <CalendarPage /> },
    { path: '/posts/weekly/:isoStartDate', element: () => <WeeklyPostsPage /> },
  ];

  return (
    <AppBase
      authConfig={authConfig}
      themeConfig={themeConfig}
      layoutConfig={layoutConfig}
      routeElements={routeElements}
    />
  );
};

export default App;
