import { ReactElement } from 'react';

import { Post } from '@postgpt/types';
import { msg } from '@postgpt/i18n';

import { PostFamily1 } from '../PostFamily1';

interface IPostTutorialProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
}

export const PostTutorial: React.FC<IPostTutorialProps> = ({
  setGoalElement,
  onGenerate,
}) => {
  return (
    <PostFamily1
      goal="Offer"
      goalTitle={msg('app.post.goal.offer')}
      productLabel={msg('app.popover.newpost.input.product')}
      topicLabel={msg('app.popover.newpost.input.product-offer')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
    />
  );
};

export default PostTutorial;
