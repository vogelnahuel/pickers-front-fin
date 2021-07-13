import React, { useState } from 'react'
import {Header} from '../../component/admin/Header/Header'
import {Nav} from '../../component/admin/Nav/Nav'
import exportar from '../../assets/admin/PendingUser/exportar.svg'
import or from '../../assets/admin/PendingUser/or.svg'
import { TableTransaction } from '../../component/transaction/tableTransaction/TableTransaction'
import './transaction.css'
import { FilterTransaction } from '../../component/transaction/filterTransaction/FilterTransaction'
import { Modal } from 'pickit-components'
import {OptionList} from '../../component/transaction/OptionList/OptionList'
import Reload from '../../assets/transaction/Reload.svg'
import Close from '../../assets/transaction/Close.svg'

export const Transaction = () => {

    const [OpenModalTransaction, setOpenModalTransaction] = useState(false);
    const [IdModalApi, setIdModalApi] = useState("");// devuelve la consulta api

const cargarMas = () => {

}
const Export = () => {

}
const onClose = (e) => {
    setOpenModalTransaction(false);
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
                        <div className="modal-transaction">
                                <Modal
                                 width="87.116vw"
                                 height="80.72916666666667vh"
                                 isOpen={OpenModalTransaction}
                                 onClose={onClose}
                                >
                                    <div className="modal-transaction-container">
                                        <img onClick={onClose} className="modal-transaction-close" src={Close} alt="cerrar"/>
                                        <div>
                                            <div className="modal-transaction-title">
                                                <h2>Número de transacción</h2>
                                                <p>Estado</p>
                                                <p className="modal-transaction-fecha">Fecha entrega</p>
                                            </div>
                                            <div className="modal-transaction-subtitle">
                                                <h2>AAA112</h2>
                                                <p>En retiro</p>
                                                <p className="modal-transaction-fecha">17/11/2020 15:30</p>
                                            </div>
                                            <hr className="modal-transaction-separate"/>
                                        </div>
                                        <div className="modal-transaction-scroll">
                                                <OptionList/>
                                                
                                                    
                                                
                                        </div>
                                        <div className="modal-transaction-difuminar">
                                                                        
                                        </div>
                                        <div className="modal-transaction-buttons-submit">
                                            <button className="modal-transaction-cancel">Cancelar</button>
                                            <button className="modal-transaction-finish">Finalizar</button>
                                            <div className="modal-transaction-reload">
                                                <img src={Reload} alt="reload"/>
                                                <p>Recargar</p>
                                            </div>
                                        </div>

                                    </div>

                                </Modal>
                        </div>
                        :null
                    }
                        
            </div>
            
        </div>
    )
}
