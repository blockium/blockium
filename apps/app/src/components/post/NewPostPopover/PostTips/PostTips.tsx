import { ReactElement } from 'react';

import { Post } from '@postgpt/types';
import { msg } from '@postgpt/i18n';

import { PostFamily2 } from '../PostFamily2';

interface IPostTipsProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
}

export const PostTips: React.FC<IPostTipsProps> = ({
  setGoalElement,
  onGenerate,
}) => {
  return (
    <PostFamily2
      goal="Tutorial"
      goalTitle={msg('app.post.goal.tips')}
      topicLabel={msg('app.popover.newpost.input.subject')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
    />
  );
};

export default PostTips;