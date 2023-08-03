import { useState } from 'react';
import { Button, IconButton, Stack, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { MenuPopover } from '@postgpt/ui-mininal-tmpl';
import { msg } from '@postgpt/i18n';

interface INewPostPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const NewPostPopover: React.FC<INewPostPopoverProps> = ({
  anchorEl,
  onClose,
}) => {
  const [topic, setTopic] = useState('');
  const [character, setCharacter] = useState('');

  return (
    <MenuPopover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'center', horizontal: 'center' }}
      sx={{
        p: 1.5,
        mt: 1.5,
        ml: 0.75,
        '& .MuiMenuItem-root': {
          typography: 'body2',
          borderRadius: 0.75,
        },
        width: 400,
        maxWidth: '85%',
      }}
    >
      <Stack sx={{ p: 1 }} gap={1}>
        <TextField
          autoFocus
          margin="dense"
          label={msg('app.popover.newpost.input.topic')}
          type="text"
          fullWidth
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton
                sx={{ visibility: topic ? 'visible' : 'hidden' }}
                onClick={() => setTopic('')}
              >
                <ClearIcon />
              </IconButton>
            ),
          }}
          required
        />
        <TextField
          margin="dense"
          label={msg('app.popover.newpost.input.character')}
          type="text"
          fullWidth
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton
                sx={{ visibility: character ? 'visible' : 'hidden' }}
                onClick={() => setCharacter('')}
              >
                <ClearIcon />
              </IconButton>
            ),
          }}
        />
        <Button
          onClick={onClose}
          color="primary"
          variant="contained"
          sx={{ mt: 2 }}
        >
          {msg('app.button.generate')}
        </Button>
      </Stack>
    </MenuPopover>
  );
};

export default NewPostPopover;
