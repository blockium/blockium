import { addResourceBundles } from '@blockium/i18n';
import en from './lib/locales/en/translation.json';
import pt_BR from './lib/locales/pt-BR/translation.json';

addResourceBundles([
  { lng: 'en', ns: 'layout', resources: en },
  { lng: 'pt-BR', ns: 'layout', resources: pt_BR },
]);

export * from './lib/layout/DashboardLayout';
export * from './lib/layout/DashboardNavbar';
export * from './lib/popover/MenuPopover';
export * from './lib/hooks';
