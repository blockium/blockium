import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Dialog,
  Button,
} from '@mui/material';

interface PostEditDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  description: string;
  typeDescription: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setTypeDescription: (media: string) => void;
}

export const PostEditDialog: React.FC<PostEditDialogProps> = ({
  open,
  handleClose,
  title,
  description,
  typeDescription,
  setTitle,
  setDescription,
  setTypeDescription,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Postagem</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Titulo"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Descrição"
          multiline
          rows={5}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Imagem/Vídeo"
          multiline
          rows={5}
          fullWidth
          value={typeDescription}
          onChange={(e) => setTypeDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Excluir
        </Button>
        <Button onClick={handleClose} color="primary">
          Aprovar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
