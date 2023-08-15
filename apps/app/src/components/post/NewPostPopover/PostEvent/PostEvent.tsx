import { ReactElement } from 'react';

import { Post } from '@postgpt/types';
import { msg } from '@postgpt/i18n';

import { PostFamily1 } from '../PostFamily1';

interface IPostEventProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
}

export const PostEvent: React.FC<IPostEventProps> = ({
  setGoalElement,
  onGenerate,
}) => {
  return (
    <PostFamily1
      goal="Event"
      goalTitle={msg('app.post.goal.event')}
      productLabel={msg('app.popover.newpost.input.event')}
      topicLabel={msg('app.popover.newpost.input.event-details')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
    />
  );
};

export default PostEvent;