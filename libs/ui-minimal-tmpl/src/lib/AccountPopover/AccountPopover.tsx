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
  ListItemIcon,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { DarkModeSwitch } from '@blockium/theme';
import { useTranslation } from 'react-i18next';

// components
import { MenuPopover } from '../MenuPopover';
import { MenuOption } from '../DashboardLayout';

export interface AccountPopoverConfig {
  userName?: string;
  userContact?: string;
  userPhotoUrl?: string;
  accountMenu?: MenuOption[];
  handleSignOut?: () => void;
}
interface AccountPopoverProps {
  accountPopoverConfig?: AccountPopoverConfig;
}

export const AccountPopover: React.FC<AccountPopoverProps> = ({
  accountPopoverConfig,
}) => {
  const { userName, userContact, userPhotoUrl, accountMenu, handleSignOut } =
    accountPopoverConfig || {};
  const { t } = useTranslation();

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
        <Avatar src={userPhotoUrl} alt={t('ui-minimal-tmpl:alt.user-photo')} />
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
            {userName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userContact}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {accountMenu?.map((option) => (
            <MenuItem
              key={option.label}
              href={option.href}
              component={Link}
              onClick={handleClose}
            >
              <Stack direction="row">
                {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
                {option.label}
              </Stack>
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <DarkModeSwitch
          showLabel
          sx={{ my: 2, px: 2 }}
          gap={0.5}
          direction="row-reverse"
          justifyContent="start"
        />

        {handleSignOut && (
          <MenuItem component={Link} onClick={handleSignOut} sx={{ m: 1 }}>
            <Stack direction="row">
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              {t('ui-minimal-tmpl:menu-item.sign-out')}
            </Stack>
          </MenuItem>
        )}
      </MenuPopover>
    </>
  );
};

export default AccountPopover;
