import React, { useState } from 'react';
import classNames from "classnames";


export const Input= (props) => {
    const  {
        className,
        label,
        id,
        placeholder,
        middle,
        disabled,
        readOnly,
        input,
        lastLabel,
        meta,
        maxLength,
        animated
    } = props;



    const [focus, setFocus] = useState(false);

    return (
        <div className={classNames( {
            "has-error": meta.error && meta.touched,
        })}>
            <label htmlFor={id} className={
                classNames(middle ?"label-Admin-Pickers-middle":"label-Admin-Pickers",{
                        "labelError": meta.error && meta.touched,
                        "label-login":animated,
                        "disabled":disabled,
                        "last-label":lastLabel,
                         [input.value  || focus===true?"animationTop":"animationOrigin"] :animated
                    }
                )}>
                {label}
            </label>
            <input
                
                className={ classNames( className, {
                    "disabled":disabled,
                    "inputError": meta.error && meta.touched,
                    [meta.error && meta.touched ?"inputReboteAnimation":""] :animated
                })}
                type={input.type}
                name={input.name}
                disabled={disabled}
                readOnly={readOnly}
                id={id}
                value={input.value}
                placeholder={placeholder}
                onChange={input.onChange}
                onFocus={() => {animated ?  (function() { setFocus(true); input.onFocus() })() : input.onFocus() } }
                onBlur={()=>{animated ?  (function() { setFocus(false); input.onBlur() })() : input.onBlur() } }
                maxLength={maxLength}
                autoComplete="off"
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
