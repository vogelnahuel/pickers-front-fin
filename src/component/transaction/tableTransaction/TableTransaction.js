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
        
        
        const cargarDatos = async()=> {
            
            setFilterSelectedTransaction( await  api2.get(`/ms-admin-rest/api/v1.0/transactions/${Number(e.target.getAttribute('name'))}`) 
    
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
                            <tr  onClick={handleClickModal} key={dato.transaction.id}>
                                
                                    <td  name={dato.transaction.id}  key="1"></td>
                                    <td  name={dato.transaction.id} id={dato.transaction.id}><img  name={dato.transaction.id} id={dato.Transacción} className="img-filter-transaction"  src={TreePoints} alt="TreePoints" /> </td>
                                
                                    <td  name={dato.transaction.id}> {dato.transaction.transactionCode} </td>
                                    <td  name={dato.transaction.id}> {dato.transaction.externalPickerId}  </td>
                                    <td  name={dato.transaction.id}> {moment(dato.transaction.maxDeliveryDateTime.substring(0,10),"YYYY-MM-DD").format("DD/MM/YYYY")} </td>
                                    <td  name={dato.transaction.id}> {dato.transaction.state.name} {dato.transaction.inAlert?<div className="admin-table-alerta">En alerta</div>:null}</td>
                            </tr>
                        )
                        :null

                        

                    }
                       
                     
                </tbody>
            </table>
        </>
    )
}
