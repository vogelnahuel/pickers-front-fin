import React from "react";
import "./Login.scss";
import pickersLogo from "./../../assets/login/PickersLogo.svg";
import canguro from "./../../assets/login/Canguro.svg";
import { Link } from "react-router-dom";
import { LoginType, LoginTypeProps } from "./types";
import { Field, withTypes } from "react-final-form";
import { Input } from "component/inputs/Input";
import useValidationSchema from "hooks/useValidationSchema";
import NotificationModal from "component/modal/NotificationModal";
import i18next from "i18next";

const { Form } = withTypes<LoginType>();

const Login: React.FC<LoginTypeProps> = ({
  postLogin,
  validationSchema,
  isFetching,
}): JSX.Element => {
  return (
    <div className="background-login">
      <img src={pickersLogo} className="pickersLogo_login" alt="" />
      <Form
        onSubmit={(values: LoginType) => postLogin(values)}
        validate={useValidationSchema(validationSchema)}
      >
        {({ handleSubmit }) => (
          <form className="login-form" onSubmit={handleSubmit}>
            <Field
              type="text"
              name="email"
              id="usuario"
              label={i18next.t("login:label.input.user")}
              animated
              className="Admin-Pickers-input"
              component={Input}
              maxLength={50}
            />

            <Field
              id="password"
              type="password"
              name="password"
              label={i18next.t("login:label.input.password")}
              animated
              className="Admin-Pickers-input"
              component={Input}
              maxLength={20}
            />

            <div className="container-animation">
              <button
                className={
                  isFetching ? "login-button shineBorder-login" : "login-button"
                }
                disabled={isFetching}
                type="submit"
                name="button"
              >
                <p className="login-init ">
                  {i18next.t("login:label.button.login")}
                </p>
              </button>
            </div>
          </form>
        )}
      </Form>
      <div className="container-login-a">
        <Link className="login-a" to={"/restore"}>
          {i18next.t("login:label.link.forgotPassword")}
        </Link>
      </div>
      <img className="login-img-footer" src={canguro} alt="" />
      <NotificationModal />
    </div>
  );
};
export default Login;
