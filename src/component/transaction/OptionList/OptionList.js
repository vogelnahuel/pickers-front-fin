import React from 'react'
import './optionList.css'
//import { FinishModal } from './finish/FinishModal'
//import { ReasonsCanceledConfirm } from './reasonsCanceledConfirm/ReasonsCanceledConfirm'
//import { ReasonsCanceled } from './reasonsCanceled/ReasonsCanceled'
import { History } from './history/History.js'
import Reload from '../../../assets/transaction/Reload.svg'


export const OptionList = () => {

  
    return (
        <div >

            {
                
                <>
                <History/>
                <div className="modal-transaction-buttons-submit">
                    <button className="modal-transaction-cancel">Cancelar</button>
                    <button className="modal-transaction-finish">Finalizar</button>
                    <div className="modal-transaction-reload">
                        <img className="modal-transaction-reload-img" src={Reload} alt="reload"/>
                        <p>Recargar</p>
                    </div>
                </div>
                </>
                
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
            {/*
                <FinishModal/>
                */
            }
       
          
            


        </div>
    )
}
