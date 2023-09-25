import { ReactElement } from 'react';

import { Post, PostParams } from '@optilib/types';
import { msg } from '@optilib/i18n';

import { PostFamily2 } from '../PostFamily2';

interface IPostTutorialProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
  postParams?: PostParams;
}

export const PostTutorial: React.FC<IPostTutorialProps> = ({
  setGoalElement,
  onGenerate,
  postParams,
}) => {
  return (
    <PostFamily2
      goal="Tutorial"
      goalTitle={msg('app.post.goal.tutorial')}
      topicLabel={msg('app.popover.newpost.input.subject')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
      postParams={postParams}
    />
  );
};

export default PostTutorial;
