import { forwardRef } from 'react';

import { SwitchField } from '../Form';
import {
  FormControl,
  FormControlLabel,
  Grid,
  Switch as MuiSwitch,
} from '@mui/material';

// Props for a switch component
type BooleanProps<T> = {
  data: T;
  field: SwitchField<T>;
};

// A switch component
const SwitchInner = <T extends object>(
  props: BooleanProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { data, field } = props;

  return (
    <Grid xs={12} {...field.gridProps}>
      <FormControl ref={ref} sx={{ my: '8px', ml: '12px' }} {...field.uiProps}>
        <FormControlLabel
          id={field.key as string}
          control={
            <MuiSwitch
              checked={!!data[field.key]}
              onChange={(e) => field.onChange?.(e.target.checked.toString())}
              readOnly={!field.onChange}
            />
          }
          label={field.formLabel}
        />
      </FormControl>
    </Grid>
  );
};

const Switch = forwardRef(SwitchInner);

export default Switch;
