import { PickerFileRequestType } from "pages/pickers/detailPicker/types";
import { DataFilesType } from "pages/pickers/types";

export type ExpandableFilePropsType = {
  pickerId: number;
  files: DataFilesType;
  openFile?: (params: PickerFileRequestType) => void;
};
