import { useState, PropsWithChildren, ReactElement } from 'react';
// material
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
//
import { MainTopbar, TopBarConfig } from '../MainTopbar';
import { MainSidebar, SideBarConfig } from '../MainSidebar';
import { useIsMainOnTop } from '../../hooks';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64 + 16;
const APP_BAR_DESKTOP = 92 + 24;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  position: 'relative', // IMPORTANT: allows z-index to properly work for children components on iOS
});

const MainStyle = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: theme.spacing(10), // ORIGINAL FROM MINIMAL UI
  // paddingBottom: theme.spacing(0),
  width: 'min-content',
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export interface LayoutConfig {
  logo?: {
    light?: ReactElement;
    dark?: ReactElement;
    loading?: ReactElement;
  };
  topBar?: TopBarConfig;
  sideBar?: SideBarConfig;
}

interface MainLayoutProps extends PropsWithChildren {
  layoutConfig?: LayoutConfig;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  layoutConfig,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [isMainOnTop] = useIsMainOnTop();

  return (
    <RootStyle>
      <MainTopbar
        onOpenSidebar={() => setOpen(true)}
        topBarConfig={layoutConfig?.topBar}
        showMenuIcon={!!layoutConfig?.sideBar?.sideMenu}
      />
      <MainSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
        sideBarConfig={layoutConfig?.sideBar}
      />
      <MainStyle sx={{ zIndex: isMainOnTop ? 1 : 0 }}>{children}</MainStyle>
    </RootStyle>
  );
};

export default MainLayout;
