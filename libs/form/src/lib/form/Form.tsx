/* eslint-disable no-template-curly-in-string */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { setLocale, AnySchema } from 'yup';

import { Grid } from '@mui/material';

import { ITextField, TextField } from '../field/TextField';
import { ISelectField, SelectField } from '../field/SelectField';
import { SelectSearchField } from '../field/SelectSearchField';
import { SelectSearchMultipleField } from '../field/SelectSearchMultipleField';
import {
  ISelectSearchAsyncField,
  SelectSearchAsyncField,
} from '../field/SelectSearchAsyncField';
import { INumberField, NumberField } from '../field/NumberField';
import { IDateTimeField, DateTimeField } from '../field/DateTimeField';
import { DateField } from '../field/DateField';
import { TimeField } from '../field/TimeField';
import { ISwitchField, SwitchField } from '../field/SwitchField';
import { IColorField, ColorField } from '../field/ColorField';
import { ICustomField } from '../field/CustomField';

import { IForm } from '../form/useForm';
import { useIsMobile } from '../hooks/useIsMobile';

// Redeclare forwardRef
declare module 'react' {
  function forwardRef<T, P = object>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

// TODO: I18N
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

// Metadata to define a form data field
export type FormField<T> =
  | ITextField<T>
  | ISelectField<T>
  | ISelectSearchAsyncField<T>
  | INumberField<T>
  | IDateTimeField<T>
  | ISwitchField<T>
  | IColorField<T>
  | ICustomField<T>;

// Props for a form that creates the components from fields metadata
type FormProps<T> = {
  data: T;
  form: IForm;
  fields: FormField<T>[];
  gridProps?: object;
};

// A form that creates the components from fields metadata
export const Form = <T extends object>(props: FormProps<T>) => {
  console.log('Form');

  const { data, form, fields, gridProps } = props;

  const [errors, setErrors] = useState<string[]>([]);

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
    console.log('validateAllFields called');
    if (!form.isValidating) return;

    console.log('validateAllFields running');

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
  useEffect(validateAllFields, [validateAllFields]);

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
            return <TextField {...fieldProps} field={field} />;
          case 'number':
            return <NumberField {...fieldProps} field={field} />;
          case 'select':
            return <SelectField {...fieldProps} field={field} />;
          case 'select-search':
            return <SelectSearchField {...fieldProps} field={field} />;
          case 'select-search-multiple':
            return <SelectSearchMultipleField {...fieldProps} field={field} />;
          case 'select-search-async':
            return <SelectSearchAsyncField {...fieldProps} field={field} />;
          case 'date':
            return <DateField {...fieldProps} field={field} />;
          case 'time':
            return <TimeField {...fieldProps} field={field} />;
          case 'date-time':
            return <DateTimeField {...fieldProps} field={field} />;
          case 'switch':
            return <SwitchField {...fieldProps} field={field} />;
          case 'color':
            return <ColorField {...fieldProps} field={field} />;
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
