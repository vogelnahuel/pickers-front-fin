import React from 'react'
import './tableAdmin.css'
import edit from '../../../assets/admin/PendingUser/edit.svg'
import moment from 'moment';


export const TableAdmin = (props) => {
  const {titulosAdminPending,titulosAdminActive,data} = props;

var regDate =moment()
var actualDate = moment('2021-06-04 18:06:38', 'YYYY-MM-DD hh:mm:ss')
var difRegDate =regDate.diff(actualDate, 'days')

console.log(data)

    return (
      
        <table className="table-admin">
            <thead>
                    <tr className="title-table">
                        {
                           
                           
                            window.location.pathname==='/pendingUserAdmin'  && titulosAdminPending !==undefined ?
                                titulosAdminPending.map(rows => (
                                    <td key={rows}>  {rows} </td>                                 
                                ))
                            : null
                        }
                        {
                            window.location.pathname==='/activeUserAdmin' && titulosAdminActive !==undefined  ?
                            titulosAdminActive.map(rows => (
                                    <td key={rows}> {rows} </td>                                 
                                ))
                            : null
                        }
                    </tr>
            </thead>
            <tbody>

            {
               window.location.pathname==='/pendingUserAdmin'  ?
                        data.map(rows => (
                            <tr className="info"
                                key={rows.id}
                            > 
                                <td>  {rows.name} </td>
                                <td>  {rows.id} </td>
                                <td>  {rows.user.email}</td>
                                <td>  {rows.vehicleTypeId==1?"moto":rows.vehicleTypeId==2?"bici":null}</td>
                                <td>  {difRegDate} días </td>
                                <td>  <img src={edit} alt="edit"/> </td>
                            </tr>
                            ))
                 : null
            } 

            {
                window.location.pathname==='/activeUserAdmin'  ?
                            data.map(rows => (
                                <tr className="info"
                                    key={rows.id}
                                > 
                                    <td>  {rows.nombre} </td>
                                    <td>  {rows.id} </td>
                                    <td>  {rows.email}</td>
                                    <td>  {rows.vehiculo}</td>
                                    <td>  {rows.Transacciones} </td>
                                    {
                                        rows.estado ==='Habilitado' 
                                        ? <td className="color-state-green">  {rows.estado} </td>
                                        : <td className="color-state-red">  {rows.estado} </td>
                                    }
                                    
                                    <td>  <img src={edit} alt="edit"/> </td>
                                </tr>
                                ))
                    : null
                }
           
            </tbody>
           
           
            
            
        </table>
    )
}
