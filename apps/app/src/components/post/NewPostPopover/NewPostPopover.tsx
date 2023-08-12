import { ReactElement, useState } from 'react';

import { MenuPopover } from '@postgpt/ui-mininal-tmpl';
import { Post } from '@postgpt/types';

import { PostGoalSelector } from './PostGoalSelector';

interface INewPostPopoverProps {
  anchorEl: HTMLElement | null;
  onGenerate?: (addPost: (date: Date) => Promise<Post | null>) => Promise<void>;
  onClose: () => void;
}

// TODO: *** Open GoalSelector as the first step of the NewPostPopover

// TODO: !!! Call addPost from the NewPostPopover component, instead of navigating to the post weekly page. This should be a new prop of the component, a callback function, which accepts topic, character, format and type
export const NewPostPopover: React.FC<INewPostPopoverProps> = ({
  anchorEl,
  onGenerate,
  onClose,
}) => {
  const [goalElement, setGoalElement] = useState<ReactElement | null>(null);

  return (
    <MenuPopover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{
        p: 1.5,
        mt: 1.5,
        ml: 0.75,
        '& .MuiMenuItem-root': {
          typography: 'body2',
          borderRadius: 0.75,
        },
        width: 400,
        maxWidth: '85%',
      }}
    >
      {goalElement || (
        <PostGoalSelector
          setGoalElement={setGoalElement}
          onGenerate={onGenerate}
        />
      )}
    </MenuPopover>
  );
};

export default NewPostPopover;
