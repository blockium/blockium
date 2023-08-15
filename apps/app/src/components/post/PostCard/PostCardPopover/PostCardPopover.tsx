import { Badge, Link, ListItemIcon, MenuItem, Stack } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import { msg } from '@postgpt/i18n';
import { MenuPopover } from '@postgpt/ui-mininal-tmpl';

interface IPostCardPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onDelete: () => void;
  onCopy?: () => void;
  onRegenerate?: () => void;
}

export const PostCardPopover: React.FC<IPostCardPopoverProps> = ({
  anchorEl,
  onClose,
  onDelete,
  onCopy,
  onRegenerate,
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
          {/* Add a button to regenerate the post  */}
          <Badge badgeContent="breve" color="primary">
            <ListItemIcon>
              <RefreshIcon />
            </ListItemIcon>
            {msg('app.button.regenerate')}
          </Badge>
        </Stack>
      </MenuItem>
      <MenuItem component={Link} onClick={onCopy} sx={{ m: 1 }}>
        <Stack direction="row">
          {/* Add a button to copy the post */}
          <Badge badgeContent="breve" color="primary">
            <ListItemIcon>
              <ContentCopyIcon />
            </ListItemIcon>
            {msg('app.button.copy')}
          </Badge>
        </Stack>
      </MenuItem>
      <MenuItem component={Link} onClick={onDelete} sx={{ m: 1 }}>
        <Stack direction="row">
          {/* Add a button to delete the post  */}
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
