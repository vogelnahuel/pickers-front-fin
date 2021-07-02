import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './nav.css'


export const Nav = (props) => {

     const setmodalGuardarCambios=props.setmodalGuardarCambios;
     const setRedirect = props.setRedirect;
     let Location="";
     Location =useParams().id;

     const handleClick =  (e) => {

          
         
          

          if(`/activeUserAdminpicker/${Location}`===window.location.pathname){
               e.preventDefault();
               setmodalGuardarCambios(true);
               setRedirect(e.target.href)
          }

     }
   

    return (
      
            <nav className="navAdmin "> 
                         <div className="tamScroll scroll">
                              <ul>
                              <h3>Reportes</h3>
                              
                              <li>
                                 { window.location.pathname  ==="/dashboard"  ? <div className="circle"></div> : null     }  <Link onClick={handleClick}  to="/dashboard">Dashboard</Link>
                              </li>
                              <li>
                                   {   window.location.pathname  === "/pendingUserAdmin" 
                                   ||  window.location.pathname === "/activeUserAdmin" 
                                   || window.location.pathname  ===`/activeUserAdminpicker/${Location}`
                                   || window.location.pathname  ===`/pendingUserAdminpicker/${Location}`  
                                   ? <div className="circle"></div> :  null  
                                   } <Link onClick={handleClick} to="/pendingUserAdmin">Flota</Link>
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
                                   { window.location.pathname  ==="/userAdmin"  ?<div className="circle"></div> : null     }  <Link to="#">Planificación</Link>
                              </li>
                              </ul>
                              <ul>
                              <h3>Administracion</h3>
                              <li>
                                  { window.location.pathname  ==="/userAdmin"  ? <div className="circle"></div> : null     } <Link to="#">Preliquidación</Link>
                              </li>
                              </ul>
                            
                         </div>
            </nav>
    
    )
}
