import { ReactElement, useState } from 'react';

import { MenuPopover } from '@postgpt/ui-mininal-tmpl';
import { Post } from '@postgpt/types';

import { PostGoalSelector } from './PostGoalSelector';

interface INewPostPopoverProps {
  anchorEl: HTMLElement | null;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
  onClose: () => void;
}

export const NewPostPopover: React.FC<INewPostPopoverProps> = ({
  anchorEl,
  onGenerate,
  onClose,
}) => {
  const [goalElement, setGoalElement] = useState<ReactElement | null>(null);

  const handleClose = () => {
    onClose();
    setGoalElement(null);
  };

  return (
    <MenuPopover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
