import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

import { Post, PostStatus } from '@postgpt/types';

import { PostEditDialog } from '../PostEditDialog/PostEditDialog';

export const PostCard: React.FC<Post> = ({
  title,
  description,
  typeDescription,
  status,
  setStatus,
}) => {
  const [open, setOpen] = useState(false);
  const [postTitle, setPostTitle] = useState(title);
  const [postDescription, setPostDescription] = useState(description);
  const [postTypeDescription, setPostTypeDescription] =
    useState(typeDescription);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [newStatus, setNewStatus] = useState<PostStatus>(status);

  const statusList: PostStatus[] = ['initial', 'liked', 'finished', 'approved'];
  const statusLabel: { [status in PostStatus]: string } = {
    initial: 'Curtir',
    liked: 'Design Pronto',
    finished: 'Aprovar',
    approved: 'Aprovado',
  };
  const nextStatus = (e: React.MouseEvent) => {
    let i = statusList.indexOf(newStatus) + 1;
    if (i === statusList.length) {
      i = 0;
    }
    setStatus(statusList[i]);
    setNewStatus(statusList[i]);
  };

  return (
    <>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent onClick={handleClickOpen} sx={{ cursor: 'pointer ' }}>
          <Typography variant="body1">{title}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button onClick={nextStatus} variant="text" color="primary" fullWidth>
            {statusLabel[newStatus]}
          </Button>
        </CardActions>
      </Card>
      <PostEditDialog
        open={open}
        handleClose={handleClose}
        title={postTitle}
        description={postDescription}
        typeDescription={postTypeDescription}
        setTitle={setPostTitle}
        setDescription={setPostDescription}
        setTypeDescription={setPostTypeDescription}
      />
    </>
  );
};
