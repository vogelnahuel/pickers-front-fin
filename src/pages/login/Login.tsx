import React from "react";
import "./Login.scss";
import pickersLogo from "./../../assets/login/PickersLogo.svg";
import canguro from "./../../assets/login/Canguro.svg";
import { Link } from "react-router-dom";
import {LoginInterface} from "./types";
import { Form, Field } from "react-final-form";
import { Input } from "component/inputs/Input";
import useValidationSchema from "hooks/useValidationSchema";
import NotificationModal from "component/modal/NotificationModal";

const Login: React.FC<LoginInterface> = ({
  postLogin,
  validationSchema,
  isFetching,
}): JSX.Element => {
  
  return (
    <div className="background-login">
      <img src={pickersLogo} className="pickersLogo_login" alt="" />
      <Form
        onSubmit={postLogin}
        validate={useValidationSchema(validationSchema)}
      >
        {({ handleSubmit}) => (

          <form className="login-form" onSubmit={handleSubmit}>
           
            <Field
              type="text"
              name="email"
              id="usuario"
              label="Usuario"
              animated
              className="Admin-Pickers-input"
              component={Input}
              maxLength={50}
            />

            <Field
              id="password"
              type="password"
              name="password"
              label="Password"
              animated
              className="Admin-Pickers-input"
              component={Input}
            />
           
            <div className="container-animation">
              <button
                className={isFetching ? "login-button shineBorder-login" : "login-button"}
                disabled={isFetching}
                type="submit"
                name="button"
              >
                <p className="login-init ">Iniciar sesión</p>
              </button>
            </div>
          </form>
        )}
      </Form>
      <div className="container-login-a">
        <Link className="login-a" to={"/restore"}>
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      <img className="login-img-footer" src={canguro} alt="" />
      <NotificationModal />
    </div>
  );
};
export default Login;
