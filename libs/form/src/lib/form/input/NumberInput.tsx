import { forwardRef } from 'react';
import { Grid, InputAdornment, TextField } from '@mui/material';

import { NumberField } from '../Form';

// Props for a number component
type NumberProps<T> = {
  data: T;
  field: NumberField<T>;
};

// A number component
const NumberInner = <T extends object>(
  props: NumberProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { data, field } = props;

  return (
    <Grid item xs={12} {...field.gridProps}>
      <TextField
        inputRef={ref}
        id={field.key as string}
        label={field.formLabel}
        type="number"
        fullWidth
        value={data[field.key] || ''}
        onChange={(e) => field.onChange?.(e.target.value)}
        InputProps={{
          startAdornment: field.prefix && (
            <InputAdornment position="start">{field.prefix}</InputAdornment>
          ),
          endAdornment: field.suffix && (
            <InputAdornment position="end">{field.suffix}</InputAdornment>
          ),
          readOnly: !field.onChange,
        }}
        sx={{ my: '6px' }}
        {...field.uiProps}
      />
    </Grid>
  );
};

const NumberInput = forwardRef(NumberInner);

export default NumberInput;
