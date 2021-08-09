import React, { useState } from 'react'
import './optionList.css'
import { FinishModal } from './finish/FinishModal'
import { ReasonsCanceledConfirm } from './reasonsCanceledConfirm/ReasonsCanceledConfirm'
import { ReasonsCanceled } from './reasonsCanceled/ReasonsCanceled'
import { History } from './history/History.js'
import Reload from '../../../assets/transaction/Reload.svg'
//import {useDispatch} from 'react-redux'
import api from '../../../config/api'
import { DniFinish } from './dniFinish/DniFinish'
//import { changeTest } from '../../../actions/transactionAction'


export const OptionList = (props) => {

    //const dispatch = useDispatch()
    const FilterSelectedTransaction = props.FilterSelectedTransaction
    
    const [history, sethistory] = useState(true)
    const [reasonCancel, setreasonCancel] = useState(false);
    const [reasonId, setreasonId] = useState({})
    const [reasonCancelConfirm, setreasonCancelConfirm] = useState(false);
    const [finishModal, setfinishModal] = useState(false);
    const [dniFinish, setdniFinish] = useState(false)
   

    const handleClickCancel = (e) => {

        //dispatch(changeTest ("test2") )

        e.preventDefault();  

        document.querySelector('.modal-transaction-difuminar1').style.display="none";
        document.querySelector('.modal-transaction-difuminar2').style.display="none";
        document.querySelector('.modal-transaction-difuminar3').style.display="none";
        document.querySelector('.modal-transaction-difuminar4').style.display="none";
        document.querySelector('.modal-transaction-difuminar5').style.display="none";
        document.querySelector('.modal-transaction-difuminar6').style.display="none";

        setreasonCancel(true);
        setTimeout(() => {
            e.target.parentNode.parentNode.classList.add('animation-left-transaction')
            const insert = document.querySelector('.insertAnimation');
            const div = document.createElement('div');
            div.classList.add('animationReasons');
            setTimeout(() => {
                insert.appendChild(div)
            }, 200);

            setTimeout(() => {
                sethistory(false);
                e.target.parentNode.parentNode.classList.remove('animation-left-transaction')
                insert.removeChild(insert.firstChild);
            }, 500);
        }, 0);
       
    }
    const handleClickFinish = (e) => {
       e.preventDefault();
       
       document.querySelector('.modal-transaction-difuminar1').style.display="none";
       document.querySelector('.modal-transaction-difuminar2').style.display="none";
       document.querySelector('.modal-transaction-difuminar3').style.display="none";
       document.querySelector('.modal-transaction-difuminar4').style.display="none";
       document.querySelector('.modal-transaction-difuminar5').style.display="none";
       document.querySelector('.modal-transaction-difuminar6').style.display="none";

       setfinishModal(true);
       setTimeout(() => {
        e.target.parentNode.parentNode.classList.add('animation-left-transaction')
        const insert = document.querySelector('.insertAnimation');
        const div = document.createElement('div');
        div.classList.add('animationReasons');
        setTimeout(() => {
            insert.appendChild(div)
        }, 200);
        
        setTimeout(() => {
            sethistory(false);
            e.target.parentNode.parentNode.classList.remove('animation-left-transaction')
            insert.removeChild(insert.firstChild);
        }, 500);
    }, 0);}
   
    const handleReload = () =>{
        const reload = async()=> {
            // console.log(props.idTransaction)
            props.setFilterSelectedTransaction( await  api.get(`/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}`) 
            .then((res) => {
                // console.log(res.data.result)
                return res.data.result;
              })
              .catch((err) => {
                console.log(err);
              }))   
        }
        reload();
    }



    return (
        <div className="options-transaction-flex">
             
                    {
                        history===true ? 
                        
                        <div className="historial">       
                                       
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
                                    

                                    
                                    { FilterSelectedTransaction.transaction  && (FilterSelectedTransaction.transaction.state.id === 1 || FilterSelectedTransaction.transaction.state.id === 2 || FilterSelectedTransaction.transaction.state.id === 3 || FilterSelectedTransaction.transaction.state.id === 4 )?
                                    <>
                                    <button onClick={handleClickCancel} className="modal-transaction-finish-enabled">Cancelar</button>
                                    <button disabled={true} onClick={handleClickFinish} className="modal-transaction-cancel-disabled">Finalizar</button>
                                    </>: FilterSelectedTransaction.transaction  && (FilterSelectedTransaction.transaction.state.id === 5 || FilterSelectedTransaction.transaction.state.id === 6 || FilterSelectedTransaction.transaction.state.id === 7 || FilterSelectedTransaction.transaction.state.id === 8 )?  <>
                                    <button disabled={true} onClick={handleClickCancel} className="modal-transaction-finish-disabled">Cancelar</button>
                                    <button onClick={handleClickFinish} className="modal-transaction-cancel-enabled">Finalizar</button>
                                    </>: <>
                                    <button disabled={true} onClick={handleClickCancel} className="modal-transaction-cancel-disabled ">Cancelar</button>
                                    <button disabled={true} onClick={handleClickFinish} className="modal-transaction-finish-disabled">Finalizar</button>
                                    </>}
                                   
                                    <div onClick={handleReload} className="modal-transaction-reload">
                                        <img className="modal-transaction-reload-img" src={Reload} alt="reload"/>
                                        <p>Actualizar</p>
                                    </div>
                                </div>

                                
                    
                        </div>
                        : null
                        
                    }
                    
                    {
                    reasonCancel ===true ? 
                                <>
                                <div className="insertAnimation">
                                </div>
                                    <div>
                                        <ReasonsCanceled
                                        setreasonCancel={setreasonCancel}
                                        setreasonCancelConfirm={setreasonCancelConfirm}
                                        setreasonId={setreasonId}
                                        sethistory={sethistory}
                                        FilterSelectedTransaction={FilterSelectedTransaction}
                                        />
                                    </div>
                            </>
                        : null
                    }
                    {
                        reasonCancelConfirm ===true ? 
                        <>
                         <div className="insertAnimation"></div>

                         <ReasonsCanceledConfirm
                          setreasonCancel={setreasonCancel}
                          reasonId={reasonId}
                          setreasonCancelConfirm={setreasonCancelConfirm}
                          FilterSelectedTransaction={FilterSelectedTransaction}
                         />
                        </>
                        : null
                    }
                    {
                        
                        finishModal ===true ? 
                        <>
                        <div className="insertAnimation"></div>
                            <FinishModal
                            sethistory={sethistory}
                            setfinishModal={setfinishModal}
                            FilterSelectedTransaction={FilterSelectedTransaction}
                            setdniFinish={setdniFinish}
                            />
                        </>
                        : null
                    }
                    {
                        dniFinish === true ? 
                        <>
                            <div className="insertAnimation"></div>
                            <DniFinish
                            setfinishModal={setfinishModal}
                            setdniFinish={setdniFinish}
                            />
                        </>
                        : null 
                    }
       
        </div>
    )
}
