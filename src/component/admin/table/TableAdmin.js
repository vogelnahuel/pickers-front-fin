import React from 'react'
import './tableAdmin.css'
import edit from '../../../assets/admin/PendingUser/edit.svg'


export const TableAdmin = () => {
    const  api = [
        {
          "id": 1,
          "nombre": "delectus aut autem",
          "email": "test@test.com",
          "vehiculo":"test",
          "pendienteHace":"1 dia",
        },
        {
            "id": 2,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
          },
          {
            "id": 3,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
          },
          {
            "id": 4,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
          },
          {
            "id": 5,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
          },
          {
            "id": 6,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
          },
          {
            "id": 7,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
          },
          {
            "id": 8,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
          },
          {
            "id": 9,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
          },
          {
            "id": 10,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
          },
          {
            "id": 11,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
          },
];

const titulosAdminPending = ['Nombre','DNI','Email','vehiculo','Pendiente hace','Editar'];
const titulosAdminActive = ['Nombre','DNI','Email','vehiculo','Transacciones','Estado','Editar'];


    return (
        <table className="table-admin">
            <thead>
                    <tr className="title-table">
                        {
                            window.location.pathname==='/pendingUserAdmin'  ?
                                titulosAdminPending.map(rows => (
                                    <td key={rows}> {rows} </td>                                 
                                ))
                            : null
                        }
                        {
                            window.location.pathname==='/activeUserAdmin'  ?
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
                        api.map(rows => (
                            <tr className="info"
                                key={rows.id}
                            > 
                                <td>  {rows.nombre} </td>
                                <td>  {rows.id} </td>
                                <td>  {rows.email}</td>
                                <td>  {rows.vehiculo}</td>
                                <td>  {rows.pendienteHace} </td>
                                <td>  <img src={edit} alt="edit"/> </td>
                            </tr>
                            ))
                 : null
            } 

            {
                window.location.pathname==='/activeUserAdmin'  ?
                            api.map(rows => (
                                <tr className="info"
                                    key={rows.id}
                                > 
                                    <td>  {rows.nombre} </td>
                                    <td>  {rows.id} </td>
                                    <td>  {rows.email}</td>
                                    <td>  {rows.vehiculo}</td>
                                    <td>  {rows.transacciones} </td>
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
