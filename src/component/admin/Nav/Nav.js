import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'


export const Nav = () => {
    return (
      
            <nav className="navAdmin "> 
                         <div className="tamScroll scroll">
                              <ul>
                              <h3>Reportes</h3>
                              
                              <li>
                                 { window.location.pathname  ==="/dashboard"  ? <div className="circle"></div> : <div className="circle-transparent"></div>   }  <Link to="/dashboard">Dashboard</Link>
                              </li>
                              <li>
                                   { window.location.pathname  ==="/pendingUserAdmin" 
                                   || window.location.pathname  ==="/activeUserAdmin" 
                                   || window.location.pathname  ==="/pendingUserAdminpicker" 
                                   || window.location.pathname  ==="/activeUserAdminpicker"  
                                   ? <div className="circle"></div> :  <div className="circle-transparent"></div>  
                                   }   <Link to="/pendingUserAdmin">Usuarios</Link>
                              </li>
                              <li>
                                   { window.location.pathname  ==="/userAdmin"  ?<div className="circle"></div> : <div className="circle-transparent"></div>  }   <Link to="#">Transacciones</Link>
                              </li>
                              </ul>
                              <ul>
                              <h3>Operaciones</h3>
                              <li>
                                   { window.location.pathname  ==="/userAdmin"  ?<div className="circle"></div> : <div className="circle-transparent"></div>   }<Link to="#">   Settings</Link>
                              </li>
                              <li>
                                   { window.location.pathname  ==="/userAdmin"  ?<div className="circle"></div> : <div className="circle-transparent"></div>   }  <Link to="#">Planificacion</Link>
                              </li>
                              </ul>
                              <ul>
                              <h3>Administracion</h3>
                              <li>
                                  { window.location.pathname  ==="/userAdmin"  ? <div className="circle"></div> : <div className="circle-transparent"></div>   } <Link to="#">Preliquidacion</Link>
                              </li>
                              </ul>
                            
                         </div>
            </nav>
    
    )
}
