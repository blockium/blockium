import i18next, { t } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export { t };

let isInitialized = false;
export const i18nInit = () => {
  // The following check doesn't work due to async initialization
  // if (i18next.isInitialized) return;
  if (isInitialized) return;
  isInitialized = true;

  return i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      // debug: true,
      supportedLngs: ['en', 'pt-BR'],
      fallbackLng: 'en',
      load: 'currentOnly',
    });
};

export const currentLanguage = () => {
  return i18next.language;
};

export const addResourceBundle = async (
  lng: string,
  ns: string,
  resources: unknown,
) => {
  await i18nInit();
  i18next.addResourceBundle(lng, ns, resources);
};

export const addResourceBundles = async (
  bundles: { lng: string; ns: string; resources: unknown }[],
) => {
  await i18nInit();
  bundles.forEach((bundle) => {
    i18next.addResourceBundle(bundle.lng, bundle.ns, bundle.resources);
  });
};

export default i18nInit;
