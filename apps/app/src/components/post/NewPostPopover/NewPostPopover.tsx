import { ReactElement, useEffect, useState } from 'react';

import { MenuPopover } from '@optilib/ui-mininal-tmpl';
import { Post, PostParams } from '@optilib/types';

import { PostGoalSelector } from './PostGoalSelector';
import { PostProduct } from './PostProduct';
import { PostOffer } from './PostOffer';
import { PostNovelty } from './PostNovelty';
import { PostEvent } from './PostEvent';
import { PostTestimonial } from './PostTestimonial';
import { PostTutorial } from './PostTutorial';
import { PostTips } from './PostTips';
import { PostBehindTheScenes } from './PostBehindTheScenes';

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
      switch (postParams.goal) {
        case 'Product':
          setGoalElement(
            <PostProduct
              setGoalElement={setGoalElement}
              onGenerate={onGenerate}
              postParams={postParams}
            />,
          );
          break;
        case 'Offer':
          setGoalElement(
            <PostOffer
              setGoalElement={setGoalElement}
              onGenerate={onGenerate}
              postParams={postParams}
            />,
          );
          break;
        case 'Novelty':
          setGoalElement(
            <PostNovelty
              setGoalElement={setGoalElement}
              onGenerate={onGenerate}
              postParams={postParams}
            />,
          );
          break;
        case 'Event':
          setGoalElement(
            <PostEvent
              setGoalElement={setGoalElement}
              onGenerate={onGenerate}
              postParams={postParams}
            />,
          );
          break;
        case 'Testimonial':
          setGoalElement(
            <PostTestimonial
              setGoalElement={setGoalElement}
              onGenerate={onGenerate}
              postParams={postParams}
            />,
          );
          break;
        case 'Tutorial':
          setGoalElement(
            <PostTutorial
              setGoalElement={setGoalElement}
              onGenerate={onGenerate}
              postParams={postParams}
            />,
          );
          break;
        case 'Tips':
          setGoalElement(
            <PostTips
              setGoalElement={setGoalElement}
              onGenerate={onGenerate}
              postParams={postParams}
            />,
          );
          break;
        case 'Behind-the-Scenes':
          setGoalElement(
            <PostBehindTheScenes
              setGoalElement={setGoalElement}
              onGenerate={onGenerate}
              postParams={postParams}
            />,
          );
          break;
      }
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
        overflow: 'auto',
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
