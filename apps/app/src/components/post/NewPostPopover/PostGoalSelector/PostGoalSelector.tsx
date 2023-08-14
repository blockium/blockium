import { ReactElement } from 'react';
import {
  Badge,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material';

import { msg } from '@postgpt/i18n';
import { Post } from '@postgpt/types';

import { PostProduct } from '../PostProduct';

interface IPostGoalSelectorProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
}

// TODO: *** Add a select to choose the post goal
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
      sx={{ maxHeight: '420px', overflow: 'auto' }}
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
        <ListItemButton sx={{ py: '1.5rem' }}>
          <ListItemText primary={msg('app.post.goal.offer')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={msg('app.post.goal.novelty')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={msg('app.post.goal.event')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={msg('app.post.goal.testimonial')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ py: '1.5rem' }}>
          <Badge badgeContent="breve" color="primary">
            <ListItemText primary={msg('app.post.goal.tutorial')} />
          </Badge>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
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
      </ListItem>
    </List>
  );
};

export default PostGoalSelector;
