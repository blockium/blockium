import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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

import { CTAButton } from '@blockium/ui';
import {
  Post,
  PostFormat,
  PostGoal,
  PostParamFamily2,
  PostParams,
  PostType,
} from '@criaty/model-types';

import { currentLanguage } from '@blockium/i18n';

import { newPostFamily2 } from '../../../../apiRequests';
import { useAddPost } from '../../../../hooks';

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

  const { t } = useTranslation();

  const [tones, setTones] = useState<string[]>([]);
  useEffect(() => {
    const tones =
      currentLanguage() === 'en'
        ? [
            t('post.tone.awestruck'),
            t('post.tone.casual'),
            t('post.tone.convincing'),
            t('post.tone.enthusiastic'),
            t('post.tone.formal'),
            t('post.tone.funny'),
            t('post.tone.furious'),
            t('post.tone.humble'),
            t('post.tone.inspirational'),
            t('post.tone.batman'),
            t('post.tone.deadpool'),
            t('post.tone.star-wars'),
          ]
        : [
            t('post.tone.convincing'), // "Convincente"
            t('post.tone.casual'), // "Descontraído"
            t('post.tone.funny'), // "Engraçado"
            t('post.tone.enthusiastic'), // "Entusiasmado"
            t('post.tone.formal'), // Formal
            t('post.tone.furious'), // "Furioso"
            t('post.tone.humble'), // Humilde
            t('post.tone.awestruck'), // "Impressionado"
            t('post.tone.inspirational'), // "Inspirador"
            t('post.tone.batman'), // "Batman"
            t('post.tone.deadpool'), // "Deadpool"
            t('post.tone.star-wars'), // "Star Wars"
          ];
    setTones(tones);
  }, [t]);

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
          {t('popover.newpost.input.type')}
        </InputLabel>
        <Select
          labelId="post-type-label"
          id="post-type"
          value={type}
          label={t('popover.newpost.input.type')}
          onChange={(e) => setTypeAndFormat(e.target.value as PostType)}
        >
          <MenuItem value="image">
            {t('popover.newpost.input.type-image')}
          </MenuItem>
          <MenuItem value="carousel">
            {t('popover.newpost.input.type-carousel')}
          </MenuItem>
          <MenuItem value="video">
            {t('popover.newpost.input.type-video')}
          </MenuItem>
        </Select>
      </FormControl>
      <TextField
        disabled={type !== 'carousel'}
        margin="dense"
        label={t('popover.newpost.input.slides-count')}
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
          {t('popover.newpost.input.format')}
        </InputLabel>
        <Select
          labelId="post-format-label"
          id="post-format"
          value={format}
          label={t('popover.newpost.input.format')}
          onChange={(e) => setFormat(e.target.value as PostFormat)}
        >
          <MenuItem value="feed">
            {t('popover.newpost.input.format-feed')}
          </MenuItem>
          {(type === 'image' || type === 'video') && (
            <MenuItem value="story">
              {t('popover.newpost.input.format-story')}
            </MenuItem>
          )}
          {type === 'video' && (
            <MenuItem value="reels">
              {t('popover.newpost.input.format-reels')}
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="post-tone-label">
          {t('popover.newpost.input.tone')}
        </InputLabel>
        <Select
          labelId="post-tone-label"
          id="post-tone"
          value={tone}
          label={t('popover.newpost.input.tone')}
          onChange={(e) => setTone(e.target.value)}
        >
          <MenuItem value="">{t('post.tone.none')}</MenuItem>
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
          {t('button.back')}
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
          {t('button.generate')}
        </CTAButton>
      </Stack>
    </Stack>
  );
};

export default PostFamily2;
