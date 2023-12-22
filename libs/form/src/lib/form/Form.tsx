/* eslint-disable no-template-curly-in-string */
import { useCallback, useEffect, useRef, useState } from 'react';
import { useEffectOnce } from 'react-use';
import { AnySchema } from 'yup';

import { Grid } from '@mui/material';

import {
  ColorField,
  DateField,
  DateTimeField,
  NumberField,
  SelectField,
  SelectSearchAsyncField,
  SelectSearchField,
  SelectSearchMultipleField,
  SwitchField,
  TextField,
  TimeField,
} from '../field';

import { IForm } from '../form/useForm';
import { FormField } from '../field/FormField';

import { useIsMobile } from '../hooks/useIsMobile';
import { useFormTranslation } from './useFormTranslation';

// Redeclare forwardRef
declare module 'react' {
  function forwardRef<T, P = object>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

// Props for a form that creates the components from fields metadata
type FormProps<T> = {
  data: T;
  form: IForm;
  fields: FormField<T>[];
  gridProps?: object;
};

// A form that creates the components from fields metadata
export const Form = <T extends object>(props: FormProps<T>) => {
  useFormTranslation();

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

  // Show errors found during form validation
  useEffect(() => {
    setErrors(form.errors);
  }, [form.errors]);

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

  // Used to register new errors during typing
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
