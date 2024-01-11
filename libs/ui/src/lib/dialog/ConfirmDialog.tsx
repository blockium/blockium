import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message?: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmColor?: 'primary' | 'secondary' | 'error';
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = (
  props: ConfirmDialogProps,
) => {
  const { open, title, message, onConfirm, onClose, confirmColor } = props;
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ sx: { p: '1em' } }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {message && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          {t('ui:button.cancel')}
        </Button>
        <Button
          variant="contained"
          color={confirmColor || 'primary'}
          onClick={onConfirm}
        >
          {t('ui:button.confirm')}Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
