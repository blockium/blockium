import numeral from 'numeral';

// I18n
import i18next from 'i18next';
import 'numeral/locales/pt-br';
import 'numeral/locales/pt-br';
const locales = {
  'pt-BR': 'pt-br', // This string is used by numeral.locale
  en: 'en', // Default
  // Add new locales here, using the i18next.language as the key
};
type LocaleKey = keyof typeof locales;

let language: string;
const locale = () => {
  if (language === i18next.language) return;
  numeral.locale(locales[i18next.language as LocaleKey]);
};

numeral.defaultFormat('0,0.[00]');

// ----------------------------------------------------------------------

export function fCurrency(number: number | string) {
  locale();
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function currencySymbol() {
  const value = fCurrency(0);
  return value.substring(0, value.length - 1);
}

export function fPercent(number: number | string) {
  locale();
  return Number.isNaN(number)
    ? numeral(0).format('0.0%')
    : numeral(Number(number) / 100).format('0.0%');
}

export function fPercentShort(number: number | string) {
  locale();
  return Number.isNaN(number)
    ? numeral(0).format('0%')
    : numeral(Number(number) / 100).format('0%');
}

export function fNumber(number: number | string) {
  locale();
  return numeral(number).format();
}

export function fDecimal(number: number | string, decimals = 2) {
  locale();
  let format = '0,0.';
  for (let i = 0; i < decimals; i++) format = format.concat('0');
  return numeral(number).format(format);
}

export function fInteger(number: number | string) {
  locale();
  return numeral(number).format('0,0');
}

export function fShortenNumber(number: number | string) {
  locale();
  const formattedNumber = numeral(number).format('0.00a');
  return formattedNumber.replace(/,00/g, '');
}

export function fData(number: number | string) {
  locale();
  return numeral(number).format('0.0 b');
}

export function toNumber(number: string | number) {
  return numeral(number).value() as number;
}
