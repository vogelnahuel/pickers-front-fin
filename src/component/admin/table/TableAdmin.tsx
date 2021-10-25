import React from "react";
import "./tableAdmin.scss";
import edit from "../../../assets/admin/PendingUser/edit.svg";
import moment from "moment";
import {
  actions as pendingUserActions,
  selectors as pendingUserSelectors,
} from "reducers/pickers";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ParamsMiddlewareType, PickersParamsType } from "pages/pickers/types";
import { AppDispatch, RootState } from "store";

const TableAdmin: React.FC<any> = ({
  tableTitles,
  actualPage,
  pendingUsers,
}): JSX.Element => {
  const getDifDate = (date: any) => {
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
            {actualPage === "PENDING"
              ? tableTitles.map((titulo: any) => <td key={titulo}>{titulo}</td>)
              : tableTitles.map((titulo: any) => (
                  <td key={titulo}>{titulo}</td>
                ))}
            <td></td>
          </tr>
        </thead>
        <tbody>
          {actualPage === "PENDING" &&
            pendingUsers.map((row: any) => (
              <tr className="table-info table-pending" key={row.id}>
                <td></td>
                <td> {`${row.name} ${row.surname}`} </td>
                <td> {row.identificationNumber} </td>
                <td>{row.email}</td>
                <td>
                  {" "}
                  {row.vehicleType === "motorcycle"
                    ? "Moto"
                    : row.vehicleType === "bicycle"
                    ? "Bici"
                    : null}
                </td>
                <td className="table-registro">
                  {" "}
                  <div className="table-admin-enCorrecion-span">
                    {row.registerDate ? getDifDate(row.registerDate) : null}{" "}
                    {getDifDate(row.registerDate) === 1 ? "día" : "días"}
                  </div>{" "}
                  {row.status.id === 3 ? (
                    <div className="admin-table-correction">En corrección</div>
                  ) : null}{" "}
                </td>
                <td className="table-editar">
                  <Link to={`/pickers/${row.id}`}>
                    {" "}
                    <img src={edit} className="aditar-picker-img" alt="edit" />
                  </Link>
                </td>
                <td></td>
              </tr>
            ))}

          {actualPage === "ACTIVE" &&
            pendingUsers.map((row: any) => (
              <tr className="table-info table-active-correcion" key={row.id}>
                <td></td>
                <td> {`${row.name} ${row.surname}`} </td>
                <td> {row.identificationNumber} </td>
                <td> {row.email}</td>
                <td>
                  {" "}
                  {row.vehicleType === "motorcycle"
                    ? "Moto"
                    : row.vehicleType === "bicycle"
                    ? "Bici"
                    : null}
                </td>
                <td
                  className={
                    row.status.id === 4
                      ? "color-state-green table-registro"
                      : "color-state-red table-registro"
                  }
                  id={
                    row.status.id === 4
                      ? "color-state-green"
                      : "color-state-red"
                  }
                >
                  {" "}
                  {row.status.description}{" "}
                </td>
                <td className="table-editar table-editar-active">
                  <Link to={`/pickers/${row.id}`}>
                    {" "}
                    <img src={edit} className="aditar-picker-img" alt="edit" />
                  </Link>
                </td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  pendingUsers: pendingUserSelectors.getPendingUser(state),
  isFetching: pendingUserSelectors.isFetching(state),
  actualPage: pendingUserSelectors.getActualPage(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(TableAdmin);
