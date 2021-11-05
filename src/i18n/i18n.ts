import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import logini18n from "./es_AR/Login/login.json";
import dashboardi18n from "./es_AR/Dashboard/dashboard.json";
import pickeri18n from "./es_AR/Pickers/picker.json";
import pickerFilteri18n from "./es_AR/Pickers/filterPickers/filterPickers.json";
import pickerTablei18n from "./es_AR/Pickers/tablePIckers/tablePickers.json";
import pickerDetaili18n from "./es_AR/Pickers/detailPicker/detailPicker.json";
import transactions from "./es_AR/Transactions/transactions.json";
import dashboardi18nMX from "./es_Mx/dashboard/dashboard.json";
import filterTransaction from "./es_AR/Transactions/filterTransaction/filterTransaction.json";
import transactionTable from "./es_AR/Transactions/tableTansaction/tableTransaction.json";
import detailTransaction from "./es_AR/Transactions/detailTransaction/detailTransaction.json";
import global from "./es_AR/global.json";
import email from "./es_AR/Login/email/email.json";
import restorePassword from "./es_AR/Login/restorePassword/restorePassword.json";

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
i18n.addResourceBundle("es_MX", "dashboard", dashboardi18nMX);

i18n.addResourceBundle("es_AR", "transactionTable", transactionTable);
i18n.addResourceBundle("es_AR", "detailTransaction", detailTransaction);
i18n.addResourceBundle("es_AR", "global", global);
i18n.addResourceBundle("es_AR", "emailRestore", email);
i18n.addResourceBundle("es_AR", "restorePassword", restorePassword);
