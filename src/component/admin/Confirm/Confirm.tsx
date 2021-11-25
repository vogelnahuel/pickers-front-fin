import i18next from "i18next";
import React from "react";
import { ConfirmPropsType } from "./types";
import "./Confirm.scss"

const Confirm: React.FC<ConfirmPropsType> = ({
  tag,
  viewConfirm,
  optionNo,
  optionYes,
  labels
}): JSX.Element => {
  return (
   
    
        <div className="display-flex align-item-center">
          <p className="">
            {viewConfirm[tag]?.delete
              ? i18next.t(labels[0])
              : i18next.t(labels[1])}
          </p>
          <p
            className="confirm-option"
            onClick={()=>optionYes(tag,viewConfirm)}
          >
            {i18next.t("global:label.label.yes")}
          </p>
          <p
            className="confirm-option"
            onClick={() => optionNo(tag,viewConfirm)}
          >
             {i18next.t("global:label.label.no")}
          </p>
        </div>

  );
};


export default Confirm;

