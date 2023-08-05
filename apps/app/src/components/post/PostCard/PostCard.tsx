import { useState } from 'react';
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

import { Post } from '@postgpt/types';
import { msg } from '@postgpt/i18n';
import { CriatyLogo, LoadingIndicator } from '@postgpt/ui-common';

const steps = [
  msg('app.post.status.defined'),
  msg('app.post.status.created'),
  msg('app.post.status.approved'),
  msg('app.post.status.published'),
];

const PostStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  return (
    <Box sx={{ width: '100%', mt: '24px' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step
            key={label}
            onClick={() =>
              setActiveStep(activeStep > index ? index : index + 1)
            }
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
  post?: Post;
}

export const PostCard: React.FC<IPostCardProps> = ({ post }) => {
  return post ? (
    <Card>
      <CardHeader
        title={post.title}
        action={
          <Stack direction="row" gap="8px" alignItems="center">
            <Typography variant="body2" textTransform="uppercase">
              {post.format}
            </Typography>
            <IconButton>
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
              <Typography variant="body1">{post.description}</Typography>
              <Typography variant="body1">{post.hashtags}</Typography>
              <Typography variant="caption" textTransform="uppercase" mt="16px">
                {post.type}:
              </Typography>
              <Typography variant="body1">{post.typeDescription}</Typography>
              <PostStepper />
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
  ) : (
    <LoadingIndicator>
      <CriatyLogo
        full={false}
        colorScheme="transparent-green-green-transparent"
        sx={{ marginTop: '0.75rem' }}
      />
    </LoadingIndicator>
  );
};

export default PostCard;
