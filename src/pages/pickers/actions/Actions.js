import React from "react";
import exportar from "assets/admin/PendingUser/exportar.svg";
import or from "assets/admin/PendingUser/or.svg";
import { connect } from "react-redux";
import { selectors as pendingUserAdminPickerSelectors } from "reducers/detailPicker";
import { actions as notificationActions } from "reducers/notification";

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
        title: "Guardá tus cambios",
        body: "Si exportás sin guardar, tus cambios no van a quedar registrados ",
        onClickLabel: "Ir a guardar",
        onCloseLabel: "Exportar sin guardar",
        onClose: () =>
          getPendingUserPickerExport({ email: pendingUserAdminPicker.email },e.target),
        onClick: () =>
          window.scroll({
            top: window.innerHeight,
            left: 0,
            behavior: "smooth",
          }),
      });
    } else {
      getPendingUserPickerExport({ email: pendingUserAdminPicker.email },e.target);
    }
  };
  
  return (
    <div>
      <button onClick={(e) => handleClick(e)} className="export" name="export">
        <img src={exportar} alt="export" />
        <img className="or-pending" src={or} alt="or" />
        <p className="display-inline-block p-export">Exportar</p>
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
