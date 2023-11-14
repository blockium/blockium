import { Outlet } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// import styles from './App.module.scss';

import { t } from '@blockium/i18n';
import { LocalizationProvider } from '@blockium/ui-common';
import { DashboardLayout, LayoutConfig } from '@blockium/ui-mininal-tmpl';

import { withDynamicHook } from '@blockium/ui-common';
import { CriatyLogo } from '@criaty/ui-custom';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppInternal: React.FC<any> = ({ useLayoutConfig }) => {
  const layoutConfigExtended = useLayoutConfig({
    layoutConfig,
    AppLogo: CriatyLogo,
  });

  return (
    <LocalizationProvider>
      <DashboardLayout layoutConfig={layoutConfigExtended}>
        <Container maxWidth="lg" sx={{ margin: '0 auto' }}>
          <Stack alignItems="center" gap="4rem"></Stack>
          <Outlet />
        </Container>
      </DashboardLayout>
    </LocalizationProvider>
  );
};

// withDynamicHook is used to dynamically load the hook useLayoutConfig
export const App = () => {
  const AppWithHook = withDynamicHook(
    'useLayoutConfig',
    () => import('@blockium/firebase'),
    AppInternal,
  );
  return <AppWithHook />;
};

export default App;
