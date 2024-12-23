import { Popover, alpha, styled } from '@mui/material';

import { IChatMessage } from './ChatMessage';
import { ChatWidget } from './ChatWidget';
import { PropsWithChildren } from 'react';

const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    bottom: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-315deg)',
    background: theme.palette.primary.lighter,
    borderRight: `solid 2px ${alpha(theme.palette.grey[500], 0.5)}`,
    borderBottom: `solid 2px ${alpha(theme.palette.grey[500], 0.5)}`,
  },
}));

type ChatPopoverProps = PropsWithChildren & {
  anchorEl: HTMLElement | null;
  messages?: IChatMessage[];
  onSendMessage?: (message: string) => Promise<void>;
  onClose: () => void;
};

export const ChatPopover: React.FC<ChatPopoverProps> = ({
  anchorEl,
  messages,
  onSendMessage,
  onClose,
  children,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      slotProps={{
        paper: {
          sx: {
            overflow: 'inherit',
            borderRadius: 2,
            width: { xs: '100%', sm: 600 },
          },
        },
        root: {
          sx: {
            mt: -1,
          },
        },
      }}
    >
      {children || (
        <ChatWidget
          messages={messages || []}
          onSendMessage={onSendMessage || (async (message: string) => void 0)}
        />
      )}
      <ArrowStyle className="arrow" />
    </Popover>
  );
};
