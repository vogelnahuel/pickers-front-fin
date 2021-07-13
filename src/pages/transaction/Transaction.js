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
    const titulos = ['Transacción','Picker','Fecha de entrega','Estado'];
    const api = [
        {
            Transacción:'AAA114',
            Picker:'651456321',
            FechaEntrega:'17/06/2021',
            Estado:'En retiro',
            nombre:'Juan perez',
            telefono:'1130963203',
            retiro:'JB. Justo 1024 - CABA',
            entrega:'Cabildo 750, Belgrano - CABA',
            retailer:'pickit'
        },
        {
            Transacción:'AAA113',
            Picker:'654321546',
            FechaEntrega:'17/06/2021',
            Estado:'En retiro',
            nombre:'Juan martinez',
            telefono:'1130963203',
            retiro:'JB. Justo 1024 - CABA',
            entrega:'Rivadavia 750, Belgrano - CABA',
            retailer:'pickit'
        },
        {
            Transacción:'AAA112',
            Picker:'654321548',
            FechaEntrega:'17/06/2021',
            Estado:'Sin asignar',
            nombre:'miguel perez',
            telefono:'1130963203',
            retiro:'Rivadavia 1024 - CABA',
            entrega:'Cabildo 750, Belgrano - CABA',
            retailer:'pickit'
        },
        {
            Transacción:'AAA111',
            Picker:'125485221',
            FechaEntrega:'17/06/2021',
            Estado:'Retirado',
            nombre:'miguel martinez',
            telefono:'1130963203',
            retiro:'Rivadavia 1024 - CABA',
            entrega:'Rivadavia 750, Belgrano - CABA',
            retailer:'pickit'
        }
        
    ]

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
                    api={api}
                    titulos={titulos}
                    
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
                                                <OptionList
                                                api={api}
                                                />
                                                
                                                    
                                                
                                        </div>
                                        <div className="modal-transaction-difuminar1">
                                        <div className="modal-transaction-difuminar2">
                                        <div className="modal-transaction-difuminar3">
                                                                        
                                        </div>
                                        </div>
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
