import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Post, PostParams } from '@criaty/model-types';

import { PostFamily2 } from '../PostFamily2';

interface IPostTipsProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
  postParams?: PostParams;
}

export const PostTips: React.FC<IPostTipsProps> = ({
  setGoalElement,
  onGenerate,
  postParams,
}) => {
  const { t } = useTranslation();
  return (
    <PostFamily2
      goal="Tips"
      goalTitle={t('post.goal.tips')}
      topicLabel={t('popover.newpost.input.subject')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
      postParams={postParams}
    />
  );
};

export default PostTips;
