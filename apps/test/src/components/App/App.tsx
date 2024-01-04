import * as React from 'react';
// import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';

import { CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';
import { Payment as PaymentIcon } from '@mui/icons-material';
import { AdsClick as AdsClickIcon } from '@mui/icons-material';
import { MenuBook as MenuBookIcon } from '@mui/icons-material';

import { AppBase } from '@blockium/appbase';
import { ThemeConfig } from '@blockium/theme';
import { LayoutConfig } from '@blockium/layout';

import { AppLogo } from './AppLogo';

import { RevenueTable } from '../table/revenue/RevenueTable';
import { CostTable } from '../table/cost/CostTable';
import { ServiceMaintenanceTable } from '../table/serviceMaintenance/ServiceMaintenanceTable';
import { BirthListTable } from '../table/birthList/BirthListTable';
import { ServiceTable } from '../table/service/ServiceTable';

import './styles.scss';

// 1. Dynamically import pages in order to optimize request time
const Scheduler = loadable(() =>
  import('../../pages').then(({ Scheduler }) => Scheduler),
);
const FinanceDashboard = loadable(() =>
  import('../../pages').then(({ FinanceDashboard }) => FinanceDashboard),
);
const MarketingDashboard = loadable(() =>
  import('../../pages').then(({ MarketingDashboard }) => MarketingDashboard),
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
    fontConfig: {
      // primary: ['Public Sans', 'sans-serif'],
    },
    palleteConfig: {
      light: {
        primary: { main: '#f5247f' },
        secondary: { main: '#dd2072' },
      },
      dark: {
        primary: { main: '#cc005f' },
        secondary: { main: '#fdd3e5' },
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
          label: t('side-menu.scheduler'),
          href: '/',
          icon: <CalendarMonthIcon />,
        },
        {
          label: t('side-menu.finance'),
          href: '/finance',
          icon: <PaymentIcon />,
          children: [
            {
              label: 'Painel',
              href: '/finance/panel',
            },
            {
              label: 'Receitas',
              href: '/finance/revenue',
            },
            {
              label: 'Despesas',
              href: '/finance/cost',
            },
          ],
        },
        {
          label: t('side-menu.marketing'),
          href: '/marketing',
          icon: <AdsClickIcon />,
          children: [
            {
              label: 'Painel',
              href: '/marketing/panel',
            },
            {
              label: 'Manutenção',
              href: '/marketing/maintenance',
            },
            {
              label: 'Aniversariantes',
              href: '/marketing/birthlist',
            },
          ],
        },
        {
          label: t('side-menu.catalog'),
          href: '/catalog',
          icon: <MenuBookIcon />,
          children: [
            {
              label: 'Serviços',
              href: '/catalog/service',
            },
            {
              label: 'Produtos',
              href: '/catalog/product',
            },
          ],
        },
      ],
    },
  };

  // 4. Define the routes
  const routeElements = [
    { path: '/', element: <Scheduler /> },
    { path: '/finance/panel', element: <FinanceDashboard /> },
    { path: '/finance/revenue', element: <RevenueTable /> },
    { path: '/finance/cost', element: <CostTable /> },
    { path: '/marketing/panel', element: <MarketingDashboard /> },
    { path: '/marketing/maintenance', element: <ServiceMaintenanceTable /> },
    { path: '/marketing/birthlist', element: <BirthListTable /> },
    { path: '/catalog/service', element: <ServiceTable /> },
  ];

  // Test i18n change
  // setTimeout(() => {
  //   i18next.changeLanguage('pt-BR');
  //   // i18next.changeLanguage('en');
  // }, 5000);

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
