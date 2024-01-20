import * as React from 'react';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';

import { WhatsApp as WhatsAppIcon } from '@mui/icons-material';
import { CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';

import { AppBase } from '@blockium/appbase';
import { createPaletteConfig, criaty } from '@blockium/theme';
import { CriatyLogo } from '@criaty/ui';
import { LayoutConfig } from '@blockium/layout';

// 1. Dynamically import pages in order to optimize request time
const CalendarPage = loadable(() =>
  import('../../pages').then(({ CalendarPage }) => CalendarPage),
);
const WeeklyPostsPage = loadable(() =>
  import('../../pages').then(({ WeeklyPostsPage }) => WeeklyPostsPage),
);

export const App: React.FC = (props) => {
  // 1. Configure Firebase
  const firebaseConfig = {
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
  };

  // 2. Customize theme
  // const themeConfig: ThemeConfig = {
  //   fontConfig: {
  //     // primary: ['Public Sans', 'sans-serif'],
  //   },
  //   paletteConfig: {
  //     light: {
  //       primary: { main: '#329273' },
  //       secondary: { main: '#030B09' },
  //     },
  //     dark: {
  //       primary: { main: '#329273' },
  //       secondary: { main: '#ECF8F5' },
  //     },
  //   },
  // };
  const themeConfig = { paletteConfig: createPaletteConfig(criaty) };

  // 3. Define the layout configuration
  const { t } = useTranslation();
  const layoutConfig: LayoutConfig = {
    navBar: {
      accountPopover: {
        accountMenu: [
          // {
          //   label: t('account-menu.profile'),
          //   href: '/profile',
          //   icon: <PersonIcon />,
          // },
          {
            label: t('account-menu.support'),
            href: 'https://wa.me/5521967494619',
            icon: <WhatsAppIcon />,
          },
        ],
      },
    },
    sideBar: {
      // tenantName: sessionStorage.getItem('name') || '',
      sideMenu: [
        {
          label: t('side-menu.calendar'),
          href: '/',
          icon: <CalendarMonthIcon />,
        },
        // {
        //   label: t('side-menu.my-business'),
        //   href: '/business',
        //   icon: <StoreIcon />,
        // },
        // {
        //   label: t('side-menu.settings'),
        //   href: '/settings',
        //   icon: <SettingsIcon />,
        // info: 'Configurações do sistema',
      ],
    },
  };

  // 4. Define the routes
  const routeElements = [
    { path: '/', element: () => <CalendarPage /> },
    { path: '/posts/weekly/:isoStartDate', element: () => <WeeklyPostsPage /> },
  ];

  return (
    <AppBase
      firebaseConfig={firebaseConfig}
      themeConfig={themeConfig}
      layoutConfig={layoutConfig}
      routeElements={routeElements}
      appLogo={<CriatyLogo />}
      appLogoDark={<CriatyLogo colorScheme="green-green-white-transparent" />}
      loadingLogo={
        <CriatyLogo
          full={false}
          colorScheme="transparent-green-green-transparent"
          sx={{ marginTop: '0.75rem' }}
        />
      }
      loginMethods={['google']}
      loginLeftImageSrc="/images/login_768_1064.webp"
      loginTopImageSrc="/images/login_1064_768.webp"
    />
  );
};

export default App;