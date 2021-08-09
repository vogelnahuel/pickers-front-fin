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

    
    const stateNames = new Map()
    stateNames.set(1,"Sin asignar")
    stateNames.set(3,"En retiro")
    stateNames.set(4,"En punto de retiro")
    stateNames.set(5,"Retirado")
    stateNames.set(7,"En lugar de entrega")
    stateNames.set(10,"Entregado")
    stateNames.set(8,"En devolución")
    stateNames.set(11,"Devuelto a origen")
    stateNames.set(9,"Cancelado")
    stateNames.set(12,"Siniestrado")



      
  


    return (
        <div >
           
            <table  className="titleTableTransactions" >
                <thead >
                        <tr key={titulos[0]} > 
                            <td key={titulos[1]}></td>
                            <td key={titulos[2]}></td>
                            {titulos ?  titulos.map(titulo => 
                                      <td key={titulo}>{titulo}</td>
                                )
                                : null
                            }
                           
                           
                        </tr>
                </thead>
                <tbody> 
                    {console.log(api)}
                    {
                        
                        JSON.stringify(api)!=='{}' && api!==undefined ? api.map(dato => dato?
                        
                            <tr onClick={handleClickModal} key={dato.transaction.id+"0"} >
                                
                                    <td  name={dato.transaction.id} key={dato.transaction.id+"1"}  ></td>
                                    <td  name={dato.transaction.id} id={dato.transaction.id} key={dato.transaction.id+"2"}  ><img key={dato.transaction.id+"3"}  name={dato.transaction.id} id={dato.Transacción} className="img-filter-transaction"  src={TreePoints} alt="TreePoints" /> </td>
                                
                                    <td  name={dato.transaction.id} key={dato.transaction.id+"4"} > {dato.transaction.transactionCode} </td>
                                    <td  name={dato.transaction.id} key={dato.transaction.id+"5"} > {dato.transaction.externalPickerId}  </td>
                                    <td  name={dato.transaction.id} key={dato.transaction.id+"6"} > {moment(dato.transaction.maxDeliveryDateTime.substring(0,10),"YYYY-MM-DD").format("DD/MM/YYYY")} </td>
                                    <td  name={dato.transaction.id} key={dato.transaction.id+"7"} > {stateNames.get(dato.transaction.state.id)}</td>
                                    <td  name={"inAlert"} key={dato.transaction.id+"8"} > {dato.transaction.inAlert?<div className="admin-table-alerta">En alerta</div>:null}</td>
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
