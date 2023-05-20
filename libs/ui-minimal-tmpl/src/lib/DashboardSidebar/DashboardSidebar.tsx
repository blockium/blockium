import { useEffect } from 'react';

// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  Typography,
  Avatar,
  Link,
  useTheme,
  useMediaQuery,
  Stack,
  Button,
} from '@mui/material';

import { useAuth } from '@postgpt/firebase';
import { PostGptLogo } from '@postgpt/ui-common';

import { Scrollbar } from '../Scrollbar';
import { NavSection } from '../NavSection';
import { navConfig } from '../NavConfig';
import { SideBarConfig } from '../DashboardLayout';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha('#919EAB', 0.12),
  // backgroundColor: theme.palette.grey["500_12"], // MINIMAL UI ORIGINAL
}));

// ----------------------------------------------------------------------

type DashboardSidebarProps = {
  sideBarConfig?: SideBarConfig;
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
};

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  sideBarConfig,
  isOpenSidebar,
  onCloseSidebar,
}) => {
  const [user] = useAuth();
  const userName = sessionStorage.getItem('name');

  const pathname = window.location.pathname;

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <PostGptLogo
          full={false}
          colorScheme="green-gray-gray-transparent"
          // width="10rem"
          height="10rem"
        />
      </Box>

      {user && (
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none" href="#">
            <AccountStyle>
              <Avatar src={user.photoURL ?? undefined} alt="User Photo" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {userName || user?.displayName || user?.phoneNumber}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {user?.phoneNumber || user?.email}
                </Typography>
              </Box>
            </AccountStyle>
          </Link>
        </Box>
      )}

      <NavSection navConfig={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      {/* <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{ pt: 5, borderRadius: 2, position: 'relative' }}
        >
          <Box
            component="img"
            src="/static/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Quer mais?
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Por apenas R$49,90/mês
            </Typography>
          </Box>

          <Button
            href="https://material-ui.com/store/items/minimal-dashboard/"
            target="_blank"
            variant="contained"
          >
            Atualize para Versão Pro
          </Button>
        </Stack>
      </Box> */}
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
};

export default DashboardSidebar;
