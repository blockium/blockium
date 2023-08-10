import { useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
// import PieChartIcon from '@mui/icons-material/PieChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StoreIcon from '@mui/icons-material/Store';
// import SettingsIcon from '@mui/icons-material/Settings';
// import WalletIcon from '@mui/icons-material/Wallet';
// import AdsClickIcon from '@mui/icons-material/AdsClick';

import { LayoutConfig } from '@postgpt/ui-mininal-tmpl';
import { useAuth, useSignOut } from '@postgpt/firebase';
import { CriatyLogo } from '@postgpt/ui-common';
import { formatPhoneNumber } from '@postgpt/utils';

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
          href: 'mailto:ajuda@criaty.com.br',
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
      {
        label: 'Meu Negócio',
        href: '/business',
        icon: <StoreIcon />,
      },
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

export const useLayoutConfig = () => {
  const [user] = useAuth();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    sessionStorage.clear();
    await signOut();
  };

  const theme = useTheme();
  if (layoutConfig?.sideBar) {
    layoutConfig.sideBar.logo =
      theme.palette.mode === 'light' ? (
        <CriatyLogo
          // full={false}
          colorScheme="green-green-gray-transparent"
          // width="10rem"
          height="10rem"
        />
      ) : (
        <CriatyLogo
          // full={false}
          colorScheme="green-green-white-transparent"
          // width="10rem"
          height="10rem"
        />
      );
  }

  if (layoutConfig?.navBar?.accountPopover) {
    layoutConfig.navBar.accountPopover.userName =
      sessionStorage.getItem('displayName') ??
      sessionStorage.getItem('name') ??
      '';
    layoutConfig.navBar.accountPopover.userContact =
      user?.phoneNumber ||
      user?.email ||
      formatPhoneNumber(sessionStorage.getItem('phone') ?? '');
    layoutConfig.navBar.accountPopover.userPhotoUrl =
      user?.photoURL || undefined;
    layoutConfig.navBar.accountPopover.handleSignOut = handleSignOut;
  }

  // if (layoutConfig?.sideBar) {
  //   layoutConfig.sideBar.tenantContext =
  //     user?.phoneNumber || user?.email || undefined;
  //   layoutConfig.sideBar.tenantPhotoUrl = user?.photoURL || undefined;
  // }

  return layoutConfig;
};
