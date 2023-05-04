import { logger } from 'firebase-functions';
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai';

import { UserPrompt } from '@postgpt/types';

export const chat = async (
  prompt: string,
  prevPrompts: UserPrompt[],
  apiKey: string
) => {
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  try {
    // Using the Completion model
    // const completion = await openai.createCompletion({
    // model: "text-davinci-003",
    //   prompt,
    //   temperature: 0.9,
    //   max_tokens: 4000,
    // });
    // logger.info('answer', completion);
    // const answer = completion.data.choices[0].text;

    // Using the Chat model
    // logger.info('prompt:', prompt);

    const messages = [
      // {
      //   role: 'system',
      //   content: 'Seja especialista Instagram. Fale igual ao Dalai Lama.',
      // },
      // {
      //   role: 'user',
      //   content:
      //     'Responda a pergunta abaixo como especialista Instagram. Fale igual ao Dalai Lama. Seja criativo. Omita explicações. Após responder, adicione um parágrafo apenas com as principais palavras da pergunta, sem palavras da resposta: ' +
      //     prompt,
      // },
      // {
      //   role: 'user',
      //   content:
      //     'Responda como especialista Instagram. Seja criativo. Omita introduções, conclusões e explicações. Se a pergunta não for relacionada ao Instagram responda "Nada a ver":\n' +
      //     prompt,
      // },
    ];

    // Add previous prompts to the chat history
    for (const prevPrompt of prevPrompts) {
      messages.push({
        role: 'user',
        content: prevPrompt.prompt,
      });
      messages.push({
        role: 'assistant',
        content: prevPrompt.answer,
      });
    }

    // Add the current prompt to the chat history
    messages.push({
      role: 'user',
      content:
        'Seja criativo e humorado. Omita introduções, conclusões e explicações.\n' +
        prompt,
    });

    // logger.info(messages);

    const chatRequest: CreateChatCompletionRequest = {
      model: 'gpt-3.5-turbo',
      messages,
    };

    const completion = await openai.createChatCompletion(chatRequest);
    // logger.info(completion);

    const answer = completion.data.choices[0].message.content;

    // Remove leading newlines
    let i = 0;
    while (answer[i] === '\n') i++;
    return answer.slice(i);
    //
  } catch (error) {
    if (error.response) {
      logger.error(error.response.status, error.response.data);
      return false;
    } else {
      logger.error(`Error with OpenAI API request: ${error.message}`);
      return false;
    }
  }
};
