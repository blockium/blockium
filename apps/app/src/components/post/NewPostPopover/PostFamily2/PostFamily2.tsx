import { ReactElement, useState } from 'react';
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

import { msg } from '@optilib/i18n';
import { CTAButton } from '@optilib/ui-common';
import {
  Post,
  PostFormat,
  PostGoal,
  PostParamFamily2,
  PostParams,
  PostType,
} from '@optilib/types';

import { newPostFamily2 } from '../../../../apiRequests';
import { useAddPost } from '../../../../hooks';

const tones = [
  msg(`app.post.tone.appreciative`),
  msg(`app.post.tone.assertive`),
  msg(`app.post.tone.awestruck`),
  msg(`app.post.tone.casual`),
  msg(`app.post.tone.cautionary`),
  msg(`app.post.tone.compassionate`),
  msg(`app.post.tone.convincing`),
  msg(`app.post.tone.critical`),
  msg(`app.post.tone.earnest`),
  msg(`app.post.tone.enthusiastic`),
  msg(`app.post.tone.formal`),
  msg(`app.post.tone.funny`),
  msg(`app.post.tone.humble`),
  msg(`app.post.tone.humorous`),
  msg(`app.post.tone.informative`),
  msg(`app.post.tone.inspirational`),
  msg(`app.post.tone.joyful`),
  msg(`app.post.tone.passionate`),
  msg(`app.post.tone.thoughtful`),
  msg(`app.post.tone.urgent`),
  msg(`app.post.tone.worried`),
  msg(`app.post.tone.furious`),
  msg(`app.post.tone.hulk-smashes`),
  msg(`app.post.tone.batman`),
  msg(`app.post.tone.superman`),
  msg(`app.post.tone.wonder-woman`),
  msg(`app.post.tone.star-wars`),
  msg(`app.post.tone.fast-and-furious`),
  msg(`app.post.tone.spider-man`),
  msg(`app.post.tone.deadpool`),
];

interface IPostFamily2Props {
  goal: PostGoal;
  goalTitle: string;
  topicLabel: string;
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
  postParams?: PostParams;
}

export const PostFamily2: React.FC<IPostFamily2Props> = ({
  goal,
  goalTitle,
  topicLabel,
  setGoalElement,
  onGenerate,
  postParams,
}) => {
  const addPostDb = useAddPost();

  const [topic, setTopic] = useState(
    (postParams?.extra as PostParamFamily2)?.topic || '',
  );
  const [type, setType] = useState<PostType>(postParams?.type || 'image');
  const [slidesCount, setSlidesCount] = useState<number>(
    postParams?.slidesCount || 0,
  );
  const [format, setFormat] = useState<PostFormat>(
    postParams?.format || 'feed',
  );
  const [tone, setTone] = useState(postParams?.tone || '');

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
      tone,
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
      tone,
    };

    const newPost = {
      ...post,
      params,
      date,
      createdAt: new Date(),
      deletedAt: null,
    };

    return await addPostDb(newPost);
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
              sx={{ visibility: tone ? 'visible' : 'hidden' }}
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
      <FormControl fullWidth>
        <InputLabel id="post-tone-label">
          {msg('app.popover.newpost.input.tone')}
        </InputLabel>
        <Select
          labelId="post-tone-label"
          id="post-tone"
          value={tone}
          label={msg('app.popover.newpost.input.tone')}
          onChange={(e) => setTone(e.target.value)}
        >
          <MenuItem value="">{msg(`app.post.tone.none`)}</MenuItem>
          {tones.map((tone) => (
            <MenuItem key={`${tone}`} value={tone}>
              {tone}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
