import { forwardRef } from 'react';

import {
  FormControl,
  FormControlLabel,
  Grid,
  Switch as MuiSwitch,
} from '@mui/material';

import { IBaseDataField } from './BaseDataField';

export interface ISwitchField<T> extends IBaseDataField<T> {
  formType: 'switch';
}

// Props for a switch component
type BooleanProps<T> = {
  data: T;
  field: ISwitchField<T>;
};

// A switch component
const SwitchInner = <T extends object>(
  props: BooleanProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { data, field } = props;

  return (
    <Grid item xs={12} {...field.gridProps}>
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

export const SwitchField = forwardRef(SwitchInner);
