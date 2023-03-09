import { createI18n } from 'vue-i18n';

function loadLocaleMessages () {
  const locales = require.context(
    "./locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages: any = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

const i18n = createI18n({
  messages: loadLocaleMessages(),
  fallbackLocale: "en",
  locale: localStorage.getItem("wow_locale") || "en"
})

export default i18n;

export const languagesList = [
  {
    code: "en",
    name: "English"
  },
  {
    code: "ru",
    name: "Русский"
  },
  {
    code: "cs",
    name: "čeština"
  },
  {
    code: "de",
    name: "Deutsche"
  },
  {
    code: "es",
    name: "Español"
  },
  {
    code: "es_mx",
    name: "Español Mexicano"
  },
  {
    code: "fr",
    name: "Français"
  },
  {
    code: "it",
    name: "Italiana"
  },
  {
    code: "ja",
    name: "日本"
  },
  {
    code: "ko",
    name: "한국인"
  },
  {
    code: "nl",
    name: "Nederlands"
  },
  {
    code: "pl",
    name: "Polska"
  },
  {
    code: "pt_br",
    name: "Português"
  },
  {
    code: "th",
    name: "ภาษาไทย"
  },
  {
    code: "tr",
    name: "Türkçe"
  },
  {
    code: "uk",
    name: "Українська"
  },
  {
    code: "zh_cn",
    name: "中國中國"
  },
  {
    code: "zh_sg",
    name: "新加坡華人"
  },
  {
    code: "zh_tw",
    name: "中國台灣"
  }
];
