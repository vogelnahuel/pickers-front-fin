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
      /*  sethistory(false);
        setreasonCancel(true);*/
        document.querySelector('.modal-transaction-difuminar1').style.display="none";
        document.querySelector('.modal-transaction-difuminar2').style.display="none";
        document.querySelector('.modal-transaction-difuminar3').style.display="none";
        document.querySelector('.modal-transaction-difuminar4').style.display="none";
        document.querySelector('.modal-transaction-difuminar5').style.display="none";
        document.querySelector('.modal-transaction-difuminar6').style.display="none";
        setreasonCancel(true);
        setTimeout(() => {
            e.target.parentNode.parentNode.classList.add('animation-left-transaction')
            
            setTimeout(() => {
                sethistory(false);
                
                e.target.parentNode.parentNode.classList.remove('animation-left-transaction')
            }, 1900);
        }, 0);
       
    }
    const handleClickFinish = (e) => {
       e.preventDefault();
       /*sethistory(false);
       setfinishModal(true);*/
       
       document.querySelector('.modal-transaction-difuminar1').style.display="none";
       document.querySelector('.modal-transaction-difuminar2').style.display="none";
       document.querySelector('.modal-transaction-difuminar3').style.display="none";
       document.querySelector('.modal-transaction-difuminar4').style.display="none";
       document.querySelector('.modal-transaction-difuminar5').style.display="none";
       document.querySelector('.modal-transaction-difuminar6').style.display="none";
       setfinishModal(true);
       setTimeout(() => {
        e.target.parentNode.parentNode.classList.add('animation-left-transaction')
        
        setTimeout(() => {
            sethistory(false);
           
            e.target.parentNode.parentNode.classList.remove('animation-left-transaction')
        }, 1900);
    }, 0);
   
       
    }
  
    return (
        <div className="options-transaction-flex">
             
                    {
                        history===true ? 
                        
                        <div>       
                                       
                                 <div>
                                     <div className="modal-transaction-difuminar4"></div>  
                                     <div className="modal-transaction-difuminar5"></div>
                                     <div className="modal-transaction-difuminar6"> </div> 
                                 </div>

                                <History
                                FilterTransaction={FilterSelectedTransaction}
                                />
                                <div>
                                    <div className="modal-transaction-difuminar1"> </div> 
                                    <div className="modal-transaction-difuminar2"></div>
                                    <div className="modal-transaction-difuminar3"></div>   
                                </div>
                                
                                <div className="modal-transaction-buttons-submit">
                                    <button onClick={handleClickCancel} className="modal-transaction-cancel">Cancelar</button>
                                    <button onClick={handleClickFinish} className="modal-transaction-finish">Finalizar</button>
                                    <div className="modal-transaction-reload">
                                        <img className="modal-transaction-reload-img" src={Reload} alt="reload"/>
                                        <p>Recargar</p>
                                    </div>
                                </div>
                    
                        </div>
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
