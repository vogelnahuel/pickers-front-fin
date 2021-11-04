import { useTranslation } from "react-i18next";

export const Translation = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {t} = useTranslation();
    return t("pepe")
}