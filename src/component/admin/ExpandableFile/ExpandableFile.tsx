import React, { Fragment, useState } from "react";
import i18next from "i18next";
import { connect } from "react-redux";
import Folder from "assets/admin/folder.svg";
import FolderError from "assets/admin/folderError.svg";
import FolderAdd from "assets/admin/folderAdd.svg";
import FileReplace from "assets/admin/fileReplace.svg";
import FileDelete from "assets/admin/fileDelete.svg";
import FileLoad from "assets/admin/fileLoad.svg";
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
  tagError,
  deleteFile
}) => {
 
  const [viewConfirm, setViewConfirm] = useState(tagConfirmInitialState);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<typeof initialState>(initialState);

const optionYes = (tag:any,viewConfirm:any) => {
  if (viewConfirm[tag]?.delete) {
    deleteFile({ id: pickerId, tag: tag });
    setViewConfirm({
      ...viewConfirm,
      [tag]: {
        delete: !viewConfirm[tag].delete,
        replace: viewConfirm[tag]?.replace,
      },
    });
  } else {
    uploadFile(false, tag);
    setViewConfirm({
      ...viewConfirm,
      [tag]: {
        delete: viewConfirm[tag]?.delete,
        replace: !viewConfirm[tag]?.replace,
      },
    });
    setError(initialState)
  }
}
const optionNo = (tag:any,viewConfirm:any) => {
  setViewConfirm({
    ...viewConfirm,
    [tag]: {
      delete: false,
      replace: false,
    },
  });
}



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
      serverError
    );
  };

  const hasCardError = () => {
    const sizeTag = Object.values(error.sizeTag).some((v) => v);
    const loadTag = Object.values(error.loadTag).some((v) => v);
    const formatTag = Object.values(error.formatTag).some((v) => v);
    return sizeTag || loadTag || formatTag;
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
    if (inputFile) inputFile.value = ""; // si el valor del value es el mismo no hace el onchange

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
        <div className="container-detailPicker-row ">
          <div
            className="container-detailPicker-col-18 display-flex cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <img
              src={
                (files?.status === "EMPTY" || files?.status === "PENDING") &&
                !hasCardError()
                  ? FolderAdd
                  : files?.status === "COMPLETED" && !hasCardError()
                  ? Folder
                  : FolderError
              }
              alt="archivo"
            />
            <p
              className={
                !hasCardError()
                  ? "paragraph-expandable-file"
                  : "color-Error paragraph-expandable-file"
              }
            >
              {i18next.t("expandableFile:label.card.file")}
            </p>
          </div>
          {files?.content.map((element: DataContentType) => (
            <Fragment key={element.tag}>
              <div className="container-detailPicker-col-sm-6">
                <div>
                  <ul
                    className={
                      open ? "optionsListExpandableFile" : "display-none"
                    }
                  >
                    <li className="display-flex" key={element.tag}>
                      <p
                        className={
                          element.isUpload && !hasError(element.tag)
                            ? ""
                            : !hasError(element.tag)
                            ? "picker-color-gray"
                            : "color-Error"
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
                          <img
                            className="picker-replace"
                            src={element.isUpload ? FileReplace : FileLoad}
                            alt=""
                            onClick={(e) =>
                              uploadFile(element.isUpload, element.tag)
                            }
                          />
                          <input
                            id={`file-${element.tag}`}
                            className="display-none"
                            type="file"
                            accept=".png,.jpg,.pdf"
                            onChange={(
                              event: React.FormEvent<HTMLInputElement>
                            ) => verifyError(event, element.tag)}
                          />
                        </>
                        {element.isUpload && actualPage === "PENDING" && (
                          <img
                            className="padding-left picker-delete"
                            src={FileDelete}
                            alt=""
                            onClick={() => {
                              setViewConfirm({
                                ...viewConfirm,
                                [element.tag]: {
                                  delete: !viewConfirm[element.tag].delete,
                                  replace: false,
                                },
                              });
                            }}
                          />
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={open ? "container-detailPicker-col-sm-12" : "display-none"}>
              {viewConfirm[element.tag]?.delete || viewConfirm[element.tag]?.replace ? (
                <Confirm
                  tag={element.tag}
                  viewConfirm={viewConfirm}
                  optionYes={optionYes}
                  optionNo={optionNo}
                ></Confirm>
              ):(error["formatTag"][element.tag] ? (
                <p className="p-error margin-top">
                  {i18next.t("expandableFile:label.card.ErrorFormat")}
                </p>
              ) : error["sizeTag"][element.tag] ? (
                <p className="p-error margin-top">
                  {i18next.t("expandableFile:label.card.ErrorSize")}
                </p>
              ) : error["loadTag"][element.tag] ? (
                <p className="p-error margin-top">
                  {i18next.t("expandableFile:label.card.ErrorLoad")}
                </p>
              ) : (
                serverError &&
                tagError === element.tag && (
                  <p className="p-error margin-top">
                    {i18next.t("expandableFile:label.card.ErrorServer")}
                  </p>
                )
              ))}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state: RootState) => ({
  serverError: detailPickerSelector(state).serverError,
  tagError: detailPickerSelector(state).tagError,
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
