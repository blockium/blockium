import { savePost, useUser } from '@criaty/model';
import { Post } from '@criaty/model-types';
// import { useCalendarCache } from '@blockium/ui-calendar';

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
