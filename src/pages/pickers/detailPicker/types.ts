import { DetailPickerTagFileType, PickerType } from "../types";
import { NotificationStateType } from "reducers/types/notification";

export type DetailPickerContainerTypeProps = {
  pendingUserAdminPicker: PickerType;
  isFetching: boolean;
  actualPage: string;
  nameDisplay: string;
  getPendingUserPicker: Function;
  getPendingUserPickerExport: Function;
  setDirty: Function;
  postAprovePickerRequest: Function;
  postPendingUserDocumentsEdit: Function;
  showNotification: (notification: NotificationStateType) => void;
  postEditPickerRequest: Function;
  setActualPage: Function;
};

export type DetailPickerTypeProps = {
  isFetching: boolean;
  pendingUserAdminPicker: PickerType;
  getPendingUserPickerExport: Function;
  actualPage: string;
  setDirty: Function;
  active: Boolean;
  cancel: Function;
  aproveSubmit: Function;
  nameDisplay: string;
  goBack: Function;
  postPendingUserDocumentsEdit: Function;
  postEditPickerRequest: Function;
  validationSchema: Object;
  formatDate: Function;
};

export type PickerFileRequestType = {
  pickerId: number;
  tag: keyof DetailPickerTagFileType;
};
