import axios from 'axios';
import { Client } from 'whatsapp-web.js';

const POST_GPT_URL = 'https://us-central1-post-gpt.cloudfunctions.net/chatgpt';

const onMessage = async (msg, client: Client) => {
  // console.log(msg);

  if (msg.body !== null && msg.type === 'chat') {
    client.sendMessage(
      msg.from,
      'Olá, ja estou pensando em uma resposta para você. Aguarde! 😎 '
    );

    // Sent a POST request to the Firabase chatgpt callable function
    const answer = await axios.post(POST_GPT_URL, {
      prompt: msg.body,
    });

    client.sendMessage(msg.from, answer.data);
  }
};

export default onMessage;
