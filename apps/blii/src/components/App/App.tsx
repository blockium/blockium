import * as React from 'react';
// import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import { CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';
import { Payment as PaymentIcon } from '@mui/icons-material';
import { AdsClick as AdsClickIcon } from '@mui/icons-material';
import { MenuBook as MenuBookIcon } from '@mui/icons-material';

import { AppBase, AuthConfig, RouteElement } from '@blockium/appbase';
import { createPaletteConfig } from '@blockium/theme';
import { LayoutConfig } from '@blockium/layout';

import { AppLogo } from './AppLogo';

import { FinanceDashboard, MarketingDashboard, Scheduler } from '../../pages';
import {
  BirthListTable,
  CostTable,
  RevenueTable,
  ServiceMaintenanceTable,
  ServiceTable,
} from '../table';

import './App.module.scss';

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
    // localEmulator: false,
  };
  const authConfig: AuthConfig = {
    config: firebaseConfig,
    loginMethods: ['google'],
    leftImage: '/images/photo0.webp',
  };

  // 2. Customize theme
  const themeConfig = { paletteConfig: createPaletteConfig('#9B6F41') };

  // 3. Define the layout configuration
  const { t } = useTranslation();
  const layoutConfig: LayoutConfig = {
    logo: {
      light: <AppLogo />,
      loading: (
        <AppLogo full={false} sx={{ mt: '50%', ml: '-8%', width: '140%' }} />
      ),
    },
    sideBar: {
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
              label: t('side-menu.panel'),
              href: '/finance/panel',
            },
            {
              label: t('side-menu.revenue'),
              href: '/finance/revenue',
            },
            {
              label: t('side-menu.costs'),
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
              label: t('side-menu.panel'),
              href: '/marketing/panel',
            },
            {
              label: t('side-menu.maintenance'),
              href: '/marketing/maintenance',
            },
            {
              label: t('side-menu.birth-list'),
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
              label: t('side-menu.services'),
              href: '/catalog/service',
            },
          ],
        },
      ],
    },
  };

  // 4. Define the routes
  const routeElements: RouteElement[] = [
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
      authConfig={authConfig}
      themeConfig={themeConfig}
      layoutConfig={layoutConfig}
      routeElements={routeElements}
    />
  );
};

export default App;
