import React, {  } from 'react'
import './TableTransaction.css'
import TreePoints from '../../../assets/transaction/TreePoints.svg'
import moment from 'moment'
import { Fragment } from 'react'
import {TRANSACTION_STATE_ID_LABEL} from "utils/constants"
import { tableApiProps, tableTransactionPropsTypes } from './types'

export const TableTransaction = (props:tableTransactionPropsTypes) => {
  
    const setOpenModalTransaction =  props.setOpenModalTransaction;
    const api = props.api;
    const titulos = props.titulos;
    const cargarDatos =props.cargarDatos;

    const handleClickModal = (id:number) => {
        setOpenModalTransaction(true);
        cargarDatos(id);
    
    }

    const getKeyValue = function<T extends object, U extends keyof T> (obj: T, key: U) { return obj[key] }

    return (
        <div >
           
            <table  className="titleTableTransactions" >
                <thead >
                        <tr key={titulos[0]} > 
                            <td key={titulos[1]}></td>
                            <td key={titulos[2]}></td>

                            {titulos ?  titulos.map( (titulo:string) => 
                                (
                                    <Fragment key={titulo}>
                                        <td key={titulo}>{titulo}</td>
                                    </Fragment>
                                ) )
                                : null
                            }
                            <td key={titulos[3]}></td> 
                        </tr>
                </thead>
                <tbody> 
                    {
                        JSON.stringify(api)!=='{}' && api!==undefined ? api.map((dato:tableApiProps) => dato?
                        
                            <tr onClick={()=>handleClickModal(dato.transaction.id)} key={dato.transaction.id+"0"} >
                                
                                    <td  data-name={dato.transaction.id} key={dato.transaction.id+"1"}  ></td>
                                    <td  data-name={dato.transaction.id} id={`${dato.transaction.id}`} key={dato.transaction.id+"2"}  ><img key={dato.transaction.id+"3"}  data-name={dato.transaction.id} id={`${dato.transaction}`} className="img-transaction"  src={TreePoints} alt="TreePoints" /> </td>
                                
                                    <td  data-name={dato.transaction.id} key={dato.transaction.id+"4"} > {dato.transaction.transactionCode} </td>
                                    <td  data-name={dato.transaction.id} key={dato.transaction.id+"5"} > {dato.transaction.externalPickerId}  </td>
                                    <td  data-name={dato.transaction.id} key={dato.transaction.id+"6"} > {moment(dato.transaction.maxDeliveryDateTime.substring(0,10),"YYYY-MM-DD").format("DD/MM/YYYY")}           
                                     {
                                       window.innerWidth  < 1930 ?  <>{dato.transaction.inAlert?<div className="admin-table-alerta">En alerta</div>:null}</>: null
                                     }
                                    </td>
                          
                                    <td  data-name={dato.transaction.id} key={dato.transaction.id+"7"} > { getKeyValue(TRANSACTION_STATE_ID_LABEL, dato.transaction.state.id)}</td>
                                   <td></td>
                                   {
                                       window.innerWidth  > 1930 ? <td  data-name={"inAlert"} key={dato.transaction.id+"8"} > {dato.transaction.inAlert?<div className="admin-table-alerta">En alerta</div>:null}</td> : null
                                   }
                                    
                            </tr>
                        
                        :null
                        )
                        :null

                    }
                </tbody>
            </table>
        </div>
    )
}
