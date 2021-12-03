
import { PickerFileRequestType } from "pages/pickers/detailPicker/types";
import { DataFilesType, DetailPickerTagFileType } from "pages/pickers/types";
import React, { SetStateAction } from "react";
import { PickerWrongFilePayloadType } from "reducers/types/detailPicker";
import { NumberLiteralType } from "typescript";

export type ExpandableFilePropsType = {
  pickerId: number;
  files: DataFilesType;
  openFile?: (params: PickerFileRequestType) => void;
  saveFile: (params: ExpandableFileSaveParamsType) => void;
  setWrongFile?: (wrongFile: PickerWrongFilePayloadType) => void;
  serverError: boolean;
  tagError?: keyof DetailPickerTagFileType;
  actualPage: string;
  deleteFile: (params:DeleteFileType)=>void
};

export type DeleteFileType = {
  id:number;
  tag:string
}

export type TagConfimationType = {
  "dni-front": { delete: boolean; replace: boolean };
  "dni-back": { delete: boolean; replace: boolean };
  "user-face": { delete: boolean; replace: boolean };
  "cbu-certificate": { delete: boolean; replace: boolean };
  "cuit-certificate": { delete: boolean; replace: boolean };
  "driver-license": { delete: boolean; replace: boolean };
  "vehicle-identification-back": { delete: boolean; replace: boolean };
  "vehicle-identification-front": { delete: false; replace: boolean };
  "driver-insurance-card": { delete: boolean; replace: boolean };
};
export type ExpandableFileSaveParamsType = {
  id: number;
  tag: keyof DetailPickerTagFileType;
  content: string | unknown;
};

export type TagsErrorType = {
  [key in keyof DetailPickerTagFileType]: boolean;
};

export type ExpandableFileStateType = {
  formatTag: TagsErrorType;
  loadTag: TagsErrorType;
  sizeTag: TagsErrorType;
};
