import {
  Alert as MuiAlert,
  AlertProps as MuiAlertProps,
  Snackbar,
} from '@mui/material';

interface AlertProps extends MuiAlertProps {
  message: string | null;
  setMessage: (message: string | null) => void;
}

export const Alert: React.FC<AlertProps> = ({
  severity = 'success',
  message,
  setMessage,
  children,
  ...rest
}) => {
  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage(null);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={message !== null}
      autoHideDuration={6000}
      onClose={handleAlertClose}
    >
      <MuiAlert
        variant="filled"
        severity={severity}
        sx={{ width: '100%' }}
        onClose={handleAlertClose}
        {...rest}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
