import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material';

import { LayoutConfig } from '@blockium/layout';

import { useFirebaseUser, useSignOut } from '../firebase';

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
  const { t } = useTranslation();
  const [firebaseUser] = useFirebaseUser();
  const signOut = useSignOut();

  const handleSignOut = async () => {
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
  if (layoutConfig.topBar) {
    if (!layoutConfig.topBar.accountPopover) {
      layoutConfig.topBar.accountPopover = {};
    }
  } else {
    layoutConfig.topBar = {
      accountPopover: {},
    };
  }
  if (layoutConfig.topBar.accountPopover) {
    layoutConfig.topBar.accountPopover.userName =
      firebaseUser?.displayName || t('firebase:label.no-name');
    layoutConfig.topBar.accountPopover.userContact =
      firebaseUser?.phoneNumber ||
      firebaseUser?.email ||
      t('firebase:label.no-email');
    layoutConfig.topBar.accountPopover.userPhotoUrl =
      firebaseUser?.photoURL || undefined;
    layoutConfig.topBar.accountPopover.handleSignOut = handleSignOut;
  }

  // if (layoutConfig.sideBar) {
  //   layoutConfig.sideBar.tenantContext =
  //     firebaseUser?.phoneNumber || firebaseUser?.email || undefined;
  //   layoutConfig.sideBar.tenantPhotoUrl = firebaseUser?.photoURL || undefined;
  // }

  return layoutConfig;
};
