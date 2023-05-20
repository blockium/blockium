// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
//
// import { Searchbar } from '../Searchbar';
import { AccountPopover, MenuOption } from '../AccountPopover';
// import { LanguagePopover } from '../LanguagePopover';
// import { NotificationsPopover } from '../NotificationsPopover';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

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

interface DashboardNavbarProps {
  accountMenuOptions: MenuOption[];
  onOpenSidebar: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  accountMenuOptions,
  onOpenSidebar,
}) => {
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* <Searchbar /> */}
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1.5 }}>
          {/* <LanguagePopover />
          <NotificationsPopover /> */}
          <AccountPopover menuOptions={accountMenuOptions} />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default DashboardNavbar;
