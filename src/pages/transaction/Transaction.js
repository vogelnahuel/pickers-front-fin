import React, { useState } from 'react'
import {Header} from '../../component/admin/Header/Header'
import {Nav} from '../../component/admin/Nav/Nav'
import exportar from '../../assets/admin/PendingUser/exportar.svg'
import or from '../../assets/admin/PendingUser/or.svg'
import { TableTransaction } from '../../component/transaction/tableTransaction/TableTransaction'
import './transaction.css'
import { FilterTransaction } from '../../component/transaction/filterTransaction/FilterTransaction'
import { Modal } from 'pickit-components'

export const Transaction = () => {

    const [OpenModalTransaction, setOpenModalTransaction] = useState(false);
    const [IdModalApi, setIdModalApi] = useState("");// devuelve la consulta api

const cargarMas = () => {

}
const Export = () => {

}

    return (
        <div className="background-Grey">
            
            <Header/>
          <div className="mainContainerFlex">  
                <Nav/>
                <div className="transaction-container">
                 
                       
                     <div 
                     className="mainContainerFlex">
                         <h2 className="subTitle-transaction"><p className="subtitle-pendingUser-h2">Transacciones </p></h2>
                         <button 
                            onClick={Export}
                            className="export-transaction"
                            name="export"
                            >
                            <img  src={exportar} alt="export" />
                            <img className="or-pending" src={or} alt="or" />
                            <p className="display-inline-block p-export"> Exportar</p>
                         </button>
                     </div>
                     <FilterTransaction/>
                    <TableTransaction
                    setOpenModalTransaction={setOpenModalTransaction}
                    IdModal={IdModalApi}
                    setIdModal={setIdModalApi}
                    />
                    
                     <button onClick={cargarMas} className="paginator-button-transaction">Ver más</button>
                     
                </div>

                    {
                        OpenModalTransaction ===true ?
                        <div>
                                <Modal>

                                </Modal>
                        </div>
                        :null
                    }
                        
            </div>
            
        </div>
    )
}
