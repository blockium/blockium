import { addResourceBundles } from '@blockium/i18n';
import en from './lib/locales/en/translation.json';
import pt_BR from './lib/locales/pt-BR/translation.json';

addResourceBundles([
  { lng: 'en', ns: 'firebase', resources: en },
  { lng: 'pt-BR', ns: 'firebase', resources: pt_BR },
]);

export * from './lib/auth';
export * from './lib/firebase';
export * from './lib/router';
export * from './lib/theme';
