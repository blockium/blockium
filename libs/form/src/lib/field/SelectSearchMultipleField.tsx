import { forwardRef, useEffect, useState } from 'react';

import {
  Autocomplete,
  createFilterOptions,
  Checkbox,
  Grid,
  TextField,
} from '@mui/material';

import { CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from '@mui/icons-material';
import { CheckBox as CheckBoxIcon } from '@mui/icons-material';

import { ISelectField } from './SelectField';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Props for a select component that allows searching
type SelectSearchProps<T> = {
  data: T;
  field: ISelectField<T>;
};

// A select component that allows searching
const SelectSearchMultipleInner = <T extends object>(
  props: SelectSearchProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { data, field } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<any[]>([]);
  const [, setInputValue] = useState('');

  useEffect(() => {
    const result = field.options.getData();
    if (result instanceof Promise) {
      result.then((asyncOptionsData) => {
        setOptions(asyncOptionsData);
      });
    } else {
      setOptions(result);
    }
  }, [field.options]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter = createFilterOptions<any>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getValues = (key: any) => {
    const keyArray: string[] = key.split(',');
    const values = options.filter((option) =>
      keyArray.includes(option[field.options.key]),
    );
    return values;
  };

  return (
    <Grid item xs={12} {...field.gridProps}>
      <Autocomplete
        multiple
        freeSolo // This is necessary if using the custom filterOptions
        // limitTags={1}
        id={field.key as string}
        options={options}
        disableCloseOnSelect
        getOptionLabel={(option) => (option ? option[field.options.label] : '')}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option[field.options.label]}
          </li>
        )}
        value={getValues(data[field.key])}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(event: any, option: any, reason: string) => {
          if (field.onChange) {
            field.onChange(
              option
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((optionItem: any) => optionItem[field.options.key])
                .join(','),
            );
          }
        }}
        // TODO: filterOptions could be removed if new button not used - see endAdornment issue below
        filterOptions={(options, optionsState) => {
          const filteredOptions = filter(options, optionsState);

          // inputValue = typed string value in the visual field
          const { inputValue } = optionsState;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option[field.options.label],
          );
          if (inputValue !== '' && !isExisting) {
            setInputValue(inputValue);
          } else {
            setInputValue('');
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
              // TODO: endAdornment doesn't fit good on layout
              // endAdornment: (
              //   <>
              //     {inputValue && (
              //       <InputAdornment position="end">
              //         <Button
              //           variant="contained"
              //           size="small"
              //           onClick={(e) => {
              //             field.onAddClick?.(inputValue);
              //           }}
              //         >
              //           Novo
              //         </Button>
              //       </InputAdornment>
              //     )}
              //     {params.InputProps.endAdornment}
              //     {field.suffix && (
              //       <InputAdornment position="end">
              //         {field.suffix}
              //       </InputAdornment>
              //     )}
              //   </>
              // ),
            }}
            {...field.uiProps}
          />
        )}
        sx={{ my: '6px' }}
      />
    </Grid>
  );
};

export const SelectSearchMultipleField = forwardRef(SelectSearchMultipleInner);
