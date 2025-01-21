import { ReactElement, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  // Stack,
  // Button,
} from '@mui/material';
import { UnfoldMore as UnfoldMoreIcon } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';

import { Scrollbar } from '../../Scrollbar';
import { MenuGroup, MenuOption, NavSection } from '../NavSection';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 1,
  // [theme.breakpoints.up('lg')]: {
  //   flexShrink: 0,
  //   width: DRAWER_WIDTH,
  // },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 1.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha('#919EAB', 0.12),
  // backgroundColor: theme.palette.grey["500_12"], // MINIMAL UI ORIGINAL
}));

// ----------------------------------------------------------------------

export interface SideBarConfig {
  tenantName?: string;
  tenantContext?: string;
  tenantPhotoUrl?: string;
  onTenantClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  logo?: ReactElement;
  sideMenu?: (MenuGroup | MenuOption)[];
}

type MainSidebarProps = {
  sideBarConfig?: SideBarConfig;
  isOpenSidebar: boolean;
  onCloseSidebar: () => void;
};

export const MainSidebar: React.FC<MainSidebarProps> = ({
  sideBarConfig,
  isOpenSidebar,
  onCloseSidebar,
}) => {
  const { tenantName, tenantContext, tenantPhotoUrl, onTenantClick, logo } =
    sideBarConfig || {};
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const theme = useTheme();
  const isLgScreen = useMediaQuery(theme.breakpoints.up('lg'));

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
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>{logo}</Box>

      {tenantName && (
        <Box sx={{ mb: 3, mx: 2.5 }}>
          <Link underline="none" href="#" onClick={onTenantClick}>
            <AccountStyle>
              <Avatar
                src={tenantPhotoUrl}
                alt={t('layout:alt.user-photo')}
                sx={{ width: 24, height: 24 }}
              />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {tenantName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: '3', // número de linhas antes de truncar
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {tenantContext}
                </Typography>
              </Box>
              {onTenantClick && (
                <UnfoldMoreIcon
                  sx={{ ml: 1, width: 16, height: 16, color: 'text.secondary' }}
                />
              )}
            </AccountStyle>
          </Link>
        </Box>
      )}

      <NavSection sideMenu={sideBarConfig?.sideMenu} />

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
    <RootStyle
      sx={{
        width:
          sideBarConfig?.sideMenu && (isOpenSidebar || isLgScreen)
            ? DRAWER_WIDTH
            : 0,
      }}
    >
      {!isLgScreen && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: sideBarConfig?.sideMenu ? DRAWER_WIDTH : 0 },
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isLgScreen && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: sideBarConfig?.sideMenu ? DRAWER_WIDTH : 0,
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

export default MainSidebar;
