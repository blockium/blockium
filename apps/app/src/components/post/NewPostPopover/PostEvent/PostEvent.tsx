import { ReactElement } from 'react';

import { Post, PostParams } from '@criaty/model';
import { msg } from '@blockium/i18n';

import { PostFamily1 } from '../PostFamily1';

interface IPostEventProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
  postParams?: PostParams;
}

export const PostEvent: React.FC<IPostEventProps> = ({
  setGoalElement,
  onGenerate,
  postParams,
}) => {
  return (
    <PostFamily1
      goal="Event"
      goalTitle={msg('app.post.goal.event')}
      productLabel={msg('app.popover.newpost.input.event')}
      topicLabel={msg('app.popover.newpost.input.event-details')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
      postParams={postParams}
    />
  );
};

export default PostEvent;
