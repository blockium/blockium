import { ReactElement } from 'react';

import { Post, PostParams } from '@criaty/model-types';
import { msg } from '@blockium/i18n';

import { PostFamily2 } from '../PostFamily2';

interface IPostNoveltyProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
  postParams?: PostParams;
}

export const PostNovelty: React.FC<IPostNoveltyProps> = ({
  setGoalElement,
  onGenerate,
  postParams,
}) => {
  return (
    <PostFamily2
      goal="Novelty"
      goalTitle={msg('app.post.goal.novelty')}
      topicLabel={msg('app.popover.newpost.input.novelty')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
      postParams={postParams}
    />
  );
};

export default PostNovelty;
