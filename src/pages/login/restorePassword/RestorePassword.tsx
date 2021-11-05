import React from "react";
import "./restorePassword.scss";
import pickersLogo from "../../../assets/login/PickersLogo.svg";
import canguro from "../../../assets/login/Canguro.svg";
import { Form, Field } from "react-final-form";
import { Input } from "component/inputs/Input";
import useValidationSchema from "hooks/useValidationSchema";
import NotificationModal from "component/modal/NotificationModal";
import { RestoreEmailPasswordType, RestorePasswordType } from "./types";
import voidCheck from "../../../assets/login/void-check.svg";
import Okey from "../../../assets/login/Okey.svg";
import Informacion from "../../../assets/login/Informacion.svg";
import { VALIDATION_REGEX } from "utils/constants";
import { useTranslation } from "react-i18next";

import i18next from "i18next"

export const RestorePassword = ({
  postLoginRestore,
  validationSchema,
  isFetching,
  email,
  verificationCode,
}: RestoreEmailPasswordType): JSX.Element => {
  
  const [t,i18n] = useTranslation()

  return (
    <div className="background-login">
      <img src={pickersLogo} className="pickersLogo_login" alt="" />
      <Form
        onSubmit={(values: RestorePasswordType) =>
          postLoginRestore({
            email: email,
            verificationCode: verificationCode,
            password: values.password,
          })
        }
        validate={useValidationSchema(validationSchema)}
      >
        {({ handleSubmit, values }) => (
          <form className="login-form" onSubmit={handleSubmit}>
            <Field
              type="password"
              name="password"
              id="password"
              label={t("restorePasword:label.input.newPassword")}
              animated
              className="Admin-Pickers-input Admin-Pickers-input-restore"
              component={Input}
              maxLength={20}
            />
            <Field
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              label={t("restorePasword:label.input.confirmNewPassword")}
              animated
              className="Admin-Pickers-input Admin-Pickers-input-restore"
              component={Input}
              maxLength={20}
            />

            <ul className={"ul"} id="ul-login">
              {t("restorePasword:label.conditions.passwordMustHave")}
              <li className="display-flex">
                {!values.password ? (
                  <img src={voidCheck} alt="ok" />
                ) : values.password.length >= 8 ? (
                  <img src={Okey} alt="ok" />
                ) : (
                  <img src={Informacion} alt="ok" />
                )}

                <p
                  id="caracteres"
                  className={
                    values?.password?.length >= 8 ||
                    values?.password === undefined
                      ? "restore-p"
                      : "restore-p errorLi"
                  }
                >
                  {t("restorePasword:label.conditions.passwordMinLength")}
                </p>
              </li>
              <li className="display-flex">
                {!values.password ? (
                  <img src={voidCheck} alt="ok" />
                ) : values.password.match(VALIDATION_REGEX.regMayMin) ? (
                  <img src={Okey} alt="ok" />
                ) : (
                  <img src={Informacion} alt="ok" />
                )}
                <p
                  id="mayusculas"
                  className={
                    values?.password?.match(VALIDATION_REGEX.regMayMin) ||
                    values?.password === undefined
                      ? "restore-p"
                      : "restore-p errorLi"
                  }
                >
                  {t("restorePasword:label.conditions.uppercaseandLowerCase")}
                </p>
              </li>
              <li className="display-flex">
                {!values.password ? (
                  <img src={voidCheck} alt="ok" />
                ) : values.password.match(VALIDATION_REGEX.regLetNum) ? (
                  <img src={Okey} alt="ok" />
                ) : (
                  <img src={Informacion} alt="ok" />
                )}
                <p
                  id="numeros"
                  className={
                    values?.password?.match(VALIDATION_REGEX.regLetNum) ||
                    values?.password === undefined
                      ? "restore-p"
                      : "restore-p errorLi"
                  }
                >
                  {t("restorePasword:label.conditions.numbersAndLeters")}
                </p>
              </li>
            </ul>
            <button
              className={"login-button"}
              disabled={isFetching}
              type="submit"
              name="button"
            >
              <p className="login-init ">{t("restorePasword:label.button.save")}</p>
            </button>
          </form>
        )}
      </Form>
      <img className="login-img-footer" src={canguro} alt="" />
      <NotificationModal />
    </div>
  );
};
export default RestorePassword;
