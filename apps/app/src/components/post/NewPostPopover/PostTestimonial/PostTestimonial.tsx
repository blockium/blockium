import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Post, PostParams } from '@criaty/model-types';

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
  const { t } = useTranslation();
  return (
    <PostFamily1
      goal="Testimonial"
      goalTitle={t('post.goal.testimonial')}
      productLabel={t('popover.newpost.input.testimonial')}
      topicLabel={t('popover.newpost.input.customer')}
      setGoalElement={setGoalElement}
      onGenerate={onGenerate}
      postParams={postParams}
    />
  );
};

export default PostTestimonial;
