import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.scss";
import pickersLogo from "./../../assets/login/PickersLogo.svg";
import canguro from "./../../assets/login/Canguro.svg";
import {Link} from 'react-router-dom'
import { TextInput } from '@pickit/pickit-components';
//import api from '../../config/api'
import LoginInterface from './types'
import { Form,Field } from 'react-final-form';
import { Input } from 'component/inputs/Input';
import useValidationSchema from 'hooks/useValidationSchema';
import  NotificationModal  from 'component/modal/NotificationModal';




const LoginNew:React.FC <LoginInterface>=({postLogin,validationSchema}):JSX.Element=> {
  

    return (
        <div className="background-login">
                
                <img src={pickersLogo} className="pickersLogo_login" alt=""/>
                <Form
                            onSubmit={postLogin}
                           /* initialValues={filters}
                            mutators={{
                                setValue: ([field, value], state, { changeValue }) => {
                                    changeValue(state, field, () => value)
                                }
                            }}*/
                            validate={useValidationSchema(validationSchema)}
                        >
                            {({ handleSubmit, form}) => (
                                <form className="login-form" onSubmit={handleSubmit}>
                            
                                        <Field
                                            type="text"
                                            name="email"
                                            label="Usuario"
                                            className="Admin-Pickers-input"
                                            component={Input}
                                            maxLength={50}
                                        />
                                           
                                        <Field
                                            type="password"
                                            name="password"
                                            label="Password"
                                            className="Admin-Pickers-input"
                                            component={Input}
                                        />
                                 
                                                    
                                            <button
                                                className="login-button animation"
                                                type="submit"
                                                name="button" >
                                                <p className="login-init "> Iniciar sesión </p>
                                            </button>

                                      
                               
                                </form>
                            )}
                        </Form>
                        <div className="container-login-a">
                                            <Link className="login-a"  to={"/restore"}>
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        </div>
                    <img className="login-img-footer" src={canguro} alt=""/>
       
       <NotificationModal/>
        </div>
    )
}
export default LoginNew;