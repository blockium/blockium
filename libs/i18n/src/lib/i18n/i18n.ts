import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

export const i18nInit = () => {
  if (i18next.isInitialized) return;

  return i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      supportedLngs: ['en', 'pt-BR'],
      // fallbackLng: 'en',
    });
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
