import { useTheme } from '@mui/material';

import { LayoutConfig } from '@blockium/layout';
import { formatPhoneNumber } from '@blockium/utils';

import { useAuth, useSignOut } from '../firebase';

// type AppLogo = React.FC<
//   SvgIconProps & {
//     children?: React.ReactNode;
//     width?: string;
//     height?: string;
//     [key: string]: unknown;
//   }
// >;

type UseLayoutConfigProps = {
  layoutConfig?: LayoutConfig;
};

export const useAuthLayoutConfig = (props: UseLayoutConfigProps) => {
  const [user] = useAuth();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    sessionStorage.clear();
    await signOut();
  };

  const layoutConfig = props.layoutConfig || {};
  const AppLogo = layoutConfig?.logo?.light;
  const AppLogoDark = layoutConfig?.logo?.dark;

  const theme = useTheme();
  if (layoutConfig.sideBar) {
    layoutConfig.sideBar.logo =
      theme.palette.mode === 'light' ? AppLogo : AppLogoDark || AppLogo;
  }

  // Adds an empty accountPopover if necessary
  if (layoutConfig.topBar && !layoutConfig.topBar.accountPopover) {
    layoutConfig.topBar.accountPopover = {};
  } else {
    layoutConfig.topBar = {
      accountPopover: {},
    };
  }
  if (layoutConfig.topBar.accountPopover) {
    layoutConfig.topBar.accountPopover.userName =
      sessionStorage.getItem('displayName') ??
      sessionStorage.getItem('name') ??
      '';
    layoutConfig.topBar.accountPopover.userContact =
      user?.phoneNumber ||
      user?.email ||
      formatPhoneNumber(sessionStorage.getItem('phone') ?? '');
    layoutConfig.topBar.accountPopover.userPhotoUrl =
      user?.photoURL || undefined;
    layoutConfig.topBar.accountPopover.handleSignOut = handleSignOut;
  }

  // if (layoutConfig.sideBar) {
  //   layoutConfig.sideBar.tenantContext =
  //     user?.phoneNumber || user?.email || undefined;
  //   layoutConfig.sideBar.tenantPhotoUrl = user?.photoURL || undefined;
  // }

  return layoutConfig;
};
