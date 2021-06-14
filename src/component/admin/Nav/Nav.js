import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './nav.css'


export const Nav = () => {

     let Location="";
     Location =useParams().id;
     

    return (
      
            <nav className="navAdmin "> 
                         <div className="tamScroll scroll">
                              <ul>
                              <h3>Reportes</h3>
                              
                              <li>
                                 { window.location.pathname  ==="/dashboard"  ? <div className="circle"></div> : null     }  <Link to="/dashboard">Dashboard</Link>
                              </li>
                              <li>
                                   {   window.location.pathname  === "/pendingUserAdmin" 
                                   ||  window.location.pathname === "/activeUserAdmin" 
                                   || window.location.pathname  ===`/activeUserAdminpicker/${Location}`
                                   || window.location.pathname  ===`/pendingUserAdminpicker/${Location}`  
                                   ? <div className="circle"></div> :  null  
                                   } <Link to="/pendingUserAdmin">Flota</Link>
                              </li>
                              <li>
                                   { Location ==="/userAdmin"  ?<div className="circle"></div> : null    }   <Link to="#">Transacciones</Link>
                              </li>
                              </ul>
                              <ul>
                              <h3>Operaciones</h3>
                              <li>
                                   { window.location.pathname  ==="/userAdmin"  ?<div className="circle"></div> : null     }  <Link to="#">Configuración</Link>
                              </li>
                              <li>
                                   { window.location.pathname  ==="/userAdmin"  ?<div className="circle"></div> : null     }  <Link to="#">Planificacion</Link>
                              </li>
                              </ul>
                              <ul>
                              <h3>Administracion</h3>
                              <li>
                                  { window.location.pathname  ==="/userAdmin"  ? <div className="circle"></div> : null     } <Link to="#">Preliquidacion</Link>
                              </li>
                              </ul>
                            
                         </div>
            </nav>
    
    )
}
