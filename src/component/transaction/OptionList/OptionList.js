import React from 'react'
import { FinishModal } from './finish/FinishModal'
//import { ReasonsCanceledConfirm } from './reasonsCanceledConfirm/ReasonsCanceledConfirm'
import './optionList.css'
//import { History } from './history/History.js'
//import { ReasonsCanceled } from './reasonsCanceled/ReasonsCanceled'
//import Reload from '../../../assets/transaction/Reload.svg'


export const OptionList = () => {

  
    return (
        <div >

            {
                /*
                <>
                <History/>
                <div className="modal-transaction-buttons-submit">
                    <button className="modal-transaction-cancel">Cancelar</button>
                    <button className="modal-transaction-finish">Finalizar</button>
                    <div className="modal-transaction-reload">
                        <img src={Reload} alt="reload"/>
                        <p>Recargar</p>
                    </div>
                </div>
                </>
                */
            }
              {
            /*
                  <ReasonsCanceled/>
             */
            }
            {
                /*
                <ReasonsCanceledConfirm/>
                */
            }
            {
                <FinishModal/>
            }
       
          
            


        </div>
    )
}
