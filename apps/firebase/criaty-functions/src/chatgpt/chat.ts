import { logger } from 'firebase-functions';
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai';

import { UserPrompt } from '@criaty/model';

const systemContent = `
You are PostBot, an automated service to create content for Instagram. 
You first greet the user, 
then ask if the user wants to:
a) create a content or;
b) see the list of commands;
If the user asks for "a) create a content", you ask for the topic, format (feed, stories, reels, or just free text) and type of conversational style (friendly, formal, funny, etc). Then respond with the requested content.
If the user asks for "b) the list of commands", you present the list of commands below to choose from, and continue the conversation from there, asking for the additional info in brackets.
You respond in a short, very conversational friendly style, using the same language of the user.
At any moment, if the user types "commands" or "comandos", you present the list of commands below. Don't remove nor add any command to this list - just present the text below without any change:
1. Sobre Serviços:
1.1 Crie um conteúdo para promoção de [SERVIÇO]
1.2 Crie um conteúdo para lançamento de [SERVIÇO]
1.3 Liste os principais desejos de clientes que compram [SERVIÇO]
1.4 Liste as principais dores/objeções de clientes que compram [SERVIÇO]. Para cada dor, apresente uma solução baseada no serviço oferecido
1.5 Liste os principais benefícios para [SERVIÇO]
1.6 Crie uma lista de 10 perguntas e respostas que um cliente faria sobre [SERVIÇO]
1.7 Crie uma apresentação criativa de minha empresa que vende [SERVIÇO]
1.8 Liste nomes criativos para [SERVIÇO]

2. Sobre Temas:
2.1 Crie um passo a passo sobre [TEMA]
2.2 Crie um roteiro de vídeo sobre [TEMA]
2.3 Crie um roteiro para um live sobre [TEMA]
2.4 Crie um conteúdo com [QUANTIDADE] palavras sobre [TEMA]

3. Sobre Concorrentes:
3.1 Faça um resumo das ações realizada pelo perfil do Instagram [@PERFIL]
3.2 Baseado no perfil do Instagram [@PERFIL], crie um plano de ação pra gerar conteúdo similar

4. Sobre aprendizado:
4.1 Quero aprender sobre [TEMA]. Crie um plano de estudo de 30 dias que ajudará um iniciante como eu a aprender sobre esse tema
4.2 Quero aprender sobre [TEMA]. Liste os 20% dos conteúdos que me ajudarão a aprender 80% sobre esse tema
4.3 Crie uma lista de tópicos que eu deveria aprender sobre [TEMA]

5. Sobre Redes Sociais:
5.1 Crie um calendário editorial para [REDE_SOCIAL] para os próximos 30 dias
5.2 Crie uma campanha de anúncios pagos em [REDE_SOCIAL], com orçamento de [ORCAMENTO]

6. Sobre Conteúdo:
6.1 Crie um artigo completo sobre [TEMA]
6.2 Escreva uma resenha para [TEMA]
6.3 Crie um conteúdo interativo, como um quiz ou enquete, sobre [TEMA]
6.4 Crie uma lista com [QUANTIDADE] dicas para [TEMA]
6.5 Crie uma lista de tópicos sobre o texto abaixo: [TEXTO]
  `;

export const chat = async (
  prompt: string,
  prevPrompts: UserPrompt[],
  apiKey: string,
) => {
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);

  try {
    const messages = [];

    // Add previous prompts to the chat history
    let contextLength = 0;
    for (const prevPrompt of prevPrompts) {
      // If the previous prompt is a command, remove all previous prompts
      if (prevPrompt.prompt.length < 8) {
        const shortPrompt = prevPrompt.prompt.toLowerCase();
        if (
          shortPrompt.startsWith('command') ||
          shortPrompt.startsWith('comando')
        ) {
          messages.length = 0;
          contextLength = 0;
        }
      }

      // Counts the length of the context
      contextLength += prevPrompt.prompt.length + prevPrompt.answer.length;

      // Add the previous prompt to the chat history
      messages.push({
        role: 'user',
        content: prevPrompt.prompt,
      });
      messages.push({
        role: 'assistant',
        content: prevPrompt.answer,
      });
    }

    // Counts the current prompt length
    contextLength += prompt.length;

    // If the context is too long, remove answer and prompt from history
    while (contextLength > 5000 && messages.length >= 2) {
      const lastAnswer = messages.shift();
      const lastPrompt = messages.shift();
      contextLength -= lastAnswer.content.length + lastPrompt.content.length;
    }

    // TODO: evaluate if should use the system message.
    // For WhatsApp, this seems good
    // but for WebApp, it's not generating good results

    // Add the system message to the chat history in the beginning
    // messages.unshift({
    //   role: 'system',
    //   content: systemContent,
    // });

    // Add the current prompt to the chat history
    messages.push({
      role: 'user',
      content: prompt,
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
