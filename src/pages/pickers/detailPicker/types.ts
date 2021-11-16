import {DataFilesType, PickerType} from "../types";

export type DetailPickerContainerTypeProps = {
  pendingUserAdminPicker: PickerType;
  isFetching: Boolean;
  actualPage: String;
  nameDisplay: String;
  getPendingUserPicker: Function;
  getPendingUserPickerExport: Function;
  setDirty: Function;
  postAprovePickerRequest: Function;
  postPendingUserDocumentsEdit: Function;
  showNotification: Function;
  postEditPickerRequest: Function;
  setActualPage: Function;
};

export type DetailPickerTypeProps = {
  isFetching:Boolean
  pendingUserAdminPicker:PickerType;
  getPendingUserPickerExport:Function
  actualPage:String
  setDirty:Function
  active:Boolean
  cancel:Function
  aproveSubmit:Function
  nameDisplay:String
  goBack:Function
  postPendingUserDocumentsEdit:Function
  postEditPickerRequest:Function
  validationSchema:Object
  formatDate:Function
};
export type ExpandableFilePropsType={
  files:DataFilesType
}