import React, { useState } from "react";
import i18next from "i18next";
import Folder from "assets/admin/folder.svg";
import FolderError from "assets/admin/folderError.svg";
import FolderAdd from "assets/admin/folderAdd.svg";
import FileReplace from "assets/admin/fileReplace.svg";
import FileDelete from "assets/admin/fileDelete.svg";
import FileLoad from "assets/admin/fileLoad.svg";
import { DETAIL_PICKER_TAG } from "utils/constants";
import { ExpandableFilePropsType } from "../../../pages/pickers/detailPicker/types";
import './ExpandableFile.scss'
import { DataContentType } from "pages/pickers/types";


export const ExpandableFile: React.FC<ExpandableFilePropsType> = ({ files }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <hr className="border-row" />

      <div className="">
        <div className="container-detailPicker-row ">
          <div
            className="container-detailPicker-col-18 display-flex cursor-pointer"
            onClick={() =>setOpen(!open)}
          >
            <img
              src={
                files?.status === "EMPTY"
                  ? FolderAdd
                  : files?.status ===
                    "COMPLETED"
                  ? Folder
                  : FolderError
              }
              alt="archivo"
            />
            <p className="paragraphFileExpandableFile">{i18next.t("detailPicker:label.card.file")}</p>
          </div>
          {
            files?.content.map(
              (element:DataContentType) => (
                <section className="sectionExpandableFilePicker" key={element.tag}>
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
                              element.isUpload ? "" : "picker-color-gray"
                            }
                          >
                            {i18next.t(DETAIL_PICKER_TAG[element.tag])}
                          </p>
                          <div className="container-img-picker">
                            {element.isUpload ? (
                              <>
                                {" "}
                                <img
                                  className="picker-replace"
                                  src={FileReplace}
                                  alt=""
                                />
                                <img
                                  className="padding-left picker-delete"
                                  src={FileDelete}
                                  alt=""
                                />
                              </>
                            ) : (
                              <img
                                className="picker-replace"
                                src={FileLoad}
                                alt=""
                              />
                            )}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="container-detailPicker-col-sm-12 ">
                    {/* <p className="p-error margin-top">
                      Ocurrió un error de conexión con el servidor. Intentalo
                      nuevamente
                    </p> */}
                  </div>
                </section>
              )
            )}
        </div>
      </div>
    </>
  );
};
