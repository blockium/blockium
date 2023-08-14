import { ReactElement } from 'react';

import { msg } from '@postgpt/i18n';
import { Post } from '@postgpt/types';

import { PostFamily1 } from '../PostFamily1';

interface IPostProductProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
}

export const PostProduct: React.FC<IPostProductProps> = ({
  setGoalElement,
  onGenerate,
}) => {
  return (
    <PostFamily1
      goal="Product"
      productLabel={msg('app.popover.newpost.input.product')}
      topicLabel={msg('app.popover.newpost.input.product-topic')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
    />
  );
};

export default PostProduct;
