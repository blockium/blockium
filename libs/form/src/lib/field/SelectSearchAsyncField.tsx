import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Autocomplete,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';

// TODO: implement own throttle and remove lodash dependency
import throttle from 'lodash.throttle';

import { IBaseDataField, getDataPromise } from './BaseDataField';

// Options for async selects - should be used in relationships with other entities
export interface ISelectOptionsAsync<U> {
  getData: getDataPromise<U>;
  key: keyof U;
  label: keyof U;
}

// A select form data field
export interface ISelectSearchAsyncField<T> extends IBaseDataField<T> {
  formType: 'select-search-async';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: ISelectOptionsAsync<any>;
  isSelected?: (data: T, inputValue: string) => boolean;
}

// Props for a select component that allows async searching
type SelectSearchAsyncProps<T> = {
  data: T;
  field: ISelectSearchAsyncField<T>;
};

const isDataChange = <T extends object>(
  data: T,
  field: ISelectSearchAsyncField<T>,
  inputValue: string,
) => {
  return !data[field.key] || !field.isSelected?.(data, inputValue);
};

// A select component that allows async searching
const SelectSearchAsyncInner = <T extends object>(
  props: SelectSearchAsyncProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { t } = useTranslation();
  const { data, field } = props;
  const [inputValue, setInputValue] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<readonly any[]>([]);
  const [loading, setLoading] = useState(false);

  type requestProps = {
    searchText: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getData: getDataPromise<any>;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type callBackProps = (optionsData: readonly any[]) => void;
  type fetchFunc = (request: requestProps, callback: callBackProps) => void;
  const fetch: fetchFunc = useMemo(
    () =>
      throttle((request: requestProps, callback: callBackProps) => {
        setLoading(true);
        const dataResult = request.getData(request.searchText);
        dataResult.then((optionsData) => {
          callback(optionsData);
          setLoading(false);
        });
      }, 500),
    [],
  );

  useEffect(() => {
    let active = true; // mark to avoid running the callback after unmount

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    if (!isDataChange(data, field, inputValue)) {
      return undefined;
    }

    const request = { searchText: inputValue, getData: field.options.getData };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const callback = (optionsData: readonly any[]) => {
      if (active) {
        setOptions(optionsData);
      }
    };
    fetch(request, callback);

    // on unmount active will be false
    return () => {
      active = false;
    };
  }, [data, fetch, field, field.options.getData, inputValue]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLabel = (key: any) => {
    const option = options.find((option) => option[field.options.key] === key);
    return option?.[field.options.label];
  };
  return (
    <Grid item xs={12} {...field.gridProps}>
      <Autocomplete
        freeSolo
        id={field.key as string}
        autoComplete
        // includeInputInList
        // filterSelectedOptions
        // selectOnFocus
        // clearOnBlur
        // handleHomeEndKeys
        loading={loading}
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
          field.onChange?.(option ? option[field.options.key] : null, option);
        }}
        onInputChange={(event, newInputValue) => {
          if (isDataChange(data, field, newInputValue)) {
            // allow to change when the data field is already set
            field.onChange?.(null);
          }
          setInputValue(newInputValue);
        }}
        options={options}
        isOptionEqualToValue={(option, value) =>
          option && option[field.options.key] === value[field.options.key]
        }
        getOptionLabel={(option) => {
          // When an Enter is pressed it can handle a new relationship add
          if (typeof option === 'string') {
            field.onAddClick?.(option);
            return '';
          }
          return option ? option[field.options.label] : '';
        }}
        // renderOption={(props, option) => {}} // Could render custom options
        filterOptions={(options) => options}
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
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
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
            sx={{ my: '6px' }}
            {...field.uiProps}
          />
        )}
      />
    </Grid>
  );
};
export const SelectSearchAsyncField = forwardRef(SelectSearchAsyncInner);
