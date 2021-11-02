import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import logini18n from "./Login/login.json"
import dashboardi18n from "./Dashboard/dashboard.json"
import pickeri18n from "./Pickers/picker.json"
import transactions from "./Transactions/transactions.json";


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: { },
    lng: "es", // if you're using a language detector, do not define the lng option
    // fallbackLng: "es",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });
  i18n.addResourceBundle("es","login",logini18n)
   i18n.addResourceBundle("es","dashboard",dashboardi18n)
   i18n.addResourceBundle("es","pickers",pickeri18n)
   i18n.addResourceBundle("es","transaction",transactions)