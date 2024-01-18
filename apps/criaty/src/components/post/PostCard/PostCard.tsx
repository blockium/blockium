import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { enqueueSnackbar } from 'notistack';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

import { Post, PostStatus } from '@criaty/model-types';
import { savePost, useUser } from '@criaty/model';
import { ConfirmDialog } from '@blockium/ui';

import { PostCardPopover } from './PostCardPopover';
import { useAddPost, useDeletePost } from '../../../hooks';
import { PostEditDialog } from '../PostEditDialog';

const steps: PostStatus[] = [
  'initial',
  'defined',
  'created',
  'approved',
  'published',
];

interface IPostStepperProps {
  post: Post;
}

const PostStepper: React.FC<IPostStepperProps> = ({ post }) => {
  const [activeStep, setActiveStep] = useState(0);
  const user = useUser();
  const { t } = useTranslation();

  const stepLabels = [
    t('post.status.defined'),
    t('post.status.created'),
    t('post.status.approved'),
    t('post.status.published'),
  ];

  // Get the active step from the post status
  useEffect(() => {
    setActiveStep(steps.indexOf(post.status));
  }, [post.status]);

  // Save the post status when user clicks on the stepper
  const onStepClick = async (index: number) => {
    if (!user?.id) return;

    const newStepIndex = activeStep > index ? index : index + 1;

    try {
      post.status = steps[newStepIndex];
      await savePost(user.id, post);
      //
    } catch (error) {
      console.error('error saving post', error);
      enqueueSnackbar(t('error.savePost'), { variant: 'error' });
    }

    setActiveStep(newStepIndex);
  };

  return (
    <Box sx={{ width: '100%', mt: '24px' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepLabels.map((label, index) => (
          <Step
            key={label}
            onClick={() => onStepClick(index)}
            sx={{ cursor: 'pointer' }}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

interface IPostCardProps {
  post: Post;
  onRegenerate: (element: HTMLElement, post: Post) => void;
}

// TODO: *** Move a post. User can select a date and move the post to that date.

// TODO: ! Move the status stepper to the actions section

// TODO: ! Add a "Mais"/"Menos" in actions section to show/hide the post content. Default to show only the description (no hashtags, no type, no type description)
export const PostCard: React.FC<IPostCardProps> = ({ post, onRegenerate }) => {
  const addPost = useAddPost();
  const deletePost = useDeletePost();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const postCardRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const onMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleOnClose = () => {
    setOpenPopover(null);
  };

  const handleEdit = () => {
    setOpenPopover(null);
    setOpenEditDialog(true);
  };

  const handleRegenerate = () => {
    setOpenPopover(null);
    if (postCardRef.current) {
      onRegenerate(postCardRef.current, post);
    }
  };

  const handleDuplicate = async () => {
    setOpenPopover(null);
    const newPost = { ...post, createdAt: new Date() };
    const result = await addPost(newPost);
    if (typeof result === 'string') {
      enqueueSnackbar(result, { variant: 'error' });
    } else {
      enqueueSnackbar(t('success.post-duplicated'));
    }
  };

  // Show a popup to confirm the post deletion
  const handleDelete = () => {
    setOpenPopover(null);
    setOpenConfirmDelete(true);
  };

  // Delete the post when the user confirms the deletion. This saves the deletedAt field on the post and remove it from the calendarCache
  const handleDeleteConfirmed = async () => {
    setOpenConfirmDelete(false);
    const deleted = await deletePost(post);
    if (!deleted) {
      enqueueSnackbar(t('error.deletePost'), { variant: 'error' });
    }
  };

  const handleCopyTitle = () => {
    navigator.clipboard.writeText(post.title);
    enqueueSnackbar(t('success.post-title-copied'));
  };

  const handleCopyDescription = () => {
    navigator.clipboard.writeText(post.description);
    enqueueSnackbar(t('success.post-description-copied'));
  };

  const handleCopyHashtags = () => {
    navigator.clipboard.writeText(post.hashtags);
    enqueueSnackbar(t('success.post-hashtags-copied'));
  };

  const handleCopyTypeDescription = () => {
    navigator.clipboard.writeText(post.typeDescription);
    enqueueSnackbar(t('success.post-type-description-copied'));
  };

  return (
    <>
      <Card ref={postCardRef}>
        <CardHeader
          title={<Box onClick={handleCopyTitle}>{post.title}</Box>}
          action={
            <Stack direction="row" gap="8px" alignItems="center">
              <Typography variant="body2" textTransform="uppercase">
                {post.format}
              </Typography>
              <IconButton onClick={onMoreClick}>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          }
        />
        <CardContent>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Stack gap="16px">
                <Typography variant="caption" textTransform="uppercase">
                  Legenda:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ cursor: 'pointer ', whiteSpace: 'break-spaces' }}
                  onClick={handleCopyDescription}
                >
                  {post.description}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ cursor: 'pointer ' }}
                  onClick={handleCopyHashtags}
                >
                  {post.hashtags}
                </Typography>
                <Typography
                  variant="caption"
                  textTransform="uppercase"
                  mt="16px"
                >
                  {post.type}:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ cursor: 'pointer ', whiteSpace: 'break-spaces' }}
                  onClick={handleCopyTypeDescription}
                >
                  {post.typeDescription}
                </Typography>
                <PostStepper post={post} />
              </Stack>
            </Grid>
            {/* This is to add an image representation of the post in future.
              It might be also some ads for media creation services */}
            {/* <Grid item xs={12} md={6}>
            <Stack gap="16px">
              <Box sx={{ bgcolor: '#D8D8D8', height: '418px' }}></Box>
            </Stack>
          </Grid> */}
          </Grid>
        </CardContent>
      </Card>
      {/* Add a menu popover when the user clicks on the 3-dots icon */}
      <PostCardPopover
        anchorEl={openPopover}
        onEdit={handleEdit}
        onRegenerate={handleRegenerate}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        onClose={handleOnClose}
      />
      <ConfirmDialog
        open={openConfirmDelete}
        title={t('dialog.postdelete.title')}
        message={t('dialog.postdelete.message')}
        onConfirm={handleDeleteConfirmed}
        onClose={() => setOpenConfirmDelete(false)}
        confirmColor="error"
      />
      <PostEditDialog
        open={openEditDialog}
        post={post}
        onClose={() => setOpenEditDialog(false)}
      />
    </>
  );
};

export default PostCard;
