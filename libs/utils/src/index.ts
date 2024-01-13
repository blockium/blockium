import { addResourceBundles } from '@blockium/i18n';
import en from './lib/locales/en/translation.json';
import pt_BR from './lib/locales/pt-BR/translation.json';

addResourceBundles([
  { lng: 'en', ns: 'utils', resources: en },
  { lng: 'pt-BR', ns: 'utils', resources: pt_BR },
]);

export * from './lib/numberUtils';
export * from './lib/objectUtils';
export * from './lib/phoneUtils';
export * from './lib/sortUtils';
export * from './lib/stringUtils';
export * from './lib/timeUtils';
