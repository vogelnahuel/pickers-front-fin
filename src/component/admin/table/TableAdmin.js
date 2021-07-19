
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
                     

          <table className="table-admin">
                    <thead>
                             <tr>
                                  <td></td>
                               
                                  { 
                                     
                                      window.location.pathname==="/pendingUserAdmin"  ?
                                      titulosAdminPending.map(titulo=>
                                        <td key={titulo}>{titulo}</td>
                                      )
                                      : window.location.pathname==="/activeUserAdmin" ?
                                      titulosAdminActive.map(titulo=>
                                        <td key={titulo}>{titulo}</td>
                                      )
                                      :null
                                    
                                  }
                                  <td></td>
                              </tr>
                  </thead>
                <tbody>
                 
                  {window.location.pathname === "/pendingUserAdmin"
                    ? data &&Array.isArray(data)?data.map((rows) => (
                        <tr className="info" key={rows.id}>
                          <td></td>
                          <td> {rows.name} {rows.surname} </td>
                          <td> {rows.identificationNumber} </td>
                          <td> {rows.email}</td>
                          <td>
                            {" "}
                            {rows.vehicleTypeId === 1
                              ? "Moto"
                              : rows.vehicleTypeId === 2
                              ? "Bici"
                              : null}
                          </td>
                          <td className="table-registro"> {rows.registerDate?getDifDate(rows.registerDate):null} {getDifDate(rows.registerDate)===1?"día":"días"} {rows.pickerStatusId===3 ?<div className="admin-table-correction">En corrección</div> : null } </td>
                          <td className="table-editar">
                            <Link  to ={`/pendingUserAdminpicker/${rows.id}`} > <img src={edit} className="aditar-picker-img"  alt="edit" /></Link>
                            
                          </td>
                          <td></td>
                        </tr>
                      ))
                    : null:null}
          
                  {window.location.pathname === "/activeUserAdmin"
                    ?data && Array.isArray(data)? data.map((rows) => (
                        <tr className="info" key={rows.id}>
                          <td></td>
                          <td > {rows.name} {rows.surname} </td>
                          <td > {rows.identificationNumber} </td>
                          <td> {rows.email}</td>
                          <td>
                            {" "}
                            {rows.vehicleTypeId === 1
                              ? "Moto"
                              : rows.vehicleTypeId === 2
                              ? "Bici"
                              : null}
                          </td>
                          {/* <td> {rows.Transacciones} </td> */}
                          {rows.pickerStatusId === 4 ? (
                            <td className="color-state-green table-registro" id="color-state-green"> {"Habilitado"} </td>
                          ) : (
                            <td className="color-state-red table-registro" id="color-state-red"> {"Deshabilitado"} </td>
                          )}
          
                          <td className="table-editar table-editar-active">
                          <Link  to ={`/activeUserAdminpicker/${rows.id}`} > <img src={edit} className="aditar-picker-img" alt="edit" /></Link>
                          </td>
                          <td></td>
                        </tr>
                      ))
                    : null:null}
                </tbody>
              </table>
              </>
            );
          };
          