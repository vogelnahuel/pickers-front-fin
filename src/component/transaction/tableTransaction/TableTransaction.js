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
                        api.map(dato => 
                            <tr key={dato.Transacción}>
                                 <td key="1"></td>
                                    <td ><img id={dato.Transacción} className="img-filter-transaction" onClick={handleClickModal} src={TreePoints} alt="TreePoints" /> </td>
                                
                                    <td >{dato.Transacción} </td>
                                    <td >{dato.Picker}  </td>
                                    <td > {dato.FechaEntrega} </td>
                                    <td > {dato.Estado} </td>
                            </tr>
                        )

                    }
                       
                     
                </tbody>
            </table>
        </>
    )
}
