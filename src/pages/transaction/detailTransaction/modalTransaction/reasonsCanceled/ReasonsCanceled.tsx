import volver from 'assets/admin/PendingUser/volver.svg'
import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from 'store'
import './reasonsCanceled.scss'
import { actions as detailTransactionActions, selectors as detailTransactionSelector } from "reducers/detailTransaction";
import { connect } from "react-redux";






const ReasonsCanceled: React.FC<any> = ({ getMessages,detailTransaction,onBack,Messages,ReasonsCanceledConfirm,setMessageSelected}): JSX.Element => {

  const [SelectedClick, setSelectedClick] = useState({id:-1,state:false})
    useEffect(() => {
      getMessages(detailTransaction.transaction.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="modal-transaction-reasonsCanceled">
            <div onClick={onBack} className="modal-transaction-volver">
                <img className="modal-transaction-reasonsCanceled-img-volver" src={volver} alt ="volver" />
                <p className="modal-reasonsCancel-p">Volver</p>
            </div>
            <div className="modal-transaction-scroll">
                    <p className="modal-transaction-reasonsCanceled-subtitle">Seleccioná el motivo de cancelación de la colecta</p>
            {
                    <div  className="modal-transaction-reasonsCanceled-scroll">
                        
                                 <hr className="modal-transaction-reasonsCanceled-separate"/>

                            {
                              Messages&& Messages.map((message:any)=>(

                                <div  key={message.id} className="modal-transaction-reason-container">
                                    
                                <p  onClick={()=>{setMessageSelected(message);ReasonsCanceledConfirm();setSelectedClick({id:message.id,state:true}) }}  data-value={message.id} className={ (SelectedClick.id===message.id && SelectedClick.state===true)  ? "p-font-weight" :""}>{message?.message}</p>
                            </div>
                               )
                               )
                            } 
  
                    </div>
              }
            </div>
            <div className="modal-reasonsCanceled-difuminar">

            </div>
      
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    detailTransaction: detailTransactionSelector.getDetailTransaction(state),
    Messages: detailTransactionSelector.getDetailTransactionMessages(state),
  });
  
  const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getMessages: (id: string) => {
        dispatch(detailTransactionActions.getDetailTransactionMenssagesRequest(id));
      },
    setMessageSelected:(message:any)=>{
      dispatch(detailTransactionActions.setMessageSelected(message))
    }
      
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReasonsCanceled);
  
