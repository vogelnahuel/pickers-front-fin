import { DetailPickerTagFileType, PickerType } from "../types";
import { NotificationStateType } from "reducers/types/notification";

export type DetailPickerContainerTypeProps = {
  pendingUserAdminPicker: PickerType;
  isFetching: boolean;
  actualPage: pickerTabs;
  nameDisplay: string;
  getPendingUserPicker: Function;
  getPendingUserPickerExport: Function;
  setDirty: Function;
  postAprovePickerRequest: Function;
  postPendingUserDocumentsEdit: Function;
  resetWrongFiles: () => void;
  showNotification: (notification: NotificationStateType) => void;
  postEditPickerRequest: Function;
  setActualPage: Function;
  wrongFiles: boolean;
  loadedFiles: boolean;
};

export type DetailPickerTypeProps = {
  isFetching: boolean;
  initialValues: PickerType;
  pendingUserAdminPicker: PickerType;
  getPendingUserPickerExport: Function;
  actualPage: pickerTabs;
  setDirty: Function;
  active: boolean;
  cancel: Function;
  aproveSubmit: Function;
  nameDisplay: string;
  postPendingUserDocumentsEdit: Function;
  postEditPickerRequest: Function;
  validationSchema: Object;
  formatDate: Function;
  wrongFiles: boolean;
  showNotification: (notification: NotificationStateType) => void;
  loadedFiles: boolean;
  changePage: (page:string, isDirty: boolean, ) => void;
  goBack: (validate?: boolean, isDirty?: boolean) => void;
};

export type PickerFileRequestType = {
  pickerId: number;
  tag: keyof DetailPickerTagFileType;
};
export type pickerTabs="PENDING" | "ACTIVE"