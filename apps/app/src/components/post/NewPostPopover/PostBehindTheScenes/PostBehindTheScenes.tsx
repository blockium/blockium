import { ReactElement } from 'react';

import { Post, PostParams } from '@postgpt/types';
import { msg } from '@postgpt/i18n';

import { PostFamily2 } from '../PostFamily2';

interface IPostBehindTheScenesProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
  postParams?: PostParams;
}

export const PostBehindTheScenes: React.FC<IPostBehindTheScenesProps> = ({
  setGoalElement,
  onGenerate,
  postParams,
}) => {
  return (
    <PostFamily2
      goal="Tutorial"
      goalTitle={msg('app.post.goal.behind-the-scenes')}
      topicLabel={msg('app.popover.newpost.input.scene')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
      postParams={postParams}
    />
  );
};

export default PostBehindTheScenes;
