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
                    ? data &&Array.isArray(data)?data.map((row) => (
                            <tr className="table-info table-pending" key={row.id}>
                                <td></td>
                                <td> { `${row.name} ${row.surname}` } </td>
                                <td> {row.identificationNumber} </td>
                                <td>
                                    {row.email }
                                </td>
                                <td>
                                    {" "}
                                    {row.vehicleType === "motorcycle"
                                        ? "Moto"
                                        : row.vehicleType === "bicycle"
                                            ? "Bici"
                                            : null}
                                </td>
                                <td className="table-registro"> <div className="table-admin-enCorrecion-span">{row.registerDate?getDifDate(row.registerDate):null} {getDifDate(row.registerDate)===1?"día":"días"}</div> {row.status.id===3 ?<div className="admin-table-correction">En corrección</div> : null } </td>
                                <td className="table-editar">
                                    <Link  to ={`/pickers/${row.id}`} > <img src={edit} className="aditar-picker-img"  alt="edit" /></Link>

                                </td>
                                <td></td>
                            </tr>
                        ))
                        : null:null}

                {actualPage === "ACTIVE"
                    ?data && Array.isArray(data)? data.map((row) => (
                            <tr className="table-info table-active-correcion" key={row.id}>
                                <td></td>
                                <td > { `${row.name} ${row.surname}`} </td>
                                <td > {row.identificationNumber} </td>
                                <td> {row.email}</td>
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
          