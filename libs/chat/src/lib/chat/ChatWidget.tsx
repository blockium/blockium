import { ElementType, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Card,
  CardContent,
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
  onSendMessage,
  component = Card,
  sx,
  inputLabel,
  inputProps,
  InputLabelProps,
  sendButtonMessage,
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
    setIsMessaging(false);
  };

  return (
    <Box
      component={component}
      sx={
        sx || {
          bgcolor: theme.palette.primary.lighter,
          height: '100%',
          pt: '2px',
        }
      }
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
        gap={1}
        alignItems="flex-end"
        height="80px"
        ml={2}
        mr={2}
      >
        <TextField
          autoFocus
          label={inputLabel}
          type="text"
          variant="filled"
          fullWidth
          multiline
          maxRows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isMessaging}
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
            disabled={isMessaging}
          >
            <SendIcon />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default ChatWidget;
