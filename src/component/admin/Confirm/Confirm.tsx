import i18next from "i18next";
import React from "react";
import { connect } from "react-redux";
import { detailPickerSelector } from "reducers/detailPicker";
import { AppDispatch, RootState } from "store";
import { actions as detailPickerActions } from "../../../reducers/detailPicker";
import { ConfirmPropsType } from "./types";
import "./Confirm.scss"

const Confirm: React.FC<ConfirmPropsType> = ({
  tag,
  viewConfirm,
  optionNo,
  optionYes

}): JSX.Element => {
  return (
   
    
        <div className="display-flex align-item-center">
          <p className="">
            {viewConfirm[tag]?.delete
              ? i18next.t("expandableFile:label.card.deleteFile")
              : i18next.t("expandableFile:label.card.replaceFile")}
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
const mapStateToProps = (state: RootState) => ({
  serverError: detailPickerSelector(state).serverError,
  tagError: detailPickerSelector(state).tagError,
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  deleteFile: (params: any) => {
    dispatch(detailPickerActions.getPickerFileDeleteRequest(params));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Confirm);

