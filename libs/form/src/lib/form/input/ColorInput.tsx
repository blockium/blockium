import { forwardRef, useState } from 'react';

// mui
import { Box, Card, CardContent, Grid, Popover, Stack } from '@mui/material';

import { CirclePicker } from 'react-color';

import { ColorField } from '../Form';

// Props for a switch component
type BooleanProps<T> = {
  data: T;
  field: ColorField<T>;
};

// A switch component
const ColorInner = <T extends object>(
  props: BooleanProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { data, field } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Grid item xs={12} {...field.gridProps}>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        ref={ref}
        sx={{ my: '8px', ml: '12px' }}
        {...field.uiProps}
      >
        {field.formLabel}
        <Box
          onClick={field.onChange ? handleClick : () => void 0}
          sx={{
            bgcolor: data[field.key] as string,
            width: '28px',
            height: '28px',
            borderRadius: '50%',
          }}
        />
      </Stack>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Card>
          <CardContent>
            <CirclePicker
              color={(data[field.key] as string) || '#fff'}
              onChangeComplete={(color: { hex: string }) =>
                field.onChange?.(color.hex)
              }
            />
          </CardContent>
        </Card>
      </Popover>
    </Grid>
  );
};

const ColorInput = forwardRef(ColorInner);

export default ColorInput;
