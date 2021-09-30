import React from 'react'
import "./Email.scss";
import pickersLogo from "../../../assets/login/PickersLogo.svg";
import canguro from "../../../assets/login/Canguro.svg";
import { Form, Field } from "react-final-form";
import { Input } from "component/inputs/Input";
import useValidationSchema from "hooks/useValidationSchema";
import NotificationModal from "component/modal/NotificationModal";
import { IEmailRestore } from './types';


export const EmailRestore = ({postLoginEmail,validationSchema,isFetching}:IEmailRestore):JSX.Element => {
    return (
        <div className="background-login">
      <img src={pickersLogo} className="pickersLogo_login" alt="" />
      <Form
        onSubmit={postLoginEmail}
        validate={useValidationSchema(validationSchema)}
      >
        {({ handleSubmit}) => (

          <form className="login-form" onSubmit={handleSubmit}>
           
            <Field
              type="text"
              name="email"
              id="email"
              label="Email"
              animated
              className="Admin-Pickers-input"
              component={Input}
              maxLength={50}
            />

              <button
                className={"login-button email-button"}
                disabled={isFetching}
                type="submit"
                name="button"
              >
                <p className="login-init ">Enviar correo</p>
              </button>

          </form>
        )}
      </Form>
      <img className="login-img-footer" src={canguro} alt="" />
      <NotificationModal />
    </div>
    )
}
export default EmailRestore;
