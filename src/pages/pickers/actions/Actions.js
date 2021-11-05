import React from "react";
import exportar from "assets/admin/PendingUser/exportar.svg";
import or from "assets/admin/PendingUser/or.svg";
import { connect } from "react-redux";
import { selectors as pendingUserAdminPickerSelectors } from "reducers/detailPicker";
import { actions as notificationActions } from "reducers/notification";
import i18next from "i18next";

export const Actions = ({
  getPendingUserPickerExport,
  pendingUserAdminPicker,
  isDirty,
  showNotification,
}) => {
  const handleClick = (e) => {
    if (isDirty) {
      showNotification({
        level: "warning",
        title: i18next.t("pickers:title.modal.saveChanges"),
        body: i18next.t("picker:label.modal.exportWithoutSave"),
        onClickLabel: i18next.t("picker:button.modal.goToSave"),
        onCloseLabel: i18next.t("picker:button.modal.exportWithoutSave"),
        onClose: () =>
          getPendingUserPickerExport(
            { email: pendingUserAdminPicker.email },
            e.target
          ),
        onClick: () =>
          window.scroll({
            top: window.innerHeight,
            left: 0,
            behavior: "smooth",
          }),
      });
    } else {
      getPendingUserPickerExport(
        { email: pendingUserAdminPicker.email },
        e.target
      );
    }
  };

  return (
    <div>
      <button onClick={(e) => handleClick(e)} className="export" name="export">
        <img src={exportar} alt="export" />
        <img className="or-pending" src={or} alt="or" />
        <p className="display-inline-block p-export">
          {i18next.t("global:label.button.export")}
        </p>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isDirty: pendingUserAdminPickerSelectors.isDirty(state),
});
const mapDispatchToProps = (dispatch) => ({
  showNotification: (content) => {
    dispatch(notificationActions.showNotification(content));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Actions);
