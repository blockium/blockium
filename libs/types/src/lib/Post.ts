export type PostFormat = 'feed' | 'story' | 'reels';

export type PostType = 'image' | 'carousel' | 'video';

export type PostStatus =
  | 'initial'
  | 'defined'
  | 'created'
  | 'approved'
  | 'published';

export type Post = {
  date: Date;
  title: string;
  description: string;
  hashtags: string;
  format: PostFormat;
  type: PostType;
  typeDescription: string;
  status: PostStatus;
  setStatus: (status: PostStatus) => void;
};
