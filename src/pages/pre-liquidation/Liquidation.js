import React from 'react'
import {Header} from '../../component/admin/Header/Header'
import {Nav} from '../../component/admin/Nav/Nav'

import exportar from '../../assets/admin/PendingUser/exportar.svg'
import or from '../../assets/admin/PendingUser/or.svg'


export const Liquidation = () => {

    const cargarMas = () => {

    }
    const Export = () => {
    
    }
    return (
        <div className="background-Grey">
            
        <Header/>
      <div className="mainContainerFlex">  
            <Nav/>
            <div className="pending-container">
             
                   
                 <div 
                 className="mainContainerFlex">
                     <h2 className="subTitle-pending"><p className="subtitle-pendingUser-h2">Preliquidación </p></h2>
                     <button 
                        onClick={Export}
                        className="export"
                        name="export"
                        >
                        <img  src={exportar} alt="export" />
                        <img className="or-pending" src={or} alt="or" />
                        <p className="display-inline-block p-export"> Exportar</p>
                     </button>
                 </div>
                 
                 
                 <button onClick={cargarMas} className="paginator-button">Ver más</button>
            </div>
          
                    
        </div>
        
    </div>
    )
}
