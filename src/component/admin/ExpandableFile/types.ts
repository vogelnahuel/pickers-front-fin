import { PickerFileRequestType } from "pages/pickers/detailPicker/types";
import { DataFilesType, DetailPickerTagFileType } from "pages/pickers/types";

export type ExpandableFilePropsType = {
  pickerId: number;
  files: DataFilesType;
  openFile?: (params: PickerFileRequestType) => void;
  saveFile:  (params: any) => void;
  serverError:boolean,
  tagError?:keyof DetailPickerTagFileType;
};
