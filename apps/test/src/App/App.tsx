import * as React from 'react';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';

import { PieChart as PieChartIcon } from '@mui/icons-material';
import { AdsClick as AdsClickIcon } from '@mui/icons-material';

import { AppBase } from '@blockium/appbase';
import { ThemeConfig } from '@blockium/theme';
import { AppLogo } from './AppLogo';
import { LayoutConfig } from '@blockium/layout';

// 1. Dynamically import pages in order to optimize request time
const FinanceDashboard = loadable(() =>
  import('../pages').then(({ FinanceDashboard }) => FinanceDashboard),
);
const MarketingDashboard = loadable(() =>
  import('../pages').then(({ MarketingDashboard }) => MarketingDashboard),
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

  // TODO: 2. Customize theme
  const themeConfig: ThemeConfig = {
    initialMode: 'light',
    fontConfig: {
      primaryFonts: ['"Public Sans"', 'sans-serif'],
      headerFonts: ['"Public Sans"', 'Poppins', 'sans-serif'],
    },
    palleteConfig: {
      primaryColors: {
        lighter: '#fde3ed',
        light: '#f889b5',
        main: '#f5247f',
        dark: '#cc005f',
        darker: '#910055',
      },
      primaryDarkColors: {
        lighter: '#f889b5',
        light: '#f5247f',
        main: '#cc005f',
        dark: '#910055',
        darker: '#910055',
      },
      secondaryColors: {
        lighter: '#eb79aa',
        light: '#e44d8e',
        main: '#dd2072',
        dark: '#b11a5b',
        darker: '#851344',
      },
      secondaryDarkColors: {
        lighter: '#ffffff',
        light: '#fee9f2',
        main: '#fdd3e5',
        dark: '#fba7cc',
        darker: '#f97cb2',
      },
      backgroundDarkColors: {
        paper: '#212B36', // '#424242',
        default: '#171C23', // '#303030',
      },
    },
  };

  // 3. Define the layout configuration
  const { t } = useTranslation();
  const layoutConfig: LayoutConfig = {
    navBar: {
      accountPopover: {
        accountMenu: [],
      },
    },
    sideBar: {
      // tenantName: sessionStorage.getItem('name') || '',
      sideMenu: [
        {
          label: t('side-menu.finance'),
          href: '/',
          icon: <PieChartIcon />,
        },
        {
          label: t('side-menu.marketing'),
          href: '/marketing',
          icon: <AdsClickIcon />,
        },
      ],
    },
  };

  // 4. Define the routes
  const routeElements = [
    { path: '/', element: <FinanceDashboard /> },
    { path: '/marketing', element: <MarketingDashboard /> },
  ];

  return (
    <AppBase
      firebaseConfig={firebaseConfig}
      themeConfig={themeConfig}
      layoutConfig={layoutConfig}
      routeElements={routeElements}
      appLogo={<AppLogo />}
      // appLogoDark={<AppLogo />}
      loadingLogo={
        <AppLogo full={false} sx={{ mt: '50%', ml: '-8%', width: '140%' }} />
      }
      loginMethods={['google']}
      loginLeftImageSrc={`/images/login_768_1064.webp`}
      loginTopImageSrc={`/images/login_1064_768.webp`}
    />
  );
};

export default App;
