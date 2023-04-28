import { useState } from 'react';
import { useEffectOnce } from 'react-use';
import { useIntlMessage } from '@postgpt/i18n';
import { WeeklyPosts } from '@postgpt/types';

import { newWeeklyPosts } from '../../apiRequests/newWeeklyPosts';
import { WeeklyPostView } from '../post';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './App.module.scss';

export function App() {
  const [weeklyPosts, setWeeklyPosts] = useState<WeeklyPosts>();
  const msg = useIntlMessage();

  useEffectOnce(() => {
    newWeeklyPosts().then((posts) => {
      // console.log(posts);
      if (typeof posts === 'string') {
        return;
      }
      setWeeklyPosts({ posts });
    });
  });

  return weeklyPosts ? (
    <WeeklyPostView {...weeklyPosts} />
  ) : (
    <div>{msg('app.loading')}</div>
  );
}

export default App;
