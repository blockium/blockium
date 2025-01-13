import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';

import { createChatStyles } from './createChatStyles';
import { ReactElement } from 'react';

export interface IChatMessage {
  avatar?: string;
  messages?: (string | ReactElement)[];
  side?: 'left' | 'right';
  AvatarProps?: object;
  TypographyProps?: object;
}

export const ChatMessage: React.FC<IChatMessage> = ({
  avatar = '',
  messages = [],
  side = 'left',
  AvatarProps,
  TypographyProps,
}) => {
  const theme = useTheme();
  const styles = createChatStyles(theme);

  const msgStyle = (index: number) => {
    if (index === 0) {
      return styles[`${side}First`];
    }
    if (index === messages.length - 1) {
      return styles[`${side}Last`];
    }
    return {};
  };

  return (
    <Stack
      direction="row"
      width="100%"
      justifyContent={side === 'right' ? 'flex-end' : 'flex-start'}
      gap={0.5}
    >
      {side === 'left' && avatar !== '' && (
        <Avatar src={avatar} {...AvatarProps} sx={{ ...styles.avatar }} />
      )}
      <Box sx={{ ...styles[`${side}Row`], maxWidth: '80%' }}>
        {messages.map((msg, i) => {
          return typeof msg === 'string' ? (
            <Typography
              key={i}
              align={'left'}
              {...TypographyProps}
              sx={{
                ...styles.msg,
                ...styles[side],
                ...msgStyle(i),
                whiteSpace: 'pre-line',
              }}
            >
              {msg}
            </Typography>
          ) : (
            <Box key={i}>{msg}</Box>
          );
        })}
      </Box>
    </Stack>
  );
};

export default ChatMessage;
