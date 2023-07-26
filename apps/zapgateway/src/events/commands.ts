import axios from 'axios';
import { Client } from 'whatsapp-web.js';

export const processCommand = (msg, client: Client) => {
  if (msg.body.startsWith('LOGIN:')) {
    login(msg, client);
    return true;
  }
  return false;
};

const login = async (msg, client: Client) => {
  const sessionId = msg.body.substring(6);

  // Get phone + person name
  const contact = await msg.getContact();

  // Sent a POST request to the Firabase chatgpt callable function
  try {
    const answer = await axios({
      method: 'post',
      url: process.env.LOGIN_URL,
      data: {
        // phone: contact.number,  // Old way used on version 1.19.5
        phone: contact.id.user, // This works on version 1.21.0
        name: contact.pushname,
        sessionId,
      },
      validateStatus: (status: number) => {
        return status < 600;
      },
    });

    // If the answer is a string there was an error
    if (typeof answer.data === 'string') {
      client.sendMessage(msg.from, answer.data);
    } else {
      // Send a success message to the user
      client.sendMessage(
        msg.from,
        'Login efetuado com sucesso! Retorne para o app e continue',
      );
    }
    //
  } catch (error) {
    console.error(error);
    client.sendMessage(
      msg.from,
      'Desculpe, houve um erro ao processar sua mensagem',
    );
  }
};
