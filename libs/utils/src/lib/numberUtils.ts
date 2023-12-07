import numeral from 'numeral';
import i18next from 'i18next';
import 'numeral/locales/pt-br';

// Add to the end of queue in order to have i18next language set
setTimeout(() => {
  if (i18next.language === 'pt-BR') {
    numeral.locale('pt-br');
  } // defaults to en
}, 0);

// ----------------------------------------------------------------------

export function fCurrency(number: number | string) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fPercent(number: number | string) {
  return Number.isNaN(number)
    ? numeral(0).format('0.0%')
    : numeral(Number(number) / 100).format('0.0%');
}

export function fPercentShort(number: number | string) {
  return Number.isNaN(number)
    ? numeral(0).format('0%')
    : numeral(Number(number) / 100).format('0%');
}

export function fNumber(number: number | string) {
  return numeral(number).format();
}

export function fDecimal(number: number | string) {
  return numeral(number).format('0,0.00');
}

export function fInteger(number: number | string) {
  return numeral(number).format('0,0');
}

export function fShortenNumber(number: number | string) {
  const formattedNumber = numeral(number).format('0.00a');
  return formattedNumber.replace(/,00/g, '');
}

export function fData(number: number | string) {
  return numeral(number).format('0.0 b');
}
