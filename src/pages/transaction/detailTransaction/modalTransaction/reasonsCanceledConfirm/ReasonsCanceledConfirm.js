import volver from 'assets/admin/PendingUser/volver.svg'
import Info from 'assets/transaction/Advertencia.svg'
import React from 'react'
// import { FilterTransaction } from '../../filterTransaction/FilterTransaction'
import './reasonsCanceledConfirm.scss'

export const ReasonsCanceledConfirm = (props) => {

    const FilterSelectedTransaction = props.FilterSelectedTransaction;
    const msgSelected=props.msgSelected;

    // const handleClickCancelConfirm = (e)=> {
       
    //     api.post(`/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}/cancel`,{"cancellationReasonId":parseInt(reasonId)})
    //     .then(()=>{window.location.reload();})
    //     .catch((err)=>{console.log(err)})
     
    // }

    return (
        <div className="modal-transaction-reasonsCanceled">
            <div  onClick={()=>{}} className="modal-transaction-volver">
                <img  className="modal-transaction-reasonsCanceledConfirm-volver-img" src={volver} alt ="volver" />
                <p className="modal-transaction-reasonsCanceledConfirm-volver">Volver</p>
            </div>

          {((FilterSelectedTransaction.transaction.state.name==="En retiro" &&  msgSelected==="Motivos personales o de transporte") ||
          (FilterSelectedTransaction.transaction.state.name==="En lugar de retiro" && msgSelected==="Motivos personales o de transporte")) 

          ?    <div className="modal-transaction-reasonsCanceledConfirm-container">
                    <img className="modal-transaction-reasonsCanceledConfirm-img" src={Info} alt ="informacionIcon" />
                    <h3 className="modal-transaction-reasonsCanceledConfirm-subtitle-collection">Estás por cancelar la colecta</h3>
                    <hr className="modal-transaction-reasonsCanceledConfirm-separate"/>
                    <p className="modal-transaction-reasonsCanceledConfirm-p-collection">Al desasignar la transacción, va a volver al estado sin asignar </p>
                    <p className="modal-transaction-reasonsCanceledConfirm-p2-collection">
                        ¿Querés cancelar la colecta?
                    </p>
            </div>
            :
            <div className="modal-transaction-reasonsCanceledConfirm-container">
                <img className="modal-transaction-reasonsCanceledConfirm-img" src={Info} alt ="informacionIcon" />
                <h3 className="modal-transaction-reasonsCanceledConfirm-subtitle">Estás por cancelar la transacción</h3>
                <hr className="modal-transaction-reasonsCanceledConfirm-separate"/>
                <p className="modal-transaction-reasonsCanceledConfirm-p">Al hacerlo, ya no va a poder ser asignada</p>
                <p className="modal-transaction-reasonsCanceledConfirm-p2">
                    ¿Querés cancelarla?
                </p>
             </div>
            
            }
            <button onClick={()=>{}} className="modal-transaction-reasonsCanceledConfirm-button">Sí, cancelarla</button>
        </div>
    )
}
