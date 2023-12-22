import { useState } from 'react';
import { AlertColor } from '@mui/material';

type Alert = {
  message: string | null;
  severity?: AlertColor;
  open: boolean;
};

export const useAlert = () => {
  const [alert, setAlert] = useState<Alert>({
    message: null,
    severity: 'success',
    open: false,
  });

  const showAlert = (message: string, error?: boolean) => {
    setAlert({ message, severity: error ? 'error' : 'success', open: true });
  };

  const closeAlert = () => setAlert({ message: null, open: false });

  return { alert, showAlert, closeAlert };
};
