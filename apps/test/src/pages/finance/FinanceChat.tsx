import { useState } from 'react';

import { ChatWidget, IChatMessage } from '@blockium/ui';

export const FinanceChat: React.FC = () => {
  const avatar = 'avatar/face2.webp';
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([
    {
      avatar,
      messages: [
        'Hi Jenny, How r u today?',
        'Did you train yesterday',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat lacus laoreet non curabitur gravida.',
      ],
    },
    {
      side: 'right',
      messages: [
        "Great! What's about you?",
        'Of course I did. Speaking of which check this out',
      ],
    },
    { avatar: avatar, messages: ['Im good.', 'See u later.'] },
  ]);

  const onSendMessage = async (message: string) => {
    const lastMessages = chatMessages[chatMessages.length - 1];
    if (lastMessages.side === 'right') {
      lastMessages.messages?.push(message);
      setChatMessages([...chatMessages]);
    } else {
      setChatMessages([
        ...chatMessages,
        {
          side: 'right',
          messages: [message],
        },
      ]);
    }
  };

  return (
    <ChatWidget
      messages={chatMessages}
      height={{ xs: 400, md: '100%' }}
      onSendMessage={onSendMessage}
    />
  );
};

export default FinanceChat;
