import React from 'react'

export const Input= (props) => {
    const  {className,type,name,id,placeholder,onclick,onchange,onblur,value}=props;

    return (
        
        <input  
           className={ className }
           type={type}
           name={name}
           id={id}
           value={value}
           placeholder={placeholder}
           onClick={onclick}
           onChange={onchange}
           onBlur={onblur}
           />
    )
}
