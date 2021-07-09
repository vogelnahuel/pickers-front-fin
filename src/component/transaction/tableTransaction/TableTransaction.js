import React from 'react'
import './TableTransaction.css'
import TreePoints from '../../../assets/transaction/TreePoints.svg'

export const TableTransaction = () => {
    const titulos = ['1ss','Transacción','Picker','Fecha de entrega','Estado'];
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
    return (
        <>
           
            <table  className="titleTableTransactions">
                <thead>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Transacción</td>
                       
                            <td>Picker</td>
                            <td>Fecha de entrega</td>
                            <td>Estado</td>
                        </tr>
                </thead>
                <tbody>
                        <tr>
                            <td></td>
                            <td ><img src={TreePoints} alt="TreePoints" /> </td>
                          
                            <td >AAA114</td>
                            <td >651456321</td>
                            <td >17/06/2021</td>
                            <td >En retiro</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><img src={TreePoints} alt="TreePoints" /> </td>
                       
                            <td>AAA114</td>
                            <td>651456321</td>
                            <td>17/06/2021</td>
                            <td>En retiro</td>
                        </tr>
                </tbody>
            </table>
        </>
    )
}
