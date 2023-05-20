import { Outlet } from 'react-router-dom';
import { Container, Typography, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PieChartIcon from '@mui/icons-material/PieChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './App.module.scss';

import { DashboardLayout, LayoutConfig } from '@postgpt/ui-mininal-tmpl';
import { useAuth, useSignOut } from '@postgpt/firebase';

const layoutConfig: LayoutConfig = {
  navBar: {
    accountPopover: {
      userName: sessionStorage.getItem('name') || '',
      accountMenu: [
        {
          label: 'Meus Dados',
          href: '/profile',
          icon: <PersonIcon />,
        },
        {
          label: 'Ajuda',
          href: 'mailto:suporte@postgpt.com.br',
          icon: <EmailIcon />,
        },
      ],
    },
  },
  sideBar: {
    sideMenu: [
      {
        label: 'Painel',
        href: '/',
        icon: <PieChartIcon />,
      },
      {
        label: 'Calendário',
        href: '/calendar',
        icon: <CalendarMonthIcon />,
      },
      {
        label: 'Configurações',
        href: '#',
        icon: <SettingsIcon />,
        // info: "Configurações do sistema",
        // children: [
        //   {
        //     label: 'despesas',
        //     href: '/app/costs',
        //     icon: getIcon('entypo:wallet'),
        //   },
        //   {
        //     label: 'serviços & metas',
        //     href: '/app/services',
        //     icon: getIcon('clarity:target-solid'),
        //   },
        // ],
      },
    ],
  },
};

export function App() {
  const [user] = useAuth();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    sessionStorage.clear();
    await signOut();
    window.location.reload();
  };

  if (layoutConfig?.navBar?.accountPopover) {
    layoutConfig.navBar.accountPopover.userContact =
      user?.phoneNumber || user?.email || undefined;
    layoutConfig.navBar.accountPopover.userPhotoUrl =
      user?.photoURL || undefined;
    layoutConfig.navBar.accountPopover.handleSignOut = handleSignOut;
  }

  return (
    <DashboardLayout layoutConfig={layoutConfig}>
      <Container maxWidth="lg" sx={{ margin: '4rem auto' }}>
        <Stack alignItems="center" gap="4rem">
          <Typography variant="h1">Welcome to app!</Typography>

          <Outlet />
        </Stack>
      </Container>
    </DashboardLayout>
  );
}

export default App;
