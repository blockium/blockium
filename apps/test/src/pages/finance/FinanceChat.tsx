import { useState } from 'react';

import { ChatFab, IChatMessage } from '@blockium/ui';

const answer = `
Uma ação possível para aumentar sua receita de forma imediata é a seguinte:

Realize uma campanha de marketing com foco nos agendamentos pendentes:

- Crie uma oferta especial, como um desconto exclusivo, para os próximos agendamentos.
- Promova essa oferta em suas redes sociais, no seu site e por e-mail para sua lista de contatos.
- Use gatilhos de urgência, como "oferta por tempo limitado", para incentivar ação imediata.
- Acompanhe de perto os resultados da campanha e faça ajustes conforme necessário.

Essa ação pode ajudar a atrair mais clientes rapidamente, aumentando sua receita e reduzindo o prejuízo estimado. Não se esqueça de prestar um excelente serviço aos novos clientes para incentivá-los a retornar e se tornarem clientes regulares.`;

export const FinanceChat: React.FC = () => {
  const [hasNewMessage, setHasNewMessage] = useState(true);

  // const avatar = 'avatar/face2.webp';
  const avatar = '';
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([
    {
      avatar,
      messages: [
        'Olá! 😊 Com base nas informações atuais, é importante focar em aumentar a quantidade de agendamentos pendentes para aproveitar a potencial receita adicional. Você pode considerar estratégias de marketing para atrair mais clientes e prestar um excelente serviço para incentivar a fidelização. Além disso, avalie as despesas para identificar oportunidades de redução e otimização. Estou à disposição para ajudar a elaborar um plano detalhado e trabalhar juntos na busca por resultados positivos! 💰🚀',
      ],
    },
    {
      side: 'right',
      messages: ['Mostre uma ação possível'],
    },
    {
      avatar,
      messages: [answer],
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
    setChatMessages([
      ...newChatMessages,
      {
        avatar: avatar,
        messages: [answer],
      },
    ]);
  };

  return (
    // <ChatWidget
    //   messages={chatMessages}
    //   height={{ xs: 400, md: 700 }}
    //   onSendMessage={onSendMessage}
    // />
    <ChatFab
      avatar="avatar/face2.webp"
      messages={chatMessages}
      onSendMessage={onSendMessage}
      hasNewMessage={hasNewMessage}
      onOpen={() => setHasNewMessage(false)}
    />
  );
};

export default FinanceChat;
