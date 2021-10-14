import React, { useState } from 'react'
import './TableTransaction.scss'
import TreePoints from '../../../assets/transaction/TreePoints.svg'
import moment from 'moment'

import { TableTransactionPropsTypes } from './types'
import { TransactionResponseTypeResult } from 'sagas/types/transactions'
import {transactionTableTitles} from './../../../utils/constants'





export const TableTransaction = ({transactions}:TableTransactionPropsTypes) => {

    const handleClickModal = (id:number) => {
       
    }

    return (
        <div >

           
            <table  className="titleTableTransactions" >
                <thead >
                        <tr> 
                            <td key="action"></td>
                            <td key="actions"></td>
                            {transactionTableTitles.map( (titulo:string) => 
                                (<td key={titulo}>{titulo}</td>)  ) 
                            }
                            <td key={transactionTableTitles[3]}></td> 
                        </tr>
                </thead>
                <tbody> 
                    {
                        transactions.length>0 && transactions.map((data:TransactionResponseTypeResult) => 
                        
                            <tr  key={data.transaction.id} onClick={()=>handleClickModal(data.transaction.id)} >
                                
                                    <td></td>
                                    <td><img  data-name={data.transaction.id} id={`${data.transaction}`} className="img-transaction"  src={TreePoints} alt="TreePoints" /> </td>
                                    <td> {data.transaction.transactionCode} </td>
                                    <td> {data.transaction.externalPickerId}</td>
                                    <td> {moment(data.transaction.maxDeliveryDateTime.substring(0,10),"YYYY-MM-DD").format("DD/MM/YYYY")}           
                                     {data.transaction.inAlert&&<div className="admin-table-alerta">En alerta</div>}
                                    </td>
                                         <td  > {  data.transaction.state.name }</td>
                                     <td></td>
                            </tr>
                        )}
                </tbody>
            </table>

                

         
        </div>
    )
}
