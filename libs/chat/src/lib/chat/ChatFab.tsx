import { PropsWithChildren, useState } from 'react';
import {
  Avatar,
  Badge,
  Dialog,
  Fab,
  IconButton,
  Tooltip,
  styled,
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

import { ChatPopover } from './ChatPopover';
import { IChatMessage } from './ChatMessage';
import ChatWidget from './ChatWidget';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

type ChatFabProps = PropsWithChildren & {
  avatar: string;
  tooltip?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  messages?: IChatMessage[];
  hasNewMessage?: boolean;
  onSendMessage?: (message: string) => Promise<void>;
  onOpen?: () => void;
  onClose?: () => void;
  width?: number;
  height?: number;
  fullScreen?: boolean;
};

export const ChatFab: React.FC<ChatFabProps> = ({
  avatar,
  tooltip,
  position = 'bottom-right',
  messages,
  hasNewMessage = false,
  onSendMessage,
  onOpen,
  onClose,
  children,
  width,
  height,
  fullScreen,
}) => {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const sxPos = {
    'top-left': { top: '2rem', left: '2rem' },
    'top-right': { top: '2rem', right: '2rem' },
    'bottom-left': { bottom: '2rem', left: '2rem' },
    'bottom-right': { bottom: '2rem', right: '2rem' },
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.currentTarget.blur(); // Avoid blocked aria-hidden on an element
    setOpenPopover(event.currentTarget);
    onOpen?.();
  };

  const handleClose = () => {
    setOpenPopover(null);
    onClose?.();
  };

  return (
    <>
      <Tooltip title={tooltip}>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', ...sxPos[position] }}
          onClick={handleOpen}
        >
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            invisible={!hasNewMessage || !!openPopover}
          >
            <Avatar
              alt="Chat Assistant"
              src={avatar}
              sx={{ width: 52, height: 52, bgcolor: 'transparent' }}
            />
          </StyledBadge>
        </Fab>
      </Tooltip>
      {fullScreen ? (
        <Dialog open={Boolean(openPopover)} fullScreen={fullScreen}>
          {children || (
            <ChatWidget
              messages={messages || []}
              onSendMessage={
                onSendMessage || (async (message: string) => void 0)
              }
            />
          )}
          <IconButton
            size="large"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 4,
              right: 4,
            }}
          >
            <ClearIcon />
          </IconButton>
        </Dialog>
      ) : (
        <ChatPopover
          anchorEl={openPopover}
          messages={messages}
          onSendMessage={onSendMessage}
          onClose={handleClose}
          position={position}
          width={width}
          height={height}
        >
          {children}
        </ChatPopover>
      )}
    </>
  );
};
