import React from "react";
import { Link, useHistory } from "react-router-dom";
import "component/admin/Nav/nav.scss";
import {
  detailPickerSelector,
  hasPickerWrongFilesSelector,
} from "reducers/detailPicker";
import { actions as notificationActions } from "reducers/notification";
import { connect } from "react-redux";
import i18next from "i18next";
import { NotificationStateType } from "reducers/types/notification";
import { AppDispatch, RootState } from "store";
import { NavType } from "./types";
import { preliquidationSelector } from "reducers/preliquidation";

export const Nav = ({ isDirty, pickerWrongFiles, isInvoiceDirty, invoiceFileError ,showNotification }: NavType) => {
  const history = useHistory();
  const { pathname } = history.location;

  const handleClick = (e: any) => {
    e.preventDefault();
    const onClose = () => history.push(e.target.pathname);

    const dirty = isDirty || isInvoiceDirty;
    const error = pickerWrongFiles || invoiceFileError;
    if (dirty && showNotification) {
      const html = document.documentElement;
      const height = Math.max(html.clientHeight, html.scrollHeight);
      showNotification({
        level: "warning",
        title: i18next.t("pickers:title.modal.saveChanges"),
        body: i18next.t("pickers:label.modal.saveChanges"),
        onClickLabel: "pickers:button.modal.goToSave",
        onCloseLabel: "pickers:button.modal.notSave",
        onClose: onClose,
        onClick: () =>
          window.scroll({
            top: height,
            left: 0,
            behavior: "smooth",
          }),
      });
    } else if (error && showNotification) {
      showNotification({
        level: "warning",
        title: i18next.t("global:title.modal.withoutSaving"),
        body: i18next.t("global:label.modal.withoutSaving"),
        onClickLabel: i18next.t("global:label.button.checkErrors"),
        onCloseLabel: i18next.t("global:label.button.continue"),
        onClose: onClose,
        onClick: undefined
      });
    } else {
      onClose();
    }
  };

  return (
    <nav className="nav-admin">
      <div className="scroll">
        <div className="nav-section">
          <h3>{i18next.t("nav:title.menu.report")}</h3>
          <ul>
            <li>
              <div
                className={`circle ${pathname === "/dashboard" && "visible"}`}
              />
              <Link onClick={handleClick} to="/dashboard">
                {i18next.t("nav:label.menu.dashboard")}
              </Link>
            </li>
            <li>
              <div
                className={`circle ${
                  pathname.includes("/pickers") && "visible"
                }`}
              />
              <Link onClick={handleClick} to="/pickers">
                {i18next.t("nav:label.menu.pickers")}
              </Link>
            </li>
            <li>
              <div
                className={`circle ${
                  pathname.includes("/transaction") && "visible"
                }`}
              />
              <Link onClick={handleClick} to="/transaction">
                {i18next.t("nav:label.menu.transactions")}
              </Link>
            </li>
          </ul>
        </div>
         <div className="nav-section">
          <h3>{i18next.t("nav:title.menu.administration")}</h3>
          <ul>
            <li>
              <div
                className={`circle ${
                  pathname.includes("/presettlements") && "visible"
                }`}
              />
              <Link onClick={handleClick} to="/presettlements">
                {i18next.t("nav:label.menu.presettlements")}
              </Link>
            </li>
          </ul>
        </div> 
      </div>
    </nav>
  );
};

const mapStateToProps = (state: RootState) => ({
  isDirty: detailPickerSelector(state).dirty,
  pickerWrongFiles: hasPickerWrongFilesSelector(state),
  isInvoiceDirty: preliquidationSelector(state).dirty,
  invoiceFileError: preliquidationSelector(state).invoiceFileStatus.error
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  showNotification: (content: NotificationStateType) => {
    dispatch(notificationActions.showNotification(content));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
