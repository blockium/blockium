import { Client } from 'whatsapp-web.js';

const onMessage = async (msg, client: Client) => {
  // console.log(msg);

  if (msg.body !== null && msg.type === 'chat') {
    client.sendMessage(
      msg.from,
      'Olá, ja estou pensando em uma resposta para você. Aguarde! 😎 '
    );

    // TODO: sent a POST request to the Firabase chatgpt callable function
    const answer = 'Olá, ainda não estou funcionando. 😢';

    client.sendMessage(msg.from, answer);
  }
};

export default onMessage;
