export type PostFormat = 'feed' | 'story' | 'reels';

export type PostType = 'image' | 'carousel' | 'video';

export type PostStatus = 'initial' | 'liked' | 'finished' | 'approved';

export type Post = {
  title: string;
  description: string;
  hashtags: string;
  format: PostFormat;
  type: PostType;
  typeDescription: string;
  status: PostStatus;
  setStatus: (status: PostStatus) => void;
};
