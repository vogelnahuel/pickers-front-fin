import React from "react";
import button from "assets/admin/ActiveUserAdminPicker/button.svg";
import disabledButton from "assets/admin/ActiveUserAdminPicker/disabledButton.svg";
import i18next from "i18next";

export const Switch = ({ input }) => {
  return (
    <div>
      <h3 className="subTitle-pending-data">
        {i18next.t("global:label.switch.title")}
      </h3>
      <div className="active-admin-picker-estado-container">
        <p
          className={
            input.value
              ? "admin-active-picker"
              : "admin-buttonDisabled-picker-disabled"
          }
        >
          {i18next.t("global:label.switch.disabled")}
        </p>
        <img
          onClick={() => input.onChange(!input.value)}
          className="button-active-picker"
          src={input.value ? button : disabledButton}
          alt="active-picker"
        />
        <p
          className={
            input.value
              ? "admin-active-picker-p"
              : "admin-buttonDisabled-picker-enabled"
          }
        >
          {i18next.t("global:label.switch.enabled")}
        </p>
      </div>
    </div>
  );
};
