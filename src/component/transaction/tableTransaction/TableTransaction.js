import React, {  } from 'react'
import './TableTransaction.css'
import TreePoints from '../../../assets/transaction/TreePoints.svg'

import moment from 'moment'

export const TableTransaction = (props) => {
  
    const setOpenModalTransaction =  props.setOpenModalTransaction;
    const api = props.api;
    

   
    const titulos = props.titulos;
    const cargarDatos =props.cargarDatos;

    const handleClickModal = (e) => {
        e.preventDefault();
     
        
        setOpenModalTransaction(true);
        
        
      
        cargarDatos(e);

    }

    
    

      
  


    return (
        <>
           
            <table  className="titleTableTransactions">
                <thead>
                        <tr key="tr-1"> 
                            <td key="1"></td>
                            <td key="2"></td>
                            {titulos ?  titulos.map(titulo => 
                                      <td key={titulo}>{titulo}</td>
                                )
                                : null
                            }
                           
                           
                        </tr>
                </thead>
                <tbody> 
                    
                    {
                        JSON.stringify(api)!=='{}' && api!==undefined ? api.map(dato => dato?<>
                            <tr  onClick={handleClickModal} key={dato.transaction.id}>
                                
                                    <td  name={dato.transaction.id}  key="1"></td>
                                    <td  name={dato.transaction.id} id={dato.transaction.id}><img  name={dato.transaction.id} id={dato.Transacción} className="img-filter-transaction"  src={TreePoints} alt="TreePoints" /> </td>
                                
                                    <td  name={dato.transaction.id}> {dato.transaction.transactionCode} </td>
                                    <td  name={dato.transaction.id}> {dato.transaction.externalPickerId}  </td>
                                    <td  name={dato.transaction.id}> {moment(dato.transaction.maxDeliveryDateTime.substring(0,10),"YYYY-MM-DD").format("DD/MM/YYYY")} </td>
                                    <td  name={dato.transaction.id}> {dato.transaction.state.name} {dato.transaction.inAlert?<div className="admin-table-alerta">En alerta</div>:null}</td>
                            </tr></>:null
                        )
                        :null

                        

                    }
                       
                     
                </tbody>
            </table>
        </>
    )
}
