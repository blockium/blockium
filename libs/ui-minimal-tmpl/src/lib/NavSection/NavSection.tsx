import { PropsWithChildren, useState } from 'react';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Collapse,
  Link,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  useTheme,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { MenuOption } from '../DashboardLayout';
//

// ----------------------------------------------------------------------

interface ListItemStyleProps extends PropsWithChildren {
  [name: string]: unknown;
}

const ListItemStyle = styled((props: ListItemStyleProps) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
  borderRadius: theme.shape.borderRadius,
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

// ----------------------------------------------------------------------

export type NavMenuItem = MenuOption & {
  info?: string;
  children?: MenuOption[];
};

type NavMenuProps = {
  item: NavMenuItem;
  active: (path: string) => boolean;
};

function NavMenu({ item, active }: NavMenuProps) {
  const theme = useTheme();

  const isActiveRoot = active(item.href);

  const { label, href, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightMedium',
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
  };

  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          <ListItemText disableTypography primary={label} />
          {info && info}
          {open ? (
            <KeyboardArrowDownIcon
              sx={{ width: 16, height: 16, ml: 1, mr: 2 }}
            />
          ) : (
            <ChevronRightIcon sx={{ width: 16, height: 16, ml: 1, mr: 2 }} />
          )}
        </ListItemStyle>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children.map((item: MenuOption) => {
              const { label, href, icon } = item;
              const isActiveSub = active(href);

              return (
                <ListItemStyle
                  key={label}
                  component={Link}
                  href={href}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                >
                  <ListItemIconStyle sx={{ ml: 2.5 }}>
                    {/* <Box
                      component="span"
                      sx={{
                        width: 3,
                        height: 3,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) =>
                          theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    /> */}
                    {icon && icon}
                  </ListItemIconStyle>
                  <ListItemText disableTypography primary={label} />
                </ListItemStyle>
              );
            })}
          </List>
        </Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      component={Link}
      to={href}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={label} />
      {info && info}
    </ListItemStyle>
  );
}

type NavSectionProps = {
  sideMenu?: MenuOption[];
};

export const NavSection: React.FC<NavSectionProps> = ({
  sideMenu,
  ...other
}) => {
  const pathname = window.location.pathname;

  const match = (path: string) => path === pathname;

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {sideMenu?.map((item) => (
          <NavMenu key={item.label} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
};

export default NavSection;
