import { useState } from 'react';

import { ChatWidget, IChatMessage } from '@blockium/chat';

export const MarketingChat: React.FC = () => {
  const avatar = 'avatar/face2.webp';
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([
    {
      avatar,
      messages: [
        `
Olá! Eu sou Bele, sua assistente virtual, e estou aqui para ajudar a criar um texto promocional incrível para o seu negócio de beleza e bem-estar. Primeiro, vamos definir alguns detalhes importantes.

1. É para qual período (Natal, Carnaval, Dia das Mães, etc)?

Agora, por favor, me diga qual período específico você gostaria de destacar nesta promoção.
      `,
      ],
    },
  ]);

  const onSendMessage = async (message: string) => {
    const lastMessages = chatMessages[chatMessages.length - 1];
    let newChatMessages: IChatMessage[];
    if (lastMessages.side === 'right') {
      lastMessages.messages?.push(message);
      newChatMessages = [...chatMessages];
    } else {
      newChatMessages = [
        ...chatMessages,
        {
          side: 'right',
          messages: [message],
        },
      ];
    }
    setChatMessages([...newChatMessages]);
  };

  return <ChatWidget messages={chatMessages} onSendMessage={onSendMessage} />;
};

export default MarketingChat;
