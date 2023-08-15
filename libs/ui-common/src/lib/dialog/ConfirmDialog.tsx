import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          color={confirmColor || 'primary'}
          onClick={onConfirm}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
