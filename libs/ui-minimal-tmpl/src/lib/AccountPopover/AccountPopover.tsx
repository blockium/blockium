import { ReactElement, useRef, useState } from 'react';
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

import { useAuth, useSignOut } from '@postgpt/firebase';
import { DarkModeSwitch } from '@postgpt/theme';
import { msg } from '@postgpt/i18n';

// components
import { MenuPopover } from '../MenuPopover';

export type MenuOption = {
  label: string;
  href: string;
  icon?: ReactElement;
};

interface AccountPopoverProps {
  menuOptions?: MenuOption[];
}

export const AccountPopover: React.FC<AccountPopoverProps> = ({
  menuOptions,
}) => {
  const [user] = useAuth();
  const signOut = useSignOut();
  const name = sessionStorage.getItem('name');

  const anchorRef = useRef(null);
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSignOut = async () => {
    sessionStorage.clear();
    await signOut();
    window.location.reload();
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
        <Avatar
          src={user?.photoURL || undefined}
          alt={msg('ui-minimal-tmpl.alt.user-photo')}
        />
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
            {name || user?.displayName || user?.phoneNumber}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.phoneNumber || user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {menuOptions?.map((option) => (
            <MenuItem
              key={option.label}
              href={option.href}
              component={Link}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
          <DarkModeSwitch showLabel />
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem component={Link} onClick={handleSignOut} sx={{ m: 1 }}>
          {msg('ui-minimal-tmpl.menu-item.sign-out')}
        </MenuItem>
      </MenuPopover>
    </>
  );
};

export default AccountPopover;
