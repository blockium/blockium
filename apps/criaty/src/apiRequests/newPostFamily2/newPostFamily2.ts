import { Post, PostFormat, PostGoal, PostType } from '@criaty/model-types';
import { t } from '@blockium/i18n';
import { fakeAnswer } from '../fakeAnswer';

export const newPostFamily2 = async (
  goal: PostGoal,
  topic: string,
  type: PostType,
  slidesCount: number,
  format: PostFormat,
  tone?: string,
) => {
  // const params = {
  //   goal,
  //   topic,
  //   type,
  //   slidesCount,
  //   format,
  //   tone,
  // };

  // Sent a POST request to new post endpoint
  try {
    const answer = fakeAnswer();

    let post: Post;
    if (typeof answer.data === 'string') {
      // Replace all line breaks that are not followed by a space or a closing curly brace
      let data = answer.data.replace(/(\n+)(?![\s}])/gm, '\\n');

      // Remove the last comma from JSON string
      data = data.replace(/(,)(\n?)(\s*)}/gm, '\n}');

      // TODO: !!! Remove double quotes inside 2 double quotes

      // console.log('data', answer.data, data);

      post = { ...JSON.parse(data), status: 'initial' };
    } else {
      post = { ...answer.data, status: 'initial' } as Post;
    }

    return post;
    //
  } catch (error) {
    console.error(error);
    return t('error.newPost');
  }
};
