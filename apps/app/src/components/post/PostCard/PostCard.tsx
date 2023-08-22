import { useEffect, useRef, useState } from 'react';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Post, PostStatus } from '@postgpt/types';
import { savePost, useUser } from '@postgpt/firebase';
import { ConfirmDialog } from '@postgpt/ui-common';
import { msg } from '@postgpt/i18n';

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

const stepLabels = [
  msg('app.post.status.defined'),
  msg('app.post.status.created'),
  msg('app.post.status.approved'),
  msg('app.post.status.published'),
];

interface IPostStepperProps {
  post: Post;
  setErrorMessage: (message: string | null) => void;
}

const PostStepper: React.FC<IPostStepperProps> = ({
  post,
  setErrorMessage,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const user = useUser();

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
      setErrorMessage(msg('app.error.savePost'));
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
  setMessage: (message: string | null) => void;
  setErrorMessage: (message: string | null) => void;
  onRegenerate: (element: HTMLElement, post: Post) => void;
}

// TODO: *** Move a post. User can select a date and move the post to that date.

// TODO: ! Move the status stepper to the actions section

// TODO: ! Add a "Mais"/"Menos" in actions section to show/hide the post content. Default to show only the description (no hashtags, no type, no type description)
export const PostCard: React.FC<IPostCardProps> = ({
  post,
  setMessage,
  setErrorMessage,
  onRegenerate,
}) => {
  const addPost = useAddPost();
  const deletePost = useDeletePost();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const postCardRef = useRef<HTMLDivElement>(null);

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
      setErrorMessage(result);
    } else {
      setMessage(msg('app.success.post-duplicated'));
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
      setErrorMessage(msg('app.error.deletePost'));
    }
  };

  const handleCopyTitle = () => {
    navigator.clipboard.writeText(post.title);
    setMessage(msg('app.success.post-title-copied'));
  };

  const handleCopyDescription = () => {
    navigator.clipboard.writeText(post.description);
    setMessage(msg('app.success.post-description-copied'));
  };

  const handleCopyHashtags = () => {
    navigator.clipboard.writeText(post.hashtags);
    setMessage(msg('app.success.post-hashtags-copied'));
  };

  const handleCopyTypeDescription = () => {
    navigator.clipboard.writeText(post.typeDescription);
    setMessage(msg('app.success.post-type-description-copied'));
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
                <PostStepper post={post} setErrorMessage={setErrorMessage} />
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
        title={msg('app.dialog.postdelete.title')}
        message={msg('app.dialog.postdelete.message')}
        onConfirm={handleDeleteConfirmed}
        onClose={() => setOpenConfirmDelete(false)}
        confirmColor="error"
      />
      <PostEditDialog
        open={openEditDialog}
        post={post}
        setMessage={setMessage}
        setErrorMessage={setErrorMessage}
        onClose={() => setOpenEditDialog(false)}
      />
    </>
  );
};

export default PostCard;
