import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Dialog,
  Button,
} from '@mui/material';

import { useIntlMessage } from '@postgpt/i18n';

interface PostEditDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  description: string;
  hashtags: string;
  format: string;
  type: string;
  typeDescription: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setHashtags: (hashtags: string) => void;
  setTypeDescription: (media: string) => void;
}

export const PostEditDialog: React.FC<PostEditDialogProps> = ({
  open,
  handleClose,
  title,
  description,
  hashtags,
  format,
  type,
  typeDescription,
  setTitle,
  setDescription,
  setHashtags,
  setTypeDescription,
}) => {
  const msg = useIntlMessage();

  const formatMap: { [type: string]: string } = {
    feed: msg('app.dialog.postedit.input.formatFeed'),
    stories: msg('app.dialog.postedit.input.formatStories'),
    reels: msg('app.dialog.postedit.input.formatReels'),
  };

  const typeMap: { [type: string]: string } = {
    image: msg('app.dialog.postedit.input.typeImage'),
    video: msg('app.dialog.postedit.input.typeVideo'),
    carousel: msg('app.dialog.postedit.input.typeCarousel'),
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{msg('app.dialog.postedit.title')}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={msg('app.dialog.postedit.input.title')}
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label={msg('app.dialog.postedit.input.description')}
          multiline
          rows={5}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label={msg('app.dialog.postedit.input.hashtags')}
          fullWidth
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
        />
        <TextField
          margin="dense"
          label={`${formatMap[format]} ${msg(
            'app.dialog.postedit.input.with'
          )} ${typeMap[type]}`}
          multiline
          rows={5}
          fullWidth
          value={typeDescription}
          onChange={(e) => setTypeDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          {msg('app.button.delete')}
        </Button>
        <Button onClick={handleClose} color="primary">
          {msg('app.button.approve')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
