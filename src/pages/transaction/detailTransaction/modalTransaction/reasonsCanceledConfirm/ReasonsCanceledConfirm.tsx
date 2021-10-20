import volver from 'assets/admin/PendingUser/volver.svg'
import Info from 'assets/transaction/Advertencia.svg'
import React from 'react'
import { actions as detailTransactionActions, selectors as detailTransactionSelector } from "reducers/detailTransaction";
import { connect } from "react-redux";

import './reasonsCanceledConfirm.scss'
import { AppDispatch, RootState } from 'store';
import { ReasonCanceledConfirmPropsType } from './types';

const ReasonsCanceledConfirm: React.FC<ReasonCanceledConfirmPropsType>  = ({detailTransaction,messageSelected,onBack,postReasonsCanceled}):JSX.Element => {

    return (
        <div className="modal-transaction-reasonsCanceled">
            <div  onClick={()=>{onBack()}} className="modal-transaction-volver">
                <img  className="modal-transaction-reasonsCanceledConfirm-volver-img" src={volver} alt ="volver" />
                <p className="modal-transaction-reasonsCanceledConfirm-volver">Volver</p>
            </div>

          {((detailTransaction.transaction.state.name==="En retiro" &&  messageSelected.message==="Motivos personales o de transporte") ||
          (detailTransaction.transaction.state.name==="En lugar de retiro" && messageSelected.message==="Motivos personales o de transporte")) 

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
            <button onClick={()=>{postReasonsCanceled(messageSelected.id,detailTransaction.transaction.id)}} className="modal-transaction-reasonsCanceledConfirm-button">Sí, cancelarla</button>
        </div>
    )
}


const mapStateToProps = (state: RootState) => ({
    detailTransaction: detailTransactionSelector.getDetailTransaction(state),
    messageSelected:detailTransactionSelector.getDetailTransactionMessage(state)
  });
  
  const mapDispatchToProps = (dispatch: AppDispatch) => ({

      postReasonsCanceled:(params:string,id:string)=>{
        dispatch(detailTransactionActions.getDetailTransactionReasonsCanceledRequest(params,id))
      }

  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReasonsCanceledConfirm);
  

