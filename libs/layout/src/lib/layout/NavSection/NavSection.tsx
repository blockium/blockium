import { PropsWithChildren, ReactElement, useState } from 'react';
import { useLocation } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  List,
  Collapse,
  Link,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  useTheme,
  Typography,
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

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  '&::before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    display: 'none',
  },
  '& .MuiCollapse-root': {
    '& .MuiCollapse-wrapper': {
      '& .MuiCollapse-wrapperInner': {
        marginTop: 0,
      },
    },
  },
  margin: '0 !important',
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: 0,
  minHeight: 'auto',
  height: 48,
  '& .MuiAccordionSummary-content': {
    margin: '0 !important',
    paddingLeft: 16,
    alignItems: 'center',
    display: 'flex',
  },
}));

// ----------------------------------------------------------------------

export interface MenuGroup {
  subheader: string | ReactElement;
  items: MenuOption[];
}

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

  const navMenu = (items: MenuOption[]) =>
    items.map((item) => (
      <NavMenu key={item.label} item={item} active={match} />
    ));

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {sideMenu?.map((item, index) => {
          if (isMenuGroup(item)) {
            return (
              <StyledAccordion key={index} defaultExpanded>
                <StyledAccordionSummary>
                  {typeof item.subheader === 'string' ? (
                    <Typography
                      variant="subtitle2"
                      sx={{ textTransform: 'uppercase', fontSize: 14 }}
                    >
                      {item.subheader}
                    </Typography>
                  ) : (
                    item.subheader
                  )}
                </StyledAccordionSummary>
                <AccordionDetails sx={{ p: 0 }}>
                  {navMenu(item.items)}
                </AccordionDetails>
              </StyledAccordion>
            );
          } else {
            return navMenu([item]);
          }
        })}
      </List>
    </Box>
  );
};

export default NavSection;
