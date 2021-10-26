import { PickerType } from "pages/pickers/types";
import React from "react";
import { Link } from "react-router-dom";
import { titlesAdminActive, titlesAdminPending } from "utils/constants";
import getDifDate from "utils/difDate";
import edit from "../../../assets/admin/PendingUser/edit.svg";
import "./TablePickers.scss";
import { TableAdminPropsType } from "./types";

export const TablePickers: React.FC<TableAdminPropsType> = ({
  actualPage,
  pendingUsers,
}): JSX.Element => {
  return (
    <>
      <table className="table-admin">
        <thead>
          <tr>
            {(actualPage==="PENDING"? titlesAdminPending : titlesAdminActive).map((titulo: string) => (
              <td key={titulo}>{titulo}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user: PickerType) => (
            <tr className="table-info table-pending" key={user.id}>
              <td> {`${user.name} ${user.surname}`} </td>
              <td> {user.identificationNumber} </td>
              <td>{user.email}</td>
              <td>{user.vehicleType === "motorcycle" ? "Moto" : "Bici"}</td>
              {actualPage === "PENDING" ? (
                <td className="table-registro">
                  <div className="table-admin-enCorrecion-span">
                    {getDifDate(user.registerDate)}
                    {getDifDate(user.registerDate) === 1 ? "día" : "días"}
                  </div>
                  {user.status.id === 3 && (
                    <div className="admin-table-correction">En corrección</div>
                  )}
                </td>
              ) : (
                <td
                  className={
                    user.status.id === 4
                      ? "color-state-green table-registro"
                      : "color-state-red table-registro"
                  }
                  id={
                    user.status.id === 4
                      ? "color-state-green"
                      : "color-state-red"
                  }
                >
                  {user.status.description}
                </td>
              )}
              <td className="table-editar">
                <Link to={`/pickers/${user.id}`}>
                  <img src={edit} className="aditar-picker-img" alt="edit" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};