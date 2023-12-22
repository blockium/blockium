import { useState } from 'react';

export interface IForm {
  isValidating: boolean;
  submit: (validate?: boolean) => void;
  cancelSubmit: () => void;
}

export const useForm: (onSubmit: () => void) => IForm = (onSubmit) => {
  const [isValidating, setIsValidating] = useState(false);

  const submit = (validate = true) => {
    if (validate) {
      console.log('validating = true');
      setIsValidating(true);
    } else {
      console.log('validating = false');
      setIsValidating(false);
      onSubmit();
    }
  };

  const cancelSubmit = () => {
    setIsValidating(false);
  };

  return { isValidating, submit, cancelSubmit };
};
