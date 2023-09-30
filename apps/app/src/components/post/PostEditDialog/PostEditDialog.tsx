import { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Dialog,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import { msg } from '@blockium/i18n';
import { Post } from '@criaty/model-types';
import { CTAButton } from '@blockium/ui-common';

import { useUpdatePost } from '../../../hooks';

const goalMap: { [type: string]: string } = {
  Product: msg('app.post.goal.product'),
  Offer: msg('app.post.goal.offer'),
  Novelty: msg('app.post.goal.novelty'),
  Event: msg('app.post.goal.event'),
  Testimonial: msg('app.post.goal.testimonial'),
  Tutorial: msg('app.post.goal.tutorial'),
  Tips: msg('app.post.goal.tips'),
  'Behind-the-Scenes': msg('app.post.goal.behind-the-scenes'),
  TBT: msg('app.post.goal.tbt'),
  Poll: msg('app.post.goal.poll'),
  FAQ: msg('app.post.goal.faq'),
  Challenge: msg('app.post.goal.challenge'),
  Contest: msg('app.post.goal.contest'),
  Entertainment: msg('app.post.goal.entertainment'),
  Motivational: msg('app.post.goal.motivational'),
};

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

interface PostEditDialogProps {
  open: boolean;
  post: Post;
  setMessage: (message: string | null) => void;
  setErrorMessage: (message: string | null) => void;
  onClose: () => void;
}

export const PostEditDialog: React.FC<PostEditDialogProps> = ({
  open,
  post,
  setMessage,
  setErrorMessage,
  onClose,
}) => {
  const updatePost = useUpdatePost();
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [hashtags, setHashtags] = useState(post.hashtags);
  const [typeDescription, setTypeDescription] = useState(post.typeDescription);

  const handleSave = async () => {
    onClose();

    // Update post
    const oldPost = { ...post };
    post.title = title;
    post.description = description;
    post.hashtags = hashtags;
    post.typeDescription = typeDescription;
    const updated = await updatePost(post);
    if (updated) {
      setMessage(msg('app.success.post-updated'));
    } else {
      post.title = oldPost.title;
      post.description = oldPost.description;
      post.hashtags = oldPost.hashtags;
      post.typeDescription = oldPost.typeDescription;
      setErrorMessage(msg('app.error.updatePost'));
    }
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
      <DialogTitle>{`${goalMap[post.params.goal]}`}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          rows={2}
          margin="dense"
          label={msg('app.dialog.postedit.input.title')}
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          multiline
          rows={3}
          margin="dense"
          label={msg('app.dialog.postedit.input.description')}
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
          multiline
          rows={8}
          margin="dense"
          label={`${formatMap[post.format]} ${msg(
            'app.dialog.postedit.input.with',
          )} ${typeMap[post.type]}`}
          fullWidth
          value={typeDescription}
          onChange={(e) => setTypeDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ gap: '1rem' }}>
        <CTAButton variant="outlined" onClick={onClose} color="secondary">
          {msg('app.button.cancel')}
        </CTAButton>
        <CTAButton variant="contained" onClick={handleSave} color="primary">
          {msg('app.button.save')}
        </CTAButton>
      </DialogActions>
    </Dialog>
  );
};
