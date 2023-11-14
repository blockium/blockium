import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Post, PostParams } from '@criaty/model-types';

import { PostFamily1 } from '../PostFamily1';

interface IPostProductProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
  postParams?: PostParams;
}

export const PostProduct: React.FC<IPostProductProps> = ({
  setGoalElement,
  onGenerate,
  postParams,
}) => {
  const { t } = useTranslation();
  return (
    <PostFamily1
      goal="Product"
      goalTitle={t('post.goal.product')}
      productLabel={t('popover.newpost.input.product')}
      topicLabel={t('popover.newpost.input.product-topic')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
      postParams={postParams}
    />
  );
};

export default PostProduct;
