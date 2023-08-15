import { useEffect, useState } from 'react';
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
import { msg } from '@postgpt/i18n';
import { savePost, useUser } from '@postgpt/firebase';

import { PostCardPopover } from './PostCardPopover';

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
  setMessage: (message: string | null) => void;
}

const PostStepper: React.FC<IPostStepperProps> = ({ post, setMessage }) => {
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
      setMessage(msg('app.error.savePost'));
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
}

// TODO: !!! Move the status stepper to the actions section

// TODO: ! Open the post edit dialog when the user clicks on the post content

// TODO: ! Add a "Mais"/"Menos" in actions section to show/hide the post content. Default to show only the description (no hashtags, no type, no type description)
export const PostCard: React.FC<IPostCardProps> = ({ post, setMessage }) => {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const onMoreClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleOnClose = () => {
    setOpenPopover(null);
  };

  // TODO: *** Show a popup to confirm the post deletion
  // TODO: *** Delete the post when the user confirms the deletion. This saves the deletedAt field on the post and remove it from the calendarCache
  const handleDelete = () => {
    console.log('delete post');
  };

  return (
    <>
      <Card>
        <CardHeader
          title={post.title}
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
        <CardContent sx={{ cursor: 'pointer ' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <Stack gap="16px">
                <Typography variant="caption" textTransform="uppercase">
                  Legenda:
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'break-spaces' }}>
                  {post.description}
                </Typography>
                <Typography variant="body1">{post.hashtags}</Typography>
                <Typography
                  variant="caption"
                  textTransform="uppercase"
                  mt="16px"
                >
                  {post.type}:
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'break-spaces' }}>
                  {post.typeDescription}
                </Typography>
                <PostStepper post={post} setMessage={setMessage} />
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
        onClose={handleOnClose}
        onDelete={handleDelete}
      />
    </>
  );
};

export default PostCard;
