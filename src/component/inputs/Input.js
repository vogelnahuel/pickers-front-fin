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
        input,
        lastLabel,
        meta,
        maxLength,
        animated
    } = props;

    const [Focus, setFocus] = useState(false);

    return (
        <div className={classNames( {
            "has-error": meta.error && meta.touched,
        })}>
            <label htmlFor={id} className={
                classNames(middle ?"label-Admin-Pickers-middle":"label-Admin-Pickers",{
                        "labelError": meta.error && meta.touched,
                        "label-login":animated,
                        "readonly":disabled,
                        "last-label":lastLabel,
                         [input.value  || Focus===true?"animationTop":"animationOrigin"] :animated
                    }
                )}>
                {label}
            </label>
            <input
                
                className={ classNames( className, {
                    "readonly":disabled,
                    "inputError": meta.error && meta.touched,
                    [meta.error && meta.touched ?"inputReboteAnimation":""] :animated
                })}
                type={input.type}
                name={input.name}
                disabled={disabled}
                id={id}
                value={input.value}
                placeholder={placeholder}
                onChange={input.onChange}
                onFocus={() => {setFocus(true) }}
                onBlur={()=>{setFocus(false)}}
                maxLength={maxLength}
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
