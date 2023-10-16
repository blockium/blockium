import { Outlet } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// import styles from './App.module.scss';

import { LocalizationProvider } from '@blockium/i18n-mui';
import { DashboardLayout, LayoutConfig } from '@blockium/ui-mininal-tmpl';

import { withDynamicHook } from '@blockium/ui-common';
import { CriatyLogo } from '@criaty/ui-custom';

const layoutConfig: LayoutConfig = {
  navBar: {
    accountPopover: {
      accountMenu: [
        // {
        //   label: 'Meus Dados',
        //   href: '/profile',
        //   icon: <PersonIcon />,
        // },
        {
          label: 'Ajuda',
          href: 'mailto:ajuda@criaty.com',
          icon: <EmailIcon />,
        },
      ],
    },
  },
  sideBar: {
    // tenantName: sessionStorage.getItem('name') || '',
    sideMenu: [
      // {
      //   label: 'Painel',
      //   href: '/',
      //   icon: <PieChartIcon />,
      // },
      {
        label: 'Calendário',
        href: '/',
        icon: <CalendarMonthIcon />,
      },
      // {
      //   label: 'Meu Negócio',
      //   href: '/business',
      //   icon: <StoreIcon />,
      // },
      // {
      //   label: 'Configurações',
      //   href: '/settings',
      //   icon: <SettingsIcon />,
      // info: 'Configurações do sistema',
      // children: [
      //   {
      //     label: 'Despesas',
      //     href: '/costs',
      //     icon: <WalletIcon />,
      //   },
      //   {
      //     label: 'Serviços & metas',
      //     href: '/services',
      //     icon: <AdsClickIcon />,
      //   },
      // ],
      // },
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
