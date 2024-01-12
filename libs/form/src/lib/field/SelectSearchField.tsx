import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Autocomplete,
  createFilterOptions,
  Button,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';

import { ISelectField } from './SelectField';

// Props for a select component that allows searching
type SelectSearchProps<T> = {
  data: T;
  field: ISelectField<T>;
};

// A select component that allows searching
const SelectSearchInner = <T extends object>(
  props: SelectSearchProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { t } = useTranslation();
  const { data, field } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter = createFilterOptions<any>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLabel = (key: any) => {
    const option = options.find((option) => option[field.options.key] === key);
    return option?.[field.options.label] || '';
  };

  return (
    <Grid item xs={12} {...field.gridProps}>
      <Autocomplete
        // freeSolo
        id={field.key as string}
        // selectOnFocus
        // clearOnBlur
        // handleHomeEndKeys
        value={
          data[field.key]
            ? {
                [field.options.key]: data[field.key],
                [field.options.label]: getLabel(data[field.key]),
              }
            : null
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(event: any, option: any, reason: string) => {
          if (field.onChange) {
            option
              ? field.onChange(option[field.options.key])
              : field.onChange(null);
          }
          // field.onChange?.(option?.[field.options.key]);
        }}
        isOptionEqualToValue={(option, value) =>
          option[field.options.key] === value[field.options.key]
        }
        getOptionLabel={(option) => (option ? option[field.options.label] : '')}
        options={options}
        filterOptions={(options, optionsState) => {
          const filteredOptions = filter(options, optionsState);

          // inputValue = typed string value in the visual field
          const { inputValue: inputText } = optionsState;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputText === option[field.options.label],
          );
          if (inputText !== '' && !isExisting) {
            // timeout adds to event queue
            // evicting parallel state update error on father comp
            setTimeout(() => setInputValue(inputText), 0);
          } else {
            // timeout adds to event queue
            // evicting parallel state update error on father comp
            setTimeout(() => setInputValue(''), 0);
          }

          return filteredOptions;
        }}
        renderInput={(params) => (
          <TextField
            inputRef={ref}
            {...params}
            label={field.formLabel}
            fullWidth
            InputProps={{
              ...params.InputProps,
              readOnly: !field.onChange,
              startAdornment: field.prefix && (
                <>
                  {params.InputProps.startAdornment}
                  <InputAdornment position="start">
                    {field.prefix}
                  </InputAdornment>
                </>
              ),
              endAdornment: (
                <>
                  {inputValue && !data[field.key] && field.onAddClick && (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={(e) => {
                          field.onAddClick?.(inputValue);
                        }}
                      >
                        {t('form:button.new')}
                      </Button>
                    </InputAdornment>
                  )}
                  {params.InputProps.endAdornment}
                  {field.suffix && (
                    <InputAdornment position="end">
                      {field.suffix}
                    </InputAdornment>
                  )}
                </>
              ),
            }}
            {...field.uiProps}
          />
        )}
        sx={{ my: '6px' }}
      />
    </Grid>
  );
};
export const SelectSearchField = forwardRef(SelectSearchInner);
