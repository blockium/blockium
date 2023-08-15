import { ReactElement } from 'react';

import { Post } from '@postgpt/types';
import { msg } from '@postgpt/i18n';

import { PostFamily2 } from '../PostFamily2';

interface IPostNoveltyProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
}

export const PostNovelty: React.FC<IPostNoveltyProps> = ({
  setGoalElement,
  onGenerate,
}) => {
  return (
    <PostFamily2
      goal="Novelty"
      goalTitle={msg('app.post.goal.novelty')}
      topicLabel={msg('app.popover.newpost.input.product-offer')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
    />
  );
};

export default PostNovelty;
