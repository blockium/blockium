import { ReactElement } from 'react';

import { msg } from '@blockium/i18n';
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
  return (
    <PostFamily1
      goal="Product"
      goalTitle={msg('app.post.goal.product')}
      productLabel={msg('app.popover.newpost.input.product')}
      topicLabel={msg('app.popover.newpost.input.product-topic')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
      postParams={postParams}
    />
  );
};

export default PostProduct;
