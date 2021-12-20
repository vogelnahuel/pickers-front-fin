import React, { Fragment, useState } from "react";
import i18next from "i18next";
import { connect } from "react-redux";
import {
  Tooltip,
  ToolTipPosition,
  Collapsible,
} from "@pickit/pickit-components";
import {
  DETAIL_PICKER_TAG,
  PICKERS_MAX_FILE_SIZE,
  PICKERS_FILE_EXT,
} from "utils/constants";
import { PickerFileRequestType } from "../../../pages/pickers/detailPicker/types";
import { actions as detailPickerActions } from "../../../reducers/detailPicker";
import "./ExpandableFile.scss";
import { AppDispatch, RootState } from "store";
import {
  DeleteFileType,
  ExpandableFilePropsType,
  ExpandableFileSaveParamsType,
  ExpandableFileStateType,
  TagConfimationType,
  TagsErrorType,
} from "./types";
import { DataContentType, DetailPickerTagFileType } from "pages/pickers/types";
import { toBase64 } from "utils/toBase64";
import { detailPickerSelector } from "reducers/detailPicker";
import { pickersSelector } from "reducers/pickers";
import { PickerWrongFilePayloadType } from "reducers/types/detailPicker";
import Confirm from "../Confirm/Confirm";
import classNames from "classnames";
import { ReactComponent as ErrorIcon } from "../../../assets/admin/folder-error.svg";
import { ReactComponent as CompleteIcon } from "../../../assets/admin/folder-complete.svg";
import { ReactComponent as AddIcon } from "../../../assets/admin/folder-add.svg";

import { ReactComponent as DeleteIcon } from "../../../assets/admin/file-delete.svg";
import { ReactComponent as ReplaceIcon } from "../../../assets/admin/file-replace.svg";
import { ReactComponent as LoadIcon } from "../../../assets/admin/file-load.svg";

const tagInitialState: TagsErrorType = {
  "dni-front": false,
  "dni-back": false,
  "user-face": false,
  "cbu-certificate": false,
  "cuit-certificate": false,
  "driver-license": false,
  "vehicle-identification-back": false,
  "vehicle-identification-front": false,
  "driver-insurance-card": false,
};
const tagConfirmInitialState: TagConfimationType = {
  "dni-front": { delete: false, replace: false },
  "dni-back": { delete: false, replace: false },
  "user-face": { delete: false, replace: false },
  "cbu-certificate": { delete: false, replace: false },
  "cuit-certificate": { delete: false, replace: false },
  "driver-license": { delete: false, replace: false },
  "vehicle-identification-back": { delete: false, replace: false },
  "vehicle-identification-front": { delete: false, replace: false },
  "driver-insurance-card": { delete: false, replace: false },
};

const labelsConfirm = [
  "expandableFile:label.card.deleteFile",
  "expandableFile:label.card.replaceFile",
];

const initialState: ExpandableFileStateType = {
  loadTag: tagInitialState,
  sizeTag: tagInitialState,
  formatTag: tagInitialState,
};

const ExpandableFile: React.FC<ExpandableFilePropsType> = ({
  files,
  pickerId,
  openFile,
  saveFile,
  setWrongFile,
  serverError,
  actualPage,
  deleteFile,
}) => {
  const [viewConfirm, setViewConfirm] = useState(tagConfirmInitialState);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<typeof initialState>(initialState);

  const optionYes = (tag: keyof DetailPickerTagFileType) => {
    if (viewConfirm[tag]?.delete) {
      deleteFile({ id: pickerId, tag: tag });
      resetTag(tag);
      setViewConfirm({
        ...viewConfirm,
        [tag]: {
          ...viewConfirm[tag],
          delete: !viewConfirm[tag].delete,
        },
      });
    } else {
      uploadFile(false, tag);
      setViewConfirm({
        ...viewConfirm,
        [tag]: {
          ...viewConfirm[tag],
          replace: !viewConfirm[tag]?.replace,
        },
      });
    }
  };
  const optionNo = (tag: keyof DetailPickerTagFileType) => {
    setViewConfirm({
      ...viewConfirm,
      [tag]: {
        delete: false,
        replace: false,
      },
    });
  };

  const resetTag = (element: keyof DetailPickerTagFileType) => {
    if (setWrongFile) setWrongFile({ type: element, value: false });
    setError((err: typeof initialState) => ({
      ...err,
      loadTag: { ...err.loadTag, [element]: false },
      sizeTag: { ...err.sizeTag, [element]: false },
      formatTag: { ...err.formatTag, [element]: false },
    }));
  };

  const setErrorTag = (
    tag: keyof typeof initialState,
    element: keyof DetailPickerTagFileType
  ) => {
    if (setWrongFile) setWrongFile({ type: element, value: true });
    setError((err: typeof initialState) => ({
      ...err,
      loadTag: { ...err.loadTag, [element]: false },
      sizeTag: { ...err.sizeTag, [element]: false },
      formatTag: { ...err.formatTag, [element]: false },
      [tag]: { ...err[tag], [element]: true },
    }));
  };

  const hasError = (element: keyof DetailPickerTagFileType) => {
    return (
      error["sizeTag"][element] ||
      error["loadTag"][element] ||
      error["formatTag"][element] ||
      serverError.includes(element)
    );
  };

  const hasCardError = () => {
    const sizeTag = Object.values(error.sizeTag).some((v) => v);
    const loadTag = Object.values(error.loadTag).some((v) => v);
    const formatTag = Object.values(error.formatTag).some((v) => v);
    const serverTag = files.content.find((c) => serverError.includes(c.tag));
    return sizeTag || loadTag || formatTag || serverTag;
  };

  const verifyError = async (
    event: React.FormEvent<HTMLInputElement>,
    element: keyof DetailPickerTagFileType
  ) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (!file) return;

    // si el valor del value es el mismo no hace el onchange
    const inputFile = document.getElementById(
      `file-${element}`
    ) as HTMLInputElement;
    if (inputFile) inputFile.value = "";

    if (!PICKERS_FILE_EXT.includes(file.type)) {
      setErrorTag("formatTag", element);
      return;
    }

    if (file.size > PICKERS_MAX_FILE_SIZE) {
      setErrorTag("sizeTag", element);
      return;
    }

    try {
      const base64 = await toBase64(file);

      resetTag(element);
      saveFile({
        id: pickerId,
        tag: element,
        content: base64,
      });
    } catch (error) {
      setErrorTag("loadTag", element);
    }
  };

  const uploadFile = (
    isUpload: boolean,
    tag: keyof DetailPickerTagFileType
  ) => {
    const inputFile = document.getElementById(`file-${tag}`);
    if (!isUpload && inputFile) {
      inputFile.click();
    } else {
      setViewConfirm({
        ...viewConfirm,
        [tag]: { delete: false, replace: !viewConfirm[tag].replace },
      });
    }
  };

  return (
    <>
      <hr className="border-row" />
      <div
        className={classNames({
          "background-error": !open && hasCardError(),
        })}
      >
        <Collapsible>
          <div className="header" onClick={() => setOpen(!open)}>
            {hasCardError() ? (
              <div className="error-icon display-flex ">
                <ErrorIcon />
              </div>
            ) : files?.status === "EMPTY" || files?.status === "PENDING" ? (
              <div className="add-icon display-flex ">
                <AddIcon />
              </div>
            ) : (
              <div className="complete-icon display-flex ">
                <CompleteIcon />
              </div>
            )}

            <p
              className={
                !hasCardError()
                  ? "paragraph-expandable-file"
                  : "paragraph-expandable-file color-error"
              }
            >
              {i18next.t("expandableFile:label.card.file")}
            </p>
          </div>
          <div className="container-detailPicker-row ">
            {files?.content.map((element: DataContentType) => (
              <Fragment key={element.tag}>
                <div className="container-detailPicker-col-sm-6 file-container">
                  <p
                    className={
                      element.isUpload && !hasError(element.tag)
                        ? ""
                        : !hasError(element.tag)
                        ? "picker-color-gray"
                        : "color-error"
                    }
                    onClick={() =>
                      element.isUpload &&
                      openFile &&
                      openFile({ pickerId, tag: element.tag })
                    }
                  >
                    {i18next.t(DETAIL_PICKER_TAG[element.tag])}
                  </p>
                  <div className="container-img-picker">
                    <>
                      {element.isUpload ? (
                        <>
                          <Tooltip
                            position={ToolTipPosition.bottom}
                            message={i18next.t(
                              "expandableFile:label.tooltip.replace"
                            )}
                          >
                            <div
                              className="container-icon replace"
                              onClick={(e) =>
                                uploadFile(element.isUpload, element.tag)
                              }
                            >
                              <ReplaceIcon />
                            </div>
                          </Tooltip>
                          {actualPage === "PENDING" && (
                            <Tooltip
                              position={ToolTipPosition.bottom}
                              message={i18next.t(
                                "expandableFile:label.tooltip.delete"
                              )}
                            >
                              <div
                                className="container-icon delete"
                                onClick={() => {
                                  setViewConfirm({
                                    ...viewConfirm,
                                    [element.tag]: {
                                      delete: !viewConfirm[element.tag].delete,
                                      replace: false,
                                    },
                                  });
                                }}
                              >
                                <DeleteIcon />
                              </div>
                            </Tooltip>
                          )}
                        </>
                      ) : actualPage === "PENDING" ? (
                        <Tooltip
                          position={ToolTipPosition.bottom}
                          message={i18next.t(
                            "expandableFile:label.tooltip.load"
                          )}
                        >
                          <div
                            className="container-icon load"
                            onClick={() =>
                              uploadFile(element.isUpload, element.tag)
                            }
                          >
                            <LoadIcon />
                          </div>
                        </Tooltip>
                      ) : (
                        <></>
                      )}

                      <input
                        id={`file-${element.tag}`}
                        className="display-none"
                        type="file"
                        accept=".png,.jpg,.pdf"
                        onChange={(event: React.FormEvent<HTMLInputElement>) =>
                          verifyError(event, element.tag)
                        }
                      />
                    </>
                  </div>
                </div>
                <div className="container-detailPicker-col-sm-12 display-flex">
                  {viewConfirm[element.tag]?.delete ||
                  viewConfirm[element.tag]?.replace ? (
                    <Confirm
                      question={
                        viewConfirm[element.tag]?.delete
                          ? i18next.t(labelsConfirm[0])
                          : i18next.t(labelsConfirm[1])
                      }
                      optionYes={() => optionYes(element.tag)}
                      optionNo={() => optionNo(element.tag)}
                    />
                  ) : error["formatTag"][element.tag] ? (
                    <p className="p-error">
                      {i18next.t("expandableFile:label.card.ErrorFormat")}
                    </p>
                  ) : error["sizeTag"][element.tag] ? (
                    <p className="p-error ">
                      {i18next.t("expandableFile:label.card.ErrorSize")}
                    </p>
                  ) : error["loadTag"][element.tag] ? (
                    <p className="p-error">
                      {i18next.t("expandableFile:label.card.ErrorLoad")}
                    </p>
                  ) : (
                    serverError.includes(element.tag) && (
                      <p className="p-error ">
                        {i18next.t("expandableFile:label.card.ErrorServer")}
                      </p>
                    )
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </Collapsible>
      </div>
    </>
  );
};
const mapStateToProps = (state: RootState) => ({
  serverError: detailPickerSelector(state).serverError,
  actualPage: pickersSelector(state).actualPage,
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  openFile: (params: PickerFileRequestType) => {
    dispatch(detailPickerActions.getPickerFileRequest(params));
  },
  saveFile: (params: ExpandableFileSaveParamsType) => {
    dispatch(detailPickerActions.getPickerFileSaveRequest(params));
  },
  deleteFile: (params: DeleteFileType) => {
    dispatch(detailPickerActions.getPickerFileDeleteRequest(params));
  },
  setWrongFile: (wrongFile: PickerWrongFilePayloadType) => {
    dispatch(detailPickerActions.setWrongFile(wrongFile));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpandableFile);
