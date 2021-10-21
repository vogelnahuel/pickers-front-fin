import React, { useState } from 'react'
import './optionList.css'
import  FinishModal  from '../finish/FinishModal'
import  ReasonsCanceledConfirm  from '../reasonsCanceledConfirm/ReasonsCanceledConfirm'
import  ReasonsCanceled  from '../reasonsCanceled/ReasonsCanceled'
import Reload from 'assets/transaction/Reload.svg'
//import {useDispatch} from 'react-redux'

import DniFinish from '../dniFinish/DniFinish'
import { Undelivered } from '../undelivered/Undelivered'
import api from 'middleware/api'
//import { changeTest } from '../../../actions/transactionAction'


export const OptionList = (props:any) => {

    //const dispatch = useDispatch()
    const FilterSelectedTransaction = props.FilterSelectedTransaction
    const setisFetchingModal = props.setisFetchingModal;
    
    const [history, sethistory] = useState(true)
    const [reasonCancel, setreasonCancel] = useState(false);
    const [reasonCancelConfirm, setreasonCancelConfirm] = useState(false);
    const [finishModal, setfinishModal] = useState(false);
    const [dniFinish, setdniFinish] = useState(false)
    const [undelivered, setundelivered] = useState(false)
    const [msgSelected, setmsgSelected] = useState("")
   

    const [reasonId, setreasonId] = useState({})

    const handleClickCancel = (e:any) => {

        //dispatch(changeTest ("test2") )

        e.preventDefault();  



        setreasonCancel(true);
        setTimeout(() => {
            e.target.parentNode.parentNode.classList.add('animation-left-transaction')
            const insert:any = document.querySelector('.insertAnimation');
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
    const handleClickFinish = (e:any) => {
       e.preventDefault();
       

       setfinishModal(true);
       setTimeout(() => {
        e.target.parentNode.parentNode.classList.add('animation-left-transaction')
        const insert:any = document.querySelector('.insertAnimation');
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
            setisFetchingModal(true);
          
            props.setFilterSelectedTransaction( await  api.get(`/ms-admin-rest/api/v1.0/transactions/${FilterSelectedTransaction.transaction.id}`) 
            .then((res) => {
           
                return res.data.result;

              })
              .catch((err) => {
                console.log(err);
              }))

              setisFetchingModal(false); 
          
           
        }
        reload();
    }



    return (
        <>
        <div className="options-transaction-flex">
             
                    {
                        history===true ? 
                        
                        <div className="historial">       
                                       
                               
                                
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
                                        <ReasonsCanceled onBack={()=>{}} ReasonsCanceledConfirm={()=>{}}                                  
                                      
                                        />
                                    </div>
                            </>
                        : null
                    }
                    {
                        reasonCancelConfirm ===true ? 
                        <>
                         <div className="insertAnimation"></div>

                         <ReasonsCanceledConfirm onBack={()=>{}}                          
                         />
                        </>
                        : null
                    }
                    {
                        
                        finishModal ===true ? 
                        <>
                        {/* <div className="insertAnimation"></div>
                            <FinishModal
                            sethistory={sethistory}
                            setfinishModal={setfinishModal}
                            FilterSelectedTransaction={FilterSelectedTransaction}
                            setdniFinish={setdniFinish}
                            setundelivered={setundelivered}
                            /> */}
                        </>
                        : null
                    }
                    {
                        dniFinish === true ? 
                        <>
                            {/* <div className="insertAnimation"></div>
                            <DniFinish
                            setfinishModal={setfinishModal}
                            setdniFinish={setdniFinish}
                            FilterSelectedTransaction={FilterSelectedTransaction}

                            /> */}
                        </>
                        : null 
                    }
                    {
                        undelivered === true ? 
                        <>
                            <div className="insertAnimation"></div>
                        <Undelivered
                         setfinishModal={setfinishModal}
                        setundelivered={setundelivered}
                        FilterSelectedTransaction={FilterSelectedTransaction}
                        />
                        </>  : null 
                    }

              
        </div>
         
          </>
    )
}
