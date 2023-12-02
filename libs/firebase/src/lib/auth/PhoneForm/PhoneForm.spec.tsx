import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { t } from 'i18next';
import { PhoneForm } from './PhoneForm';

describe('PhoneForm', async () => {
  // await i18nInit();

  it('should render the phone number input and send code button', () => {
    render(<PhoneForm />, { wrapper: MemoryRouter });

    const phoneNumberInput = screen.getByLabelText(
      t('firebase:label.phone-number'),
    );
    const sendCodeButton = screen.getByRole('button', {
      name: t('firebase:button.send-code'),
    });

    expect(phoneNumberInput).toBeInTheDocument();
    expect(sendCodeButton).toBeInTheDocument();
  });

  it('should disable the send code button when the phone number is invalid', () => {
    render(<PhoneForm />, { wrapper: MemoryRouter });

    const phoneNumberInput = screen.getByLabelText(
      t('firebase:label.phone-number'),
    );
    const sendCodeButton = screen.getByRole('button', {
      name: t('firebase:button.send-code'),
    });

    fireEvent.change(phoneNumberInput, { target: { value: '123' } });

    expect(sendCodeButton).toBeDisabled();
  });

  // it('should enable the send code button when the phone number is valid', () => {
  //   render(
  //       <PhoneForm />,
  //     { wrapper: MemoryRouter },
  //   );

  //   const phoneNumberInput = screen.getByLabelText(t('"label.phone-number"));
  //   const sendCodeButton = screen.getByRole('button', {
  //     name: 'Enviar código',
  //   });

  //   fireEvent.change(phoneNumberInput, {
  //     target: { value: '+55 (21) 99999-9999' },
  //   });

  //   expect(sendCodeButton).toBeEnabled();
  // });

  // it('should show the verification code input and verify button after sending code', async () => {
  //   render(
  //       <PhoneForm />,
  //     { wrapper: MemoryRouter },
  //   );

  //   const phoneNumberInput = screen.getByLabelText(t('"label.phone-number"));
  //   const sendCodeButton = screen.getByRole('button', {
  //     name: 'Enviar código',
  //   });

  //   fireEvent.change(phoneNumberInput, {
  //     target: { value: '+55 (21) 99999-9999' },
  //   });
  //   fireEvent.click(sendCodeButton);

  //   await waitFor(() => {
  //     const verificationCodeInput = screen.getByLabelText(
  //       'Código de verificação',
  //     );
  //     const verifyButton = screen.getByRole('button', {
  //       name: 'Verificar código',
  //     });

  //     expect(verificationCodeInput).toBeInTheDocument();
  //     expect(verifyButton).toBeInTheDocument();
  //   });
  // });

  // it('should show the user name input and enter button after verifying the code', async () => {
  //   render(
  //       <PhoneForm />,
  //     { wrapper: MemoryRouter },
  //   );

  //   const phoneNumberInput = screen.getByLabelText(t('"label.phone-number"));
  //   const sendCodeButton = screen.getByRole('button', {
  //     name: 'Enviar código',
  //   });

  //   fireEvent.change(phoneNumberInput, {
  //     target: { value: '+55 (21) 99999-9999' },
  //   });
  //   fireEvent.click(sendCodeButton);

  //   const verificationCodeInput = await screen.findByLabelText(
  //     'Código de verificação',
  //   );
  //   const verifyButton = screen.getByRole('button', {
  //     name: 'Verificar código',
  //   });

  //   // TODO: What verification code should I use?
  //   fireEvent.change(verificationCodeInput, { target: { value: '123456' } });
  //   fireEvent.click(verifyButton);

  //   await waitFor(() => {
  //     const userNameInput = screen.getByLabelText('Nome de usuário');
  //     const enterButton = screen.getByRole('button', { name: 'Entrar' });

  //     expect(userNameInput).toBeInTheDocument();
  //     expect(enterButton).toBeInTheDocument();
  //   });
  // });

  // it('should sign in user after entering the user name', async () => {
  //   // TODO: implement this test
  //   return false;
  // });
});
