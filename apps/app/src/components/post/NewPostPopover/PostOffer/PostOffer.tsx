import { ReactElement } from 'react';

import { Post } from '@postgpt/types';
import { msg } from '@postgpt/i18n';

// TODO: change to newPostOffer
import { newPostProduct } from '../../../../apiRequests';
import { PostFamily1 } from '../PostFamily1';

interface IPostOfferProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
}

export const PostOffer: React.FC<IPostOfferProps> = ({
  setGoalElement,
  onGenerate,
}) => {
  return (
    <PostFamily1
      newPostFamily1={newPostProduct}
      productLabel={msg('app.popover.newpost.input.product')}
      topicLabel={msg('app.popover.newpost.input.product-offer')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
    />
  );
};

export default PostOffer;
