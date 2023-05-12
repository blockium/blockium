import { useState } from 'react';
import { useEffectOnce } from 'react-use';
import { useIntlMessage } from '@postgpt/i18n';
import { Post } from '@postgpt/types';

import { WeeklyPostsBoard } from '../WeeklyPostsBoard';
import { newPosts } from '../../../apiRequests';

export function WeeklyPosts() {
  const [weeklyPosts, setWeeklyPosts] = useState<Post[]>();
  const msg = useIntlMessage();

  useEffectOnce(() => {
    newPosts(7).then((posts) => {
      // console.log(posts);
      if (typeof posts === 'string') {
        return;
      }
      setWeeklyPosts(posts);
    });
  });

  return weeklyPosts ? (
    <WeeklyPostsBoard {...weeklyPosts} />
  ) : (
    <div>{msg('app.loading')}</div>
  );
}

export default WeeklyPosts;
