import React, { Fragment, useState } from "react";
import i18next from "i18next";
import { connect } from "react-redux";
import Folder from "assets/admin/folder.svg";
import FolderError from "assets/admin/folderError.svg";
import FolderAdd from "assets/admin/folderAdd.svg";
import FileReplace from "assets/admin/fileReplace.svg";
import FileDelete from "assets/admin/fileDelete.svg";
import FileLoad from "assets/admin/fileLoad.svg";
import { DETAIL_PICKER_TAG } from "utils/constants";
import { PickerFileRequestType } from "../../../pages/pickers/detailPicker/types";
import { actions as detailPickerActions } from "../../../reducers/detailPicker";
import "./ExpandableFile.scss";
import { AppDispatch, RootState } from "store";
import { ExpandableFilePropsType, ExpandableFileSaveParamsType } from "./types";
import { DataContentType, DetailPickerTagFileType } from "pages/pickers/types";
import { toBase64 } from "utils/toBase64";
import { detailPickerSelector } from "reducers/detailPicker";

const initialState = {
  load:false,
  size:false,
  format:false,
  loadTag:"",
  sizeTag:"",
  formatTag:"",
}

const ExpandableFile: React.FC<ExpandableFilePropsType> = ({
  files,
  pickerId,
  openFile,
  saveFile,
  serverError,
  tagError,
}) => {
  const [open, setOpen] = useState(false);
  const [Error, setError] = useState({
    load:false,
    size:false,
    format:false,
    loadTag:"",
    sizeTag:"",
    formatTag:"",
  })

  const  verifyError = async(event:React.FormEvent<HTMLInputElement>,element: keyof DetailPickerTagFileType) => {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if(file.type!=="application/pdf" && file.type !== "image/png" && file.type !== "image/jpg"){
        setError({
        ...initialState,
        format:true,
        formatTag:element,
      })
      return
    }

    if(file.size>5000000){
      setError({
        ...initialState,
        size:true,
        sizeTag:element,
      })
      return
    }
    
    try {
      const base64= await toBase64(file);

      setError({
        ...initialState,
      })
      saveFile({
        id: pickerId,
        tag: element,
        content: base64,
      })

    } catch (error) {
      setError({
        ...initialState,
        load:true,
        loadTag:element,
      })

    }

  }

  return (
    <>
      <hr className="border-row" />

      <div className="">
        <div className="container-detailPicker-row ">
          <div
            className="container-detailPicker-col-18 display-flex cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <img
              src={
                files?.status === "EMPTY" || files?.status === "PENDING"
                  ? FolderAdd
                  : files?.status === "COMPLETED"
                  ? Folder
                  : FolderError
              }
              alt="archivo"
            />
            <p className="paragraphFileExpandableFile">
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
                        className={element.isUpload ? "" : "picker-color-gray"}
                        onClick={() =>
                          element.isUpload &&
                          openFile &&
                          openFile({ pickerId, tag: element.tag })
                        }
                      >
                        {i18next.t(DETAIL_PICKER_TAG[element.tag])}
                      </p>
                      <div className="container-img-picker">
                        {element.isUpload ? (
                          <>
                          <label>
                                <img
                                  className="picker-replace"
                                  src={FileReplace}
                                  alt=""
                                />
                                <input
                                  id="myFile"
                                  type="file"
                                  onChange={(event: React.FormEvent<HTMLInputElement>) =>
                                    verifyError(event,element.tag)
                                  }
                                />
                          </label>
                            <img
                              className="padding-left picker-delete"
                              src={FileDelete}
                              alt=""
                            />
                          </>
                        ) : (
                          <label>
                            <img
                              className="picker-replace"
                              src={FileLoad}
                              alt=""
                            />
                            <input
                              id="myFile"
                              type="file"
                              onChange={(event: React.FormEvent<HTMLInputElement>) =>
                                verifyError(event,element.tag)
                              }
                            />
                          </label>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="container-detailPicker-col-sm-12 ">
                {
           
                  Error.format && element.tag === Error.formatTag ? (
                    <p className="p-error margin-top">
                      {i18next.t("expandableFile:label.card.ErrorFormat")}        
                  </p>
                  )
                 :  Error.size && element.tag === Error.sizeTag ? (
                  <p className="p-error margin-top">
                     {i18next.t("expandableFile:label.card.ErrorSize")} 

                </p>)
                  :  Error.load && element.tag === Error.loadTag ? (
                    <p className="p-error margin-top">
                       {i18next.t("expandableFile:label.card.ErrorLoad")} 
                     
                  </p>)
                :  serverError && tagError===element.tag &&
                ( 
                   <p className="p-error margin-top">
                      {i18next.t("expandableFile:label.card.ErrorServer")} 
                  
                   </p>
                 )
                }
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
  tagError:detailPickerSelector(state).tagError,
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
