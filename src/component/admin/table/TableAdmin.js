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
                    <td></td>
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
                                    {rows.vehicleType === "motorcycle"
                                        ? "Moto"
                                        : rows.vehicleType === "bicycle"
                                            ? "Bici"
                                            : null}
                                </td>
                                <td className="table-registro"> <div className="table-admin-enCorrecion-span">{rows.registerDate?getDifDate(rows.registerDate):null} {getDifDate(rows.registerDate)===1?"día":"días"}</div> {rows.status.id===3 ?<div className="admin-table-correction">En corrección</div> : null } </td>
                                <td className="table-editar">
                                    <Link  to ={`/pickers/${rows.id}`} > <img src={edit} className="aditar-picker-img"  alt="edit" /></Link>

                                </td>
                                <td></td>
                            </tr>
                        ))
                        : null:null}

                {actualPage === "ACTIVE"
                    ?data && Array.isArray(data)? data.map((row) => (
                            <tr className="info table-active-correcion" key={row.id}>
                                <td></td>
                                <td > { (row.name+' '+row.surname).length>20 ?  (row.name+' '+row.surname).substring(0,20)+'...': (row.name+' '+row.surname)} </td>
                                <td > {row.identificationNumber} </td>
                                <td> {row.email.length > 35 ? row.email.substring(0,35)+'...': row.email}</td>
                                <td>
                                    {" "}
                                    {row.vehicleType === "motorcycle"
                                        ? "Moto"
                                        : row.vehicleType === "bicycle"
                                            ? "Bici"
                                            : null}
                                </td>
                                    <td className={row.status.id === 4 ? "color-state-green table-registro" : "color-state-red table-registro" } id={row.status.id === 4 ? "color-state-green" : "color-state-red"}> {row.status.description} </td>
                                <td className="table-editar table-editar-active">
                                    <Link  to ={`/pickers/${row.id}`} > <img src={edit} className="aditar-picker-img" alt="edit" /></Link>
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
          