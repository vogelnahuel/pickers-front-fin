import React from 'react'
import './headerAdmin.css'
import  canguroLogo from '../../../assets/admin/canguroLogo.svg'
import  pickers from '../../../assets/admin/pickers.svg'
import  argentina from '../../../assets/admin/argentina.svg'
import  user from '../../../assets/admin/user.svg'
export const Header = () => {
    return (
        <header className="headerAdmin">
            <div className="container">

                    <img className="" src={canguroLogo}  alt="Logo "/>
                    <img className="pickersLogo" src={pickers}  alt="Logo "/>
                    <p   className="font-Admin centerHeight leftEnd">ADMIN</p>
                    <img className="argentina " src={argentina}  alt="Logo "/>
                    <img className="user" src={user}  alt="Logo "/>
                    
              
            </div>
            
        </header>
    )
}
