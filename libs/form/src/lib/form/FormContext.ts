import { createContext, useContext } from 'react';

export const useForm = () => useContext(FormContext);

export interface FormContextProps {
  validating: boolean;
  submit: (validate?: boolean) => void;
  cancelSubmit: () => void;
}

const FormContext = createContext<FormContextProps>({
  validating: false,
  submit: (validate = true) => void 0,
  cancelSubmit: () => void 0,
});

export default FormContext;
