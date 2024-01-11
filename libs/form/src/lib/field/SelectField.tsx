import { forwardRef, useEffect, useState } from 'react';
import { Grid, InputAdornment, MenuItem, TextField } from '@mui/material';
import { AnySchema } from 'yup';

import { IBaseDataField, getData } from './BaseDataField';

// Options for selects - should be used in relationships with other entities
export interface ISelectOptions<U> {
  getData: getData<U>;
  key: keyof U;
  label: keyof U;
}

// A select form data field
export interface ISelectField<T> extends IBaseDataField<T> {
  formType: 'select' | 'select-search' | 'select-search-multiple';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: ISelectOptions<any>;
  validation?: AnySchema;
}

// Props for a simple select component
type SelectProps<T> = {
  data: T;
  field: ISelectField<T>;
};

// A simple select component
const SelectInner = <T extends object>(
  props: SelectProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { data, field } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<any[]>([]);

  useEffect(() => {
    const getData = field.options.getData();
    if (getData instanceof Promise) {
      getData.then((asyncOptionsData) => {
        setOptions(asyncOptionsData);
      });
    } else {
      setOptions(getData);
    }
  }, [field.options]);

  return (
    <Grid item xs={12} {...field.gridProps}>
      <TextField
        inputRef={ref}
        select
        id={field.key as string}
        label={field.formLabel}
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
      >
        {options.map((option) => {
          const key = option[field.options.key];
          const label = option[field.options.label];
          return (
            <MenuItem key={key} value={key} selected={data[field.key] === key}>
              {label}
            </MenuItem>
          );
        })}
      </TextField>
    </Grid>
  );
};

export const SelectField = forwardRef(SelectInner);
