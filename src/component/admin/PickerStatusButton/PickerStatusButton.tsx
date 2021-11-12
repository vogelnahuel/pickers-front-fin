import React from "react";
import volver from "assets/admin/PendingUser/volver.svg";
import relojAzul from "assets/admin/PendingUser/relojAzul.svg";
import relojOscuro from "assets/admin/PendingUser/relojOscuro.svg";
import trabajadorOscuro from "assets/admin/PendingUser/trabajadorOscuro.svg";
import trabajadorAzul from "assets/admin/PendingUser/trabajadorAzul.svg";
import "component/admin/PickerStatusButton/pending.scss";
import { useHistory } from "react-router-dom";
import { detailPickerSelector as pendingUserAdminPickerSelectors } from "reducers/detailPicker";
import { connect } from "react-redux";
import { actions as notificationActions } from "reducers/notification";
import { AppDispatch, RootState } from "store";
import { PickerStatusButtonType } from "./types";
import {
  actions as pendingUserActions,
  pickersSelector as pendingUserSelectors,
} from "reducers/pickers";
import i18next from "i18next";
export const PickerStatusButton: React.FC<PickerStatusButtonType> = ({
  showNotification,
  setActualPage,
  actualPage,
  isDirty,
  isDetail,
}) => {
  const Historial = useHistory();
  const changePage = (page: string, isDirty: boolean) => {
    if (isDetail || actualPage !== page) {
      let onClose = () => {
        setActualPage(page);

        if (
          window.location.pathname !== "/pickers" &&
          window.history.length > 1
        ) {
          Historial.goBack();
          //se abre en nueva pestaña desde transacciones
        } else if (window.history.length <= 1) {
          Historial.replace("/pickers");
        }
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
        });
      } else {
        onClose();
      }
    } else {
    }
  };

  const handleHistory = (e: React.MouseEvent) => {
    const eventTarget = e.target as HTMLElement;
    let onClose = () => {
      Historial.goBack();
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
        element: eventTarget.parentElement,
      });
    } else {
      onClose();
    }
  };
  return (
    <div>
      <div className="FlexPending">
        <div className="FlexPending backGround-pending">
          {actualPage === "PENDING" ? (
            <div
              onClick={() => {
                changePage("PENDING", isDirty);
              }}
              className="container-pending pending-blue-border-izq"
            >
              <p className="Pending-paragraph">
                {i18next.t("pickers:label.title.pending")}
              </p>
              <img className="img" src={relojAzul} alt="reloj" />
            </div>
          ) : (
            <div
              onClick={() => {
                changePage("PENDING", isDirty);
              }}
              className="container-pending pending-blue-border-izq"
            >
              <p className="Pending-paragraph  pending-black ">
                {i18next.t("pickers:label.title.pending")}
              </p>
              <img className="img" src={relojOscuro} alt="reloj" />
            </div>
          )}
          {actualPage === "ACTIVE" ? (
            <div
              onClick={() => {
                changePage("ACTIVE", isDirty);
              }}
              className="container-pending border-pending pending-blue-border-der"
            >
              <p className="Pending-paragraph2 pending-blue">
                {i18next.t("pickers:label.title.pickers")}
              </p>
              <img className="img2" src={trabajadorAzul} alt="trabajador" />
            </div>
          ) : (
            <div
              className="container-pending border-pending pending-blue-border-der"
              onClick={() => {
                changePage("ACTIVE", isDirty);
              }}
            >
              <p className="Pending-paragraph2">
                {i18next.t("pickers:label.title.pickers")}
              </p>
              <img className="img2" src={trabajadorOscuro} alt="trabajador" />
            </div>
          )}
        </div>
        <div className="FlexPending backGround-pending"></div>
        {isDetail && (
          <div>
            <button className="buttonVolver" onClick={handleHistory}>
              <img className="img3" src={volver} alt="volver" />
              <p className="Pending-paragraph3">
                {i18next.t("global:label.button.back")}
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isDirty: pendingUserAdminPickerSelectors(state).dirty,
  actualPage: pendingUserSelectors(state).actualPage,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  showNotification: (content: any) => {
    //falta tipar show notification
    dispatch(notificationActions.showNotification(content));
  },
  setActualPage: (page: string) => {
    dispatch(pendingUserActions.setActualPage(page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PickerStatusButton);
