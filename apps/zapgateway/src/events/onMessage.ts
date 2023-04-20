import axios from 'axios';
import { Client } from 'whatsapp-web.js';

const WAIT_MESSAGES = [
  'Ei, não desista de mim ainda! Eu estou quase terminando meu café para poder pensar melhor em uma resposta para você. ☕️',
  'Hey, não se preocupe, minha resposta será tão boa que merece um Oscar. 🏆',
  'Estou prestes a responder sua mensagem, mas antes preciso encontrar minhas chaves que parecem ter sumido novamente. 🤔',
  'Espere um minuto, eu acabei de receber uma notificação no meu telefone e agora estou hipnotizado pela tela. 📱😵',
  'Ainda estou processando sua pergunta, mas enquanto isso, você já ouviu falar do novo meme que está rolando na internet? 😂',
  'Sua pergunta é tão boa que eu precisava de um tempo para sentar, respirar fundo e meditar sobre ela. 🧘‍♂️',
  'Por favor, não me apresse. Grandes respostas requerem grande pensamento. 😎',
  'Sua mensagem é como uma caixa de chocolates: eu preciso abrir cada uma das ideias para encontrar a resposta perfeita. 🍫',
  'Minha resposta está sendo preparada lentamente, como um chef que cozinha uma refeição perfeita. 🍲',
  'Estou tentando lembrar onde eu coloquei minhas ideias geniais, mas elas parecem ter fugido de mim no momento. 🤔💡',
];

const onMessage = async (msg, client: Client) => {
  // console.log(msg);

  // Check if message is older than 5 minutes
  // To avoid sending the same message twice in multiple instances
  const fiveMinutesAgo = new Date().getTime() - 5 * 60 * 1000;
  const msgTime = msg.timestamp * 1000;
  if (msgTime < fiveMinutesAgo) {
    return;
  }

  if (msg.body !== null && msg.type === 'chat') {
    // Send message only if the response takes more than 15s
    let sent = false;
    setTimeout(() => {
      if (!sent) {
        client.sendMessage(
          msg.from,
          WAIT_MESSAGES[Math.floor(Math.random() * WAIT_MESSAGES.length)]
        );
      }
    }, 15000);

    // Get phone + person name
    const contact = await msg.getContact();
    // console.log('contact', contact);

    // Sent a POST request to the Firabase chatgpt callable function
    const answer = await axios.post(process.env.POST_GPT_URL, {
      prompt: msg.body,
      phone: contact.number,
      name: contact.name,
    });

    // Send the answer to the user
    sent = true;
    client.sendMessage(msg.from, answer.data);
  }
};

export default onMessage;
