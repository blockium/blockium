import { useCallback, useState } from 'react';
import { FormField } from '../field';

export interface IForm {
  submit: (validate?: boolean) => void;
  errors: string[];
}

type FormParams<T> = {
  data: T;
  fields: FormField<T>[];
  onSubmit: () => void;
};

export const useForm: <T>(params: FormParams<T>) => IForm = (params) => {
  const { data, fields, onSubmit } = params;
  const [errors, setErrors] = useState<string[]>([]);

  const validateAllFields = useCallback(() => {
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

    const hasSomeError = newErrors.some((error) => !!error);
    return !hasSomeError;
  }, [data, fields]);

  const submit = () => {
    validateAllFields() && onSubmit();
  };

  return { submit, errors };
};
