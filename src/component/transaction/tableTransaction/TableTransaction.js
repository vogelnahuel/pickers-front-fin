import React from 'react'
import './TableTransaction.css'
import TreePoints from '../../../assets/transaction/TreePoints.svg'

export const TableTransaction = () => {
    const titulos = ['Transacción','Picker','Fecha de entrega','Estado'];
    const api = [
        {
            Transacción:'AAA114',
            Picker:'651456321',
            FechaEntrega:'17/06/2021',
            Estado:'En retiro'
        },
        {
            Transacción:'AAA113',
            Picker:'654321546',
            FechaEntrega:'17/06/2021',
            Estado:'En retiro'
        },
        {
            Transacción:'AAA112',
            Picker:'654321548',
            FechaEntrega:'17/06/2021',
            Estado:'Sin asignar'
        },
        {
            Transacción:'AAA111',
            Picker:'125485221',
            FechaEntrega:'17/06/2021',
            Estado:'Retirado'
        }
        
    ]

    const handleClickModal = (e) => {
        e.preventDefault();
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
