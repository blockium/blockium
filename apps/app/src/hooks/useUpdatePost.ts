import { savePost, useUser } from '@optilib/firebase';
import { Post } from '@optilib/types';
// import { useCalendarCache } from '@optilib/ui-calendar';

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
