import { ReactElement, useState } from 'react';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
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

// TODO: *** PostProduct
// TODO: !!! Add a select to choose the post format
// TODO: !!! Add a select to choose the post type
export const PostProduct: React.FC<IPostProductProps> = ({
  setGoalElement,
  onGenerate,
}) => {
  const [product, setProduct] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<PostType>();
  const [slidesCount, setSlidesCount] = useState<number>();
  const [format, setFormat] = useState<PostFormat>();
  const [character, setCharacter] = useState('');

  const setTypeAndFormat = (type: PostType) => {
    setType(type);
    if (type === 'image' || type === 'carousel') {
      setFormat('feed');
    } else {
      setFormat('reels');
    }
  };

  const addPost = async (date: Date) => {
    // Request the creation of one new post
    const result = await newPosts(1, topic, character, format, type);

    // If the result is a string, it's an error
    if (typeof result === 'string') {
      console.error(result);
      return null;
    }

    const post = result[0];
    // TODO: *** Save topic, character, format and type in Firebase
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
        multiline
        rows={4}
        autoFocus
        margin="dense"
        label={msg('app.popover.newpost.input.product')}
        type="text"
        fullWidth
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton
              sx={{ visibility: product ? 'visible' : 'hidden' }}
              onClick={() => setProduct('')}
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
        required
      />
      <TextField
        margin="dense"
        label={msg('app.popover.newpost.input.product-topic')}
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
      <FormControl fullWidth>
        <InputLabel id="post-type-label" required>
          {msg('app.popover.newpost.input.type')}
        </InputLabel>
        <Select
          labelId="post-type-label"
          id="post-type"
          value={type}
          label={msg('app.popover.newpost.input.type')}
          onChange={(e) => setTypeAndFormat(e.target.value as PostType)}
        >
          <MenuItem value="image">
            {msg('app.popover.newpost.input.type-image')}
          </MenuItem>
          <MenuItem value="carousel">
            {msg('app.popover.newpost.input.type-carousel')}
          </MenuItem>
          <MenuItem value="video">
            {msg('app.popover.newpost.input.type-video')}
          </MenuItem>
        </Select>
      </FormControl>
      {type === 'carousel' && (
        <TextField
          margin="dense"
          label={msg('app.popover.newpost.input.slides-count')}
          type="number"
          fullWidth
          value={slidesCount}
          onChange={(e) => setSlidesCount(Number(e.target.value))}
          InputProps={{
            endAdornment: (
              <IconButton
                sx={{ visibility: character ? 'visible' : 'hidden' }}
                onClick={() => setSlidesCount(undefined)}
              >
                <ClearIcon />
              </IconButton>
            ),
          }}
          required
        />
      )}
      <FormControl fullWidth>
        <InputLabel id="post-format-label" required>
          {msg('app.popover.newpost.input.format')}
        </InputLabel>
        <Select
          labelId="post-format-label"
          id="post-format"
          value={format}
          label={msg('app.popover.newpost.input.format')}
          onChange={(e) => setFormat(e.target.value as PostFormat)}
        >
          <MenuItem value="feed">
            {msg('app.popover.newpost.input.format-feed')}
          </MenuItem>
          {(type === 'image' || type === 'video') && (
            <MenuItem value="story">
              {msg('app.popover.newpost.input.format-story')}
            </MenuItem>
          )}
          {type === 'video' && (
            <MenuItem value="reels">
              {msg('app.popover.newpost.input.format-reels')}
            </MenuItem>
          )}
        </Select>
      </FormControl>
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
          disabled={
            !product ||
            !topic ||
            !type ||
            !format ||
            (type === 'carousel' && !slidesCount)
          }
        >
          {msg('app.button.generate')}
        </CTAButton>
      </Stack>
    </Stack>
  );
};

export default PostProduct;
