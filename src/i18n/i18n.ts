import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import logini18n from "./es_AR/login/login.json";
import navi18n from "./es_AR/nav/nav.json";
import componenti18n from "./es_AR/component/component.json";
import dashboardi18n from "./es_AR/dashboard/dashboard.json";
import pickeri18n from "./es_AR/pickers/picker.json";
import pickerFilteri18n from "./es_AR/pickers/filterPickers/filterPickers.json";
import pickerTablei18n from "./es_AR/pickers/tablePickers/tablePickers.json";
import pickerDetaili18n from "./es_AR/pickers/detailPicker/detailPicker.json";
import transactions from "./es_AR/transactions/transactions.json";
import dashboardi18nMX from "./es_Mx/dashboard/dashboard.json";
import filterTransaction from "./es_AR/transactions/filterTransaction/filterTransaction.json";
import transactionTable from "./es_AR/transactions/tableTansaction/tableTransaction.json";
import detailTransaction from "./es_AR/transactions/detailTransaction/detailTransaction.json";
import global from "./es_AR/global.json";
import email from "./es_AR/login/email/email.json";
import restorePassword from "./es_AR/login/restorePassword/restorePassword.json";

//{type:what_is}.{where_is}.{name}
//error.input.name (error== rojo)
//message==dinamico
//tooltip==tooltip
//info==coloreado
//label,title,subtitle==duro

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {},
    // lng: process.env.REACT_APP_LANGUAGE, // if you're using a language detector, do not define the lng option
    fallbackLng: process.env.REACT_APP_LANGUAGE,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
i18n.addResourceBundle("es_AR", "login", logini18n);
i18n.addResourceBundle("es_AR", "dashboard", dashboardi18n);
i18n.addResourceBundle("es_AR", "pickers", pickeri18n);
i18n.addResourceBundle("es_AR", "filterPickers", pickerFilteri18n);
i18n.addResourceBundle("es_AR", "tablePickers", pickerTablei18n);
i18n.addResourceBundle("es_AR", "detailPicker", pickerDetaili18n);
i18n.addResourceBundle("es_AR", "transactions", transactions);
i18n.addResourceBundle("es_AR", "filterTransaction", filterTransaction);
i18n.addResourceBundle("es_AR", "nav", navi18n);
i18n.addResourceBundle("es_AR", "component", componenti18n);
i18n.addResourceBundle("es_AR", "transactionTable", transactionTable);
i18n.addResourceBundle("es_AR", "detailTransaction", detailTransaction);
i18n.addResourceBundle("es_AR", "global", global);
i18n.addResourceBundle("es_AR", "emailRestore", email);
i18n.addResourceBundle("es_AR", "restorePassword", restorePassword);

i18n.addResourceBundle("es_MX", "dashboard", dashboardi18nMX);
