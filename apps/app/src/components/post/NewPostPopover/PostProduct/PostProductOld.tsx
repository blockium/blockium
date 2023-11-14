// TODO: Delete PostProductOld.tsx
import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Stack, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { CTAButton } from '@blockium/ui-common';
import { Post, PostFormat, PostType } from '@criaty/model-types';
import { addPost as addPostDb } from '@criaty/model';

import { newPosts } from '../../../../apiRequests';

interface IPostProductProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate?: (addPost: (date: Date) => Promise<Post | null>) => Promise<void>;
}

// TODO: Add a select to choose the post format
// TODO: Add a select to choose the post type
export const PostProduct: React.FC<IPostProductProps> = ({
  setGoalElement,
  onGenerate,
}) => {
  const [topic, setTopic] = useState('');
  const [tone, setCharacter] = useState('');
  const [format] = useState<PostFormat>();
  const [type] = useState<PostType>();
  const { t } = useTranslation();

  const addPost = async (date: Date) => {
    // Request the creation of one new post
    const result = await newPosts(1, topic, tone, format, type);

    // If the result is a string, it's an error
    if (typeof result === 'string') {
      console.error(result);
      return null;
    }

    const post = result[0];
    // TODO: Save topic, tone, format and type in Firebase
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
        label={t('popover.newpost.input.topic')}
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
        label={t('popover.newpost.input.tone')}
        type="text"
        fullWidth
        value={tone}
        onChange={(e) => setCharacter(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton
              sx={{ visibility: tone ? 'visible' : 'hidden' }}
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
          {t('button.back')}
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
          {t('button.generate')}
        </CTAButton>
      </Stack>
    </Stack>
  );
};

export default PostProduct;
