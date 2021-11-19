import React, { Fragment, useState } from "react";
import i18next from "i18next";
import { connect } from "react-redux";
import Folder from "assets/admin/folder.svg";
import FolderError from "assets/admin/folderError.svg";
import FolderAdd from "assets/admin/folderAdd.svg";
import FileReplace from "assets/admin/fileReplace.svg";
import FileDelete from "assets/admin/fileDelete.svg";
import FileLoad from "assets/admin/fileLoad.svg";
import { DETAIL_PICKER_TAG, MAX_FILE_SIZE } from "utils/constants";
import { PickerFileRequestType } from "../../../pages/pickers/detailPicker/types";
import { actions as detailPickerActions } from "../../../reducers/detailPicker";
import "./ExpandableFile.scss";
import { AppDispatch, RootState } from "store";
import {
  ExpandableFilePropsType,
  ExpandableFileSaveParamsType,
  ExpandableFileStateType,
  TagsErrorType,
} from "./types";
import { DataContentType, DetailPickerTagFileType } from "pages/pickers/types";
import { toBase64 } from "utils/toBase64";
import { detailPickerSelector } from "reducers/detailPicker";
import { pickersSelector } from "reducers/pickers";

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
  serverError,
  tagError,
  actualPage
}) => {
  const [open, setOpen] = useState(false);
  const [viewReplace, setviewReplace] = useState(tagInitialState);
  const [Error, setError] = useState<typeof initialState>(initialState);

  const resetTag = (element: keyof DetailPickerTagFileType) => {
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
      Error["sizeTag"][element] ||
      Error["loadTag"][element] ||
      Error["formatTag"][element] ||
      serverError
    );
  };

  const hasCardError = () => {
    const sizeTag = Object.values(Error.sizeTag).filter((v) => v);
    const loadTag = Object.values(Error.loadTag).filter((v) => v);
    const formatTag = Object.values(Error.formatTag).filter((v) => v);
    return sizeTag.length > 0 || loadTag.length > 0 || formatTag.length > 0;
  };

  const verifyError = async (
    event: React.FormEvent<HTMLInputElement>,
    element: keyof DetailPickerTagFileType
  ) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (!file) return;

    setviewReplace({
      ...viewReplace,
      [element]: false,
    });

    // si el valor del value es el mismo no hace el onchange
    const inputFile = document.getElementById(
      `file-${element}`
    ) as HTMLInputElement;
    if (inputFile) inputFile.value = ""; // si el valor del value es el mismo no hace el onchange

    if (
      file.type !== "application/pdf" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg"
    ) {
      setErrorTag("formatTag", element);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
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
    e: any,
    isUpload: boolean,
    tag: keyof DetailPickerTagFileType
  ) => {
    e.preventDefault();
    const inputFile = document.getElementById(`file-${tag}`);
    if (!isUpload && inputFile) {
      inputFile.click();
    } else {
      setviewReplace({
        ...viewReplace,
        [tag]: true,
      });
    }
  };

  return (
    <>
      <hr className="border-row" />

      <div className={!open && hasCardError() ? "background-error" : ""}>
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
                  ? "paragraphFileExpandableFile"
                  : "color-Error paragraphFileExpandableFile"
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
                              uploadFile(e, element.isUpload, element.tag)
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
                        {element.isUpload && actualPage==="PENDING" &&(
                          <img
                            className="padding-left picker-delete"
                            src={FileDelete}
                            alt=""
                          />
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className={
                  open ? "container-detailPicker-col-sm-12" : "display-none"
                }
              >
                {viewReplace[element.tag] ? (
                  <div className="display-flex align-item-center">
                    <p className="">¿Querés reemplazar el archivo?</p>
                    <p
                      className="confirm-option"
                      onClick={(e) => uploadFile(e, false, element.tag)}
                    >
                      Si
                    </p>
                    <p
                      className="confirm-option"
                      onClick={(e) =>
                        setviewReplace({
                          ...viewReplace,
                          [element.tag]: false,
                        })
                      }
                    >
                      No
                    </p>
                  </div>
                ) : Error["formatTag"][element.tag] ? (
                  <p className="p-error margin-top">
                    {i18next.t("expandableFile:label.card.ErrorFormat")}
                  </p>
                ) : Error["sizeTag"][element.tag] ? (
                  <p className="p-error margin-top">
                    {i18next.t("expandableFile:label.card.ErrorSize")}
                  </p>
                ) : Error["loadTag"][element.tag] ? (
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
                )}
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
});
export default connect(mapStateToProps, mapDispatchToProps)(ExpandableFile);
