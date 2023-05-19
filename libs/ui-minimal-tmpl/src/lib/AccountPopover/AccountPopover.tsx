import { useRef, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Link,
} from '@mui/material';

import { useAuth } from '@postgpt/firebase';
import { DarkModeSwitch } from '@postgpt/theme';

// components
import { MenuPopover } from '../MenuPopover';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Site',
    icon: 'eva:home-fill',
    linkTo: '/',
  },
  // {
  //   label: "Profile",
  //   icon: "eva:person-fill",
  //   linkTo: "#",
  // },
  // {
  //   label: "Settings",
  //   icon: "eva:settings-2-fill",
  //   linkTo: "#",
  // },
];

// ----------------------------------------------------------------------

export const AccountPopover = () => {
  const [user] = useAuth();

  const anchorRef = useRef(null);

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        {user?.photoURL && <Avatar src={user.photoURL} alt="User Photo" />}
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              href={option.linkTo}
              component={Link}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
          <DarkModeSwitch showName />
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          href="/app/logout"
          component={Link}
          onClick={handleClose}
          sx={{ m: 1 }}
        >
          Sair
        </MenuItem>
      </MenuPopover>
    </>
  );
};

export default AccountPopover;
