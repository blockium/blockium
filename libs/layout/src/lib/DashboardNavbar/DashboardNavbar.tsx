import { ReactElement } from 'react';
import { createGlobalState } from 'react-use';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { ViewQuilt as ViewQuiltIcon } from '@mui/icons-material';
//
// import { Searchbar } from '../Searchbar';
import { AccountPopover, AccountPopoverConfig } from '../AccountPopover';
// import { LanguagePopover } from '../LanguagePopover';
// import { NotificationsPopover } from '../NotificationsPopover';

// ----------------------------------------------------------------------

export const DRAWER_WIDTH = 280;
export const APPBAR_MOBILE = 64;
export const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
  zIndex: 1,
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

export interface NavBarConfig {
  accountPopover?: AccountPopoverConfig;
}

interface DashboardNavbarProps {
  navBarConfig?: NavBarConfig;
  onOpenSidebar: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const useToolbarExtra = createGlobalState<ReactElement>(<div></div>);
export const useNavbarExtraLine = createGlobalState<ReactElement>(<div></div>);

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  navBarConfig,
  onOpenSidebar,
}) => {
  const [toolbarExtra] = useToolbarExtra();
  const [navbarExtraLine] = useNavbarExtraLine();

  return (
    <RootStyle>
      <ToolbarStyle>
        <Stack width="100%" sx={{ padding: (theme) => theme.spacing(1.5, 0) }}>
          <Stack direction="row">
            <IconButton
              onClick={onOpenSidebar}
              sx={{
                mr: 1,
                color: (theme) =>
                  theme.palette.grey[
                    theme.palette.mode === 'light' ? 600 : 500
                  ],
                display: { lg: 'none' },
              }}
            >
              <ViewQuiltIcon />
            </IconButton>

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
              {toolbarExtra}
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
                accountPopoverConfig={navBarConfig?.accountPopover}
              />
            </Stack>
          </Stack>
          {navbarExtraLine}
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default DashboardNavbar;
