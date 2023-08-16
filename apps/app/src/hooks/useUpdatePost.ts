import { savePost, useUser } from '@postgpt/firebase';
import { Post } from '@postgpt/types';
// import { useCalendarCache } from '@postgpt/ui-calendar';

export const useUpdatePost = () => {
  // const [calendarCache, setCalendarCache] = useCalendarCache();
  const user = useUser();

  return async (post: Post) => {
    if (!user?.id) return false;

    try {
      await savePost(user.id, post);

      // This will update the post list
      // setCalendarCache({ ...calendarCache });

      return true;
      //
    } catch (error) {
      console.error('error updating post', error);
      return false;
    }
  };
};
