import { PickerFileRequestType } from "pages/pickers/detailPicker/types";
import { DataFilesType, DetailPickerTagFileType } from "pages/pickers/types";

export type ExpandableFilePropsType = {
  pickerId: number;
  files: DataFilesType;
  openFile?: (params: PickerFileRequestType) => void;
  saveFile: (params: ExpandableFileSaveParamsType) => void;
  serverError: boolean;
  tagError?: keyof DetailPickerTagFileType;
};
export type ExpandableFileSaveParamsType = {
  id: number;
  tag: keyof DetailPickerTagFileType;
  content: string | unknown;
};
