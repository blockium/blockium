import { forwardRef } from 'react';

import { Grid, IconButton } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { TimePicker } from '@mui/x-date-pickers';

import { DateTimeField } from '../Form';
import { useIsMobile } from '../../hooks/useIsMobile';

// Props for a time selection component
type TimeProps<T> = {
  data: T;
  field: DateTimeField<T>;
};

// A time selection component
const TimeInner = <T extends object>(
  props: TimeProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { data, field } = props;
  const isMobile = useIsMobile();

  return (
    <Grid xs={12} {...field.gridProps}>
      <TimePicker
        ampm={false}
        label={field.formLabel}
        value={
          data[field.key] !== null && data[field.key] !== undefined
            ? (data[field.key] as Date)
            : null
        }
        onChange={(date: Date | null) =>
          field.onChange?.(date?.toISOString() || null)
        }
        slotProps={{
          textField: {
            inputRef: ref,
            error: false,
            label: field.formLabel,
            fullWidth: true,
            sx: { my: '6px' },
            InputProps: isMobile
              ? {
                  readOnly: !field.onChange,
                  endAdornment: (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        field.onChange?.(null);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  ),
                }
              : {
                  readOnly: !field.onChange,
                },
            ...field.uiProps,
          },
        }}
      />
    </Grid>
  );
};
const Time = forwardRef(TimeInner);

export default Time;
