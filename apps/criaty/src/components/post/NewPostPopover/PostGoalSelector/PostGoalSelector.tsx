import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from '@mui/material';

import { Post } from '@criaty/model-types';

import { PostProduct } from '../PostProduct';
import { PostOffer } from '../PostOffer';
import { PostNovelty } from '../PostNovelty';
import { PostEvent } from '../PostEvent';
import { PostTestimonial } from '../PostTestimonial';
import { PostTutorial } from '../PostTutorial';
import { PostTips } from '../PostTips';
import { PostBehindTheScenes } from '../PostBehindTheScenes';

interface IPostGoalSelectorProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
}

export const PostGoalSelector: React.FC<IPostGoalSelectorProps> = ({
  setGoalElement,
  onGenerate,
}) => {
  const { t } = useTranslation();
  return (
    <List
      // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader id="nested-list-subheader">
          <Typography variant="h4" pb={1.5}>
            {t('post.goal.selector-title')}
          </Typography>
        </ListSubheader>
      }
      sx={{ maxHeight: '480px', overflow: 'auto' }}
    >
      <ListItem disablePadding>
        <ListItemButton
          sx={{ py: '1.5rem' }}
          onClick={() =>
            setGoalElement(
              <PostProduct
                setGoalElement={setGoalElement}
                onGenerate={onGenerate}
              />,
            )
          }
        >
          <ListItemText primary={t('post.goal.product')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          sx={{ py: '1.5rem' }}
          onClick={() =>
            setGoalElement(
              <PostOffer
                setGoalElement={setGoalElement}
                onGenerate={onGenerate}
              />,
            )
          }
        >
          <ListItemText primary={t('post.goal.offer')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          sx={{ py: '1.5rem' }}
          onClick={() =>
            setGoalElement(
              <PostNovelty
                setGoalElement={setGoalElement}
                onGenerate={onGenerate}
              />,
            )
          }
        >
          <ListItemText primary={t('post.goal.novelty')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          sx={{ py: '1.5rem' }}
          onClick={() =>
            setGoalElement(
              <PostEvent
                setGoalElement={setGoalElement}
                onGenerate={onGenerate}
              />,
            )
          }
        >
          <ListItemText primary={t('post.goal.event')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          sx={{ py: '1.5rem' }}
          onClick={() =>
            setGoalElement(
              <PostTestimonial
                setGoalElement={setGoalElement}
                onGenerate={onGenerate}
              />,
            )
          }
        >
          <ListItemText primary={t('post.goal.testimonial')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          sx={{ py: '1.5rem' }}
          onClick={() =>
            setGoalElement(
              <PostTutorial
                setGoalElement={setGoalElement}
                onGenerate={onGenerate}
              />,
            )
          }
        >
          <ListItemText primary={t('post.goal.tutorial')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          sx={{ py: '1.5rem' }}
          onClick={() =>
            setGoalElement(
              <PostTips
                setGoalElement={setGoalElement}
                onGenerate={onGenerate}
              />,
            )
          }
        >
          <ListItemText primary={t('post.goal.tips')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton
          sx={{ py: '1.5rem' }}
          onClick={() =>
            setGoalElement(
              <PostBehindTheScenes
                setGoalElement={setGoalElement}
                onGenerate={onGenerate}
              />,
            )
          }
        >
          <ListItemText primary={t('post.goal.behind-the-scenes')} />
        </ListItemButton>
      </ListItem>
      {/* <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={t('post.goal.tbt')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={t('post.goal.poll')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={t('post.goal.faq')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={t('post.goal.challenge')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={t('post.goal.contest')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={t('post.goal.entertainment')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={t('post.goal.motivational')} />
          </Badge>
        </ListItemButton>
      </ListItem> */}
    </List>
  );
};

export default PostGoalSelector;
