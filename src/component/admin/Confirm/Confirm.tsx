import i18next from "i18next";
import React from "react";
import { ConfirmPropsType } from "./types";
import "./Confirm.scss";

const Confirm: React.FC<ConfirmPropsType> = ({
  optionNo,
  optionYes,
  question,
}): JSX.Element => {
  return (
    <div className="display-flex align-item-center">
      <p className="">{question}</p>
      <p className="confirm-option" onClick={optionYes}>
        {i18next.t("global:label.label.yes")}
      </p>
      <p className="confirm-option" onClick={optionNo}>
        {i18next.t("global:label.label.no")}
      </p>
    </div>
  );
};

export default Confirm;
