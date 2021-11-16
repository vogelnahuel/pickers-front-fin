import React from "react";
import exportar from "assets/admin/PendingUser/exportar.svg";
import or from "assets/admin/PendingUser/or.svg";
import { connect } from "react-redux";
import { detailPickerSelector as pendingUserAdminPickerSelectors } from "reducers/detailPicker";
import { actions as notificationActions } from "reducers/notification";
import i18next from "i18next";
import { AppDispatch, RootState } from "store";
import { NotificationStateType } from "reducers/types/notification";
import { ExportActionPropsType } from "./types";

const ExportAction = ({
  getPendingUserPickerExport,
  isDirty,
  showNotification,
}: ExportActionPropsType) => {
  const handleClick = () => {
    if (isDirty && showNotification) {
      showNotification({
        level: "warning",
        title: i18next.t("pickers:title.modal.saveChanges"),
        body: i18next.t("pickers:label.modal.exportWithoutSave"),
        onClickLabel: "pickers:button.modal.goToSave",
        onCloseLabel: "pickers:button.modal.exportWithoutSave",
        onClose: () => getPendingUserPickerExport(),
        onClick: () =>
          window.scroll({
            top: window.innerHeight,
            left: 0,
            behavior: "smooth",
          }),
      });
    } else {
      getPendingUserPickerExport();
    }
  };

  return (
    <div>
      <button onClick={handleClick} className="export" name="export">
        <img src={exportar} alt="export" />
        <img className="or-pending" src={or} alt="or" />
        <p className="display-inline-block p-export">
          {i18next.t("global:label.button.export")}
        </p>
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isDirty: pendingUserAdminPickerSelectors(state).dirty,
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  showNotification: (content: NotificationStateType) => {
    dispatch(notificationActions.showNotification(content));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ExportAction);
