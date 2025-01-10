import { Box, Popover, alpha, styled } from '@mui/material';

import { IChatMessage } from './ChatMessage';
import { ChatWidget } from './ChatWidget';
import { PropsWithChildren } from 'react';

const ArrowStyle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'arrowPos',
})<{
  arrowPos?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}>(({ theme, arrowPos }) => ({
  [theme.breakpoints.up('xs')]: {
    ...(arrowPos === 'top-left' || arrowPos === 'top-right'
      ? { top: -7 }
      : { bottom: -7 }),
    zIndex: 1,
    width: 12,
    ...(arrowPos === 'top-left' || arrowPos === 'bottom-left'
      ? { left: 20 }
      : { right: 20 }),
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    ...(arrowPos === 'top-left' || arrowPos === 'top-right'
      ? { transform: 'rotate(-135deg)' }
      : { transform: 'rotate(45deg)' }),
    background: 'inherit',
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.5)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.5)}`,
  },
}));

type ChatPopoverProps = PropsWithChildren & {
  anchorEl: HTMLElement | null;
  messages?: IChatMessage[];
  onSendMessage?: (message: string) => Promise<void>;
  onClose: () => void;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  width?: number;
  height?: number;
};

export const ChatPopover: React.FC<ChatPopoverProps> = ({
  anchorEl,
  messages,
  onSendMessage,
  onClose,
  children,
  position = 'bottom-right',
  width,
  height,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical:
          position === 'top-left' || position === 'top-right'
            ? 'bottom'
            : 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical:
          position === 'top-left' || position === 'top-right'
            ? 'top'
            : 'bottom',
        horizontal: 'center',
      }}
      slotProps={{
        paper: {
          sx: {
            overflow: 'inherit',
            borderRadius: 2,
            width: width || { xs: '100%', sm: 600 },
            height: height || 200,
            minHeight: 200,
          },
        },
        root: {
          sx: {
            mt: position === 'top-left' || position === 'top-right' ? 1 : -1,
          },
        },
      }}
      // Fix Blocked aria-hidden on an element because... retained focus:
      closeAfterTransition={false}
    >
      {children || (
        <ChatWidget
          messages={messages || []}
          onSendMessage={onSendMessage || (async (message: string) => void 0)}
        />
      )}
      <ArrowStyle className="arrow" arrowPos={position} />
    </Popover>
  );
};
