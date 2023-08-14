export type PostFormat = 'feed' | 'story' | 'reels';

export type PostType = 'image' | 'carousel' | 'video';

export type PostGoal =
  | 'Product'
  | 'Offer'
  | 'Novelty'
  | 'Event'
  | 'Testimonial'
  | 'Tutorial'
  | 'Tips'
  | 'Behind-the-Scenes'
  | 'TBT'
  | 'Poll'
  | 'FAQ'
  | 'Challenge'
  | 'Contest'
  | 'Entertainment'
  | 'Motivational';

export type PostStatus =
  | 'initial'
  | 'defined'
  | 'created'
  | 'approved'
  | 'published';

export type PostParamProduct = {
  product: string;
  topic: string;
};

export type PostParamOffer = {
  product: string;
  offer: string;
};

export type PostParamTutorial = {
  subject: string;
};

export type PostParams = {
  goal: PostGoal;
  type: PostType;
  slidesCount?: number; // required only if type is 'carousel'
  format: PostFormat;
  extra: PostParamProduct | PostParamOffer | PostParamTutorial;
  character?: string;
};

export type Post = {
  id?: string;
  date: Date;
  title: string;
  description: string;
  hashtags: string;
  format: PostFormat;
  type: PostType;
  typeDescription: string;
  status: PostStatus;
  params?: PostParams;
  createdAt?: Date;
  deletedAt?: Date;
};
