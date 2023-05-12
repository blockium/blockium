// PhoneInput.tsx
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { TextFieldProps } from '@mui/material';

type PhoneInputProps = TextFieldProps;

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  function PhoneInput(props, ref) {
    const { ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+00 (00) 00000-0000"
        unmask={false}
        inputRef={ref}
      />
    );
  }
);

export default PhoneInput;
