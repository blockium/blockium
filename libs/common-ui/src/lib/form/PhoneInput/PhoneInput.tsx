// PhoneInput.tsx
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
interface PhoneInputProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  function PhoneInput(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        // mask="+00 (00) 00000-0000"
        mask={[
          { mask: '+0 (000) 000-0000' },
          { mask: '+00 (00) 0000-0000' },
          { mask: '+00 (00) 00000-0000' },
          { mask: '+00 (000) 00000-0000' },
        ]}
        unmask
        overwrite
        inputRef={ref}
        onAccept={(value: string) =>
          onChange({ target: { name: props.name, value } })
        }
        onChange={onChange}
      />
    );
  }
);

export default PhoneInput;
