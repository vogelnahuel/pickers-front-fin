import React, { useState } from 'react'
import './optionList.css'
import { FinishModal } from './finish/FinishModal'
import { ReasonsCanceledConfirm } from './reasonsCanceledConfirm/ReasonsCanceledConfirm'
import { ReasonsCanceled } from './reasonsCanceled/ReasonsCanceled'
import { History } from './history/History.js'
import Reload from '../../../assets/transaction/Reload.svg'



export const OptionList = (props) => {


    const FilterSelectedTransaction = props.FilterSelectedTransaction
    
    const [history, sethistory] = useState(true)
    const [reasonCancel, setreasonCancel] = useState(false);
    const [reasonCancelConfirm, setreasonCancelConfirm] = useState(false);
    const [finishModal, setfinishModal] = useState(false);

    const handleClickCancel = (e) => {
        e.preventDefault();
        setreasonCancel(true);
        sethistory(false);
    }
    const handleClickFinish = (e) => {
        e.preventDefault();
        setfinishModal(true);
        sethistory(false);
    }
  
    return (
        <div >

            {
                history===true ? 
                
                <>
                <History
                FilterTransaction={FilterSelectedTransaction}
                />
                <div className="modal-transaction-buttons-submit">
                    <button onClick={handleClickCancel} className="modal-transaction-cancel">Cancelar</button>
                    <button onClick={handleClickFinish} className="modal-transaction-finish">Finalizar</button>
                    <div className="modal-transaction-reload">
                        <img className="modal-transaction-reload-img" src={Reload} alt="reload"/>
                        <p>Actualizar</p>
                    </div>
                </div>
                </>
                : null
                
            }
              {
              reasonCancel ===true ? 
                  <ReasonsCanceled
                  setreasonCancel={setreasonCancel}
                  setreasonCancelConfirm={setreasonCancelConfirm}
                  />
                : null
            }
            {
                reasonCancelConfirm ===true ? 
                <ReasonsCanceledConfirm/>
                : null
            }
            {
                finishModal ===true ? 
                <FinishModal/>
                : null
            }
       
          
            


        </div>
    )
}
