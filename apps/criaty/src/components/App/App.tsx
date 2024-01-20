import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { WhatsApp as WhatsAppIcon } from '@mui/icons-material';
import { CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';

import { AppBase, AuthConfig } from '@blockium/appbase';
import { createPaletteConfig, criaty } from '@blockium/theme';
import { LayoutConfig } from '@blockium/layout';

import { CriatyLogo } from '@criaty/ui';
import { CalendarPage, WeeklyPostsPage } from '../../pages';

export const App: React.FC = (props) => {
  // 1. Configure Authentication
  const authConfig: AuthConfig = {
    loginMethods: ['google'],
    leftImage: '/images/login_768_1064.webp',
    topImage: '/images/login_1064_768.webp',
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
      authConfig={authConfig}
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
    />
  );
};

export default App;
