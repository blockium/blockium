import { PropsWithChildren } from 'react';
import { Box, IconButton, styled } from '@mui/material';
// icons
import { Close as CloseIcon } from '@mui/icons-material';
import { Info as InfoIcon } from '@mui/icons-material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { Error as ErrorIcon } from '@mui/icons-material';

import {
  MaterialDesignContent,
  SnackbarProvider,
  closeSnackbar,
} from 'notistack';

export const StyledNotistack = styled(MaterialDesignContent)(({ theme }) => {
  return {
    '& #notistack-snackbar': {
      ...theme.typography.subtitle2,
    },
    '&.notistack-MuiContent': {
      padding: theme.spacing(1, 2),
      boxShadow: theme.customShadows.z8,
      borderRadius: theme.shape.borderRadius,
    },
    '&.notistack-MuiContent-default': {
      padding: theme.spacing(1, 2),
      boxShadow: theme.customShadows.z8,
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.background.default,
      backgroundColor: theme.palette.text.primary,
    },
  };
});

export const StyledIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginRight: theme.spacing(1),
}));

export const NotistackProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <SnackbarProvider
      variant="success"
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      iconVariant={{
        info: (
          <StyledIcon color="info">
            <InfoIcon />
          </StyledIcon>
        ),
        success: (
          <StyledIcon color="success">
            <CheckCircleIcon />
          </StyledIcon>
        ),
        warning: (
          <StyledIcon color="warning">
            <WarningIcon />
          </StyledIcon>
        ),
        error: (
          <StyledIcon color="error">
            <ErrorIcon />
          </StyledIcon>
        ),
      }}
      Components={{
        default: StyledNotistack,
        info: StyledNotistack,
        success: StyledNotistack,
        warning: StyledNotistack,
        error: StyledNotistack,
      }}
      action={(snackbarId) => (
        <IconButton
          size="small"
          onClick={() => closeSnackbar(snackbarId)}
          sx={{ color: 'grey.300' }}
        >
          <CloseIcon />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};
