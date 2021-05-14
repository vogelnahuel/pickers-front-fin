import React from 'react'
import './style.css'
import "bootstrap/dist/css/bootstrap.min.css";
const ButtonSend = ({className,type, children,onClick}) => {


    return (
        <>
                <button 
                 className={className}
                 type={type}
                 onClick={onClick}
                 >
                     {children}
                </button>
       </>
    ) 
}

export default ButtonSend;
