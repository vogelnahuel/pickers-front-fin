import i18next from "i18next";
import React from "react";
import { connect } from "react-redux";
import { detailPickerSelector } from "reducers/detailPicker";
import { AppDispatch, RootState } from "store";
import { actions as detailPickerActions } from "../../../reducers/detailPicker";

const Confirm: React.FC<any> = ({
  open,
  tag,
  deleteFile,
  pickerId,
  viewConfrim,
  setViewConfrim,
  uploadFile,
  Error,
  serverError,
  tagError,
}): JSX.Element => {
  return (
    <div className={open ? "container-detailPicker-col-sm-12" : "display-none"}>
      {viewConfrim[tag].delete || viewConfrim[tag].replace ? (
        <div className="display-flex align-item-center">
          <p className="">
            {viewConfrim[tag].delete
              ? i18next.t("expandableFile:label.card.deleteFile")
              : i18next.t("expandableFile:label.card.replaceFile")}
          </p>
          <p
            className="confirm-option"
            onClick={() => {
              if (viewConfrim[tag].delete) {
                deleteFile({ id: pickerId, tag: tag });
                setViewConfrim({
                  ...viewConfrim,
                  [tag]: {
                    delete: !viewConfrim[tag].delete,
                    replace: viewConfrim[tag].replace,
                  },
                });
              } else {
                uploadFile(false, tag);
                setViewConfrim({
                  ...viewConfrim,
                  [tag]: {
                    delete: viewConfrim[tag].delete,
                    replace: !viewConfrim[tag].replace,
                  },
                });
              }
            }}
          >
            {i18next.t("global:label.label.yes")}
          </p>
          <p
            className="confirm-option"
            onClick={() => {
              setViewConfrim({
                ...viewConfrim,
                [tag]: {
                  delete: false,
                  replace: false,
                },
              });
            }}
          >
             {i18next.t("global:label.label.no")}
          </p>
        </div>
      ) : (
        <></>
      )}
      {Error["formatTag"][tag] ? (
        <p className="p-error margin-top">
          {i18next.t("expandableFile:label.card.ErrorFormat")}
        </p>
      ) : Error["sizeTag"][tag] ? (
        <p className="p-error margin-top">
          {i18next.t("expandableFile:label.card.ErrorSize")}
        </p>
      ) : Error["loadTag"][tag] ? (
        <p className="p-error margin-top">
          {i18next.t("expandableFile:label.card.ErrorLoad")}
        </p>
      ) : (
        serverError &&
        tagError === tag && (
          <p className="p-error margin-top">
            {i18next.t("expandableFile:label.card.ErrorServer")}
          </p>
        )
      )}
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

