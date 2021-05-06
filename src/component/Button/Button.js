import React from 'react'
import './style.css'

const ButtonSend = ({name, text,}) => {

    const onClick = (e) => {
        e.preventDefault();
        console.log("click")


        e.target.classList.add('blue','shine');

    }

    return (
        <>
                <button 
                 className="button"
                 type="submit"
                 name={name}
                 onClick={onClick}
                 >
                     {text}
                </button>
       </>
    ) 
}

export default ButtonSend;
