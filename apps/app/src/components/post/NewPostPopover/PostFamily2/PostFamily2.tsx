import { ReactElement, useState } from 'react';
import { startOfMonth } from 'date-fns';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { msg } from '@postgpt/i18n';
import { CTAButton } from '@postgpt/ui-common';
import {
  Post,
  PostFormat,
  PostGoal,
  PostParams,
  PostType,
} from '@postgpt/types';
import { addPost as addPostDb } from '@postgpt/firebase';
import { useCalendarCache } from '@postgpt/ui-calendar';

import { newPostFamily2 } from '../../../../apiRequests';

interface IPostFamily2Props {
  goal: PostGoal;
  goalTitle: string;
  topicLabel: string;
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
}

export const PostFamily2: React.FC<IPostFamily2Props> = ({
  goal,
  goalTitle,
  topicLabel,
  setGoalElement,
  onGenerate,
}) => {
  const [calendarCache, setCalendarCache] = useCalendarCache();
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<PostType>('image');
  const [slidesCount, setSlidesCount] = useState<number>(0);
  const [format, setFormat] = useState<PostFormat>('feed');
  const [character] = useState('');

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
    const result = await newPostFamily2(
      goal,
      topic,
      type as PostType,
      slidesCount || 0,
      format as PostFormat,
      character,
    );

    // If the result is a string, it's an error
    if (typeof result === 'string') {
      console.error(result);
      return result;
    }

    const post = result;

    // Save post generation params in Firebase
    const params: PostParams = {
      goal,
      type: type as PostType,
      slidesCount: slidesCount || 0,
      format: format as PostFormat,
      extra: {
        topic,
      },
      character,
    };

    const newPost = {
      ...post,
      params,
      date,
      createdAt: new Date(),
      deletedAt: null,
    };

    try {
      // Save news posts in Firebase
      const userId = sessionStorage.getItem('userId') ?? '';
      const postRef = await addPostDb(userId, newPost);
      newPost.id = postRef.id;

      // Add the new post to the calendar data cache
      const isoStartOfMonth = startOfMonth(date).toISOString();
      const monthData = calendarCache[isoStartOfMonth];
      monthData.push(newPost);

      // This will update the post list
      setCalendarCache({ ...calendarCache });

      return newPost;
      //
    } catch (error) {
      console.error(error);
      return msg('app.error.savePost');
    }
  };

  const handleGenerate = () => {
    setGoalElement(null);
    onGenerate(addPost);
  };

  return (
    <Stack sx={{ p: 1 }} gap={1}>
      <Typography variant="h4">{goalTitle}</Typography>
      <TextField
        multiline
        rows={4}
        autoFocus
        margin="dense"
        label={topicLabel}
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
      <TextField
        disabled={type !== 'carousel'}
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
              onClick={() => setSlidesCount(0)}
            >
              <ClearIcon />
            </IconButton>
          ),
        }}
        required
      />
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
      {/* <TextField
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
      /> */}
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
        <CTAButton
          onClick={handleGenerate}
          color="primary"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={
            !topic || !type || !format || (type === 'carousel' && !slidesCount)
          }
        >
          {msg('app.button.generate')}
        </CTAButton>
      </Stack>
    </Stack>
  );
};

export default PostFamily2;