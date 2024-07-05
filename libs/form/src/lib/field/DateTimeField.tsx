import { forwardRef } from 'react';

import { Grid, IconButton } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers';

import { IBaseDataField } from './BaseDataField';
import { useIsMobile } from '../hooks/useIsMobile';

export interface IDateTimeField<T> extends IBaseDataField<T> {
  formType: 'date' | 'time' | 'date-time';
}

// Props for a date and time selection component
type DateTimeProps<T> = {
  data: T;
  field: IDateTimeField<T>;
};

// A date and time selection component
const DateTimeInner = <T extends object>(
  props: DateTimeProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { data, field } = props;
  const isMobile = useIsMobile();

  return (
    <Grid item xs={12} {...field.gridProps}>
      <DateTimePicker
        ampm={false}
        label={field.formLabel}
        value={
          data[field.key] !== null && data[field.key] !== undefined
            ? (new Date(data[field.key] as string) as never)
            : null
        }
        onChange={(date: Date | null) =>
          field.onChange?.(
            // avoids incomplete dates
            date instanceof Date && !isNaN(date.getTime())
              ? date.toISOString()
              : null,
          )
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
export const DateTimeField = forwardRef(DateTimeInner);
