import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import viPkg from "./Locales/vi.json"
import cnPkg from "./Locales/cn.json"

const resources = {
  vi: {
    translation: viPkg
  },
  cn: {
    translation: cnPkg
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
    prefix: "${{",
    suffix: "}}"
  },
  react: {
    useSuspense: true
  }
});

export default i18n;
