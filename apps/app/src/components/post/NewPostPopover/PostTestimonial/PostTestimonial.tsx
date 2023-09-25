import { ReactElement } from 'react';

import { Post, PostParams } from '@optilib/types';
import { msg } from '@optilib/i18n';

import { PostFamily1 } from '../PostFamily1';

interface IPostTestimonialProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
  postParams?: PostParams;
}

export const PostTestimonial: React.FC<IPostTestimonialProps> = ({
  setGoalElement,
  onGenerate,
  postParams,
}) => {
  return (
    <PostFamily1
      goal="Testimonial"
      goalTitle={msg('app.post.goal.testimonial')}
      productLabel={msg('app.popover.newpost.input.testimonial')}
      topicLabel={msg('app.popover.newpost.input.customer')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
      postParams={postParams}
    />
  );
};

export default PostTestimonial;
