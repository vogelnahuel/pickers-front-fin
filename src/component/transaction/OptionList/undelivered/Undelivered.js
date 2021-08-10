import React from 'react'
import volver from '../../../../assets/admin/PendingUser/volver.svg'
import api from '../../../../config/api';
import './undelivered.css'

export const Undelivered = (props) => {

    const setundelivered = props.setundelivered;
    const setfinishModal = props.setfinishModal;
    const FilterSelectedTransaction=props.FilterSelectedTransaction

    const opc = [{key:1,value:'No logro contactar al cliente'},{key:2,value:'El paquete es incorrecto'},{key:3,value:'El cliente rechaza el paquete'}]


    const handleClickgoBack = (e) => {
        
        e.target.parentNode.parentNode.parentNode.classList.add('animation-right-transaction')

         setTimeout(() => {
             
            e.target.parentNode.parentNode.parentNode.classList.remove('animation-right-transaction')
            setfinishModal(true);
            if(e.target.parentNode.parentNode.parentNode!==null){
                e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.add('animation-right-transaction2')
                e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.remove('animation-right-transaction2')    
            }
           
            
            setundelivered(false);
         }, 600);
        
}
const handleClick  = async (e) => {
    e.preventDefault();
    
  
}
const handleCLickOpc = async(e)=> {
    e.preventDefault();
    await api.post(
        `/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}/returned`,
      );
   window.location.reload();
}

    return (
        <div>
            <div onClick={handleClickgoBack} className="modal-transaction-finish-volver">
                <img src={volver} alt ="volver" />
                <p className="modal-transaction-finish-volver">Volver</p>
            </div>
            <div className="modal-container-height">
                <div className="modal-dni-center">

                    <h3 className="modal-undelivered-h3">Seleccioná el motivo de imposible de entrega</h3>
                    <hr className="modal-undelivered-hr"/>
                    {
                        opc ? opc.map(opcion => (
                            <div key={opcion.key}>
                             
                                <p onClick={handleCLickOpc} className="modal-undelivered-opc"> {opcion.value}</p>
                                
                                <hr className="modal-undelivered-hr"/>
                            </div>
                        ))
                        : null
                    }

                </div>
            </div>
            <div className="modal-dni-center">
                <button disabled onClick={handleClick} className="modal-undelivered-button" > Finalizarla</button>
            </div>
        </div>
    )
}
