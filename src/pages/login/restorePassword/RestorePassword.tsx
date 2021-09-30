import React from 'react'
import "./restorePassword.scss";
import pickersLogo from "../../../assets/login/PickersLogo.svg";
import canguro from "../../../assets/login/Canguro.svg";
import { Form, Field } from "react-final-form";
import { Input } from "component/inputs/Input";
import useValidationSchema from "hooks/useValidationSchema";
import NotificationModal from "component/modal/NotificationModal";
import { IRestorePassword, RestorePasswordType } from './types';
import voidCheck from "../../../assets/login/void-check.svg"
import Okey from "../../../assets/login/Okey.svg";
import Informacion from "../../../assets/login/Informacion.svg";
import { VALIDATION_REGEX } from 'utils/constants';


export const RestorePassword = ({postLoginRestore,validationSchema,isFetching,email,verificationCode}:IRestorePassword):JSX.Element => {
    return (
        <div className="background-login">
        <img src={pickersLogo} className="pickersLogo_login" alt="" />
        <Form
          onSubmit={(values:RestorePasswordType)=>(postLoginRestore({
            email:email,
            verificationCode:verificationCode,
            password:values.password
          })
          )
        }
          validate={useValidationSchema(validationSchema)}
        >
          {({ handleSubmit,values}) => (
  
            <form className="login-form" onSubmit={handleSubmit} >
             
              <Field
                type="password"
                name="password"
                id="password"
                label="Nueva contraseña"
                animated
                className="Admin-Pickers-input Admin-Pickers-input-restore"
                component={Input}
                maxLength={50}
              />
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                label="Repetir nueva contraseña"
                animated
                className="Admin-Pickers-input Admin-Pickers-input-restore"
                component={Input}
                maxLength={50}
              />

              <ul className={"ul"} id="ul-login">
                La contraseña debe contar con
                <li className="display-flex">
                         {! values.password ?  <img   src={voidCheck} alt="ok"/> : (values.password).length>=8 ? <img   src={Okey} alt="ok"/>  :  <img   src={Informacion} alt="ok"/>}

                            <p id="caracteres" className={ (values?.password)?.length>=8 || (values?.password)===undefined ? "restore-p":"restore-p errorLi"}>8 o más caracteres</p>
                </li>
                <li className="display-flex">
                        {! values.password ?  <img   src={voidCheck} alt="ok"/> : (values.password).match(VALIDATION_REGEX.regMayMin) ? <img   src={Okey} alt="ok"/>  :  <img   src={Informacion} alt="ok"/>}
                             <p id="mayusculas" className={ (values?.password)?.match(VALIDATION_REGEX.regMayMin) || (values?.password)===undefined ?"restore-p":"restore-p errorLi"}> Mayúsculas y minúsculas</p>
                        </li>
                        <li className="display-flex">
                        {! values.password ?  <img   src={voidCheck} alt="ok"/> : (values.password).match(VALIDATION_REGEX.regLetNum) ? <img   src={Okey} alt="ok"/>  :  <img   src={Informacion} alt="ok"/>}
                            <p id="numeros" className={(values?.password)?.match(VALIDATION_REGEX.regLetNum) || (values?.password)===undefined ?"restore-p":"restore-p errorLi"}> Números y letras</p>
                        </li>
              </ul>
                <button
                  className={"login-button"}
                  disabled={isFetching}
                  type="submit"
                  name="button"
                >
                  <p className="login-init ">Guardar</p>
                </button>
  
            </form>
          )}
        </Form>
        <img className="login-img-footer" src={canguro} alt="" />
        <NotificationModal />
      </div>
    )
}
export default RestorePassword;
