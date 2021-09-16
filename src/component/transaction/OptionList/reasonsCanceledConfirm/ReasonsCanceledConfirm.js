import React from 'react'
import volver from '../../../../assets/admin/PendingUser/volver.svg'
import Info  from '../../../../assets/transaction/Advertencia.svg'
import api from '../../../../middleware/api'
// import { FilterTransaction } from '../../filterTransaction/FilterTransaction'
import './reasonsCanceledConfirm.css'

export const ReasonsCanceledConfirm = (props) => {

    const setreasonCancel = props.setreasonCancel;
    const setreasonCancelConfirm = props.setreasonCancelConfirm;
    const reasonId = props.reasonId; 
    const FilterSelectedTransaction = props.FilterSelectedTransaction;
    const msgSelected=props.msgSelected;

    

    

    const handleClickCancelConfirm = (e)=> {
       
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
//

    return (
        <div className="modal-transaction-reasonsCanceled">
            <div  onClick={handleClickgoBack} className="modal-transaction-volver">
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
            <button onClick={handleClickCancelConfirm} className="modal-transaction-reasonsCanceledConfirm-button">Sí, cancelarla</button>
        </div>
    )
}
