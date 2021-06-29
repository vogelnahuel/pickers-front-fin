
          import React from "react";
          import "./tableAdmin.css";
          import edit from "../../../assets/admin/PendingUser/edit.svg";
          import moment from "moment";
          import { Link } from "react-router-dom";
          
          export const TableAdmin = (props) => {
            const { titulosAdminPending, titulosAdminActive, data } = props;
            
            const getDifDate = (date) => {
              var regDate = moment();
              var actualDate = moment(date, "YYYY-MM-DD hh:mm:ss");
             return regDate.diff(actualDate, "days");
            };
        
          
return (
  <>
                        { 
                                  
                          <div className="title-table">
                            {
                                window.location.pathname === "/pendingUserAdmin" &&
                                titulosAdminPending !== undefined && 
                                titulosAdminPending[0] === "Nombre" ?
                                <div className="title-table-nombre" > Nombre </div>
                                : null
                                  
                            }
                            {
                                window.location.pathname === "/pendingUserAdmin" &&
                                titulosAdminPending !== undefined && 
                                titulosAdminPending[0] === "Nombre" ?
                                <div className="title-table-dni"> DNI </div>
                                : null
                                  
                            }
                            {
                                window.location.pathname === "/pendingUserAdmin" &&
                                titulosAdminPending !== undefined && 
                                titulosAdminPending[0] === "Nombre" ?
                                <div className="title-table-email"> Email </div>
                                : null
                                  
                            }
                            {
                                window.location.pathname === "/pendingUserAdmin" &&
                                titulosAdminPending !== undefined && 
                                titulosAdminPending[0] === "Nombre" ?
                                <div className="title-table-vehiculo"> Vehículo </div>
                                : null
                                  
                            }
                            {
                                window.location.pathname === "/pendingUserAdmin" &&
                                titulosAdminPending !== undefined && 
                                titulosAdminPending[0] === "Nombre" ?
                                <div className="title-table-pendding"> Pendiente hace </div>
                                : null
                                  
                            }
                            {
                                window.location.pathname === "/pendingUserAdmin" &&
                                titulosAdminPending !== undefined && 
                                titulosAdminPending[0] === "Nombre" ?
                                <div className="title-table-editar" > Editar </div>
                                : null
                                  
                            }
                            

                            

{
                                window.location.pathname === "/activeUserAdmin" &&
                                titulosAdminActive !== undefined && 
                                titulosAdminActive[0] === "Nombre" ?
                                <div className="title-table-nombre active-table-nombre" > Nombre </div>
                                : null
                                  
                            }
                            {
                                 window.location.pathname === "/activeUserAdmin" &&
                                 titulosAdminActive !== undefined && 
                                 titulosAdminActive[0] === "Nombre" ?
                                <div className="title-table-dni active-table-dni"> DNI </div>
                                : null
                                  
                            }
                            {
                                window.location.pathname === "/activeUserAdmin" &&
                                titulosAdminActive !== undefined && 
                                titulosAdminActive[0] === "Nombre" ?
                                <div className="title-table-email active-table-email"> Email </div>
                                : null
                                  
                            }
                            {
                                window.location.pathname === "/activeUserAdmin" &&
                                titulosAdminActive !== undefined && 
                                titulosAdminActive[0] === "Nombre" ?
                                <div className="title-table-vehiculo active-table-vehiculo"> Vehículo </div>
                                : null
                                  
                            }
                            {
                                 window.location.pathname === "/activeUserAdmin" &&
                                 titulosAdminActive !== undefined && 
                                 titulosAdminActive[0] === "Nombre" ?
                                <div className="title-table-pendding active-table-estado"> Estado </div>
                                : null
                                  
                            }
                            {
                                 window.location.pathname === "/activeUserAdmin" &&
                                 titulosAdminActive !== undefined && 
                                 titulosAdminActive[0] === "Nombre" ?
                                <div className="title-table-editar active-table-editar" > Editar </div>
                                : null
                                  
                            }

                            </div>

                        
                      }

          <table className="table-admin">
               
                <tbody>
                 
                  {window.location.pathname === "/pendingUserAdmin"
                    ? data &&Array.isArray(data)?data.map((rows) => (
                        <tr className="info" key={rows.id}>
                          <td className="table-name"> {rows.name} </td>
                          <td className="table-dni"> {rows.identificationNumber} </td>
                          <td className="table-email"> {rows.email}</td>
                          <td className="table-vehiculo">
                            {" "}
                            {rows.vehicleTypeId === 1
                              ? "Moto"
                              : rows.vehicleTypeId === 2
                              ? "Bici"
                              : null}
                          </td>
                          <td className="table-registro"> {rows.registerDate?getDifDate(rows.registerDate):null} días {rows.pickerStatusId===3 ?<div className="admin-table-correction">En correcion</div> : null } </td>
                          <td className="table-editar">
                            <Link  to ={`/pendingUserAdminpicker/${rows.id}`} > <img src={edit} alt="edit" /></Link>
                            
                          </td>
                        </tr>
                      ))
                    : null:null}
          
                  {window.location.pathname === "/activeUserAdmin"
                    ?data && Array.isArray(data)? data.map((rows) => (
                        <tr className="info" key={rows.id}>
                          <td className="table-name"> {rows.name} </td>
                          <td className="table-dni"> {rows.identificationNumber} </td>
                          <td className="table-email"> {rows.email}</td>
                          <td className="table-vehiculo">
                            {" "}
                            {rows.vehicleTypeId === 1
                              ? "Moto"
                              : rows.vehicleTypeId === 2
                              ? "Bici"
                              : null}
                          </td>
                          {/* <td> {rows.Transacciones} </td> */}
                          {rows.pickerStatusId === 4 ? (
                            <td className="color-state-green table-registro"> {"Habilitado"} </td>
                          ) : (
                            <td className="color-state-red table-registro"> {"Deshabilitado"} </td>
                          )}
          
                          <td className="table-editar table-editar-active">
                          <Link  to ={`/activeUserAdminpicker/${rows.id}`} > <img src={edit} alt="edit" /></Link>
                          </td>
                        </tr>
                      ))
                    : null:null}
                </tbody>
              </table>
              </>
            );
          };
          