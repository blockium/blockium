import { ReactElement } from 'react';
import { createGlobalState } from 'react-use';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { Menu as MenuIcon, MenuOpen as MenuOpenIcon } from '@mui/icons-material';
//
// import { Searchbar } from '../Searchbar';
import {
  AccountPopover,
  AccountPopoverConfig,
} from '../../popover/AccountPopover';
// import { LanguagePopover } from '../LanguagePopover';
// import { NotificationsPopover } from '../NotificationsPopover';

// ----------------------------------------------------------------------

export const DRAWER_WIDTH = 280;
export const APPBAR_MOBILE = 64;
export const APPBAR_DESKTOP = 92;

interface RootStyleProps {
  isDesktopSidebarVisible?: boolean;
}

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isDesktopSidebarVisible',
})<RootStyleProps>(({ theme, isDesktopSidebarVisible = true }) => ({
  zIndex: 1,
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: isDesktopSidebarVisible
      ? `calc(100% - ${DRAWER_WIDTH + 1}px)`
      : '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export interface TopBarConfig {
  accountPopover?: AccountPopoverConfig;
}

interface MainTopbarProps {
  topBarConfig?: TopBarConfig;
  onOpenSidebar: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showMenuIcon: boolean;
  isDesktopSidebarVisible?: boolean;
  isLgScreen?: boolean;
}

export const useTopbar = createGlobalState<ReactElement>(<div></div>);
export const useTopbarExtra = createGlobalState<ReactElement>(<div></div>);

export const MainTopbar: React.FC<MainTopbarProps> = ({
  topBarConfig,
  onOpenSidebar,
  showMenuIcon,
  isDesktopSidebarVisible = true,
  isLgScreen = false,
}) => {
  const [topbar] = useTopbar();
  const [topbarExtra] = useTopbarExtra();

  return (
    <RootStyle 
      isDesktopSidebarVisible={isDesktopSidebarVisible}
      sx={{ ...(!showMenuIcon && { width: { lg: '100%' } }) }}>
      <ToolbarStyle>
        <Stack width="100%" sx={{ padding: (theme) => theme.spacing(1.5, 0) }}>
          <Stack direction="row">
            {showMenuIcon && (
              <IconButton
                onClick={onOpenSidebar}
                sx={{
                  mr: 1,
                  color: (theme) =>
                    theme.palette.grey[
                      theme.palette.mode === 'light' ? 600 : 500
                    ],
                  // Display in all screen sizes
                }}
              >
                {isLgScreen && isDesktopSidebarVisible ? (
                  <MenuOpenIcon />
                ) : (
                  <MenuIcon />
                )}
              </IconButton>
            )}

            {/* <Searchbar /> */}

            <Box
              sx={{
                flexGrow: 1,
                alignSelf: 'stretch',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginRight: (theme) => theme.spacing(0),
              }}
            >
              {topbar}
            </Box>

            <Stack
              direction="row"
              alignItems="center"
              spacing={{ xs: 1, sm: 1.5 }}
            >
              {/* <LanguagePopover /> */}
              {/* <NotificationsPopover /> */}
              <Box sx={{ marginLeft: (theme) => theme.spacing(1) }} />
              <AccountPopover
                accountPopoverConfig={topBarConfig?.accountPopover}
              />
            </Stack>
          </Stack>
          {topbarExtra}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default MainTopbar;
