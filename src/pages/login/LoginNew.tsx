import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.scss";
import pickersLogo from "./../../assets/login/PickersLogo.svg";
import canguro from "./../../assets/login/Canguro.svg";
import {Link} from 'react-router-dom'
import {Modal} from '@pickit/pickit-components'
import TextInput from '@pickit/pickit-components'
//import api from '../../config/api'
import LoginInterface from './types'
import { Form,Field } from 'react-final-form';
import { Input } from 'component/inputs/Input';


export const LoginNew = ({postLogin}:any):JSX.Element=> {
        
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
                                <form className="form-filter-transaction" onSubmit={handleSubmit}>
                            
                                        <Field
                                            type="text"
                                            name="User"
                                            label="Usuario"
                                            component="input"
                                            className="Admin-Pickers-input"
                                            placeholder="Usuario"
                                            maxLength={50}
                                        />
                              
                                        <Field
                                            type="text"
                                            name="Password"
                                            label="Password"
                                            component="input"
                                            className="Admin-Pickers-input"
                                            maxLength={9}
                                        />
                             
                                 
                                                
                                            <button
                                                className="button_"
                                                type="submit"
                                                name="button" >
                                                <p className="login-init "> Iniciar sesión </p>
                                            </button>
                               
                                </form>
                            )}
                        </Form>
               
                
        </div>
    )
}
