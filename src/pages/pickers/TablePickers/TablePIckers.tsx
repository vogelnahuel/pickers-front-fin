import { PickerType } from "pages/pickers/types";
import React from "react";
import { Link } from "react-router-dom";
import { titlesAdminActive, titlesAdminPending } from "utils/constants";
import getDifDate from "utils/difDate";
import edit from "../../../assets/admin/PendingUser/edit.svg";
import "./TablePickers.scss";
import { TableAdminPropsType } from "./types";
import i18next from "i18next";

export const TablePickers: React.FC<TableAdminPropsType> = ({
  actualPage,
  pendingUsers,
}): JSX.Element => {

  return (
    <>
      <table className="table-admin">
        <thead>
          <tr>
            {(actualPage === "PENDING"
              ? titlesAdminPending
              : titlesAdminActive
            ).map((titulo: string) => (
              <td key={titulo}>{i18next.t(titulo)}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user: PickerType) => (
            <tr className="table-info table-pending" key={user.id}>
              <td> {`${user?.personalData.name} ${user?.personalData.surname}`} </td>
              <td> {user?.personalData.identificationNumber} </td>
              <td>{user?.personalData.email}</td>
              <td>
                {i18next.t(`tablePickers:label.table.${user?.vehicle?.type}`)}
              </td>
              {actualPage === "PENDING" ? (
                <td className="table-registro">
                  <div className="table-admin-enCorrecion-span">
                    {getDifDate(user.registerDatetime)}{" "}
                    {i18next.t(
                      `tablePickers:label.table.${
                        getDifDate(user.registerDatetime) === 1 ? "day" : "days"
                      }`
                    )}
                  </div>
                  {user.status.id === 3 && (
                    <div className="admin-table-correction">
                      {i18next.t("tablePickers:label.table.fixing")}
                    </div>
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
