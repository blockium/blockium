import { ElementType, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardTypeMap,
  IconButton,
  InputBaseComponentProps,
  InputLabelProps,
  Stack,
  SxProps,
  TextField,
  Tooltip,
  useTheme,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

import ChatMessage, { IChatMessage } from './ChatMessage';
import { ChatTyping } from './ChatTyping';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type ChatWidgetProps = {
  messages: IChatMessage[];
  isTyping?: boolean;
  disabled?: boolean;
  onSendMessage: (message: string) => Promise<void>;
  component?: OverridableComponent<CardTypeMap<object, 'div'>> &
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ElementType<any> | undefined);
  sx?: SxProps;
  inputLabel?: string;
  inputProps?: InputBaseComponentProps;
  InputLabelProps?: Partial<InputLabelProps>;
  sendButtonMessage?: string;
};

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  messages,
  isTyping,
  disabled,
  onSendMessage,
  component = Card,
  sx,
  inputLabel,
  inputProps,
  InputLabelProps,
  sendButtonMessage,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const [isMessaging, setIsMessaging] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.lastElementChild?.scrollIntoView({
        behavior: 'instant',
        block: 'end',
      });
    }
  }, [messages]);

  // Focus on input after sometime due to components updates
  const focusInput = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const sendMessage = async () => {
    focusInput(); // Focus before sending message

    if (!message.trim()) return;

    setIsMessaging(true);
    setMessage('');
    try {
      await onSendMessage(message);
    } catch (e) {
      console.log(e);
    } finally {
      setIsMessaging(false);
      focusInput(); // Focus after sending message
    }
  };

  return (
    <Box component={component} sx={sx} m={2} mb={0.5}>
      {/* Messages */}
      <Stack
        direction="column"
        gap={1}
        ref={messagesRef}
        sx={{
          height: 'calc(100% - 88px)',
          overflowY: 'auto',
        }}
      >
        {messages.map((chatMessage, i) => (
          <ChatMessage key={i} {...chatMessage} />
        ))}
        {(isMessaging || isTyping) && <ChatTyping />}
      </Stack>
      {/* New message input */}
      <Stack direction="row" gap={1} alignItems="flex-end" height="80px">
        <TextField
          inputRef={inputRef}
          autoFocus
          label={inputLabel}
          type="text"
          variant="filled"
          fullWidth
          multiline
          maxRows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (!isMessaging && !isTyping && !disabled) {
                sendMessage();
              }
            }
          }}
          inputProps={
            inputProps || { style: { color: theme.palette.primary.dark } }
          }
          InputLabelProps={
            InputLabelProps || {
              style: {
                color: theme.palette.primary.main,
              },
            }
          }
        />
        <Tooltip title={sendButtonMessage || t('chat:msg.button.send')}>
          <IconButton
            aria-label={sendButtonMessage || t('chat:msg.button.send')}
            color="primary"
            edge="end"
            // sx={{ mb: '-1rem' }}
            onClick={sendMessage}
            disabled={isMessaging || isTyping || disabled}
          >
            <SendIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default ChatWidget;
