import { PropsWithChildren, ReactElement, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  ListSubheader,
  Stack,
} from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';

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

export interface MenuGroup {
  subheader: string | ReactElement;
  items: MenuOption[];
}

type MenuGroupProps = {
  group: MenuGroup;
  active: (path: string) => boolean;
};

export interface MenuOption {
  label: string;
  href: string;
  icon?: ReactElement;
  info?: string;
  children?: MenuOption[];
  onClick?: VoidFunction;
}

export type NavMenuItem = MenuOption & {
  info?: string;
  children?: MenuOption[];
};

type NavMenuProps = {
  item: NavMenuItem;
  active: (path: string) => boolean;
};

function MenuGroup({ group, active }: MenuGroupProps) {
  const { subheader, items } = group;

  const [open, setOpen] = useState(true);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const renderContent = items.map((item) => (
    <NavMenu key={item.label} item={item} active={active} />
  ));

  return (
    <Stack sx={{ px: 2 }}>
      {subheader ? (
        <>
          <ListSubheader
            disableGutters
            disableSticky
            onClick={handleToggle}
            sx={{
              fontSize: 11,
              cursor: 'pointer',
              typography: 'overline',
              display: 'inline-flex',
              color: 'text.disabled',
              mb: '4px',
              p: (theme) => theme.spacing(2, 1, 1, 1.5),
              transition: (theme) =>
                theme.transitions.create(['color'], {
                  duration: theme.transitions.duration.shortest,
                }),
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            {subheader}
          </ListSubheader>

          <Collapse in={open}>{renderContent}</Collapse>
        </>
      ) : (
        renderContent
      )}
    </Stack>
  );
}

function NavMenu({ item, active }: NavMenuProps) {
  const theme = useTheme();

  const isActiveRoot =
    active(item.href) || item.children?.some((child) => active(child.href));

  const { label, href, icon, info, children } = item;

  const [open, setOpen] = useState(isActiveRoot);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const activeRootStyle = {
    color: 'primary.main',
    fontWeight: 'fontWeightBold',
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity,
    ),
  };

  const activeSubStyle = {
    color: 'primary.text',
    fontWeight: 'fontWeightBold',
  };

  if (children) {
    return (
      <>
        <ListItemStyle
          onClick={handleOpen}
          sx={{
            ...(isActiveRoot && activeRootStyle),
            ...(isActiveRoot && {
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? 'primary.main'
                  : 'primary.light',
            }),
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
              const { label, href, icon, onClick } = item;
              const isActiveSub = active(href);

              return (
                <ListItemStyle
                  key={label}
                  component={Link}
                  href={href}
                  sx={{
                    ...(isActiveSub && activeSubStyle),
                  }}
                  onClick={onClick}
                >
                  <ListItemIconStyle sx={{ ml: 2.5 }}>
                    <Box
                      component="span"
                      sx={{
                        width: 4,
                        height: 4,
                        display: 'flex',
                        borderRadius: '50%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'text.disabled',
                        transition: (theme) =>
                          theme.transitions.create('transform'),
                        ...(isActiveSub && {
                          transform: 'scale(2.5)',
                          bgcolor: 'primary.main',
                        }),
                      }}
                    />
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
        ...(isActiveRoot && {
          color: (theme) =>
            theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
        }),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      <ListItemText disableTypography primary={label} />
      {info && info}
    </ListItemStyle>
  );
}

type NavSectionProps = {
  sideMenu?: (MenuGroup | MenuOption)[];
};

// Type guard function
const isMenuGroup = (item: MenuGroup | MenuOption): item is MenuGroup => {
  return 'subheader' in item && 'items' in item;
};

export const NavSection: React.FC<NavSectionProps> = ({
  sideMenu,
  ...other
}) => {
  const { pathname } = useLocation();

  const match = (path: string) => path === pathname;

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {sideMenu?.map((item, index) => {
          if (isMenuGroup(item)) {
            return <MenuGroup key={index} group={item} active={match} />;
          } else {
            return <NavMenu key={item.label} item={item} active={match} />;
          }
        })}
      </List>
    </Box>
  );
};

export default NavSection;
