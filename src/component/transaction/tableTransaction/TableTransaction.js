import React from 'react'
import './TableTransaction.css'
import TreePoints from '../../../assets/transaction/TreePoints.svg'

export const TableTransaction = (props) => {
   
  
    const setOpenModalTransaction =  props.setOpenModalTransaction;
    const api = props.api;
   
    const titulos = props.titulos;
    const handleClickModal = (e) => {
        e.preventDefault();
        setOpenModalTransaction(true);
    }

 
    return (
        <>
           
            <table  className="titleTableTransactions">
                <thead>
                        <tr key="tr-1"> 
                            <td key="1"></td>
                            <td key="2"></td>
                            {titulos.map(titulo => 
                                      <td key={titulo}>{titulo}</td>
                                )
                            }
                           
                           
                        </tr>
                </thead>
                <tbody> 
                    
                    {
                       JSON.stringify(api)!=='{}' ? api.map(dato => 
                            <tr key={dato.transaction.id}>
                                 <td key="1"></td>
                                    <td ><img id={dato.Transacción} className="img-filter-transaction" onClick={handleClickModal} src={TreePoints} alt="TreePoints" /> </td>
                                
                                    <td >{dato.transaction.transactionCode} </td>
                                    <td >{dato.transaction.externalPickerId}  </td>
                                    <td > {dato.transaction.maxDeliveryDateTime.substring(0,10)} </td>
                                    <td > {dato.transaction.state.name} </td>
                            </tr>
                        )
                        :null

                    }
                       
                     
                </tbody>
            </table>
        </>
    )
}
