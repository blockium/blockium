import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Post, PostParams } from '@criaty/model-types';

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
  const { t } = useTranslation();
  return (
    <PostFamily2
      goal="Novelty"
      goalTitle={t('post.goal.novelty')}
      topicLabel={t('popover.newpost.input.novelty')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
      postParams={postParams}
    />
  );
};

export default PostNovelty;
