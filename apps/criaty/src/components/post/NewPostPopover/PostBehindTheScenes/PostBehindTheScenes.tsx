import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Post, PostParams } from '@criaty/model-types';

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
  const { t } = useTranslation();
  return (
    <PostFamily2
      goal="Behind-the-Scenes"
      goalTitle={t('post.goal.behind-the-scenes')}
      topicLabel={t('popover.newpost.input.scene')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
      postParams={postParams}
    />
  );
};

export default PostBehindTheScenes;
