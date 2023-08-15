import { ReactElement, useEffect, useState } from 'react';

import { MenuPopover } from '@postgpt/ui-mininal-tmpl';
import { Post, PostParams } from '@postgpt/types';

import { PostGoalSelector } from './PostGoalSelector';
import { PostEvent } from './PostEvent';

interface INewPostPopoverProps {
  anchorEl: HTMLElement | null;
  postParams?: PostParams;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
  onClose: () => void;
}

export const NewPostPopover: React.FC<INewPostPopoverProps> = ({
  anchorEl,
  postParams,
  onGenerate,
  onClose,
}) => {
  const [goalElement, setGoalElement] = useState<ReactElement | null>(null);

  useEffect(() => {
    if (postParams) {
      // TODO: Set according to postParams.goal
      setGoalElement(
        <PostEvent
          setGoalElement={setGoalElement}
          onGenerate={onGenerate}
          postParams={postParams}
        />,
      );
    }
  }, [postParams, onGenerate]);

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
