import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "component/admin/Nav/nav.scss";
import { selectors as pendingUserAdminPickerSelectors } from "reducers/detailPicker";
import { actions as notificationActions } from "reducers/notification";
import { connect } from "react-redux";
import i18next from "i18next";

export const Nav = ({ isDirty, showNotification }: any) => {
  const Historial = useHistory();
  let Location: any = useParams();
  Location = Location.id;

  const handleClick = (e: any) => {
    e.preventDefault();
    let onClose = () => {
      Historial.push(e.target.pathname);
    };
    if (isDirty) {
      showNotification({
        level: "warning",
        title: i18next.t("pickers:title.modal.saveChanges"),
        body: i18next.t("pickers:label.modal.saveChanges"),
        onClickLabel: "pickers:button.modal.goToSave",
        onCloseLabel: "pickers:button.modal.notSave",
        onClose: onClose,
        onClick: () =>
          window.scroll({
            top: window.innerHeight,
            left: 0,
            behavior: "smooth",
          }),
        element: e.target,
      });
    } else {
      onClose();
    }
  };

  return (
    <nav className="navAdmin ">
      <div className="tamScroll scroll">
        <ul>
          <h3>{i18next.t("nav:title.menu.report")}</h3>
          <li>
            {window.location.pathname === "/dashboard" ? (
              <div className="circle"></div>
            ) : null}{" "}
            <Link onClick={handleClick} to="/dashboard">
              {i18next.t("nav:label.menu.dashboard")}
            </Link>
          </li>
          <li>
            {window.location.pathname === "/pickers" ||
            window.location.pathname === `/pickers/${Location}` ? (
              <div className="circle"></div>
            ) : null}{" "}
            <Link onClick={handleClick} to="/pickers">
              {i18next.t("nav:label.menu.pickers")}
            </Link>
          </li>
          <li>
            {window.location.pathname.includes("/transaction") ? (
              <div className="circle"></div>
            ) : null}{" "}
            <Link onClick={handleClick} to="/transaction">
              {i18next.t("nav:label.menu.transactions")}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = (state: any) => ({
  isDirty: pendingUserAdminPickerSelectors.isDirty(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  showNotification: (content: any) => {
    dispatch(notificationActions.showNotification(content));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
