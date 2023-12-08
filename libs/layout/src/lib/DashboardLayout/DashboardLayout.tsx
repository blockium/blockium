import { useState, PropsWithChildren, ReactElement } from 'react';
// material
import { styled } from '@mui/material/styles';
//
import { DashboardNavbar, NavBarConfig } from '../DashboardNavbar';
import { DashboardSidebar, SideBarConfig } from '../DashboardSidebar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: theme.spacing(10), // ORIGINAL FROM MINIMAL UI
  // paddingBottom: theme.spacing(0),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export interface MenuOption {
  label: string;
  href: string;
  icon?: ReactElement;
  info?: string;
  children?: MenuOption[];
}

export interface LayoutConfig {
  navBar?: NavBarConfig;
  sideBar?: SideBarConfig;
}

interface DashboardLayoutProps extends PropsWithChildren {
  layoutConfig?: LayoutConfig;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  layoutConfig,
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardNavbar
        onOpenSidebar={() => setOpen(true)}
        navBarConfig={layoutConfig?.navBar}
      />
      <DashboardSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        sideBarConfig={layoutConfig?.sideBar}
      />
      <MainStyle>{children}</MainStyle>
    </RootStyle>
  );
};

export default DashboardLayout;
