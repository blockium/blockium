import { ChangeEvent, forwardRef } from 'react';

import { Grid, InputAdornment, TextField as MuiTextField } from '@mui/material';

import InputMask from 'react-input-mask';

import { TextField } from '../Form';

// Props for a text component
type TextProps<T> = {
  data: T;
  field: TextField<T>;
};

// A text component
const TextInner = <T extends object>(
  props: TextProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { data, field } = props;

  return (
    <Grid item xs={12} {...field.gridProps}>
      {field.mask || field.textType === 'tel' ? (
        <InputMask
          mask={field.mask || '(99) 99999-9999'}
          // maskPlaceholder={null}
          value={(data[field.key] as unknown as string) || ''}
          disabled={false}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            field.onChange?.(e.target.value)
          }
        >
          {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore:
            () => (
              <MuiTextField
                inputRef={ref}
                id={field.key as string}
                label={field.formLabel}
                type={field.textType ? field.textType : 'text'}
                fullWidth
                value={data[field.key] || ''}
                // onChange={(e) => field.onChange?.(e.target.value)}
                InputProps={{
                  startAdornment: field.prefix && (
                    <InputAdornment position="start">
                      {field.prefix}
                    </InputAdornment>
                  ),
                  endAdornment: field.suffix && (
                    <InputAdornment position="end">
                      {field.suffix}
                    </InputAdornment>
                  ),
                  readOnly: !field.onChange,
                }}
                sx={{ my: '6px' }}
                {...field.uiProps}
              />
            )
          }
        </InputMask>
      ) : (
        <MuiTextField
          inputRef={ref}
          id={field.key as string}
          label={field.formLabel}
          type={field.textType ? field.textType : 'text'}
          fullWidth
          value={data[field.key] || ''}
          onChange={(e) => field.onChange?.(e.target.value)}
          InputProps={{
            readOnly: !field.onChange,
          }}
          sx={{ my: '6px' }}
          {...field.uiProps}
        />
      )}
    </Grid>
  );
};

const TextInput = forwardRef(TextInner);

export default TextInput;
