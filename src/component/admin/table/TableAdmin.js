import React from "react";
import "./tableAdmin.scss";
import edit from "../../../assets/admin/PendingUser/edit.svg";
import moment from "moment";
import { Link } from "react-router-dom";

export const TableAdmin = (props) => {
    const { tableTitles, actualPage,data } = props;

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
                    <td></td>{console.log(actualPage)}

                    {

                        actualPage==="PENDING"  ?
                            tableTitles.map(titulo=>
                                <td key={titulo}>{titulo}</td>
                            )
                            : actualPage==="ACTIVE" ?
                            tableTitles.map(titulo=>
                                <td key={titulo}>{titulo}</td>
                            )
                            :null

                    }
                    <td></td>
                </tr>
                </thead>
                <tbody>

                {actualPage=== "PENDING"
                    ? data &&Array.isArray(data)?data.map((rows) => (
                            <tr className="info table-pending" key={rows.id}>
                                <td></td>
                                <td> { (rows.name+' '+rows.surname).length>20 ?  (rows.name+' '+rows.surname).substring(0,20)+'...': (rows.name+' '+rows.surname)} </td>
                                <td> {rows.identificationNumber} </td>
                                <td>
                                    {rows.email.length > 30  &&  window.screen.width<1900 ? rows.email.substring(0,30)+'...': rows.email.length > 40  &&  window.screen.width>1900  ? rows.email.substring(0,38)+'...': rows.email }
                                </td>
                                <td>
                                    {" "}
                                    {rows.vehicleTypeId === 1
                                        ? "Moto"
                                        : rows.vehicleTypeId === 2
                                            ? "Bici"
                                            : null}
                                </td>
                                <td className="table-registro"> <div className="table-admin-enCorrecion-span">{rows.registerDate?getDifDate(rows.registerDate):null} {getDifDate(rows.registerDate)===1?"día":"días"}</div> {rows.pickerStatusId===3 ?<div className="admin-table-correction">En corrección</div> : null } </td>
                                <td className="table-editar">
                                    <Link  to ={`/pendingUserAdminpicker/${rows.id}`} > <img src={edit} className="aditar-picker-img"  alt="edit" /></Link>

                                </td>
                                <td></td>
                            </tr>
                        ))
                        : null:null}

                {actualPage === "ACTIVE"
                    ?data && Array.isArray(data)? data.map((rows) => (
                            <tr className="info table-active-correcion" key={rows.id}>
                                <td></td>
                                <td > { (rows.name+' '+rows.surname).length>20 ?  (rows.name+' '+rows.surname).substring(0,20)+'...': (rows.name+' '+rows.surname)} </td>
                                <td > {rows.identificationNumber} </td>
                                <td> {rows.email.length > 35 ? rows.email.substring(0,35)+'...': rows.email}</td>
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
          