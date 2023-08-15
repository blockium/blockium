import { ReactElement, useState } from 'react';
import { IconButton, Stack, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { msg } from '@postgpt/i18n';
import { CTAButton } from '@postgpt/ui-common';
import { Post, PostFormat, PostType } from '@postgpt/types';
import { addPost as addPostDb } from '@postgpt/firebase';

import { newPosts } from '../../../../apiRequests';

interface IPostProductProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate?: (addPost: (date: Date) => Promise<Post | null>) => Promise<void>;
}

// TODO: !!! Add a select to choose the post format
// TODO: !!! Add a select to choose the post type
export const PostProduct: React.FC<IPostProductProps> = ({
  setGoalElement,
  onGenerate,
}) => {
  const [topic, setTopic] = useState('');
  const [character, setCharacter] = useState('');
  const [format, setFormat] = useState<PostFormat>();
  const [type, setType] = useState<PostType>();

  const addPost = async (date: Date) => {
    // Request the creation of one new post
    const result = await newPosts(1, topic, character, format, type);

    // If the result is a string, it's an error
    if (typeof result === 'string') {
      console.error(result);
      return null;
    }

    const post = result[0];
    // TODO: Save topic, character, format and type in Firebase
    const newPost = {
      ...post,
      date,
    };
    try {
      // Save news posts in Firebase
      const userId = sessionStorage.getItem('userId') ?? '';
      const postRef = await addPostDb(userId, newPost);
      newPost.id = postRef.id;
      //
    } catch (error) {
      console.error(error);
      return null;
      //
    }

    return newPost;
  };

  const handleGenerate = () => {
    onGenerate?.(addPost);
  };

  return (
    <Stack sx={{ p: 1 }} gap={1}>
      <TextField
        autoFocus
        margin="dense"
        label={msg('app.popover.newpost.input.topic')}
        type="text"
        fullWidth
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton
              sx={{ visibility: topic ? 'visible' : 'hidden' }}
              onClick={() => setTopic('')}
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
        required
      />
      <TextField
        margin="dense"
        label={msg('app.popover.newpost.input.character')}
        type="text"
        fullWidth
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton
              sx={{ visibility: character ? 'visible' : 'hidden' }}
              onClick={() => setCharacter('')}
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
      />
      <Stack direction="row" gap={2}>
        <CTAButton
          onClick={() => setGoalElement(null)}
          color="primary"
          variant="text"
          fullWidth
          sx={{ mt: 2 }}
        >
          {msg('app.button.back')}
        </CTAButton>
        {/* Disable Generate button when topic is empty */}
        <CTAButton
          onClick={handleGenerate}
          color="primary"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={!topic}
        >
          {msg('app.button.generate')}
        </CTAButton>
      </Stack>
    </Stack>
  );
};

export default PostProduct;
