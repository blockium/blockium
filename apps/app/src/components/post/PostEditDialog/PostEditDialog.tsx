import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Dialog,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import { Post } from '@criaty/model-types';
import { CTAButton } from '@blockium/ui';

import { useUpdatePost } from '../../../hooks';

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
  const { t } = useTranslation();

  const goalMap: { [type: string]: string } = {
    Product: t('post.goal.product'),
    Offer: t('post.goal.offer'),
    Novelty: t('post.goal.novelty'),
    Event: t('post.goal.event'),
    Testimonial: t('post.goal.testimonial'),
    Tutorial: t('post.goal.tutorial'),
    Tips: t('post.goal.tips'),
    'Behind-the-Scenes': t('post.goal.behind-the-scenes'),
    TBT: t('post.goal.tbt'),
    Poll: t('post.goal.poll'),
    FAQ: t('post.goal.faq'),
    Challenge: t('post.goal.challenge'),
    Contest: t('post.goal.contest'),
    Entertainment: t('post.goal.entertainment'),
    Motivational: t('post.goal.motivational'),
  };

  const formatMap: { [type: string]: string } = {
    feed: t('dialog.postedit.input.formatFeed'),
    stories: t('dialog.postedit.input.formatStories'),
    reels: t('dialog.postedit.input.formatReels'),
  };

  const typeMap: { [type: string]: string } = {
    image: t('dialog.postedit.input.typeImage'),
    video: t('dialog.postedit.input.typeVideo'),
    carousel: t('dialog.postedit.input.typeCarousel'),
  };

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
      setMessage(t('success.post-updated'));
    } else {
      post.title = oldPost.title;
      post.description = oldPost.description;
      post.hashtags = oldPost.hashtags;
      post.typeDescription = oldPost.typeDescription;
      setErrorMessage(t('error.updatePost'));
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
          label={t('dialog.postedit.input.title')}
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          multiline
          rows={3}
          margin="dense"
          label={t('dialog.postedit.input.description')}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label={t('dialog.postedit.input.hashtags')}
          fullWidth
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
        />
        <TextField
          multiline
          rows={8}
          margin="dense"
          label={`${formatMap[post.format]} ${t(
            'app.dialog.postedit.input.with',
          )} ${typeMap[post.type]}`}
          fullWidth
          value={typeDescription}
          onChange={(e) => setTypeDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ gap: '1rem' }}>
        <CTAButton variant="outlined" onClick={onClose} color="secondary">
          {t('button.cancel')}
        </CTAButton>
        <CTAButton variant="contained" onClick={handleSave} color="primary">
          {t('button.save')}
        </CTAButton>
      </DialogActions>
    </Dialog>
  );
};
