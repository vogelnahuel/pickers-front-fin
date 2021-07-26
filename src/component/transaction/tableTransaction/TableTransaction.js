import React, {  } from 'react'
import './TableTransaction.css'
import TreePoints from '../../../assets/transaction/TreePoints.svg'
import api2 from '../../../config/api'
import moment from 'moment'

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
            console.log("entre")
            setFilterSelectedTransaction( await  api2.get(`ms-admin-rest/api/v1.0/transactions?${Number(e.target.parentNode.id)}`) 
    
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
                                    <td > {moment(dato.transaction.maxDeliveryDateTime.substring(0,10),"YYYY-MM-DD").format("DD/MM/YYYY")} </td>
                                    <td > {dato.transaction.state.name} {dato.transaction.inAlert?<div className="admin-table-alerta">En alerta</div>:null}</td>
                            </tr>
                        )
                        :null

                        

                    }
                       
                     
                </tbody>
            </table>
        </>
    )
}
