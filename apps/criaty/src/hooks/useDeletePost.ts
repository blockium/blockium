import { startOfMonth } from 'date-fns';

import { savePost } from '@criaty/model';
import { Post } from '@criaty/model-types';
import { useCalendarCache } from '@blockium/calendar';
import { useUser } from '@blockium/firebase';

export const useDeletePost = () => {
  const [calendarCache, setCalendarCache] = useCalendarCache();
  const [user] = useUser();

  return async (post: Post) => {
    if (!user?.id) return false;

    try {
      post.deletedAt = new Date();
      await savePost(user.id, post);

      // Remove the post from the calendar data cache
      const isoStartOfMonth = startOfMonth(post.date).toISOString();
      const monthData = calendarCache[isoStartOfMonth];
      monthData.splice(monthData.indexOf(post), 1);

      // This will update the post list
      setCalendarCache({ ...calendarCache });

      return true;
      //
    } catch (error) {
      console.error('error deleting post', error);
      return false;
    }
  };
};
