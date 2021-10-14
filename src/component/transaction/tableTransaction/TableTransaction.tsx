import React, {  } from 'react'
import './TableTransaction.css'
import TreePoints from '../../../assets/transaction/TreePoints.svg'
import moment from 'moment'
import { Fragment } from 'react'
import { TableTransactionPropsTypes } from './types'
import { TransactionResponseTypeResult } from 'sagas/types/transactions'
import {transactionTableTitles} from './../../../utils/constants'


export const TableTransaction = ({transactions}:TableTransactionPropsTypes) => {
  
    // const setOpenModalTransaction =  props.setOpenModalTransaction;
    // const api = props.api;
    // const cargarDatos =props.cargarDatos;
    const handleClickModal = (id:number) => {
        // setOpenModalTransaction(true);
        // cargarDatos(id);
    }


    return (
        <div >
           
            <table  className="titleTableTransactions" >
                <thead >
                        <tr> 
                            <td key="action"></td>
                            <td key="actions"></td>
                            {transactionTableTitles.map( (titulo:string) => 
                                (
                                    
                                        <td key={titulo}>{titulo}</td>
                                    
                                ) 
                                )
                               
                            }
                            <td key={transactionTableTitles[3]}></td> 
                        </tr>
                </thead>
                <tbody> 
                    {
                        transactions.length>0 && transactions.map((data:TransactionResponseTypeResult) => 
                        
                            <tr  key={data.transaction.id} onClick={()=>handleClickModal(data.transaction.id)} >
                                
                                    <td    ></td>
                                    <td   ><img  data-name={data.transaction.id} id={`${data.transaction}`} className="img-transaction"  src={TreePoints} alt="TreePoints" /> </td>
                                
                                    <td   > {data.transaction.transactionCode} </td>
                                    <td  > {data.transaction.externalPickerId}  </td>
                                    <td > {moment(data.transaction.maxDeliveryDateTime.substring(0,10),"YYYY-MM-DD").format("DD/MM/YYYY")}           
                                     {
                                       window.innerWidth  < 2500 ?  <>{data.transaction.inAlert?<div className="admin-table-alerta">En alerta</div>:null}</>: null
                                     }
                                    </td>
                          
                                    <td  > {  data.transaction.state.name }</td>
                                   
                                   {
                                       window.innerWidth  > 2500 ? <td   > {data.transaction.inAlert?<div className="admin-table-alerta">En alerta</div>:null}</td> : null
                                   }
                                     <td    ></td>
                            </tr>
                        
                
                        )
                       

                    }
                </tbody>
            </table>
        </div>
    )
}
