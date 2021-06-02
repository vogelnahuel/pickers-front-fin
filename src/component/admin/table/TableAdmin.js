import React from 'react'
import './tableAdmin.css'
import edit from '../../../assets/admin/PendingUser/edit.svg'


export const TableAdmin = (props) => {
  const {titulosAdminPending,titulosAdminActive} = props;
  console.log(titulosAdminPending)
  console.log(titulosAdminActive)
    const  api = [
        {
          "id": 1,
          "nombre": "delectus aut autem",
          "email": "test@test.com",
          "vehiculo":"test",
          "pendienteHace":"1 dia",
          "estado":"Habilitado",
          "Transacciones": "10"
        },
        {
            "id": 2,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
            "estado":"Habilitado",
            "Transacciones": "10"
          },
          {
            "id": 3,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
            "estado":"Habilitado",
            "Transacciones": "10"
          },
          {
            "id": 4,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
            "estado":"Deshabilitado", 
            "Transacciones": "7"
          },
          {
            "id": 5,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
            "estado":"Deshabilitado",
            "Transacciones": "7"
          },
          {
            "id": 6,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
            "estado":"Deshabilitado",
            "Transacciones": "7"
          },
          {
            "id": 7,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
            "estado":"Deshabilitado",
            "Transacciones": "7"
          },
          {
            "id": 8,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
            "estado":"Habilitado",
            "Transacciones": "7"
          },
          {
            "id": 9,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
            "estado":"Deshabilitado",
            "Transacciones": "11"
          },
          {
            "id": 10,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
            "estado":"Habilitado",
            "Transacciones": "11"
          },
          {
            "id": 11,
            "nombre": "delectus aut autem",
            "email": "test@test.com",
            "vehiculo":"test",
            "pendienteHace":"1 dia",
            "estado":"Habilitado",
            "Transacciones": "19"
          },
];



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
