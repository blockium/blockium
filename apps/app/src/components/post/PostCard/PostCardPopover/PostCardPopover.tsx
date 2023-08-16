import { Badge, Link, ListItemIcon, MenuItem, Stack } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import { msg } from '@postgpt/i18n';
import { MenuPopover } from '@postgpt/ui-mininal-tmpl';

interface IPostCardPopoverProps {
  anchorEl: HTMLElement | null;
  onRegenerate: () => void;
  onClose: () => void;
  onDelete: () => void;
  onDuplicate?: () => void;
  onMove?: () => void;
}

export const PostCardPopover: React.FC<IPostCardPopoverProps> = ({
  anchorEl,
  onClose,
  onRegenerate,
  onDuplicate,
  onMove,
  onDelete,
}) => {
  return (
    <MenuPopover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        p: 0,
        mt: 1.5,
        ml: 0.75,
        '& .MuiMenuItem-root': {
          typography: 'body2',
          borderRadius: 0.75,
        },
      }}
    >
      <MenuItem component={Link} onClick={onRegenerate} sx={{ m: 1 }}>
        <Stack direction="row">
          {/* Button to regenerate the post  */}
          <ListItemIcon>
            <RefreshIcon />
          </ListItemIcon>
          {msg('app.button.regenerate')}
        </Stack>
      </MenuItem>
      <MenuItem component={Link} onClick={onMove} sx={{ m: 1 }}>
        <Stack direction="row">
          {/* Button to move the post */}
          <Badge badgeContent="breve" color="primary">
            <ListItemIcon>
              <MoveDownIcon />
            </ListItemIcon>
            {msg('app.button.move')}
          </Badge>
        </Stack>
      </MenuItem>
      <MenuItem component={Link} onClick={onDuplicate} sx={{ m: 1 }}>
        <Stack direction="row">
          {/* Button to copy the post */}
          <ListItemIcon>
            <ContentCopyIcon />
          </ListItemIcon>
          {msg('app.button.duplicate')}
        </Stack>
      </MenuItem>
      <MenuItem component={Link} onClick={onDelete} sx={{ m: 1 }}>
        <Stack direction="row">
          {/* Button to delete the post  */}
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          {msg('app.button.delete')}
        </Stack>
      </MenuItem>
    </MenuPopover>
  );
};

export default PostCardPopover;
