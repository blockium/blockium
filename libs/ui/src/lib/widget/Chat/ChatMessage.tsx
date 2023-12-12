import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';

import { createChatStyles } from './createChatStyles';

export interface IChatMessage {
  avatar?: string;
  messages?: string[];
  side?: 'left' | 'right';
  GridContainerProps?: object;
  AvatarGridProps?: object;
  AvatarProps?: object;
  TypographyProps?: object;
  getTypographyProps?: () => object;
}

export const ChatMessage: React.FC<IChatMessage> = ({
  avatar = '',
  messages = [],
  side = 'left',
  GridContainerProps,
  AvatarGridProps,
  AvatarProps,
  TypographyProps,
  getTypographyProps,
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
    <Grid
      container
      spacing={2}
      justifyContent={side === 'right' ? 'flex-end' : 'flex-start'}
      {...GridContainerProps}
    >
      {side === 'left' && (
        <Grid item {...AvatarGridProps}>
          <Avatar src={avatar} {...AvatarProps} sx={{ ...styles.avatar }} />
        </Grid>
      )}
      <Grid item xs={8}>
        {messages.map((msg, i) => {
          return (
            <Box key={i} sx={{ ...styles[`${side}Row`] }}>
              <Typography
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
            </Box>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default ChatMessage;
