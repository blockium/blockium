import { useTranslation } from 'react-i18next';
import { Badge, Link, ListItemIcon, MenuItem, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import { MenuPopover } from '@blockium/layout';

interface IPostCardPopoverProps {
  anchorEl: HTMLElement | null;
  onEdit?: () => void;
  onRegenerate: () => void;
  onMove?: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const PostCardPopover: React.FC<IPostCardPopoverProps> = ({
  anchorEl,
  onEdit,
  onRegenerate,
  onMove,
  onDuplicate,
  onDelete,
  onClose,
}) => {
  const { t } = useTranslation();
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
      <MenuItem component={Link} onClick={onEdit} sx={{ m: 1 }}>
        <Stack direction="row">
          {/* Button to edit the post  */}
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          {t('button.edit')}
        </Stack>
      </MenuItem>
      <MenuItem component={Link} onClick={onRegenerate} sx={{ m: 1 }}>
        <Stack direction="row">
          {/* Button to regenerate the post  */}
          <ListItemIcon>
            <RefreshIcon />
          </ListItemIcon>
          {t('button.regenerate')}
        </Stack>
      </MenuItem>
      <MenuItem component={Link} onClick={onMove} sx={{ m: 1 }}>
        <Stack direction="row">
          {/* Button to move the post */}
          <Badge badgeContent="breve" color="primary">
            <ListItemIcon>
              <MoveDownIcon />
            </ListItemIcon>
            {t('button.move')}
          </Badge>
        </Stack>
      </MenuItem>
      <MenuItem component={Link} onClick={onDuplicate} sx={{ m: 1 }}>
        <Stack direction="row">
          {/* Button to copy the post */}
          <ListItemIcon>
            <ContentCopyIcon />
          </ListItemIcon>
          {t('button.duplicate')}
        </Stack>
      </MenuItem>
      <MenuItem component={Link} onClick={onDelete} sx={{ m: 1 }}>
        <Stack direction="row">
          {/* Button to delete the post  */}
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          {t('button.delete')}
        </Stack>
      </MenuItem>
    </MenuPopover>
  );
};

export default PostCardPopover;
