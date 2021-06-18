
          import React from "react";
          import "./tableAdmin.css";
          import edit from "../../../assets/admin/PendingUser/edit.svg";
          import moment from "moment";
          import { Link } from "react-router-dom";
          
          export const TableAdmin = (props) => {
            const { titulosAdminPending, titulosAdminActive, data } = props;
            
            console.log(titulosAdminPending)
            const getDifDate = (date) => {
              var regDate = moment();
              var actualDate = moment(date, "YYYY-MM-DD hh:mm:ss");
             return regDate.diff(actualDate, "days");
            };
          //   console.log(data);
          
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
                            

                            {     window.location.pathname === "/activeUserAdmin" &&
                                titulosAdminActive !== undefined
                                  ? titulosAdminActive.map((rows) => <div key={rows}> {rows} </div>)
                                  : null
                            }

                            </div>

                        
                      }

          <table className="table-admin">
               
                <tbody>
                  {window.location.pathname === "/pendingUserAdmin"
                    ? data?data.map((rows) => (
                        <tr className="info" key={rows.id}>
                          <td className="table-name"> {rows.name} </td>
                          <td className="table-dni"> {rows.identificationNumber} </td>
                          <td className="table-email"> {rows.email}</td>
                          <td className="table-vehiculo">
                            {" "}
                            {rows.vehicleTypeId === 1
                              ? "moto"
                              : rows.vehicleTypeId === 2
                              ? "bici"
                              : null}
                          </td>
                          <td className="table-registro"> {rows.registerDate?getDifDate(rows.registerDate):null} días {rows.pickerStatusId===3 ?<div className="admin-table-correction">En correcion</div> : null } </td>
                          <td className="table-editar">
                            <Link  to ={`/pendingUserAdminpicker/${rows.email}`} > <img src={edit} alt="edit" /></Link>
                            
                          </td>
                        </tr>
                      ))
                    : null:null}
          
                  {window.location.pathname === "/activeUserAdmin"
                    ? data.map((rows) => (
                        <tr className="info" key={rows.id}>
                          <td> {rows.name} </td>
                          <td> {rows.identificationNumber} </td>
                          <td> {rows.email}</td>
                          <td>
                            {" "}
                            {rows.vehicleTypeId === 1
                              ? "moto"
                              : rows.vehicleTypeId === 2
                              ? "bici"
                              : null}
                          </td>
                          {/* <td> {rows.Transacciones} </td> */}
                          {rows.pickerStatusId === 1 ? (
                            <td className="color-state-green"> {"Habilitado"} </td>
                          ) : (
                            <td className="color-state-red"> {"Deshabilitado"} </td>
                          )}
          
                          <td>
                          <Link  to ={`/activeUserAdminpicker/${rows.email}`} > <img src={edit} alt="edit" /></Link>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
              </>
            );
          };
          