import { startOfMonth } from 'date-fns';

import { addPost as addPostDb } from '@postgpt/firebase';
import { msg } from '@postgpt/i18n';
import { Post } from '@postgpt/types';
import { useCalendarCache } from '@postgpt/ui-calendar';

export const useAddPost = () => {
  const [calendarCache, setCalendarCache] = useCalendarCache();

  return async (newPost: Post) => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      console.error('userId not found');
      return msg('app.error.noUserId');
    }

    try {
      // Add new post in Firebase
      const postRef = await addPostDb(userId, newPost);
      newPost.id = postRef.id;

      // Add the new post to the calendar data cache
      const isoStartOfMonth = startOfMonth(newPost.date).toISOString();
      const monthData = calendarCache[isoStartOfMonth];
      monthData.push(newPost);

      // This will update the post list
      setCalendarCache({ ...calendarCache });

      return newPost;
      //
    } catch (error) {
      console.error(error);
      return msg('app.error.savePost');
    }
  };
};