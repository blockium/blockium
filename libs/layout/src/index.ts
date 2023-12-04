import { addResourceBundles } from '@blockium/i18n';
import en from './lib/locales/en/translation.json';
import pt_BR from './lib/locales/pt-BR/translation.json';

addResourceBundles([
  { lng: 'en', ns: 'layout', resources: en },
  { lng: 'pt-BR', ns: 'layout', resources: pt_BR },
]);

export * from './lib/DashboardLayout';
export * from './lib/DashboardNavbar';
export * from './lib/MenuPopover';
