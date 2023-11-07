import { SvgIconProps, useTheme } from '@mui/material';

import { LayoutConfig } from '@blockium/ui-mininal-tmpl';
import { formatPhoneNumber } from '@blockium/utils';

import { useAuth, useSignOut } from '../firebase';

type AppLogo = React.FC<
  SvgIconProps & {
    children?: React.ReactNode;
    width?: string;
    height?: string;
    [key: string]: unknown;
  }
>;

type UseLayoutConfigProps = {
  layoutConfig: LayoutConfig;
  AppLogo: AppLogo;
};

export const useLayoutConfig = (props: UseLayoutConfigProps) => {
  const [user] = useAuth();
  const signOut = useSignOut();

  const handleSignOut = async () => {
    sessionStorage.clear();
    await signOut();
  };

  const { layoutConfig, AppLogo } = props;

  const theme = useTheme();
  if (layoutConfig?.sideBar) {
    layoutConfig.sideBar.logo =
      theme.palette.mode === 'light' ? (
        <AppLogo
          // full={false}
          colorScheme="green-green-gray-transparent"
          // width="10rem"
          height="10rem"
        />
      ) : (
        <AppLogo
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
