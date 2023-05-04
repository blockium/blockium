import { useState } from 'react';
import { useEffectOnce } from 'react-use';
import { useIntlMessage } from '@postgpt/i18n';
import { Post } from '@postgpt/types';

import { newPosts } from '../../apiRequests/newPosts';
import { WeeklyPostView } from '../post';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './App.module.scss';

export function App() {
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
    <WeeklyPostView {...weeklyPosts} />
  ) : (
    <div>{msg('app.loading')}</div>
  );
}

export default App;
