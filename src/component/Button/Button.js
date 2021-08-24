import React from 'react'
import './style.css'

const ButtonSend = ({className,type, name,children,onClick}) => {


    return (
        <>
                <button 
                 className={className}
                 type={type}
                 onClick={onClick}
                 name={name}
                 >
                     {children}
                </button>
       </>
    ) 
}

export default ButtonSend;
