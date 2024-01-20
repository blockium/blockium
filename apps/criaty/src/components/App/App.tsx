import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';

import { AppBase, AuthConfig } from '@blockium/appbase';
import { createPaletteConfig } from '@blockium/theme';
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
    />
  );
};

export default App;
