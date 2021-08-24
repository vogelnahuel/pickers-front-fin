import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './nav.scss'


export const Nav = (props) => {

     const setmodalGuardarCambios=props.setmodalGuardarCambios;
     const setRedirect = props.setRedirect;
     const dataPicker =props.dataPicker;
     const Informacion=props.Informacion;

     let Location="";
     Location =useParams().id;

     const handleClick =  (e) => {

          
         if(dataPicker!==Informacion){
          if(`/activeUserAdminpicker/${Location}`===window.location.pathname){
               e.preventDefault();
               setmodalGuardarCambios(true);
               setRedirect(e.target.href)
          }
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
                                   { window.location.pathname.includes("/transaction") ?<div className="circle"></div> : null    }   <Link  onClick={handleClick} to="/transaction">Transacciones</Link>
                              </li>
                              </ul>
                              <ul>
                              <h3>Operaciones</h3>
                              <li className="unclickable">
                                   { window.location.pathname  ==="/configPicker"  ?<div className="circle"></div> : null     }  <Link onClick={handleClick}  to="#">Configuración</Link>
                              </li>
                              <li className="unclickable">
                                   { window.location.pathname  ==="/planning"  ?<div className="circle"></div> : null     }  <Link  onClick={handleClick} to="#">Planificación</Link>
                              </li>
                              </ul>
                              <ul>
                              <h3>Administración</h3>
                              <li className="unclickable">
                                  { window.location.pathname  ==="/liquidation"  ? <div className="circle"></div> : null     } <Link  onClick={handleClick}  to="#">Preliquidación</Link>
                              </li>
                              </ul>
                            
                         </div>
            </nav>
    
    )
}
