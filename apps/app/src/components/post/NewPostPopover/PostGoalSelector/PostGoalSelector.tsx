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
    >
      <ListItem disablePadding>
        <ListItemButton
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
        <ListItemButton>
          <ListItemText primary={msg('app.post.goal.offer')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={msg('app.post.goal.tutorial')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={msg('app.post.goal.tips')} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={msg('app.post.goal.behind-the-scenes')} />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default PostGoalSelector;
