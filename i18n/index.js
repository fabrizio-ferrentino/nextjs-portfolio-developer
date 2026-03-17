// i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Traduzioni
import enTranslation from '../locales/en/translation.json';
import itTranslation from '../locales/it/translation.json';

const resources = {
  en: { translation: enTranslation },
  it: { translation: itTranslation },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      supportedLngs: ['en', 'it'],
      interpolation: { escapeValue: false },
      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
      },
    });
}

export default i18n;
