import { useTranslation } from 'react-i18next';
import { startOfMonth } from 'date-fns';

import { addPost as addPostDb } from '@criaty/model';
import { Post } from '@criaty/model-types';
import { useCalendarCache } from '@blockium/calendar';
import { useUser } from '@blockium/firebase';

export const useAddPost = () => {
  const [calendarCache, setCalendarCache] = useCalendarCache();
  const { t } = useTranslation();
  const [user] = useUser();

  return async (newPost: Post) => {
    if (!user?.id) {
      console.error('userId not found');
      return t('error.noUserId');
    }

    try {
      // Add new post in Firebase
      const postRef = await addPostDb(user.id, newPost);
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
      return t('error.savePost');
    }
  };
};
