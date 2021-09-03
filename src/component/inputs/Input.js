import React from 'react';
import classNames from "classnames";
import {Field} from "react-final-form";

export const Input= (props) => {
    const  {className,label,id,placeholder,middle,disabled,input, meta}=props;
    // console.log("props")
    // console.log(props)
    return (
        <div className={classNames( {
            "has-error": meta.error && meta.touched,
        })}>
            <label className={classNames(middle ?"label-Admin-Pickers-middle":"labelError label-Admin-Pickers",{
                    "labelError": meta.error && meta.touched,
                    "readonly":disabled,
                }
            )}>
                {label}
            </label>
            <div>
                <input
                    className={ classNames( className, {
                        "readonly":disabled,
                        "inputError": meta.error && meta.touched,
                    })}
                    type={input.type}
                    name={input.name}
                    disabled={disabled}
                    id={id}
                    value={input.value}
                    placeholder={placeholder}
                    // onClick={onclick}
                    onChange={input.onChange}
                    onBlur={input.onBlur}
                />
            </div>

            {/*<input*/}
            {/*    type="mail"*/}
            {/*    className="input"*/}
            {/*    name="mail"*/}
            {/*    id="mail"*/}
            {/*    onBlur={handleInputBlur}*/}
            {/*    onChange={(e)=>{handleInputChange(e,mail)}}*/}
            {/*    value={mail}*/}
            {/*    onFocus={(e) => handleFocusLabel(e,mail)}*/}


            {/*/>*/}

            {/*<label id="labelmail" htmlFor="mail" className="login-label label">Usuario</label>*/}
            {
                meta.error && meta.touched &&
                <div className="input-errors-container">
                    <p className="errors"> {meta.error}  </p>
                </div>
            }
        </div>
    )
}
