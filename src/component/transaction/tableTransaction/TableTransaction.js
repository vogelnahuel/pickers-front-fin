import React, {  } from 'react'
import './TableTransaction.css'
import TreePoints from '../../../assets/transaction/TreePoints.svg'
import api2 from '../../../config/api'

export const TableTransaction = (props) => {
  
    const setOpenModalTransaction =  props.setOpenModalTransaction;
    const api = props.api;
    
    const setFilterSelectedTransaction = props.setFilterSelectedTransaction;
   
    const titulos = props.titulos;

    const handleClickModal = (e) => {
        e.preventDefault();
        setOpenModalTransaction(true);
        console.log(e.target.parentNode.id)
        
        const cargarDatos = async()=> {
            setFilterSelectedTransaction( await  api2.get(`ms-admin-rest/api/v1.0/transactions/${Number(e.target.parentNode.id)}`) 
    
            .then((res) => {
                return res.data.result;
              })
              .catch((err) => {
                console.log(err);
              }))   
        }
        cargarDatos();

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
                        JSON.stringify(api)!=='{}' && api!==undefined ? api.map(dato => 
                            <tr key={dato.transaction.id}>
                                
                                 <td key="1"></td>
                                    <td  id={dato.transaction.id}><img  id={dato.Transacción} className="img-filter-transaction" onClick={handleClickModal} src={TreePoints} alt="TreePoints" /> </td>
                                
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
