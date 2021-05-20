import React from 'react'
import './nav.css'


export const Nav = () => {
    return (
      
            <nav className="navAdmin "> 
                         <div className="tamxx scroll">
                              <ul>
                              <h3>Reportes</h3>
                              <li>
                                   <a href="">Dashboard</a>
                              </li>
                              <li>
                                   <a href="">Usuarios</a>
                              </li>
                              <li>
                                   <a href="">Transacciones</a>
                              </li>
                              </ul>
                              <ul>
                              <h3>Operaciones</h3>
                              <li>
                                   <a href="">Settings</a>
                              </li>
                              <li>
                                   <a href="">Planificacion</a>
                              </li>
                              </ul>
                              <ul>
                              <h3>Administracion</h3>
                              <li>
                                   <a href="">Preliquidacion</a>
                              </li>
                              </ul>
                            
                         </div>
            </nav>
    
    )
}
