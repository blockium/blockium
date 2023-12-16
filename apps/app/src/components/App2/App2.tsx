import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import { Container, Stack } from '@mui/material';

import { WhatsApp as WhatsAppIcon } from '@mui/icons-material';
import { CalendarMonth as CalendarMonthIcon } from '@mui/icons-material';

// import styles from './App2.module.scss';

import { LocalizationProvider } from '@blockium/calendar';
import { DashboardLayout, LayoutConfig } from '@blockium/layout';
import { useLayoutConfig } from '@blockium/firebase';

import { CriatyLogo } from '@criaty/ui-custom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const App2: React.FC = () => {
  const { t } = useTranslation();

  // 1. Define the layout configuration
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

  return (
    // 2. Wrap the App2 with the LocalizationProvider
    <LocalizationProvider>
      {/* 3. Wrap the App2 with the DashboardLayout passing the layout config */}
      <DashboardLayout layoutConfig={layoutConfigExtended}>
        <Container maxWidth="lg" sx={{ margin: '0 auto' }}>
          <Stack alignItems="center" gap="4rem"></Stack>
          {/* 4. Add the react-router-dom Outlet */}
          <Outlet />
        </Container>
      </DashboardLayout>
    </LocalizationProvider>
  );
};

export default App2;
