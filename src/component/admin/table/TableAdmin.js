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
//   console.log(data);

  return (
    <table className="table-admin">
      <thead>
        <tr className="title-table">
          {window.location.pathname === "/pendingUserAdmin" &&
          titulosAdminPending !== undefined
            ? titulosAdminPending.map((rows) => <td key={rows}> {rows} </td>)
            : null}
          {window.location.pathname === "/activeUserAdmin" &&
          titulosAdminActive !== undefined
            ? titulosAdminActive.map((rows) => <td key={rows}> {rows} </td>)
            : null}
        </tr>
      </thead>
      <tbody>
        {window.location.pathname === "/pendingUserAdmin"
          ? data?data.map((rows) => (
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
                <td> {rows.registerDate?getDifDate(rows.registerDate):null} días</td>
                <td>
                  <Link  to ={`/pendingUserAdminpicker/${rows.id}`} > <img src={edit} alt="edit" /></Link>
                  
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
                <td> {rows.Transacciones} </td>
                {rows.pickerStatusId === 1 ? (
                  <td className="color-state-green"> {"Habilitado"} </td>
                ) : (
                  <td className="color-state-red"> {"Deshabilitado"} </td>
                )}

                <td>
                <Link  to ={`/activeUserAdminpicker/${rows.id}`} > <img src={edit} alt="edit" /></Link>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};
