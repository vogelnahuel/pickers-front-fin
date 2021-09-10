import React from 'react';
import classNames from "classnames";

export const Input= (props) => {
    const  {
        className,
        label,
        id,
        placeholder,
        middle,
        disabled,
        input,
        lastLabel,
        meta
    } = props;
    return (
        <div className={classNames( {
            "has-error": meta.error && meta.touched,
        })}>
            <label className={
                classNames(middle ?"label-Admin-Pickers-middle":"label-Admin-Pickers",{
                        "labelError": meta.error && meta.touched,
                        "readonly":disabled,
                        "last-label":lastLabel,
                    }
                )}>
                {label}
            </label>
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
                onChange={input.onChange}
                onBlur={input.onBlur}
            />
            {
                meta.error && meta.touched &&
                <div className="input-errors-container">
                    <p className="errors"> {meta.error}  </p>
                </div>
            }
        </div>
    )
}
