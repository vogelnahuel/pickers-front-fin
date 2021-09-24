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




const LoginNew:React.FC <LoginInterface>=({postLogin}):JSX.Element=> {
  

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
                            }}
                            validate={useValidationSchema(validationSchema)}*/
                        >
                            {({ handleSubmit, form}) => (
                                <form className="login-form" onSubmit={handleSubmit}>
                            
                                        <Field
                                            type="text"
                                            name="user"
                                            label="Usuario"
                                            className="Admin-Pickers-input"
                                            maxLength={50}
                                        >
                                            {(props):any=><TextInput {...props}/>}
                                        </Field>
                                           

                              
                                        <Field
                                            type="text"
                                            name="password"
                                            label="Password"
                                            className="Admin-Pickers-input"
                                            maxLength={9}
                                        >
                                            {(props):any=><TextInput {...props}/>}
                                        </Field>
                             
                                 
                                                    
                                            <button
                                                className="login-button animation"
                                                type="submit"
                                                name="button" >
                                                <p className="login-init "> Iniciar sesión </p>
                                            </button>

                                        <div className="container-login-a">
                                            <Link className="login-a"  to={"/restore"}>
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        </div>
                               
                                </form>
                            )}
                        </Form>
               
                    <img className="login-img-footer" src={canguro} alt=""/>
        </div>
    )
}
export default LoginNew;