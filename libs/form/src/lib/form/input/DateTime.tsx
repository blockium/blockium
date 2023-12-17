import { forwardRef } from 'react';

import { Grid, IconButton } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers';

import { DateTimeField } from '../Form';
import { useIsMobile } from '../../hooks/useIsMobile';

// Props for a date and time selection component
type DateTimeProps<T> = {
  data: T;
  field: DateTimeField<T>;
};

// A date and time selection component
const DateTimeInner = <T extends object>(
  props: DateTimeProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { data, field } = props;
  const isMobile = useIsMobile();

  return (
    <Grid xs={12} {...field.gridProps}>
      <DateTimePicker
        ampm={false}
        label={field.formLabel}
        value={
          data[field.key] !== null && data[field.key] !== undefined
            ? (data[field.key] as Date)
            : null
        }
        onChange={(jsDate: Date | null) =>
          field.onChange?.(jsDate?.toJSON() || null)
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
const DateTime = forwardRef(DateTimeInner);

export default DateTime;
