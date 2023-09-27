import { ReactElement } from 'react';

import { Post, PostParams } from '@blockium/types';
import { msg } from '@blockium/i18n';

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
  return (
    <PostFamily1
      goal="Offer"
      goalTitle={msg('app.post.goal.offer')}
      productLabel={msg('app.popover.newpost.input.product')}
      topicLabel={msg('app.popover.newpost.input.product-offer')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
      postParams={postParams}
    />
  );
};

export default PostOffer;
