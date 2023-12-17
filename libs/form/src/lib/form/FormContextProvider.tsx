import { useState } from 'react';

import FormContext from './FormContext';

type FormContextProviderProps = {
  onSubmit: () => void;
  children: React.ReactNode;
};

export function FormContextProvider({
  onSubmit,
  children,
}: FormContextProviderProps) {
  const [validating, setValidating] = useState<boolean>(false);

  const submit = (validate = true) => {
    if (validate) {
      setValidating(true);
    } else {
      setValidating(false);
      // Timeout to fix old state infinite loop
      setTimeout(() => {
        onSubmit();
      }, 0);
    }
  };

  const cancelSubmit = () => {
    setValidating(false);
  };

  return (
    <FormContext.Provider value={{ validating, submit, cancelSubmit }}>
      {children}
    </FormContext.Provider>
  );
}

export default FormContextProvider;
