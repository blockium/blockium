import { replace } from 'lodash';
import numeral from 'numeral';
import 'numeral/locales/pt-br';
numeral.locale('pt-br');

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
  return replace(numeral(number).format('0.00a'), ',00', '');
}

export function fData(number: number | string) {
  return numeral(number).format('0.0 b');
}
