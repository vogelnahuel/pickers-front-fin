import React from 'react'
import volver from '../../../../assets/admin/PendingUser/volver.svg'
import Info  from '../../../../assets/transaction/Info.svg'
import api from '../../../../config/api'
// import { FilterTransaction } from '../../filterTransaction/FilterTransaction'
import './reasonsCanceledConfirm.css'

export const ReasonsCanceledConfirm = (props) => {

    const setreasonCancel = props.setreasonCancel;
    const setreasonCancelConfirm = props.setreasonCancelConfirm;
    const reasonId = props.reasonId; 
    const FilterSelectedTransaction = props.FilterSelectedTransaction

    const handleClickCancelConfirm = (e)=> {
        console.log(FilterSelectedTransaction.transaction.id)
        api.post(`/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}/cancel`,{"cancellationReasonId":parseInt(reasonId)})
        .then(()=>{window.location.reload();})
        .catch((err)=>{console.log(err)})
     
    }


    const handleClickgoBack = (e) => {
      
        
        e.target.parentNode.parentNode.classList.add('animation-right-transaction')
        
        
         setTimeout(() => {
            e.target.parentNode.parentNode.classList.remove('animation-right-transaction')
            setreasonCancel(true);
             e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.add('animation-right-transaction2')
            e.target.parentNode.parentNode.parentNode.parentNode.firstChild.classList.remove('animation-right-transaction2')
         
            
            setreasonCancelConfirm(false);
         }, 600);
        
        }

    return (
        <div className="modal-transaction-reasonsCanceled">
            <div  onClick={handleClickgoBack} className="modal-transaction-volver">
                <img src={volver} alt ="volver" />
                <p className="modal-transaction-reasonsCanceledConfirm-volver">Volver</p>
            </div>
            <div className="modal-transaction-reasonsCanceledConfirm-container">
                    <img className="modal-transaction-reasonsCanceledConfirm-img" src={Info} alt ="informacionIcon" />
                    <h3 className="modal-transaction-reasonsCanceledConfirm-subtitle">La transacción está por ser cancelada</h3>
                    <hr className="modal-transaction-reasonsCanceledConfirm-separate"/>
                    <p className="modal-transaction-reasonsCanceledConfirm-p">Al cancelar la transacción, esta va a pasar a blablabla
                 
                   
                    </p>
                    <p className="modal-transaction-reasonsCanceledConfirm-p2">
                        
                        ¿Querés cancelarla?
                    </p>
            </div>
            <button onClick={handleClickCancelConfirm} className="modal-transaction-reasonsCanceledConfirm-button">Sí, cancelarla</button>
        </div>
    )
}
