/* eslint-disable no-template-curly-in-string */
import { ReactNode, useCallback, useRef, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { setLocale, AnySchema } from 'yup';

import { Grid } from '@mui/material';

import Text from './input/TextInput';
import Number from './input/NumberInput';
import Switch from './input/SwitchInput';
import Select from './input/SelectInput';
import SelectSearch from './input/SelectSearchInput';
import SelectSearchMultiple from './input/SelectSearchMultipleInput';
import SelectSearchAsync from './input/SelectSearchAsyncInput';
import Date from './input/DateInput';
import Time from './input/TimeInput';
import DateTime from './input/DateTimeInput';
import Color from './input/ColorInput';

import { useForm } from './FormContext';
import { useIsMobile } from '../hooks/useIsMobile';

// Redeclare forwardRef
declare module 'react' {
  function forwardRef<T, P = object>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}
setLocale({
  mixed: {
    default: 'não é válido',
    required: 'campo obrigatório',
    notType: 'digite um valor válido',
  },
  number: {
    min: 'deve ser maior ou igual a ${min}',
    max: 'deve ser menor ou igual a ${max}',
    positive: 'deve ser um número positivo',
    integer: 'deve ser um número inteiro',
  },
  string: {
    email: 'deve ser um email válido',
  },
});

export type getData<U> = (searchText?: string) => U[];
export type getDataPromise<U> = (searchText?: string) => Promise<U[]>;

// Options for selects - should be used in relationships with other entities
export type SelectOptions<U> = {
  getData: getData<U>;
  key: keyof U;
  label: keyof U;
};

// Options for async selects - should be used in relationships with other entities
export type SelectOptionsAsync<U> = {
  getData: getDataPromise<U>;
  key: keyof U;
  label: keyof U;
};

// The base form data field
type BaseDataField<T> = {
  key: keyof T; // Field key
  formLabel: string; // Field label on form
  uiProps?: object;
  gridProps?: object;
  validation?: AnySchema;
  prefix?: ReactNode; // e.g: $
  suffix?: ReactNode; // e.g: Kg
  onAddClick?: (value?: string) => void; // Function to add a new related entity
  onChange?: (value: string | null) => void;
};

// A text form data field
export type TextField<T> = {
  formType: 'text';
  textType: 'email' | 'password' | 'tel' | 'text' | 'url';
  mask?: string;
} & BaseDataField<T>;

// A select form data field
export type SelectField<T> = {
  formType: 'select' | 'select-search' | 'select-search-multiple';
  options: SelectOptions<unknown>;
  validation?: AnySchema;
} & BaseDataField<T>;

// A select form data field
export type SelectSearchAsyncField<T> = {
  formType: 'select-search-async';
  options: SelectOptionsAsync<unknown>;
  getFieldLabel: (optionKey: string) => string;
} & BaseDataField<T>;

// TODO: numberPrefix and numberSuffix
// A number form data field
export type NumberField<T> = {
  formType: 'number';
} & BaseDataField<T>;

// Other types of form data field
export type DateTimeField<T> = {
  formType: 'date' | 'time' | 'date-time';
} & BaseDataField<T>;

export type SwitchField<T> = {
  formType: 'switch';
} & BaseDataField<T>;

export type ColorField<T> = {
  formType: 'color';
} & BaseDataField<T>;

export type CustomField<T> = {
  formType: 'custom';
} & BaseDataField<T>;

// Metadata to define a form data field
export type FormField<T> =
  | TextField<T>
  | SelectField<T>
  | SelectSearchAsyncField<T>
  | NumberField<T>
  | DateTimeField<T>
  | SwitchField<T>
  | ColorField<T>
  | CustomField<T>;

// Props for a form that creates the components from fields metadata
type FormProps<T> = {
  data: T;
  fields: FormField<T>[];
  gridProps?: object;
};

// A form that creates the components from fields metadata
export const Form = <T extends object>(props: FormProps<T>) => {
  const { data, fields, gridProps } = props;

  const [errors, setErrors] = useState<string[]>([]);
  const form = useForm();

  // Focus on first field (only on desktop)
  const ref = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const focusFirstField = useCallback(() => {
    // The ref has value only after first render, therefore delay to focus
    setTimeout(() => {
      // Focus only on desktop. Mobile has a bad usability due to keyboard opening and closing too much during re-rendering.
      if (!isMobile) ref.current?.focus();
    }, 0);
  }, [isMobile]);
  useEffectOnce(focusFirstField);

  // Validate all fields
  const validateAllFields = useCallback(() => {
    if (!form.validating) return;

    const newErrors: string[] = [];
    // eslint-disable-next-line array-callback-return
    fields.map((field, index) => {
      const value = data[field.key];
      try {
        field.validation?.validateSync(value);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        newErrors[index] = error.message;
      }
    });
    setErrors(newErrors);

    const hasError = newErrors.some((error) => !!error);
    if (!hasError) {
      form.submit(false);
    } else {
      form.cancelSubmit();
    }
  }, [data, fields, form]);
  useEffectOnce(validateAllFields);

  // Validate a data field
  const validateValue = (
    value: string | null,
    index: number,
    validation: AnySchema,
  ) => {
    try {
      validation.validateSync(value);
      newErrors[index] = '';
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      newErrors[index] = error.message;
    }
  };

  const newErrors = [...errors];

  return (
    <Grid
      component="form"
      container
      spacing={{ xs: 0, sm: 0.5 }}
      {...gridProps}
    >
      {fields.map((field, index) => {
        field = { ...field }; // copy field param to fix state sync bugs
        const { onChange, validation } = field;
        if (onChange && validation) {
          // Validate before onChange
          field.onChange = (value: string | null) => {
            validateValue(value, index, validation);
            setErrors(newErrors);
            onChange(value);
          };

          if (errors[index]) {
            field.uiProps = {
              ...field.uiProps,
              error: !!errors[index],
              helperText: errors[index],
            };
          }

          // Fix the error message when a data field was added from a relation
          if (field.formType === 'select-search-async') {
            const value = data[field.key];
            if (value && errors[index]) {
              validateValue(String(value), index, validation);
              setErrors(newErrors);
            }
          }
        }

        const fieldProps = {
          ref: index === 0 ? ref : null,
          key: index,
          data,
        };

        // const palette = {
        //   green: '#00ab55', // green
        //   blue: '#188fff', // blue
        //   lime: '#54d62c', // lime
        //   orange: '#ffc107', // orange
        //   red: '#ff4842', // red
        //   darkblue: '#04297a', // dark blue
        //   darkred: '#7a0c2f', // dark red
        // };

        switch (field.formType) {
          case 'text':
            return <Text {...fieldProps} field={field} />;
          case 'number':
            return <Number {...fieldProps} field={field} />;
          case 'select':
            return <Select {...fieldProps} field={field} />;
          case 'select-search':
            return <SelectSearch {...fieldProps} field={field} />;
          case 'select-search-multiple':
            return <SelectSearchMultiple {...fieldProps} field={field} />;
          case 'select-search-async':
            return <SelectSearchAsync {...fieldProps} field={field} />;
          case 'date':
            return <Date {...fieldProps} field={field} />;
          case 'time':
            return <Time {...fieldProps} field={field} />;
          case 'date-time':
            return <DateTime {...fieldProps} field={field} />;
          case 'switch':
            return <Switch {...fieldProps} field={field} />;
          case 'color':
            return <Color {...fieldProps} field={field} />;
          case 'custom':
            // TODO: Add Custom
            return <div></div>;
          default:
            return <div></div>;
        }
      })}
    </Grid>
  );
};

// export default memo(Form) as typeof Form;
export default Form;
