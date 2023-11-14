import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Post, PostParams } from '@criaty/model-types';

import { PostFamily1 } from '../PostFamily1';

interface IPostOfferProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
  postParams?: PostParams;
}

export const PostOffer: React.FC<IPostOfferProps> = ({
  setGoalElement,
  onGenerate,
  postParams,
}) => {
  const { t } = useTranslation();
  return (
    <PostFamily1
      goal="Offer"
      goalTitle={t('post.goal.offer')}
      productLabel={t('popover.newpost.input.product')}
      topicLabel={t('popover.newpost.input.product-offer')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
      postParams={postParams}
    />
  );
};

export default PostOffer;
