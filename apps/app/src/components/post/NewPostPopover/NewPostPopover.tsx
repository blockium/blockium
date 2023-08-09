import { useState } from 'react';
import { IconButton, Stack, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { MenuPopover } from '@postgpt/ui-mininal-tmpl';
import { msg } from '@postgpt/i18n';
import { PostFormat, PostType } from '@postgpt/types';
import { CTAButton } from '@postgpt/ui-common';

interface INewPostPopoverProps {
  startDate: Date;
  anchorEl: HTMLElement | null;
  onGenerate: (
    topic: string,
    character?: string,
    format?: PostFormat,
    type?: PostType,
  ) => void;
  onClose: () => void;
}

// TODO: !!! Add a select to choose the post format
// TODO: !!! Add a select to choose the post type
// TODO: !!! Call addPost from the NewPostPopover component, instead of navigating to the post weekly page. This should be a new prop of the component, a callback function, which accepts topic, character, format and type
export const NewPostPopover: React.FC<INewPostPopoverProps> = ({
  startDate,
  anchorEl,
  onGenerate,
  onClose,
}) => {
  const [topic, setTopic] = useState('');
  const [character, setCharacter] = useState('');
  const [format, setFormat] = useState<PostFormat>();
  const [type, setType] = useState<PostType>();

  const handleGenerate = () => {
    onGenerate(topic, character, format, type);
  };

  return (
    <MenuPopover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
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
        <CTAButton
          onClick={handleGenerate}
          color="primary"
          variant="contained"
          sx={{ mt: 2 }}
        >
          {msg('app.button.generate')}
        </CTAButton>
      </Stack>
    </MenuPopover>
  );
};

export default NewPostPopover;
