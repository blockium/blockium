import { Outlet } from 'react-router-dom';
import { Container, Typography, Stack, Link } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
// import PieChartIcon from '@mui/icons-material/PieChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import SettingsIcon from '@mui/icons-material/Settings';
// import WalletIcon from '@mui/icons-material/Wallet';
// import AdsClickIcon from '@mui/icons-material/AdsClick';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './App.module.scss';

import { DashboardLayout, LayoutConfig } from '@postgpt/ui-mininal-tmpl';
import { useAuth, useSignOut } from '@postgpt/firebase';
import { PostGptLogo } from '@postgpt/ui-common';

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
    // tenantName: sessionStorage.getItem('name') || '',
    logo: (
      <PostGptLogo
        // full={false}
        colorScheme="green-gray-gray-transparent"
        // width="10rem"
        height="10rem"
      />
    ),
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
      //   label: 'Configurações',
      //   href: '#',
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

  // if (layoutConfig?.sideBar) {
  //   layoutConfig.sideBar.tenantContext =
  //     user?.phoneNumber || user?.email || undefined;
  //   layoutConfig.sideBar.tenantPhotoUrl = user?.photoURL || undefined;
  // }

  return (
    <DashboardLayout layoutConfig={layoutConfig}>
      <Container maxWidth="lg" sx={{ margin: '4rem auto' }}>
        <Stack alignItems="center" gap="4rem">
          <Typography variant="h1">Welcome to app!</Typography>
          <Link href="/" variant="h2">
            Go to home
          </Link>
          <Link href="posts/weekly/list" variant="h2">
            Go to posts
          </Link>

          <Outlet />
        </Stack>
      </Container>
    </DashboardLayout>
  );
}

export default App;
