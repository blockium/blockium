export function formatPhoneNumber(phoneNumber: string): string {
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength === 14) {
    return (
      `+${phoneNumber.slice(0, 2)} ` +
      `(${phoneNumber.slice(2, 5)}) ` +
      `${phoneNumber.slice(5, 10)}-${phoneNumber.slice(10)}`
    );
  } else if (phoneNumberLength === 13) {
    return (
      `+${phoneNumber.slice(0, 2)} ` +
      `(${phoneNumber.slice(2, 4)}) ` +
      `${phoneNumber.slice(4, 9)}-${phoneNumber.slice(9)}`
    );
  } else if (phoneNumberLength === 12) {
    return (
      `+${phoneNumber.slice(0, 2)} ` +
      `(${phoneNumber.slice(2, 4)}) ` +
      `${phoneNumber.slice(4, 8)}-${phoneNumber.slice(8)}`
    );
  } else if (phoneNumberLength === 11) {
    return (
      `+${phoneNumber.slice(0, 1)} ` +
      `(${phoneNumber.slice(1, 4)}) ` +
      `${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`
    );
  } else {
    // Retornar a string original se não corresponder a nenhum formato conhecido
    return phoneNumber;
  }
}
