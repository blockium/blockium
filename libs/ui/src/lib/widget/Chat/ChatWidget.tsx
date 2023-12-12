import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  useTheme,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

import ChatMessage, { IChatMessage } from './ChatMessage';
import { ChatTyping } from './ChatTyping';

type ChatWidgetProps = {
  messages: IChatMessage[];
  onSendMessage: (message: string) => Promise<void>;
  height?: number | string | object;
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  messages,
  onSendMessage,
  height,
}) => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [isMessaging, setIsMessaging] = useState(false);
  const messageEnd = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (messageEnd.current) {
      messageEnd.current.lastElementChild?.scrollIntoView({
        behavior: 'instant',
        block: 'end',
      });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setIsMessaging(true);
    setMessage('');
    await onSendMessage(message);

    // TODO: Remove setTimeout
    // Simulates network communication
    setTimeout(() => {
      setIsMessaging(false);
    }, 5000);
  };

  return (
    <Card
      sx={{
        bgcolor: theme.palette.primary.lighter,
        height: height || '100%',
      }}
    >
      {/* Messages */}
      <CardContent
        ref={messageEnd}
        sx={{
          height: 'calc(100% - 100px)',
          overflowY: 'auto',
        }}
      >
        {messages.map((chatMessage, i) => (
          <ChatMessage key={i} {...chatMessage} />
        ))}
        {isMessaging && <ChatTyping />}
      </CardContent>
      {/* New message input */}
      <Stack
        direction="row"
        gap={2}
        alignItems="flex-end"
        height="80px"
        ml={3}
        mr={3}
      >
        <TextField
          label={t('ui:chat.msg.label')}
          type="text"
          variant="standard"
          fullWidth
          multiline
          maxRows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isMessaging}
        />
        <Tooltip title={t('ui:chat.msg.button.send')}>
          <IconButton
            aria-label={t('ui:chat.msg.button.send')}
            color="primary"
            edge="end"
            sx={{ mb: '-1rem' }}
            onClick={sendMessage}
            disabled={isMessaging}
          >
            <SendIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Card>
  );
};

export default ChatWidget;
