import * as React from 'react';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { AppBase } from '@blockium/appbase';
import { ThemeConfig } from '@blockium/theme';
import { CriatyLogo } from '@criaty/ui-custom';
import { LayoutConfig } from '@blockium/ui-mininal-tmpl';
import { useLayoutConfig } from '@blockium/firebase';

// 1. Dynamically import pages in order to optimize request time
const BusinessPage = loadable(() =>
  import('../../pages').then(({ BusinessPage }) => BusinessPage),
);
const CalendarPage = loadable(() =>
  import('../../pages').then(({ CalendarPage }) => CalendarPage),
);
const NoBusinessPage = loadable(() =>
  import('../../pages').then(({ NoBusinessPage }) => NoBusinessPage),
);
const PartnersPage = loadable(() =>
  import('../../pages').then(({ PartnersPage }) => PartnersPage),
);
const SettingsPage = loadable(() =>
  import('../../pages').then(({ SettingsPage }) => SettingsPage),
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
  const layoutConfigExtended = useLayoutConfig({
    layoutConfig,
    AppLogo: <CriatyLogo />,
    AppLogoDark: <CriatyLogo colorScheme="green-green-white-transparent" />,
  });

  // 4. Define the routes
  const routeElements = [
    { path: '/', element: <CalendarPage /> },
    { path: '/business', element: <BusinessPage /> },
    { path: '/nobusiness', element: <NoBusinessPage /> },
    { path: '/partners', element: <PartnersPage /> },
    { path: '/settings', element: <SettingsPage /> },
    { path: '/posts/weekly/:isoStartDate', element: <WeeklyPostsPage /> },
  ];

  return (
    <AppBase
      firebaseConfig={firebaseConfig}
      themeConfig={themeConfig}
      layoutConfig={layoutConfigExtended}
      routeElements={routeElements}
      loadingLogo={
        <CriatyLogo
          full={false}
          colorScheme="transparent-green-green-transparent"
          sx={{ marginTop: '0.75rem' }}
        />
      }
      loginLeftImageSrc="/images/login_768_1064.webp"
      loginTopImageSrc="/images/login_1064_768.webp"
    />
  );
};

export default App;
