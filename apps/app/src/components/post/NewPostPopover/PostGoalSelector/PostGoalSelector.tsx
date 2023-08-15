import { ReactElement } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';

import { msg } from '@postgpt/i18n';
import { Post } from '@postgpt/types';

import { PostProduct } from '../PostProduct';
import { PostOffer } from '../PostOffer';

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
  return (
    <List
      // sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader id="nested-list-subheader">
          {msg('app.post.goal.selector-title')}
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
          <ListItemText primary={msg('app.post.goal.product')} />
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
          <ListItemText primary={msg('app.post.goal.offer')} />
        </ListItemButton>
      </ListItem>
      {/* TODO: *** Generate post with goal novelty */}
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <ListItemText primary={msg('app.post.goal.novelty')} />
        </ListItemButton>
      </ListItem>
      {/* TODO: *** Generate post with goal event */}
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <ListItemText primary={msg('app.post.goal.event')} />
        </ListItemButton>
      </ListItem>
      {/* TODO: *** Generate post with goal testimonial */}
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <ListItemText primary={msg('app.post.goal.testimonial')} />
        </ListItemButton>
      </ListItem>
      {/* TODO: *** Generate post with goal tutorial */}
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <ListItemText primary={msg('app.post.goal.tutorial')} />
        </ListItemButton>
      </ListItem>
      {/* <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={msg('app.post.goal.tips')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={msg('app.post.goal.behind-the-scenes')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={msg('app.post.goal.tbt')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={msg('app.post.goal.poll')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={msg('app.post.goal.faq')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={msg('app.post.goal.challenge')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={msg('app.post.goal.contest')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={msg('app.post.goal.entertainment')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={msg('app.post.goal.motivational')} />
          </Badge>
        </ListItemButton>
      </ListItem> */}
    </List>
  );
};

export default PostGoalSelector;
