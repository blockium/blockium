import { addResourceBundles } from '@blockium/i18n';
import en from './lib/locales/en/translation.json';
import pt_BR from './lib/locales/pt-BR/translation.json';

addResourceBundles([
  { lng: 'en', ns: 'table', resources: en },
  { lng: 'pt-BR', ns: 'table', resources: pt_BR },
]);

export * from './lib/table';