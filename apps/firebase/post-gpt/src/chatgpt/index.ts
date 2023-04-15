import { logger, runWith } from 'firebase-functions';
import { Configuration, OpenAIApi } from 'openai';
import { defineSecret } from 'firebase-functions/params';
const openAiApiKey = defineSecret('OPENAI_API_KEY');

async function generate(prompt: string, apiKey: string) {
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
    logger.info('Starting chat completion', prompt);
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'Assuma que você é um especialista em postagem para o Instagram.',
        },
        {
          role: 'user',
          content: 'Qual a melhor forma de postagem no Instagram?',
        },
        {
          role: 'assistant',
          content:
            'A melhor forma de postar é criando um relacionamento com o público alvo.',
        },
        { role: 'user', content: prompt },
      ],
    });
    logger.info('answer', completion);
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
}

export const test = runWith({ secrets: [openAiApiKey] }).https.onRequest(
  async (request, response) => {
    const { prompt } = request.body;
    const result = {
      prompt,
    };
    response.status(200).send(result);
  }
);

export const chatgpt = runWith({ secrets: [openAiApiKey] }).https.onRequest(
  async (request, response) => {
    const { prompt } = request.body;
    const apiKey = openAiApiKey.value();
    const answer = await generate(prompt, apiKey);

    if (typeof answer === 'boolean' && answer === false) {
      response
        .status(500)
        .send(
          'Houve um erro ao processar a solicitação. Por favor, tente novamente.'
        );
    } else {
      response.status(200).send(answer);
    }
  }
);
