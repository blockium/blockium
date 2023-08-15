import { ReactElement } from 'react';

import { Post } from '@postgpt/types';
import { msg } from '@postgpt/i18n';

import { PostFamily1 } from '../PostFamily1';

interface IPostTestimonialProps {
  setGoalElement: (element: ReactElement | null) => void;
  onGenerate: (
    addPost: (date: Date) => Promise<Post | string>,
  ) => Promise<void>;
}

export const PostTestimonial: React.FC<IPostTestimonialProps> = ({
  setGoalElement,
  onGenerate,
}) => {
  return (
    <PostFamily1
      goal="Testimonial"
      goalTitle={msg('app.post.goal.testimonial')}
      productLabel={msg('app.popover.newpost.input.testimonial')}
      topicLabel={msg('app.popover.newpost.input.customer')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
    />
  );
};

export default PostTestimonial;
